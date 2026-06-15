import Link from "next/link";

export default function AuthIndexPage() {
  return (
    <div className="min-h-screen bg-[#F8F8F4] text-[#1C2B1F]">
      <div className="mx-auto flex min-h-screen max-w-4xl flex-col justify-center px-6 py-16">
        <div className="rounded-[32px] border border-[#D9DFC8] bg-white p-10 shadow-lg">
          <div className="mb-8 text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-[#00963F]">
              কৃষকOS
            </p>
            <h1 className="mt-4 text-4xl font-black sm:text-5xl">
              Account access for farmers and agribusiness.
            </h1>
            <p className="mt-4 text-base leading-7 text-[#4B5A44]">
              Sign in, create an account, verify your email, and open your
              dashboard.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Link
              href="/auth/signin"
              className="rounded-[24px] border border-[#DCE8D8] bg-[#F4F5ED] px-6 py-6 text-center font-semibold transition hover:border-[#00963F] hover:text-[#00963F]"
            >
              Sign In
            </Link>
            <Link
              href="/auth/signup"
              className="rounded-[24px] bg-[#00963E] px-6 py-6 text-center font-semibold text-white transition hover:bg-[#007d2d]"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
