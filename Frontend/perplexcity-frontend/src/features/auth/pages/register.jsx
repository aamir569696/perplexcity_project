import { useState } from 'react';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
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
    console.log('Register form submitted:', formData);
  };

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-6 text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-6xl overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/80 shadow-2xl shadow-slate-950/60 backdrop-blur-md lg:grid-cols-2">
        <div className="flex items-center justify-center bg-linear-to-br from-slate-900 via-slate-900 to-violet-900 p-8 sm:p-10 lg:p-12">
          <div className="max-w-md">
            <div className="mb-6 inline-flex rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-violet-200">
             Meet Your AI Assistant
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Create your account and start exploring.
            </h1>
            <p className="mt-4 text-sm text-slate-300 sm:text-base">
            Ask questions, generate content, summarize documents, and boost your productivity with the power of AI.
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-3 rounded-2xl border border-slate-700 bg-slate-800/80 px-4 py-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-500/15 text-violet-300">✓</span>
                <span className="text-sm text-slate-200">Organize your AI conversations</span>
              </div>
              <div className="flex items-center gap-3 rounded-2xl border border-slate-700 bg-slate-800/80 px-4 py-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-500/15 text-violet-300">✓</span>
                <span className="text-sm text-slate-200">Save conversation history</span>
              </div>
              <div className="flex items-center gap-3 rounded-2xl border border-slate-700 bg-slate-800/80 px-4 py-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-500/15 text-violet-300">✓</span>
                <span className="text-sm text-slate-200">Fast and intelligent responses</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center p-6 sm:p-8 lg:p-12">
          <div className="w-full max-w-md">
            <div className="mb-8">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-violet-400">Register</p>
              <h2 className="mt-2 text-3xl font-semibold text-white">Create account</h2>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label htmlFor="username" className="block text-sm font-medium text-slate-200">
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Choose a username"
                  autoComplete="username"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-base text-white placeholder:text-slate-500 transition duration-200 focus:border-violet-400 focus:outline-none focus:ring-4 focus:ring-violet-500/20"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="register-email" className="block text-sm font-medium text-slate-200">
                  Email
                </label>
                <input
                  id="register-email"
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
                <label htmlFor="register-password" className="block text-sm font-medium text-slate-200">
                  Password
                </label>
                <input
                  id="register-password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a strong password"
                  autoComplete="new-password"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-base text-white placeholder:text-slate-500 transition duration-200 focus:border-violet-400 focus:outline-none focus:ring-4 focus:ring-violet-500/20"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-linear-to-r from-violet-500 to-cyan-500 px-4 py-3 text-base font-semibold text-white shadow-lg shadow-violet-500/20 transition duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-violet-500/30 focus:outline-none focus:ring-4 focus:ring-violet-500/20"
              >
                Create account
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-400">
              Already have an account?{' '}
              <a href="/login" className="font-medium text-violet-400 transition hover:text-violet-300">
                Sign in
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;