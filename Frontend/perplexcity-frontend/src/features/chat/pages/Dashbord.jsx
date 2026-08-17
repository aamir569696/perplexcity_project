import { useState, useEffect, useRef, useLayoutEffect } from "react";
import { useChat } from "../hooks/useChat";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentChatId } from "../chat.slice";


//localStorage.removeItem("token")
/* =========================================================
   ICONS
========================================================= */

const IconSearch = (props) => (
  <svg viewBox="0 0 20 20" fill="none" {...props}>
    <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.6" />
    <path
      d="M17 17l-3.6-3.6"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
  </svg>
);

const IconClock = (props) => (
  <svg viewBox="0 0 20 20" fill="none" {...props}>
    <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.6" />
    <path
      d="M10 6.2V10l2.6 1.5"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const IconPlus = (props) => (
  <svg viewBox="0 0 20 20" fill="none" {...props}>
    <path
      d="M10 4v12M4 10h12"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
  </svg>
);

const IconSun = (props) => (
  <svg viewBox="0 0 20 20" fill="none" {...props}>
    <circle cx="10" cy="10" r="3.2" stroke="currentColor" strokeWidth="1.4" />
    <path
      d="M10 2.6v1.8M10 15.6v1.8M17.4 10h-1.8M4.4 10H2.6M15.2 4.8l-1.3 1.3M6.1 13.9l-1.3 1.3M15.2 15.2l-1.3-1.3M6.1 6.1 4.8 4.8"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
    />
  </svg>
);

const IconMoon = (props) => (
  <svg viewBox="0 0 20 20" fill="none" {...props}>
    <path
      d="M16.2 12.1A6.7 6.7 0 0 1 7.9 3.8a7.2 7.2 0 1 0 8.3 8.3Z"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinejoin="round"
    />
  </svg>
);

const IconArrowUp = (props) => (
  <svg viewBox="0 0 20 20" fill="none" {...props}>
    <path
      d="M10 15.5V5M5 9.5 10 5l5 4.5"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const IconArrowRight = (props) => (
  <svg viewBox="0 0 20 20" fill="none" {...props}>
    <path
      d="M4.5 10h11M10 5l5 5-5 5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const IconSparkle = (props) => (
  <svg viewBox="0 0 20 20" fill="currentColor" {...props}>
    <path d="M10 2c.4 3 2.6 5.2 5.6 5.6-3 .4-5.2 2.6-5.6 5.6-.4-3-2.6-5.2-5.6-5.6C7.4 7.2 9.6 5 10 2Z" />
  </svg>
);

const IconMenu = (props) => (
  <svg viewBox="0 0 20 20" fill="none" {...props}>
    <path
      d="M3 6h14M3 10h14M3 14h14"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
  </svg>
);

const IconX = (props) => (
  <svg viewBox="0 0 20 20" fill="none" {...props}>
    <path
      d="M5 5l10 10M15 5 5 15"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
  </svg>
);

const IconMessage = (props) => (
  <svg viewBox="0 0 20 20" fill="none" {...props}>
    <path
      d="M4 5.5A2.5 2.5 0 0 1 6.5 3h7A2.5 2.5 0 0 1 16 5.5v5A2.5 2.5 0 0 1 13.5 13H9l-3.5 3v-3.1A2.5 2.5 0 0 1 4 10.5v-5Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  </svg>
);

/* =========================================================
   DASHBOARD
========================================================= */

const Dashboard = () => {
  const dispatch = useDispatch();

  const { handlesendMessage, hanglegetChats, handleOpenChats } = useChat();

  const { chats, currentChatId } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.auth);
  const messagesEndRef = useRef(null);
  //console.log(user);
 
   //  DATA
 
  const [darkMode, setDarkMode] = useState(true);
  const [message, setMessage] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const activeChat = currentChatId ? chats[currentChatId] : null;

  const messages = activeChat?.messages || [];

  const textareaRef = useRef(null);

  const MAX_INPUT_HEIGHT = 200;


 useEffect(() => {
  hanglegetChats();

   const savedChatId = localStorage.getItem("currentChatId");

  if (savedChatId) {
    handleOpenChats(savedChatId);
  }
}, []);


//controle scroll behavior

useEffect(() => {
  const lastUserMessage = [...messages]
    .reverse()
    .find((msg) => msg.role === "user");

  if (lastUserMessage) {
    document
      .getElementById(`message-${messages.lastIndexOf(lastUserMessage)}`)
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
  }
}, [messages]);

 
    // AUTO RESIZE TEXTAREA


  useLayoutEffect(() => {
    const textarea = textareaRef.current;

    if (!textarea) return;

    textarea.style.height = "auto";

    const nextHeight = Math.min(textarea.scrollHeight, MAX_INPUT_HEIGHT);

    textarea.style.height = `${nextHeight}px`;

    textarea.style.overflowY =
      textarea.scrollHeight > MAX_INPUT_HEIGHT ? "auto" : "hidden";
  }, [message, activeChat]);

  
     //NEW CHAT


  const startNewChat = () => {
    dispatch(setCurrentChatId(null));
    setMessage("");
    setSidebarOpen(false);
  };

  
   //  SEND MESSAGE
 
  const handleSubmit = async (e) => {
    e.preventDefault();

    const content = message.trim();

    if (!content) return;

    try {
      await handlesendMessage({
        message: content,
        chatId: currentChatId,
      });

      setMessage("");
    } catch (error) {
      console.error("Message send failed:", error);
    }
  };

  /* =======================================================
    // OPEN OLD CHAT
  ======================================================= */

  const openChat = async (chatId) => {
    try {
      await handleOpenChats(chatId);
      setSidebarOpen(false);
    } catch (error) {
      console.error("Chat open failed:", error);
    }
  };

  /* =======================================================
     SUGGESTIONS
  ======================================================= */

  const suggestions = [
    "Explain JavaScript closures simply",
    "Help me build a React project",
    "Give me a full stack roadmap",
  ];

  /* =======================================================
     THEME
  ======================================================= */

  const theme = darkMode
    ? {
        app: "bg-[#070709] text-[#F2F0E9]",

        sidebar: "bg-[#0A0A0C]/95 border-white/[0.07]",

        header: "bg-[#08080A]/80 border-white/[0.07]",

        active: "bg-white/[0.075] text-[#F5F1E7] ring-1 ring-white/[0.06]",

        hover: "hover:bg-white/[0.045]",

        muted: "text-[#8C8C93]",

        border: "border-white/[0.08]",

        input: "bg-[#121216]/90 border-white/[0.09]",

        message: "bg-[#151519] text-[#E1DED6] ring-1 ring-white/[0.055]",

        chip: "border-white/[0.09] text-[#9B9BA1] hover:border-[#CFA458]/50 hover:text-[#E9D5A5] hover:bg-white/[0.035]",

        scrollThumb: "rgba(207,164,88,0.35)",

        blobA: "from-[#CFA458]/[0.09] to-transparent",

        blobB: "from-[#5969FF]/[0.055] to-transparent",

        composerShadow: "shadow-[0_22px_70px_-28px_rgba(0,0,0,0.7)]",

        focusRing: "focus-within:shadow-[0_0_0_4px_rgba(207,164,88,0.12)]",

        placeholder: "placeholder:text-white/25",

        overlay: "bg-black/65",
      }
    : {
        app: "bg-[#F7F4EC] text-[#242119]",

        sidebar: "bg-[#FFFDF8] border-[#E6DECA]",

        header: "bg-[#F7F4EC]/85 border-[#E4DCC8]",

        active: "bg-[#F0E7D2] text-[#29241B] ring-1 ring-[#DECBA0]",

        hover: "hover:bg-[#F1EBDC]",

        muted: "text-[#756F5E]",

        border: "border-[#E5DDCA]",

        input: "bg-white border-[#E1D8BE]",

        message: "bg-[#F0E9D8] text-[#363126] ring-1 ring-[#E4D9C0]",

        chip: "border-[#E1D8BE] text-[#5C563F] hover:border-[#A9752E]/60 hover:text-[#79531F] hover:bg-white",

        scrollThumb: "rgba(169,117,46,0.4)",

        blobA: "from-[#CFA458]/[0.13] to-transparent",

        blobB: "from-[#5B6CFF]/[0.045] to-transparent",

        composerShadow: "shadow-[0_18px_45px_-20px_rgba(120,95,45,0.25)]",

        focusRing: "focus-within:shadow-[0_0_0_4px_rgba(169,117,46,0.13)]",

        placeholder: "placeholder:text-black/30",

        overlay: "bg-black/35",
      };

  const chatEntries = Object.values(chats || {});

  /* =======================================================
     UI
  ======================================================= */

  return (
    <div
      className={`
        relative flex h-[100dvh] w-full overflow-hidden
        font-[Inter,ui-sans-serif,system-ui]
        transition-colors duration-500
        ${theme.app}
      `}
    >
      {/* ===================================================
          GLOBAL STYLE
      =================================================== */}

      <style>{`
        .font-display {
          font-family: Georgia, 'Times New Roman', serif;
        }

        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }

        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .composer-scroll::-webkit-scrollbar {
          width: 5px;
        }

        .composer-scroll::-webkit-scrollbar-track {
          background: transparent;
        }

        .composer-scroll::-webkit-scrollbar-thumb {
          background: ${theme.scrollThumb};
          border-radius: 999px;
        }

        .composer-scroll {
          scrollbar-width: thin;
          scrollbar-color: ${theme.scrollThumb} transparent;
        }

        .chat-scroll::-webkit-scrollbar {
          width: 5px;
        }

        .chat-scroll::-webkit-scrollbar-track {
          background: transparent;
        }

        .chat-scroll::-webkit-scrollbar-thumb {
          background: ${theme.scrollThumb};
          border-radius: 999px;
        }

        .chat-scroll {
          scrollbar-width: thin;
          scrollbar-color: ${theme.scrollThumb} transparent;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes floatBlob {
          0%, 100% {
            transform: translate3d(0, 0, 0) scale(1);
          }

          50% {
            transform: translate3d(24px, -18px, 0) scale(1.08);
          }
        }

        @keyframes floatBlobSlow {
          0%, 100% {
            transform: translate3d(0, 0, 0) scale(1);
          }

          50% {
            transform: translate3d(-20px, 16px, 0) scale(1.05);
          }
        }

        @keyframes shine {
          0% {
            background-position: 0% 50%;
          }

          100% {
            background-position: 200% 50%;
          }
        }

        @keyframes glowPulse {
          0%, 100% {
            opacity: .45;
            transform: scale(.95);
          }

          50% {
            opacity: 1;
            transform: scale(1.08);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            scroll-behavior: auto !important;
          }
        }
      `}</style>

      {/* ===================================================
          AMBIENT BACKGROUND
      =================================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className={`
            absolute -left-24 -top-28
            h-[360px] w-[360px]
            rounded-full
            bg-gradient-to-br
            ${theme.blobA}
            blur-3xl
          `}
          style={{
            animation: "floatBlob 16s ease-in-out infinite",
          }}
        />

        <div
          className={`
            absolute -bottom-32 right-[5%]
            h-[330px] w-[330px]
            rounded-full
            bg-gradient-to-br
            ${theme.blobB}
            blur-3xl
          `}
          style={{
            animation: "floatBlobSlow 20s ease-in-out infinite",
          }}
        />
      </div>

      {/* ===================================================
          MOBILE OVERLAY
      =================================================== */}

      {sidebarOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={() => setSidebarOpen(false)}
          className={`
            fixed inset-0 z-40
            cursor-default
            backdrop-blur-[3px]
            transition-opacity
            md:hidden
            ${theme.overlay}
          `}
        />
      )}

      {/* ===================================================
          SIDEBAR
      =================================================== */}

      <aside
        className={`
          fixed inset-y-0 left-0 z-50
          flex w-[286px] max-w-[86vw] flex-col
          border-r
          shadow-[20px_0_70px_-35px_rgba(0,0,0,0.7)]
          backdrop-blur-xl

          transition-transform duration-300 ease-out

          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}

          md:static
          md:z-20
          md:w-[250px]
          md:max-w-none
          md:translate-x-0
          md:shadow-none

          ${theme.sidebar}
        `}
      >
        {/* Sidebar Header */}

        <div
          className={`
            flex shrink-0 items-center justify-between
            px-5 pb-5 pt-5
            sm:px-6 sm:pt-6
          `}
        >
          <div className="flex min-w-0 items-center gap-3">
            <div
              className="
                relative flex h-8 w-8 shrink-0
                items-center justify-center
                rounded-[10px]
                bg-gradient-to-br
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
          <button
            type="button"
            className={`
              flex w-full items-center gap-3
              rounded-xl
              px-3.5 py-2.5
              text-[13px]
              font-medium
              transition-all
              ${theme.active}
            `}
          >
            <span
              className="
                flex h-7 w-7 items-center justify-center
                rounded-lg
                bg-[#CFA458]/10
              "
            >
              <IconSearch className="h-4 w-4 text-[#CFA458]" />
            </span>
            Search
          </button>

          <button
            type="button"
            className={`
              mt-1 flex w-full items-center gap-3
              rounded-xl
              px-3.5 py-2.5
              text-[13px]
              transition-all
              ${theme.muted}
              ${theme.hover}
            `}
          >
            <span
              className="
                flex h-7 w-7 items-center justify-center
                rounded-lg
              "
            >
              <IconClock className="h-4 w-4" />
            </span>
            Chats
          </button>

          <button
            type="button"
            onClick={startNewChat}
            className={`
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
                  ${darkMode ? "bg-white/[0.04]" : "bg-black/[0.035]"}
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
              {chatEntries.map((chat) => {
                const isActive = currentChatId === chat.id;

                return (
                  <button
                    key={chat.id}
                    type="button"
                    onClick={() => openChat(chat.id)}
                    className={`
                      group relative flex w-full
                      min-w-0 items-center
                      rounded-xl
                      px-3 py-2.5
                      text-left
                      text-[12.5px]
                      transition-all duration-200

                      ${
                        isActive
                          ? theme.active
                          : `${theme.muted} ${theme.hover}`
                      }
                    `}
                  >
                    {isActive && (
                      <span
                        className="
                          absolute left-0 top-1/2
                          h-5 w-[3px]
                          -translate-y-1/2
                          rounded-full
                          bg-gradient-to-b
                          from-[#EFD69C]
                          to-[#96742E]
                          shadow-[0_0_10px_rgba(207,164,88,.4)]
                        "
                      />
                    )}

                    <span className="min-w-0 flex-1 truncate">
                      {chat.title}
                    </span>
                  </button>
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
                ${darkMode ? "bg-white/[0.09]" : "bg-[#E9DEBC]"}
              `}
            >
              <span
                className={`
                  absolute flex h-[18px] w-[18px]
                  items-center justify-center
                  rounded-full
                  bg-gradient-to-br
                  from-[#EAD095]
                  to-[#96742E]
                  shadow-md
                  transition-transform duration-300
                  ${darkMode ? "translate-x-[22px]" : "translate-x-[3px]"}
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
                bg-gradient-to-br
                from-[#EAD095]
                to-[#83642A]
                text-[11px]
                font-bold
                text-[#0c0c0e]
              "
            >
              U
            </div>

            <div className="min-w-0">
              <p className="truncate text-[12px] font-medium">
                {" "}
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
        </div>
      </aside>

      {/* ===================================================
          MAIN AREA
      =================================================== */}

      <main
        className="
          relative z-10 flex min-w-0 flex-1
          flex-col overflow-hidden
        "
      >
        {/* =================================================
            MOBILE HEADER
        ================================================= */}

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
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className={`
              flex h-9 w-9
              items-center justify-center
              rounded-xl
              ${theme.muted}
              ${theme.hover}
            `}
            aria-label="Open sidebar"
          >
            <IconMenu className="h-5 w-5" />
          </button>

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

          <button
            type="button"
            onClick={startNewChat}
            className={`
              flex h-9 w-9
              items-center justify-center
              rounded-xl
              ${theme.muted}
              ${theme.hover}
            `}
            aria-label="New chat"
          >
            <IconPlus className="h-[18px] w-[18px]" />
          </button>
        </header>

        {/* =================================================
            CONTENT WRAPPER
        ================================================= */}

        <div
          className="
            mx-auto flex min-h-0
            w-full max-w-6xl flex-1
            flex-col
            px-3
            pb-3
            pt-3
            sm:px-5 sm:pb-5
            md:px-8 md:pb-6 md:pt-6
            lg:px-10
          "
        >
          {/* =================================================
              EMPTY / HOME SCREEN
          ================================================= */}

          {!activeChat || messages.length === 0 ? (
            <section
              className="
                flex min-h-0 flex-1
                flex-col
                items-center
                justify-center
               
                py-6
                sm:py-10
              "
              style={{
                animation: "fadeInUp .5s ease-out",
              }}
            >
              {/* Hero */}

              <div
                className="
                  mb-7 w-full
                  text-center
                  sm:mb-9
                  md:mb-10
                "
              >
                <div className="flex items-center justify-center gap-2.5 sm:gap-3">
                  <span
                    className="
                      relative hidden
                      h-10 w-10
                      items-center justify-center
                      rounded-xl
                      bg-gradient-to-br
                      from-[#EFD69C]
                      via-[#CFA458]
                      to-[#83642A]
                      text-[16px]
                      font-bold
                      text-[#0c0c0e]
                      shadow-[0_12px_35px_-12px_rgba(207,164,88,.6)]
                      sm:flex
                      sm:h-11
                      sm:w-11
                    "
                  >
                    P
                    <IconSparkle
                      className="
                        absolute -right-1.5 -top-1.5
                        h-3.5 w-3.5
                        text-[#EFD69C]
                      "
                      style={{
                        animation: "glowPulse 2.4s ease-in-out infinite",
                      }}
                    />
                  </span>

                  <h1
                    className="
                      font-display
                      bg-clip-text
                      text-4xl
                      font-medium
                      leading-tight
                      tracking-tight
                      text-transparent
                      sm:text-5xl
                      md:text-6xl
                    "
                    style={{
                      backgroundSize: "200% auto",
                      animation: "shine 6s linear infinite",
                      WebkitTextFillColor: "transparent",
                      backgroundImage: darkMode
                        ? "linear-gradient(90deg,#EFD69C,#F6F0E5,#EFD69C)"
                        : "linear-gradient(90deg,#B5852E,#6E4E1A,#B5852E)",
                    }}
                  >
                    PerplexCity
                  </h1>
                </div>

                <p
                  className={`
                    mx-auto mt-2.5
                    max-w-[300px]
                    px-3
                    text-[12px]
                    leading-5
                    sm:mt-3
                    sm:max-w-none
                    sm:text-[13.5px]
                    ${theme.muted}
                  `}
                >
                  Ask anything. Get a considered answer.
                </p>
              </div>

              {/* Category Chips */}

              <div
                className="
                  mb-6 flex w-full
                  max-w-3xl
                  flex-wrap
                  justify-center
                  gap-2
                  px-2
                  sm:mb-8
                "
              >
                {["For You", "Study", "Business", "Health"].map(
                  (item, index) => (
                    <button
                      key={item}
                      type="button"
                      style={{
                        animation: `fadeInUp .4s ease-out ${
                          index * 0.06
                        }s both`,
                      }}
                      className={`
                      rounded-full border
                      px-3.5 py-2
                      text-[11px]
                      font-medium
                      transition-all duration-200
                      hover:scale-[1.03]
                      active:scale-[.98]
                      sm:px-4
                      sm:text-xs
                      ${theme.chip}
                    `}
                    >
                      {item}
                    </button>
                  ),
                )}
              </div>

              {/* HOME COMPOSER */}

              <form
                onSubmit={handleSubmit}
                className="
                  relative w-full
                  max-w-3xl
                "
              >
                <div
                  className="
                    pointer-events-none
                    absolute -inset-2
                    rounded-[28px]
                    bg-gradient-to-r
                    from-[#CFA458]/20
                    via-transparent
                    to-[#CFA458]/20
                    opacity-0
                    blur-xl
                    transition-opacity
                    duration-500
                    peer-focus-within:opacity-100
                  "
                />

                <div
                  className={`
                    peer relative
                    overflow-hidden
                    rounded-[24px]
                    border
                    p-2.5
                    backdrop-blur-xl
                    transition-all duration-300

                    focus-within:border-[#CFA458]/50

                    ${theme.composerShadow}
                    ${theme.focusRing}
                    ${theme.input}

                    sm:rounded-[26px]
                    sm:p-3
                  `}
                >
                  <textarea
                    ref={textareaRef}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        e.currentTarget.form?.requestSubmit();
                      }
                    }}
                    placeholder="Ask anything..."
                    rows={1}
                    className={`
                      composer-scroll
                      block w-full
                      min-h-[64px]
                      max-h-[200px]
                      resize-none
                      overflow-hidden
                      bg-transparent
                      px-2.5 py-2
                      text-[14px]
                      leading-6
                      outline-none
                      sm:min-h-[72px]
                      sm:px-3
                      sm:text-[15px]
                      ${theme.placeholder}
                    `}
                  />

                  <div
                    className="
                      flex items-center
                      justify-between
                      px-1.5 pt-1
                      sm:px-2
                    "
                  >
                    <button
                      type="button"
                      className={`
                        flex h-9 w-9
                        items-center justify-center
                        rounded-full
                        border
                        transition-all duration-200
                        hover:scale-105
                        active:scale-95
                        ${theme.border}
                        ${theme.muted}
                        ${theme.hover}
                      `}
                      aria-label="Add"
                    >
                      <IconPlus className="h-4 w-4" />
                    </button>

                    <button
                      type="submit"
                      disabled={!message.trim()}
                      className="
                        flex h-9 w-9
                        items-center justify-center
                        rounded-full
                        bg-gradient-to-br
                        from-[#EFD69C]
                        via-[#CFA458]
                        to-[#96742E]
                        text-[#0c0c0e]
                        shadow-[0_7px_20px_-8px_rgba(207,164,88,.7)]
                        transition-all duration-200
                        hover:scale-105
                        hover:brightness-110
                        active:scale-95
                        disabled:cursor-not-allowed
                        disabled:scale-100
                        disabled:opacity-30
                        disabled:grayscale
                        cursor-pointer
                      "
                      aria-label="Send message"
                    >
                      <IconArrowUp className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </form>

              {/* Suggestions */}

              <div
                className={`
                  mt-6 w-full
                  max-w-3xl
                  divide-y
                  border-t
                  sm:mt-8
                  ${theme.border}
                `}
              >
                {suggestions.map((suggestion, index) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => setMessage(suggestion)}
                    style={{
                      animation: `fadeInUp .4s ease-out ${
                        0.15 + index * 0.07
                      }s both`,
                    }}
                    className={`
                        group flex w-full
                        min-w-0 items-center
                        justify-between
                        gap-4
                        py-3.5
                        text-left
                        text-[12px]
                        transition-colors duration-200
                        sm:py-4
                        sm:text-[13.5px]

                        ${theme.muted}

                        ${
                          darkMode
                            ? "hover:text-[#EAD9AC]"
                            : "hover:text-[#8A6524]"
                        }
                      `}
                  >
                    <span className="min-w-0 break-words">{suggestion}</span>

                    <IconArrowRight
                      className="
                          h-3.5 w-3.5
                          shrink-0
                          -translate-x-1
                          opacity-0
                          transition-all duration-200
                          group-hover:translate-x-0
                          group-hover:opacity-100
                        "
                    />
                  </button>
                ))}
              </div>
            </section>
          ) : (
            <>
              {/* =================================================
                  CHAT MESSAGES
              ================================================= */}

              <div
                className="
                  scrollbar-none
                  mx-auto flex min-h-0
                  w-full max-w-3xl
                  flex-1
                  flex-col
                  gap-4
                  overflow-y-auto
                  overscroll-contain
                  py-4
                  sm:gap-5
                  sm:py-6
                  md:gap-6
                  md:py-8
                "
              >
                {messages.map((msg, index) => {
                  const isUser = msg.role === "user";

                  return (
                   
                    <div
    id={`message-${index}`}
    key={msg.id || index}
    style={{
      animation: `fadeInUp .35s ease-out ${
        Math.min(index, 6) * 0.05
      }s both`,
    }}
    className={`
      flex w-full
      ${isUser ? "justify-end" : "justify-start"}
    `}
  >
                      <div
                        className={`
                          max-w-[92%]
                          break-words
                          rounded-2xl
                          px-3.5 py-2.5
                          text-[13.5px]
                          leading-6
                          shadow-sm
                          sm:max-w-[82%]
                          sm:px-4
                          sm:py-3
                          sm:text-[14.5px]

                          ${
                            isUser
                              ? `
                                bg-gradient-to-br
                                from-[#EFD69C]
                                via-[#CFA458]
                                to-[#96742E]
                                text-[#0c0c0e]
                                shadow-[0_10px_28px_-12px_rgba(207,164,88,.55)]
                              `
                              : theme.message
                          }
                        `}
                      >
                        <div className="whitespace-pre-wrap break-words [overflow-wrap:anywhere]">
                          {msg.content}
                        </div>
                      </div>
                    </div>
                  );


                })}





              </div>

              {/* =================================================
                  CHAT COMPOSER
              ================================================= */}

              <form
                onSubmit={handleSubmit}
                className="
                  relative mx-auto
                  w-full max-w-3xl
                  shrink-0
                  pb-1
                  pt-2
                  sm:pb-2
                "
              >
                <div
                  className={`
                    relative flex
                    items-end
                    gap-2
                    overflow-hidden
                    rounded-[20px]
                    border
                    p-2
                    backdrop-blur-xl
                    transition-all duration-300

                    focus-within:border-[#CFA458]/50

                    ${theme.composerShadow}
                    ${theme.focusRing}
                    ${theme.input}

                    sm:gap-3
                    sm:rounded-2xl
                    sm:p-3
                  `}
                >
                  <textarea
                    ref={textareaRef}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        e.currentTarget.form?.requestSubmit();
                      }
                    }}
                    placeholder="Ask anything..."
                    rows={1}
                    className={`
                      composer-scroll
                      block min-w-0 flex-1
                      max-h-[200px]
                      min-h-[38px]
                      resize-none
                      overflow-hidden
                      bg-transparent
                      px-2
                      py-1.5
                      text-[13.5px]
                      leading-6
                      outline-none

                      sm:min-h-[40px]
                      sm:text-[14.5px]

                      ${theme.placeholder}
                    `}
                  />

                  <button
                    type="submit"
                    disabled={!message.trim()}
                    className="
                      flex h-9 w-9
                      shrink-0
                      items-center justify-center
                      rounded-full
                      bg-gradient-to-br
                      from-[#EFD69C]
                      via-[#CFA458]
                      to-[#96742E]
                      text-[#0c0c0e]
                      shadow-[0_7px_20px_-8px_rgba(207,164,88,.7)]
                      transition-all duration-200
                      hover:scale-105
                      hover:brightness-110
                      active:scale-95
                      disabled:cursor-not-allowed
                      disabled:scale-100
                      disabled:opacity-30
                      disabled:grayscale
                    "
                    aria-label="Send message"
                  >
                    <IconArrowUp className="h-4 w-4" />
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
