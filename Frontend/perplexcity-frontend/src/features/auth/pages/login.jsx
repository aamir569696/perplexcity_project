import { useState } from 'react';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Login form submitted:', formData);
  };

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-12 text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-6xl overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/80 shadow-2xl shadow-slate-950/60 backdrop-blur-md lg:grid-cols-2">
        <div className="flex flex-col justify-between bg-linear-to-br from-violet-600 via-indigo-600 to-cyan-500 p-8 sm:p-10 lg:p-12">
          <div>
            <div className="mb-6 inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-violet-100">
Welcome back to PerplexCity     
       </div>
            <h1 className="max-w-md text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Welcome back to your next adventure.
            </h1>
            <p className="mt-4 max-w-md text-sm text-violet-50/80 sm:text-base">
              Sign in to continue your AI conversations, access saved chats, and discover answers powered by Gemini AI.
            </p>
          </div>

          <div className="mt-10 space-y-4 text-sm text-violet-50/90">
            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-base font-semibold">01</span>
              <span>Continue your previous AI conversations</span>
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-base font-semibold">02</span>
              <span>Get fast, intelligent answers instantly</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center p-6 sm:p-8 lg:p-12">
          <div className="w-full max-w-md">
            <div className="mb-8">
              <p className=" text-3xl font-medium uppercase tracking-[0.2em] text-violet-400">Login</p>
              {/* <h2 className="mt-2 text-3xl font-semibold text-white">Sign in</h2> */}
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-slate-200">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  autoComplete="email"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-base text-white placeholder:text-slate-500 transition duration-200 focus:border-violet-400 focus:outline-none focus:ring-4 focus:ring-violet-500/20"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-slate-200">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-base text-white placeholder:text-slate-500 transition duration-200 focus:border-violet-400 focus:outline-none focus:ring-4 focus:ring-violet-500/20"
                  required
                />
              </div>

              <div className="flex items-center justify-between gap-3 text-sm text-slate-300">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="h-4 w-4 rounded border-slate-600 bg-slate-900 text-violet-500 focus:ring-violet-500" />
                  Remember me
                </label>
                <a href="/forget" className="font-medium text-violet-400 transition hover:text-violet-300">
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-linear-to-r from-violet-500 to-indigo-500 px-4 py-3 text-base font-semibold text-white shadow-lg shadow-violet-500/20 transition duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-violet-500/30 focus:outline-none focus:ring-4 focus:ring-violet-500/20"
              >
                Sign in
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-400">
              Don&apos;t have an account?{' '}
              <a href="/register" className="font-medium text-violet-400 transition hover:text-violet-300">
                Create one
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;