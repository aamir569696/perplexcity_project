import { useState, useEffect } from "react";
import { useChat } from "../hooks/useChat";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentChatId } from "../chat.slice";
import MobileHeader from "../components/MobileHeader";
import ChatSidebar from "../components/ChatSidebar";
//import ChatHeader from "../components/ChatHeader";
import HomeScreen from "../components/HomeScreen";
import ChatMessages from "../components/ChatMessages";
import ChatComposer from "../components/ChatComposer";
import ProfileSettings from "../components/ProfileSettings";
const Dashboard = () => {
  const dispatch = useDispatch();

  const {
    handlesendMessage,
    hanglegetChats,
    handleOpenChats,
    handleDeleteChat,
  } = useChat();

  const { chats, currentChatId, isLoading } = useSelector(
    (state) => state.chat
  );

  const { user } = useSelector((state) => state.auth);

  const [darkMode, setDarkMode] = useState(true);
  const [message, setMessage] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
const [profileOpen, setProfileOpen] = useState(false);
  const activeChat = currentChatId ? chats[currentChatId] : null;
  const messages = activeChat?.messages || [];

  /* =========================
     LOAD CHATS
  ========================= */

  useEffect(() => {
    hanglegetChats();

    const savedChatId = localStorage.getItem("currentChatId");

    if (savedChatId) {
      handleOpenChats(savedChatId);
    }
  }, []);

  /* =========================
     NEW CHAT
  ========================= */

  const startNewChat = () => {
    dispatch(setCurrentChatId(null));
    localStorage.removeItem("currentChatId");

    setMessage("");
    setSelectedImage(null);
    setSidebarOpen(false);
  };

  /* =========================
     LOGOUT
  ========================= */

  const handleLogout = () => {
    const confirmLogout = window.confirm(
      "Are you sure you want to logout?"
    );

    if (!confirmLogout) return;

    localStorage.removeItem("token");
    localStorage.removeItem("currentChatId");

    window.location.href = "/login";
  };

  /* =========================
     SEND MESSAGE
  ========================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    const content = message.trim();

    if (!content && !selectedImage) return;

    try {
      await handlesendMessage({
        message: content,
        chatId: currentChatId,
        selectedImage,
      });

      setMessage("");

      if (selectedImage?.preview) {
        URL.revokeObjectURL(selectedImage.preview);
      }

      setSelectedImage(null);
    } catch (error) {
      console.error("Message send failed:", error);
    }
  };

  /* =========================
     OPEN CHAT
  ========================= */

  const openChat = async (chatId) => {
    try {
      await handleOpenChats(chatId);
      setSidebarOpen(false);
    } catch (error) {
      console.error("Chat open failed:", error);
    }
  };

  /* =========================
     THEME
  ========================= */

  const theme = darkMode
    ? {
        app: "bg-[#070709] text-[#F2F0E9]",
        sidebar: "bg-[#0A0A0C]/95 border-white/[0.07]",
        header: "bg-[#08080A]/80 border-white/[0.07]",
        active:
          "bg-white/[0.075] text-[#F5F1E7] ring-1 ring-white/[0.06]",
        hover: "hover:bg-white/[0.045]",
        muted: "text-[#8C8C93]",
        border: "border-white/[0.08]",
        input: "bg-[#121216]/90 border-white/[0.09]",
        message:
          "bg-[#151519] text-[#E1DED6] ring-1 ring-white/[0.055]",
        chip:
          "border-white/[0.09] text-[#9B9BA1] hover:border-[#CFA458]/50 hover:text-[#E9D5A5] hover:bg-white/[0.035]",
        scrollThumb: "rgba(207,164,88,0.35)",
        blobA: "from-[#CFA458]/[0.09] to-transparent",
        blobB: "from-[#5969FF]/[0.055] to-transparent",
        composerShadow:
          "shadow-[0_22px_70px_-28px_rgba(0,0,0,0.7)]",
        focusRing:
          "focus-within:shadow-[0_0_0_4px_rgba(207,164,88,0.12)]",
        placeholder: "placeholder:text-white/25",
        overlay: "bg-black/65",
      }
    : {
        app: "bg-[#F7F4EC] text-[#242119]",
        sidebar: "bg-[#FFFDF8] border-[#E6DECA]",
        header: "bg-[#F7F4EC]/85 border-[#E4DCC8]",
        active:
          "bg-[#F0E7D2] text-[#29241B] ring-1 ring-[#DECBA0]",
        hover: "hover:bg-[#F1EBDC]",
        muted: "text-[#756F5E]",
        border: "border-[#E5DDCA]",
        input: "bg-white border-[#E1D8BE]",
        message:
          "bg-[#F0E9D8] text-[#363126] ring-1 ring-[#E4D9C0]",
        chip:
          "border-[#E1D8BE] text-[#5C563F] hover:border-[#A9752E]/60 hover:text-[#79531F] hover:bg-white",
        scrollThumb: "rgba(169,117,46,0.4)",
        blobA: "from-[#CFA458]/[0.13] to-transparent",
        blobB: "from-[#5B6CFF]/[0.045] to-transparent",
        composerShadow:
          "shadow-[0_18px_45px_-20px_rgba(120,95,45,0.25)]",
        focusRing:
          "focus-within:shadow-[0_0_0_4px_rgba(169,117,46,0.13)]",
        placeholder: "placeholder:text-black/30",
        overlay: "bg-black/35",
      };

const chatEntries = Object.values(chats || {}).sort(
  (a, b) =>
    new Date(b.lastUpdated || 0) -
    new Date(a.lastUpdated || 0)
);
  /* =========================
     UI
  ========================= */

  return (
    <div
      className={`
        relative flex h-dvh w-full overflow-hidden
        font-[Inter,ui-sans-serif,system-ui]
        transition-colors duration-500
        ${theme.app}
      `}
    >
      {/* Ambient background */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className={`
            absolute -left-24 -top-28
            h-90 w-90
            rounded-full
            bg-linear-to-br
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
            h-82.5 w-82.5
            rounded-full
            bg-linear-to-br
            ${theme.blobB}
            blur-3xl
          `}
          style={{
            animation: "floatBlobSlow 20s ease-in-out infinite",
          }}
        />
      </div>

      {/* Mobile overlay */}

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

      {/* Sidebar */}

      <ChatSidebar
        theme={theme}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        chatEntries={chatEntries}
        currentChatId={currentChatId}
        user={user}
        startNewChat={startNewChat}
        openChat={openChat}
        handleDeleteChat={handleDeleteChat}
        handleLogout={handleLogout}
        setProfileOpen={setProfileOpen}
      />

      {/* Main */}

      <main className="relative z-10 flex min-w-0 flex-1 flex-col overflow-hidden">
       
        <MobileHeader
    setSidebarOpen={setSidebarOpen}
    startNewChat={startNewChat}
    theme={theme}
  />

        <div
          className="
            mx-auto flex min-h-0
            w-full max-w-6xl flex-1
            flex-col
            px-3 pb-3 pt-3
            sm:px-5 sm:pb-5
            md:px-8 md:pb-6 md:pt-6
            lg:px-10
          "
        >
          {!activeChat || messages.length === 0 ? (
            <HomeScreen
              theme={theme}
              darkMode={darkMode}
              message={message}
              setMessage={setMessage}
              selectedImage={selectedImage}
              setSelectedImage={setSelectedImage}
              handleSubmit={handleSubmit}
            />
          ) : (
            <>
              <ChatMessages
                messages={messages}
                theme={theme}
                isLoading={isLoading}
              />

              <ChatComposer
                theme={theme}
                message={message}
                setMessage={setMessage}
                selectedImage={selectedImage}
                setSelectedImage={setSelectedImage}
                handleSubmit={handleSubmit}
              />
            </>
          )}
        </div>
      </main>


{profileOpen && (
  <ProfileSettings
    user={user}
    theme={theme}
    onClose={() => setProfileOpen(false)}
     handleLogout={handleLogout}
  />
)}
      {/* Global animations */}

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
    </div>
  );
};

export default Dashboard;