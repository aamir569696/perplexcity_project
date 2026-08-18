import {
  IconMenu,
  IconPlus,
} from "./Icons";

const MobileHeader = ({
  setSidebarOpen,
  startNewChat,
  theme,
}) => {
  return (
    <header
      className={`
        sticky top-0 z-30
        flex h-14 shrink-0
        items-center justify-between
        border-b
        px-3
        backdrop-blur-xl
        md:hidden
        ${theme.header}
      `}
    >
      {/* MENU BUTTON */}
      <button
        type="button"
        onClick={() => setSidebarOpen(true)}
        className={`
          flex h-9 w-9
          items-center justify-center
          rounded-xl
          transition
          ${theme.muted}
          ${theme.hover}
        `}
        aria-label="Open sidebar"
      >
        <IconMenu className="h-5 w-5" />
      </button>

      {/* LOGO */}
      <div className="flex min-w-0 items-center gap-2">
        <span
          className="
            flex h-7 w-7 shrink-0
            items-center justify-center
            rounded-lg
            bg-gradient-to-br
            from-[#EAD095]
            to-[#96742E]
            text-[11px]
            font-bold
            text-[#0c0c0e]
          "
        >
          P
        </span>

        <span className="font-display truncate text-[14px]">
          PerplexCity
        </span>
      </div>

      {/* NEW CHAT BUTTON */}
      <button
        type="button"
        onClick={startNewChat}
        className={`
          flex h-9 w-9
          items-center justify-center
          rounded-xl
          transition
          ${theme.muted}
          ${theme.hover}
        `}
        aria-label="New chat"
      >
        <IconPlus className="h-[18px] w-[18px]" />
      </button>
    </header>
  );
};

export default MobileHeader;