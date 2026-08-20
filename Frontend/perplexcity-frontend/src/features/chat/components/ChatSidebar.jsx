import { useState } from "react";
import {
  IconSearch,
  IconClock,
  IconPlus,
  IconSun,
  IconMoon,
  // IconLogout,
  IconX,
  IconMessage,
} from "./Icons";

const ChatSidebar = ({
  theme,
  darkMode,
  setDarkMode,
  sidebarOpen,
  setSidebarOpen,
  chatEntries,
  currentChatId,
  openChat,
  startNewChat,
  handleDeleteChat,
  // handleLogout,
  user,
  setProfileOpen,
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredChats = chatEntries.filter((chat) =>
    chat.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <aside
      className={`
        fixed inset-y-0 left-0 z-50
        flex w-71.5 max-w-[86vw] flex-col
        border-r
        shadow-[20px_0_70px_-35px_rgba(0,0,0,0.7)]
        backdrop-blur-xl
        transition-transform duration-300 ease-out

        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}

        md:static
        md:z-20
        md:w-62.5
        md:max-w-none
        md:translate-x-0
        md:shadow-none

        ${theme.sidebar}
      `}
    >
      {/* Sidebar Header */}

      <div
        className="
          flex shrink-0 items-center justify-between
          px-5 pb-5 pt-5
          sm:px-6 sm:pt-6
        "
      >
        <div className="flex min-w-0 items-center gap-3">
          <div
            className="
              relative flex h-8 w-8 shrink-0
              items-center justify-center
              rounded-[10px]
              bg-linear-to-br
              from-[#F1D99B]
              via-[#CFA458]
              to-[#856323]
              text-[13px]
              font-bold
              text-[#0B0B0C]
              shadow-[0_8px_25px_-10px_rgba(207,164,88,.8)]
            "
          >
            P
          </div>

          <div className="min-w-0">
            <div className="font-display truncate text-[16px] tracking-tight">
              PerplexCity
            </div>

            <div
              className={`
                mt-0.5 text-[9px]
                font-semibold uppercase
                tracking-[0.18em]
                ${theme.muted}
              `}
            >
              AI Workspace
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setSidebarOpen(false)}
          className={`
            flex h-8 w-8 shrink-0
            items-center justify-center
            rounded-lg
            transition
            md:hidden
            ${theme.muted}
            ${theme.hover}
          `}
          aria-label="Close sidebar"
        >
          <IconX className="h-4 w-4" />
        </button>
      </div>

      {/* Navigation */}

      <div className="px-3 sm:px-4">
        <div
          className={`
    flex w-full items-center gap-3
    rounded-xl
    px-3.5 py-2.5
    border
    ${theme.border}
  `}
        >
          <IconSearch className="h-4 w-4 shrink-0 text-[#CFA458]" />

          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search chats..."
            className={`
      min-w-0 flex-1
      bg-transparent
      outline-none
      text-[13px]
      ${theme.text || ""}
    `}
          />
        </div>

        <button
          type="button"
          onClick={startNewChat}
          className={`
            cursor-pointer
            group mt-4 flex w-full items-center gap-3
            rounded-xl border
            px-3.5 py-2.5
            text-[13px]
            font-medium
            transition-all duration-200
            hover:border-[#CFA458]/45
            ${theme.border}
            ${theme.muted}
            ${theme.hover}
          `}
        >
          <span
            className="
              flex h-7 w-7 items-center justify-center
              rounded-lg
              border border-current/10
            "
          >
            <IconPlus
              className="
                h-4 w-4
                transition-transform duration-200
                group-hover:rotate-90
              "
            />
          </span>
          New Chat
        </button>
      </div>

      {/* Recent Chats */}

      <div
        className="
          mt-7 min-h-0 flex-1
          overflow-y-auto
          px-3 pb-3
          hide-scrollbar
          sm:px-4
        "
      >
        <div className="mb-3 flex items-center justify-between px-2">
          <p
            className={`
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.18em]
              ${theme.muted}
            `}
          >
            Recent
          </p>

          {chatEntries.length > 0 && (
            <span
              className={`
                rounded-full px-2 py-0.5
                text-[9px]
                ${theme.muted}
                ${darkMode ? "bg-white/4" : "bg-black/[0.035]"}
              `}
            >
              {chatEntries.length}
            </span>
          )}
        </div>

        {chatEntries.length === 0 ? (
          <div
            className={`
              mx-1 rounded-xl border border-dashed
              px-4 py-5 text-center
              ${theme.border}
            `}
          >
            <IconMessage
              className={`
                mx-auto mb-2 h-5 w-5
                ${theme.muted}
              `}
            />

            <p
              className={`
                text-[11px]
                leading-5
                ${theme.muted}
              `}
            >
              Your recent conversations will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-1">
            {filteredChats.map((chat) => {
              const isActive = currentChatId === chat.id;

              return (
                <div
                  key={chat.id}
                  className={`
                    group relative flex w-full
                    min-w-0 items-center
                    rounded-xl
                    text-[12.5px]
                    transition-all duration-200
                    ${isActive ? theme.active : `${theme.muted} ${theme.hover}`}
                  `}
                >
                  {isActive && (
                    <span
                      className="
                        absolute left-0 top-1/2
                        h-5 w-0.75
                        -translate-y-1/2
                        rounded-full
                        bg-linear-to-b
                        from-[#EFD69C]
                        to-[#96742E]
                        shadow-[0_0_10px_rgba(207,164,88,.4)]
                      "
                    />
                  )}

                  <button
                    type="button"
                    onClick={() => openChat(chat.id)}
                    className="
                      min-w-0 flex-1
                      cursor-pointer
                      truncate
                      px-3 py-2.5
                      text-left
                    "
                  >
                    {chat.title}
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();

                      const confirmDelete = window.confirm(
                        "Are you sure you want to delete this chat?",
                      );

                      if (confirmDelete) {
                        handleDeleteChat(chat.id);
                      }
                    }}
                    className="
                      mr-2
                      shrink-0
                      cursor-pointer
                      rounded-md
                      px-1.5
                      text-lg
                      opacity-60
                      transition
                      hover:bg-white/10
                      hover:opacity-100
                    "
                    aria-label="Delete chat"
                  >
                    ...
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Sidebar Footer */}

      <div
        className={`
          shrink-0 border-t p-3
          sm:p-4
          ${theme.border}
        `}
      >
        {/* Appearance */}

        <button
          type="button"
          onClick={() => setDarkMode((prev) => !prev)}
          className={`
            flex w-full items-center
            justify-between
            rounded-xl
            px-3 py-2.5
            transition-colors
            ${theme.hover}
          `}
        >
          <span
            className={`
              flex items-center gap-2.5
              text-[12.5px]
              ${theme.muted}
            `}
          >
            {darkMode ? (
              <IconMoon className="h-4 w-4" />
            ) : (
              <IconSun className="h-4 w-4" />
            )}
            Appearance
          </span>

          <span
            className={`
              relative flex h-6 w-11
              items-center rounded-full
              transition-colors duration-300
              ${darkMode ? "bg-white/9" : "bg-[#E9DEBC]"}
            `}
          >
            <span
              className={`
                absolute flex h-4.5 w-4.5
                items-center justify-center
                rounded-full
                bg-linear-to-br
                from-[#EAD095]
                to-[#96742E]
                shadow-md
                transition-transform duration-300
                ${darkMode ? "translate-x-5.5" : "translate-x-0.75"}
              `}
            >
              {darkMode ? (
                <IconMoon className="h-2.5 w-2.5 text-[#0c0c0e]" />
              ) : (
                <IconSun className="h-2.5 w-2.5 text-[#0c0c0e]" />
              )}
            </span>
          </span>
        </button>

        {/* Account */}

        <div className="mt-2 flex items-center gap-2.5 px-3 py-2">
          <div
            className="
              flex h-8 w-8 shrink-0
              items-center justify-center
              rounded-full
              bg-linear-to-br
              from-[#EAD095]
              to-[#83642A]
              text-[11px]
              font-bold
              text-[#0c0c0e]
            "
          >
            YA
          </div>

          <div className="min-w-0">
            <p className="truncate text-[12px] font-medium">
              {user?.username || "Your Account"}
            </p>

            <p
              className={`
                mt-0.5 truncate text-[9px]
                ${theme.muted}
              `}
            >
              Personal workspace
            </p>
          </div>
        </div>

        {/* Profile Settings */}

        <button
          type="button"
          onClick={() => setProfileOpen(true)}
          className={`
    cursor-pointer
    mt-1 flex w-full items-center gap-3
    rounded-xl
    px-3.5 py-2.5
    text-[12.5px]
    font-medium
    transition-all
    ${theme.muted}
    ${theme.hover}
  `}
        >
          <span
            className="
      flex h-7 w-7
      items-center justify-center
      rounded-lg
      bg-white/5
      text-sm
    "
          >
            ⚙
          </span>
          Profile Settings
        </button>

        {/* // Logout */}

        {/* <button
          type="button"
          onClick={handleLogout}
          className="
            cursor-pointer
            mt-1 flex w-full items-center gap-3
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
        </button> */}
      </div>
    </aside>
  );
};

export default ChatSidebar;
