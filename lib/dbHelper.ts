import path from "path";
import fs from "fs/promises";

/**
 * Gets a writable file path for database operations.
 * If running on a serverless platform (like Vercel), resolves to `/tmp`.
 * Otherwise, resolves to the project's local `data` directory.
 */
export function getWritableFilePath(filename: string): string {
  // Vercel environments define process.env.VERCEL or process.env.TMPDIR.
  // The process.cwd() usually includes /var/task on Vercel.
  const isServerless =
    process.env.VERCEL === "1" ||
    process.cwd().includes("/var/task");

  if (isServerless) {
    return path.join("/tmp", filename);
  }
  return path.join(process.cwd(), "data", filename);
}

/**
 * Ensures the target file is writable and exists.
 * If in serverless mode, and the file doesn't exist in `/tmp`,
 * it copies it from the bundled read-only `data` directory.
 */
export async function ensureWritableFile(
  filename: string,
  defaultData: any = []
): Promise<string> {
  const filePath = getWritableFilePath(filename);

  // If targeting /tmp, ensure we copy the file first if it doesn't exist.
  if (filePath.startsWith("/tmp")) {
    try {
      await fs.access(filePath);
    } catch {
      // File does not exist in /tmp, let's copy from read-only directory
      const originalPath = path.join(process.cwd(), "data", filename);
      try {
        await fs.mkdir("/tmp", { recursive: true });
        const contents = await fs.readFile(originalPath, "utf8");
        await fs.writeFile(filePath, contents, "utf8");
      } catch (err) {
        // Fallback to default empty data if source file not found or unreadable
        await fs.writeFile(filePath, JSON.stringify(defaultData, null, 2), "utf8");
      }
    }
  } else {
    // Local environment: ensure directories exist
    await fs.mkdir(path.dirname(filePath), { recursive: true });
    try {
      await fs.access(filePath);
    } catch {
      await fs.writeFile(filePath, JSON.stringify(defaultData, null, 2), "utf8");
    }
  }

  return filePath;
}
