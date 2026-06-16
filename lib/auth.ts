import crypto from "crypto";
import fs from "fs/promises";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import path from "path";
import { ensureWritableFile } from "./dbHelper";

const AUTH_SECRET = process.env.AUTH_SECRET ?? "krishokos-local-secret";
const SESSION_COOKIE_NAME = "krishokos-session";

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  passwordHash: string;
  isVerified: boolean;
  verificationToken?: string;
  verificationTokenExpires?: number;
  passwordResetToken?: string;
  passwordResetTokenExpires?: number;
  createdAt: number;
}

export interface AuthPayload {
  userId: string;
  exp: number;
}

function base64UrlEncode(value: string | Buffer) {
  return Buffer.from(value)
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

function base64UrlDecode(value: string) {
  const base64 = value.replace(/-/g, "+").replace(/_/g, "/");
  return Buffer.from(base64, "base64").toString("utf8");
}

function createSignature(value: string) {
  return crypto
    .createHmac("sha256", AUTH_SECRET)
    .update(value)
    .digest("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

export async function readUsers(): Promise<User[]> {
  try {
    const filePath = await ensureWritableFile("users.json", []);
    const contents = await fs.readFile(filePath, "utf8");
    return JSON.parse(contents) as User[];
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return [];
    }
    throw error;
  }
}

export async function writeUsers(users: User[]) {
  const filePath = await ensureWritableFile("users.json", []);
  await fs.writeFile(filePath, JSON.stringify(users, null, 2), "utf8");
}

export async function hashPassword(password: string) {
  const salt = crypto.randomBytes(16).toString("hex");
  const derivedKey = await new Promise<Buffer>((resolve, reject) => {
    crypto.pbkdf2(password, salt, 310000, 32, "sha256", (err, key) => {
      if (err) return reject(err);
      resolve(key);
    });
  });

  return `${salt}:${derivedKey.toString("hex")}`;
}

export async function verifyPassword(password: string, stored: string) {
  const [salt, hash] = stored.split(":");
  if (!salt || !hash) return false;
  const derivedKey = await new Promise<Buffer>((resolve, reject) => {
    crypto.pbkdf2(password, salt, 310000, 32, "sha256", (err, key) => {
      if (err) return reject(err);
      resolve(key);
    });
  });

  const storedHash = Buffer.from(hash, "hex");
  return crypto.timingSafeEqual(storedHash, derivedKey);
}

export function createAuthToken(userId: string) {
  const header = base64UrlEncode(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const payload = base64UrlEncode(
    JSON.stringify({
      userId,
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
    }),
  );
  const signature = createSignature(`${header}.${payload}`);
  return `${header}.${payload}.${signature}`;
}

export function verifyAuthToken(token: string) {
  try {
    const [headerB64, payloadB64, signature] = token.split(".");
    if (!headerB64 || !payloadB64 || !signature) return null;
    const expected = createSignature(`${headerB64}.${payloadB64}`);
    if (
      !crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))
    ) {
      return null;
    }

    const payload = JSON.parse(base64UrlDecode(payloadB64)) as AuthPayload;
    if (payload.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}

export function getSessionCookie(token: string) {
  return {
    name: SESSION_COOKIE_NAME,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict" as const,
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  };
}

export async function getSessionTokenFromCookies() {
  const cookie = (await cookies()).get(SESSION_COOKIE_NAME);
  return cookie?.value;
}

export async function getUserById(userId: string) {
  const users = await readUsers();
  return users.find((user) => user.id === userId) ?? null;
}

export async function findUserByEmail(email: string) {
  const users = await readUsers();
  return (
    users.find((user) => user.email.toLowerCase() === email.toLowerCase()) ??
    null
  );
}

export async function findUserByEmailOrPhone(identifier: string) {
  const users = await readUsers();
  const cleaned = identifier.trim().toLowerCase();
  return (
    users.find(
      (user) =>
        user.email.toLowerCase() === cleaned ||
        user.phone?.replace(/\D/g, "") === cleaned.replace(/\D/g, ""),
    ) ?? null
  );
}

export function createVerificationToken() {
  return crypto.randomBytes(20).toString("hex");
}

export async function createUser({
  name,
  email,
  phone,
  password,
}: {
  name: string;
  email: string;
  phone?: string;
  password: string;
}) {
  const users = await readUsers();
  const existingEmail = users.find(
    (user) => user.email.toLowerCase() === email.toLowerCase(),
  );
  if (existingEmail) {
    throw new Error("Email already exists");
  }

  const passwordHash = await hashPassword(password);
  const user: User = {
    id: crypto.randomUUID(),
    name,
    email: email.toLowerCase(),
    phone: phone?.trim() || undefined,
    passwordHash,
    isVerified: false,
    verificationToken: createVerificationToken(),
    verificationTokenExpires: Date.now() + 1000 * 60 * 60,
    createdAt: Date.now(),
  };

  users.push(user);
  await writeUsers(users);
  return user;
}

export async function verifyEmailToken(email: string, token: string) {
  const users = await readUsers();
  const user = users.find(
    (user) => user.email.toLowerCase() === email.toLowerCase(),
  );
  if (!user) {
    throw new Error("User not found");
  }

  if (!user.verificationToken || user.verificationTokenExpires === undefined) {
    throw new Error("No verification request found");
  }

  if (user.verificationToken !== token) {
    throw new Error("Invalid verification code");
  }

  if (Date.now() > user.verificationTokenExpires) {
    throw new Error("Verification code expired");
  }

  user.isVerified = true;
  user.verificationToken = undefined;
  user.verificationTokenExpires = undefined;
  await writeUsers(users);
  return user;
}

export async function authenticateUser(identifier: string, password: string) {
  const user = await findUserByEmailOrPhone(identifier);
  if (!user) return null;
  const valid = await verifyPassword(password, user.passwordHash);
  if (!valid) return null;
  return user;
}

export async function createPasswordResetToken(email: string) {
  const users = await readUsers();
  const user = users.find(
    (user) => user.email.toLowerCase() === email.toLowerCase(),
  );
  if (!user) {
    throw new Error("User not found");
  }

  const token = crypto.randomBytes(20).toString("hex");
  user.passwordResetToken = token;
  user.passwordResetTokenExpires = Date.now() + 1000 * 60 * 60;
  await writeUsers(users);
  return { user, token };
}

export async function resetPasswordWithToken(
  email: string,
  token: string,
  password: string,
) {
  const users = await readUsers();
  const user = users.find(
    (user) => user.email.toLowerCase() === email.toLowerCase(),
  );
  if (!user) {
    throw new Error("User not found");
  }

  if (user.passwordResetToken !== token) {
    throw new Error("Invalid reset token");
  }

  if (
    !user.passwordResetTokenExpires ||
    Date.now() > user.passwordResetTokenExpires
  ) {
    throw new Error("Reset token expired");
  }

  user.passwordHash = await hashPassword(password);
  user.passwordResetToken = undefined;
  user.passwordResetTokenExpires = undefined;
  await writeUsers(users);
  return user;
}

export async function getUserFromSessionToken(token: string) {
  const payload = verifyAuthToken(token);
  if (!payload) return null;
  return getUserById(payload.userId);
}

export function getSessionResponse(data: object, token?: string) {
  const response = NextResponse.json(data);
  if (token) {
    response.cookies.set(getSessionCookie(token));
  }
  return response;
}

export async function requireUser() {
  const token = await getSessionTokenFromCookies();
  if (!token) {
    return null;
  }
  return getUserFromSessionToken(token);
}

export function signOutResponse() {
  const response = NextResponse.json({ message: "Signed out" });
  response.cookies.set({
    name: SESSION_COOKIE_NAME,
    value: "",
    maxAge: 0,
    path: "/",
  });
  return response;
}
