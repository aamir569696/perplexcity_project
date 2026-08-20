import { useState } from "react";
import { IconLogout } from "./Icons";
const ProfileSettings = ({ user, onClose, theme, handleLogout }) => {
  const [username, setUsername] = useState(user?.username || "");
  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Profile data:", {
      username,
      email,
      password,
    });

    // Backend API baad mein yahan connect hogi
  };

  return (
    <div
      className="
        fixed inset-0 z-100
        flex items-center justify-center
        bg-black/60
        backdrop-blur-sm
        px-4
      "
    >
      <div
        className={`
          w-full max-w-md
          rounded-2xl
          border
          p-5 sm:p-6
          shadow-2xl
          ${theme.sidebar}
        `}
      >
        {/* Header */}

        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">Profile Settings</h2>

            <p className={`mt-1 text-xs ${theme.muted}`}>
              Manage your account information
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className={`
              flex h-8 w-8
              items-center justify-center
              rounded-lg
              text-lg
              ${theme.muted}
              ${theme.hover}
            `}
          >
            ×
          </button>
        </div>

        {/* Form */}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username */}

          <div>
            <label className="mb-1.5 block text-xs font-medium">Username</label>

            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={`
                w-full
                rounded-xl
                border
                px-3.5 py-3
                text-sm
                outline-none
                ${theme.input}
                ${theme.border}
              `}
              placeholder="Enter username"
            />
          </div>

          {/* Email */}

          <div>
            <label className="mb-1.5 block text-xs font-medium">Email</label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`
                w-full
                rounded-xl
                border
                px-3.5 py-3
                text-sm
                outline-none
                ${theme.input}
                ${theme.border}
              `}
              placeholder="Enter email"
            />
          </div>

          {/* Password */}

          <div>
            <label className="mb-1.5 block text-xs font-medium">
              New Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`
                w-full
                rounded-xl
                border
                px-3.5 py-3
                text-sm
                outline-none
                ${theme.input}
                ${theme.border}
              `}
              placeholder="Leave empty to keep current password"
            />
          </div>

          {/* Buttons */}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className={`
                flex-1
                rounded-xl
                border
                px-4 py-2.5
                text-sm
                font-medium
                ${theme.border}
                ${theme.hover}
              `}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="
                flex-1
                rounded-xl
                bg-linear-to-r
                from-[#EAD095]
                to-[#96742E]
                px-4 py-2.5
                text-sm
                font-semibold
                text-[#0B0B0C]
                transition
                hover:opacity-90
              "
            >
              Save Changes
            </button>
          </div>

{/* //logout */}

          <button
            type="button"
            onClick={handleLogout}
            className="
    mt-3
    flex w-1/2 items-center gap-3
    rounded-xl
    px-3.5 py-2.5
    text-[12.5px]
    font-medium
    text-red-400
    transition-all
    hover:bg-red-500/10
  "
          >
            <span
              className="
      flex h-7 w-7 items-center justify-center
      rounded-lg
      bg-red-500/10
    "
            >
              <IconLogout className="h-4 w-4" />
            </span>
            Logout
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileSettings;
