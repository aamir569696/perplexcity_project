import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../hook/useauth";
import { useSelector } from "react-redux";

const IconSparkle = ({ className = "" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    aria-hidden="true"
  >
    <path
      d="M12 2.5C12.45 6.9 15.1 9.55 19.5 10C15.1 10.45 12.45 13.1 12 17.5C11.55 13.1 8.9 10.45 4.5 10C8.9 9.55 11.55 6.9 12 2.5Z"
      fill="currentColor"
    />
    <path
      d="M19 16.5C19.18 18.05 20.05 18.82 21.5 19C20.05 19.18 19.18 19.95 19 21.5C18.82 19.95 17.95 19.18 16.5 19C17.95 18.82 18.82 18.05 19 16.5Z"
      fill="currentColor"
      opacity="0.65"
    />
  </svg>
);

const IconMail = ({ className = "" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    aria-hidden="true"
  >
    <rect
      x="3.5"
      y="5.5"
      width="17"
      height="13"
      rx="2.5"
      stroke="currentColor"
      strokeWidth="1.7"
    />
    <path
      d="m5.5 8 5.15 4.05a2.2 2.2 0 0 0 2.7 0L18.5 8"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
    />
  </svg>
);

const IconLock = ({ className = "" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    aria-hidden="true"
  >
    <rect
      x="5"
      y="10"
      width="14"
      height="10"
      rx="2.5"
      stroke="currentColor"
      strokeWidth="1.7"
    />
    <path
      d="M8 10V7.5a4 4 0 0 1 8 0V10"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
    />
  </svg>
);

const IconArrowRight = ({ className = "" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    aria-hidden="true"
  >
    <path
      d="M5 12h13"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
    />
    <path
      d="m13 6 6 6-6 6"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const user = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.auth.loading);

  const navigate = useNavigate();

  const { handleLogin } = useAuth();

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

const handleSubmit = async (event) => {
  event.preventDefault();

  const success = await handleLogin(
    formData.email,
    formData.password
  );

  if (success) {
    navigate("/dashboard");
  }
};

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#08080A] text-[#EEECE5]">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-[#CFA458]/10 blur-[120px]" />

        <div className="absolute -bottom-40 -right-20 h-105420px] rounded-full bg-[#5967FF]/8 blur-[130px]" />

        <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#CFA458]/2.5 blur-[100px]" />
      </div>

      {/* Main */}
      <main className="relative z-10 flex min-h-screen items-center justify-center px-4 py-8 sm:px-6">
        <div className="w-full max-w-115">

          {/* Logo */}
          <div className="mb-8 flex justify-center">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-br from-[#EFD69C] to-[#96742E] text-sm font-bold text-[#0B0B0D] shadow-[0_8px_30px_-8px_rgba(207,164,88,0.55)]">
                P
              </div>

              <span className="font-serif text-[19px] tracking-tight text-[#F4F0E6]">
                PerplexCity
              </span>
            </div>
          </div>

          {/* Login Card */}
          <div className="rounded-[28px] border border-white/8 bg-[#101012]/90 p-6 shadow-[0_30px_100px_-30px_rgba(0,0,0,0.8)] backdrop-blur-2xl sm:p-8">

            {/* Header */}
            <div className="mb-8 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-[#CFA458]/20 bg-[#CFA458]/10 text-[#EFD69C]">
                <IconSparkle className="h-5 w-5" />
              </div>

              <h1 className="text-2xl font-semibold tracking-tight text-[#F4F0E6] sm:text-[27px]">
                Welcome back
              </h1>

              <p className="mt-2 text-sm leading-6 text-[#85858B]">
                Sign in to continue your PerplexCity experience.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-[13px] font-medium text-[#C9C7C0]"
                >
                  Email address
                </label>

                <div className="group relative">
                  <IconMail className="pointer-events-none absolute left-4 top-1/2 h-4.25 w-4.25 -translate-y-1/2 text-[#66666D] transition-colors group-focus-within:text-[#CFA458]" />

                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    autoComplete="email"
                    required
                    className="h-12.5 w-full rounded-xl border border-white/8 bg-[#0A0A0C] pl-11 pr-4 text-sm text-[#F4F0E6] outline-none transition-all duration-200 placeholder:text-[#4F4F55] hover:border-white/13 focus:border-[#CFA458]/55 focus:bg-[#0D0D0F] focus:ring-4 focus:ring-[#CFA458]/10"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="text-[13px] font-medium text-[#C9C7C0]"
                  >
                    Password
                  </label>

                  <a
                    href="/forget"
                    className="text-[12px] font-medium text-[#A98A4E] transition-colors hover:text-[#E0C783]"
                  >
                    Forgot password?
                  </a>
                </div>

                <div className="group relative">
                  <IconLock className="pointer-events-none absolute left-4 top-1/2 h-4.25 w-4.25 -translate-y-1/2 text-[#66666D] transition-colors group-focus-within:text-[#CFA458]" />

                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    required
                    className="h-12.5 w-full rounded-xl border border-white/8 bg-[#0A0A0C] pl-11 pr-4 text-sm text-[#F4F0E6] outline-none transition-all duration-200 placeholder:text-[#4F4F55] hover:border-white/13 focus:border-[#CFA458]/55 focus:bg-[#0D0D0F] focus:ring-4 focus:ring-[#CFA458]/10"
                  />
                </div>
              </div>

              {/* Remember me */}
              <label className="flex cursor-pointer items-center gap-2.5 text-[12px] text-[#77777D]">
                <input
                  type="checkbox"
                  className="h-4 w-4 cursor-pointer rounded border-white/10 bg-[#0A0A0C] accent-[#CFA458] focus:ring-2 focus:ring-[#CFA458]/20"
                />

                <span>Remember me</span>
              </label>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="group relative mt-2 flex h-12.5 w-full items-center justify-center overflow-hidden rounded-xl bg-linear-to-r from-[#EFD69C] via-[#CFA458] to-[#96742E] text-sm font-semibold text-[#0B0B0D] shadow-[0_12px_30px_-12px_rgba(207,164,88,0.55)] transition-all duration-300 hover:-translate-y-px hover:shadow-[0_16px_35px_-12px_rgba(207,164,88,0.7)] active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 focus:outline-none focus:ring-4 focus:ring-[#CFA458]/20"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {loading ? "Signing in..." : "Sign in"}

                  {!loading && (
                    <IconArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                  )}
                </span>

                <span className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-500 group-hover:translate-x-full" />
              </button>
            </form>

            {/* Divider */}
            <div className="my-7 flex items-center gap-3">
              <div className="h-px flex-1 bg-white/[0.07]" />

              <span className="text-[11px] uppercase tracking-[0.15em] text-[#55555B]">
                or
              </span>

              <div className="h-px flex-1 bg-white/[0.07]" />
            </div>

            {/* Register */}
            <p className="text-center text-sm text-[#77777D]">
              Don't have an account?{" "}
              <a
                href="/register"
                className="font-medium text-[#D7B66F] transition-colors hover:text-[#F0D69B]"
              >
                Create one
              </a>
            </p>
          </div>

          {/* Footer */}
          <p className="mt-6 text-center text-[11px] text-[#4F4F55]">
            Secure access to your AI workspace.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Login;