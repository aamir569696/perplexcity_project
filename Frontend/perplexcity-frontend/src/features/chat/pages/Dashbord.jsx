import { useState } from "react";

const Dashboard = () => {
  const [darkMode, setDarkMode] = useState(true);

  const [chats, setChats] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);
  const [message, setMessage] = useState("");

  const activeChat = chats.find(
    (chat) => chat.id === activeChatId
  );

  const startNewChat = () => {
    const newChat = {
      id: Date.now(),
      title: "New Chat",
      messages: [],
    };

    setChats((prev) => [newChat, ...prev]);
    setActiveChatId(newChat.id);
    setMessage("");
  };

  const sendMessage = (text) => {
    const content = text.trim();

    if (!content) return;

    let currentChatId = activeChatId;

    // If no chat is selected, create one automatically
    if (!currentChatId) {
      const newChat = {
        id: Date.now(),
        title: content.slice(0, 35),
        messages: [
          {
            id: Date.now() + 1,
            role: "user",
            content,
          },
        ],
      };

      setChats((prev) => [newChat, ...prev]);
      setActiveChatId(newChat.id);
      setMessage("");
      return;
    }

    const newMessage = {
      id: Date.now(),
      role: "user",
      content,
    };

    setChats((prev) =>
      prev.map((chat) =>
        chat.id === currentChatId
          ? {
              ...chat,
              title:
                chat.messages.length === 0
                  ? content.slice(0, 35)
                  : chat.title,
              messages: [...chat.messages, newMessage],
            }
          : chat
      )
    );

    setMessage("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(message);
  };

  const suggestions = [
    "Explain JavaScript closures simply",
    "Help me build a React project",
    "Give me a full stack roadmap",
  ];

  const theme = darkMode
    ? {
        app: "bg-[#08090b] text-zinc-100",
        sidebar: "bg-[#0b0c0f] border-white/[0.07]",
        active: "bg-white/[0.08] text-white",
        hover: "hover:bg-white/[0.05]",
        muted: "text-zinc-500",
        border: "border-white/[0.08]",
        input: "bg-[#16171a] border-white/[0.12]",
        message: "bg-[#191a1e] text-zinc-200",
        chip: "border-white/[0.1] text-zinc-400 hover:bg-white/[0.06]",
      }
    : {
        app: "bg-[#f8f8f7] text-zinc-900",
        sidebar: "bg-white border-zinc-200",
        active: "bg-zinc-100 text-zinc-900",
        hover: "hover:bg-zinc-100",
        muted: "text-zinc-500",
        border: "border-zinc-200",
        input: "bg-white border-zinc-300",
        message: "bg-zinc-100 text-zinc-800",
        chip: "border-zinc-300 text-zinc-600 hover:bg-zinc-100",
      };

  return (
    <div
      className={`flex h-screen overflow-hidden transition-colors duration-300 ${theme.app}`}
    >
      {/* SIDEBAR */}
      <aside
        className={`hidden w-56 shrink-0 flex-col border-r md:flex ${theme.sidebar}`}
      >
        {/* Navigation */}
        <div className="px-3 pt-4">
          <button
            className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium ${theme.active}`}
          >
            ✦ Search
          </button>

          <button
            className={`mt-1 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm ${theme.muted} ${theme.hover}`}
          >
            ◷ Chats
          </button>

          <button
            onClick={startNewChat}
            className={`mt-5 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium ${theme.muted} ${theme.hover}`}
          >
            <span className="text-lg">+</span>
            New Chat
          </button>
        </div>

        {/* RECENT CHATS */}
        <div className="mt-8 flex-1 overflow-y-auto px-3">
          <p
            className={`mb-3 px-2 text-[10px] font-semibold uppercase tracking-[0.14em] ${theme.muted}`}
          >
            Recent
          </p>

          {chats.length === 0 ? (
            <p className={`px-2 text-xs ${theme.muted}`}>
              No recent chats
            </p>
          ) : (
            <div className="space-y-1">
              {chats.map((chat) => (
                <button
                  key={chat.id}
                  onClick={() => setActiveChatId(chat.id)}
                  className={`w-full truncate rounded-lg px-3 py-2.5 text-left text-sm transition ${
                    activeChatId === chat.id
                      ? theme.active
                      : `${theme.muted} ${theme.hover}`
                  }`}
                >
                  {chat.title}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* THEME */}
        <div className={`border-t p-4 ${theme.border}`}>
          <button
            onClick={() => setDarkMode((prev) => !prev)}
            className={`flex w-full items-center gap-3 rounded-lg px-2 py-2.5 text-sm ${theme.muted} ${theme.hover}`}
          >
            <span>{darkMode ? "☀" : "☾"}</span>
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>

          <div className="mt-3 flex items-center gap-2 px-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-600 text-xs font-semibold text-white">
              U
            </div>

            <span className="text-xs font-medium">
              Your Account
            </span>
          </div>
        </div>
      </aside>

      {/* MAIN */}
      <main className="flex min-w-0 flex-1 flex-col overflow-y-auto">
        <div className="mx-auto flex min-h-full w-full max-w-5xl flex-col px-5 py-6 md:px-10">
          {/* CHAT SCREEN */}
          {!activeChat || activeChat.messages.length === 0 ? (
            <section className="flex flex-1 flex-col items-center justify-center pb-10">
              {/* Brand */}
              <div className="mb-9 text-center">
                <div className="flex items-center justify-center gap-3">
                  <span className="text-4xl">✦</span>

                  <h1 className="text-5xl font-medium tracking-tighter md:text-6xl">
                    PerplexCity
                  </h1>
                </div>
              </div>

              {/* Categories */}
              <div className="mb-8 flex flex-wrap justify-center gap-2">
                {["For You", "Study", "Business", "Health"].map(
                  (item) => (
                    <button
                      key={item}
                      className={`rounded-full border px-4 py-2 text-xs transition ${theme.chip}`}
                    >
                      {item}
                    </button>
                  )
                )}
              </div>

              {/* INPUT */}
              <form
                onSubmit={handleSubmit}
                className="w-full max-w-3xl"
              >
                <div
                  className={`rounded-3xlrder p-3 shadow-xl ${theme.input}`}
                >
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        sendMessage(message);
                      }
                    }}
                    placeholder="Ask anything..."
                    rows={3}
                    className={`min-h-22.5 w-full resize-none bg-transparent px-3 py-2 text-base outline-none placeholder:text-zinc-500`}
                  />

                  <div className="flex items-center justify-between px-2">
                    <button
                      type="button"
                      className={`flex h-9 w-9 items-center justify-center rounded-full border ${theme.border} ${theme.muted}`}
                    >
                      +
                    </button>

                    <button
                      type="submit"
                      disabled={!message.trim()}
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-800 text-lg text-white transition hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      ↑
                    </button>
                  </div>
                </div>
              </form>

              {/* Suggestions */}
              <div
                className={`mt-7 w-full max-w-3xl divide-y border-t ${theme.border}`}
              >
                {suggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => setMessage(suggestion)}
                    className={`flex w-full items-center justify-between py-4 text-left text-sm ${theme.muted}`}
                  >
                    {suggestion}
                    <span>→</span>
                  </button>
                ))}
              </div>
            </section>
          ) : (
            <>
              {/* MESSAGES */}
              <div className="mx-auto w-full max-w-3xl flex-1 space-y-6 py-10">
                {activeChat.messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${
                      msg.role === "user"
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-6 ${
                        msg.role === "user"
                          ? "bg-zinc-800 text-white"
                          : theme.message
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))}
              </div>

              {/* CHAT INPUT */}
              <form
                onSubmit={handleSubmit}
                className="mx-auto w-full max-w-3xl pb-5"
              >
                <div
                  className={`flex items-end gap-3 rounded-2xl border p-3 ${theme.input}`}
                >
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        sendMessage(message);
                      }
                    }}
                    placeholder="Ask anything..."
                    rows={1}
                    className="max-h-32 flex-1 resize-none bg-transparent px-2 py-2 text-sm outline-none placeholder:text-zinc-500"
                  />

                  <button
                    type="submit"
                    disabled={!message.trim()}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-zinc-800 text-lg text-white disabled:opacity-40"
                  >
                    ↑
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