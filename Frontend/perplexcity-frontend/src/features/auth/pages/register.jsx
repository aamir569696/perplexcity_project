import { useState } from "react";
import { useAuth } from "../hook/useauth";
import { useNavigate } from "react-router";

const IconSparkle = ({ className = "" }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
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

const IconUser = ({ className = "" }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.7" />
    <path
      d="M5.5 20c.65-3.2 2.8-5 6.5-5s5.85 1.8 6.5 5"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
    />
  </svg>
);

const IconMail = ({ className = "" }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
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
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
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

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const { handleRegister } = useAuth();

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Register form submitted:", formData);

    const payload = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
    };

    const success = await handleRegister(payload);
    if (success) {
      navigate("/dashboard");
    } else {
      prompt("Register Faild : check Your credentioal");
    }
    console.log(success);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#08080A] text-[#EEECE5]">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-[#CFA458]/10 blur-[120px]" />
        <div className="absolute -bottom-40 -right-20 h-[420px] w-[420px] rounded-full bg-[#5967FF]/8 blur-[130px]" />
        <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#CFA458]/[0.025] blur-[100px]" />
      </div>

      {/* Main */}
      <main className="relative z-10 flex min-h-screen items-center justify-center px-4 py-8 sm:px-6">
        <div className="w-full max-w-[460px]">
          {/* Logo */}
          <div className="mb-8 flex justify-center">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#EFD69C] to-[#96742E] text-sm font-bold text-[#0B0B0D] shadow-[0_8px_30px_-8px_rgba(207,164,88,0.55)]">
                P
              </div>

              <span className="font-serif text-[19px] tracking-tight text-[#F4F0E6]">
                PerplexCity
              </span>
            </div>
          </div>

          {/* Card */}
          <div className="rounded-[28px] border border-white/[0.08] bg-[#101012]/90 p-6 shadow-[0_30px_100px_-30px_rgba(0,0,0,0.8)] backdrop-blur-2xl sm:p-8">
            {/* Heading */}
            <div className="mb-8 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-[#CFA458]/20 bg-[#CFA458]/10 text-[#EFD69C]">
                <IconSparkle className="h-5 w-5" />
              </div>

              <h1 className="text-2xl font-semibold tracking-tight text-[#F4F0E6] sm:text-[27px]">
                Create your account
              </h1>

              <p className="mt-2 text-sm leading-6 text-[#85858B]">
                Join PerplexCity and start exploring AI.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Username */}
              <div>
                <label
                  htmlFor="username"
                  className="mb-2 block text-[13px] font-medium text-[#C9C7C0]"
                >
                  Username
                </label>

                <div className="group relative">
                  <IconUser className="pointer-events-none absolute left-4 top-1/2 h-[17px] w-[17px] -translate-y-1/2 text-[#66666D] transition-colors group-focus-within:text-[#CFA458]" />

                  <input
                    id="username"
                    name="username"
                    type="text"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Choose a username"
                    autoComplete="username"
                    required
                    className="h-[50px] w-full rounded-xl border border-white/[0.08] bg-[#0A0A0C] pl-11 pr-4 text-sm text-[#F4F0E6] outline-none transition-all duration-200 placeholder:text-[#4F4F55] hover:border-white/[0.13] focus:border-[#CFA458]/55 focus:bg-[#0D0D0F] focus:ring-4 focus:ring-[#CFA458]/10"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="register-email"
                  className="mb-2 block text-[13px] font-medium text-[#C9C7C0]"
                >
                  Email address
                </label>

                <div className="group relative">
                  <IconMail className="pointer-events-none absolute left-4 top-1/2 h-[17px] w-[17px] -translate-y-1/2 text-[#66666D] transition-colors group-focus-within:text-[#CFA458]" />

                  <input
                    id="register-email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    autoComplete="email"
                    required
                    className="h-[50px] w-full rounded-xl border border-white/[0.08] bg-[#0A0A0C] pl-11 pr-4 text-sm text-[#F4F0E6] outline-none transition-all duration-200 placeholder:text-[#4F4F55] hover:border-white/[0.13] focus:border-[#CFA458]/55 focus:bg-[#0D0D0F] focus:ring-4 focus:ring-[#CFA458]/10"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label
                    htmlFor="register-password"
                    className="text-[13px] font-medium text-[#C9C7C0]"
                  >
                    Password
                  </label>

                  <span className="text-[11px] text-[#55555B]">
                    8+ characters recommended
                  </span>
                </div>

                <div className="group relative">
                  <IconLock className="pointer-events-none absolute left-4 top-1/2 h-[17px] w-[17px] -translate-y-1/2 text-[#66666D] transition-colors group-focus-within:text-[#CFA458]" />

                  <input
                    id="register-password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a strong password"
                    autoComplete="new-password"
                    required
                    className="h-[50px] w-full rounded-xl border border-white/[0.08] bg-[#0A0A0C] pl-11 pr-4 text-sm text-[#F4F0E6] outline-none transition-all duration-200 placeholder:text-[#4F4F55] hover:border-white/[0.13] focus:border-[#CFA458]/55 focus:bg-[#0D0D0F] focus:ring-4 focus:ring-[#CFA458]/10"
                  />
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="group relative mt-2 flex h-[50px] w-full items-center justify-center overflow-hidden rounded-xl bg-gradient-to-r from-[#EFD69C] via-[#CFA458] to-[#96742E] text-sm font-semibold text-[#0B0B0D] shadow-[0_12px_30px_-12px_rgba(207,164,88,0.55)] transition-all duration-300 hover:-translate-y-[1px] hover:shadow-[0_16px_35px_-12px_rgba(207,164,88,0.7)] active:translate-y-0 focus:outline-none focus:ring-4 focus:ring-[#CFA458]/20"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Create account
                  <span className="transition-transform duration-200 group-hover:translate-x-1">
                    →
                  </span>
                </span>

                <span className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-500 group-hover:translate-x-full" />
              </button>
            </form>

            {/* Login */}
            <div className="my-7 flex items-center gap-3">
              <div className="h-px flex-1 bg-white/[0.07]" />
              <span className="text-[11px] uppercase tracking-[0.15em] text-[#55555B]">
                or
              </span>
              <div className="h-px flex-1 bg-white/[0.07]" />
            </div>

            <p className="text-center text-sm text-[#77777D]">
              Already have an account?{" "}
              <a
                href="/login"
                className="font-medium text-[#D7B66F] transition-colors hover:text-[#F0D69B]"
              >
                Sign in
              </a>
            </p>
          </div>

          {/* Footer */}
          <p className="mt-6 text-center text-[11px] text-[#4F4F55]">
            By creating an account, you agree to our terms and privacy policy.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Register;
