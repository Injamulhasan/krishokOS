import Link from "next/link";

export default function AuthIndexPage() {
  return (
    <div className="min-h-screen bg-[#F8F8F4] dark:bg-[#081009] text-[#1C2B1F] dark:text-[#e2ede4] transition-colors duration-300">
      <div className="mx-auto flex min-h-screen max-w-4xl flex-col justify-center px-6 py-16">
        <div className="rounded-[32px] border border-[#D9DFC8] dark:border-emerald-900/40 bg-white dark:bg-[#121c15] p-10 shadow-lg transition-colors duration-300">
          <div className="mb-8 text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-[#00963F] dark:text-emerald-400 font-bold">
              কৃষকOS
            </p>
            <h1 className="mt-4 text-4xl font-black sm:text-5xl text-gray-900 dark:text-white">
              Account access for farmers and agribusiness.
            </h1>
            <p className="mt-4 text-base leading-7 text-[#4B5A44] dark:text-gray-400">
              Sign in, create an account, verify your email, and open your
              dashboard.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Link
              href="/auth/signin"
              className="rounded-[24px] border border-[#DCE8D8] dark:border-emerald-900/40 bg-[#F4F5ED] dark:bg-[#081009] px-6 py-6 text-center font-semibold text-[#1C2B1F] dark:text-[#e2ede4] transition hover:border-[#00963F] dark:hover:border-emerald-400 hover:text-[#00963F] dark:hover:text-emerald-450 cursor-pointer"
            >
              Sign In
            </Link>
            <Link
              href="/auth/signup"
              className="rounded-[24px] bg-[#00963E] dark:bg-[#00963E] hover:bg-[#007d2d] dark:hover:bg-emerald-700 px-6 py-6 text-center font-semibold text-white transition cursor-pointer"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
