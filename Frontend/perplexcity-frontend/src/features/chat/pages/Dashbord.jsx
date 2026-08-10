import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useChat } from "../hooks/useChat";

const history = [
  "Explain quantum computing",
  "React authentication flow",
  "MongoDB schema design",
  "JavaScript interview questions",
];

const starterMessages = [
  { role: "user", content: "Explain quantum computing in a practical way" },
  {
    role: "assistant",
    content: (
      <>
        <p>
          Quantum computing uses the laws of quantum mechanics to process
          information in a fundamentally different way. Instead of working only
          with bits that are either 0 or 1, quantum computers use{" "}
          <strong className="font-medium text-zinc-100">qubits</strong> that can
          represent a combination of both.
        </p>
        <p>
          The practical advantage is not that they make every task faster. It is
          that a few specialized algorithms can explore complex possibilities
          more efficiently, which could help with simulation, optimization, and
          cryptography.
        </p>
        <div className="mt-5 overflow-hidden rounded-xl border border-[#292929] bg-[#0b0b0b]">
          <div className="flex items-center justify-between border-b border-[#292929] px-4 py-2.5 text-[11px] font-medium tracking-wide text-zinc-500">
            <span>JavaScript</span>
            <button
              className="flex items-center gap-1.5 rounded-md px-1.5 py-1 text-zinc-500 transition-colors hover:bg-[#191919] hover:text-zinc-200"
              type="button"
              aria-label="Copy code"
            >
              <Icon name="copy" size={14} /> Copy
            </button>
          </div>
          <pre className="overflow-x-auto p-4 text-[13px] leading-6 text-zinc-300">
            <code>
              <span className="text-sky-300">const</span> qubit ={" "}
              <span className="text-emerald-300">await</span>{" "}
              quantum.createQubit();{"\n"}
              <span className="text-sky-300">await</span> qubit.apply(
              <span className="text-amber-200">"Hadamard"</span>);
            </code>
          </pre>
        </div>
      </>
    ),
  },
];

function Icon({ name, size = 18 }) {
  const paths = {
    plus: (
      <>
        <path d="M12 5v14M5 12h14" />
      </>
    ),
    search: (
      <>
        <circle cx="11" cy="11" r="6.5" />
        <path d="m16 16 4 4" />
      </>
    ),
    menu: (
      <>
        <path d="M5 7h14M5 12h14M5 17h14" />
      </>
    ),
    more: (
      <>
        <circle cx="5" cy="12" r="1" fill="currentColor" stroke="none" />
        <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
        <circle cx="19" cy="12" r="1" fill="currentColor" stroke="none" />
      </>
    ),
    copy: (
      <>
        <rect x="8" y="8" width="10" height="10" rx="1.5" />
        <path d="M5 15V5.5A1.5 1.5 0 0 1 6.5 4H16" />
      </>
    ),
    paperclip: (
      <path d="m20.5 11.5-8.3 8.3a5 5 0 0 1-7.1-7.1l8.4-8.4a3.3 3.3 0 0 1 4.7 4.7l-8.4 8.4a1.7 1.7 0 1 1-2.4-2.4l7.7-7.7" />
    ),
    mic: (
      <>
        <rect x="9" y="3" width="6" height="11" rx="3" />
        <path d="M5 11a7 7 0 0 0 14 0M12 18v3M9 21h6" />
      </>
    ),
    arrow: (
      <>
        <path d="M12 19V5M6 11l6-6 6 6" />
      </>
    ),
    settings: (
      <>
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-1.7 1.7-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.1h-2.4v-.1a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L8 17l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.6-1H6.7v-2.4h.1a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L8 8.6l1.7-1.7.1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.6v-.1h2.4v.1a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1 1.7 1.7-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.1V14h-.1a1.7 1.7 0 0 0-1.6 1Z" />
      </>
    ),
    logout: (
      <>
        <path d="M10 17l5-5-5-5M15 12H3M21 19V5a2 2 0 0 0-2-2h-6" />
      </>
    ),
    spark: (
      <>
        <path d="m12 3-1.3 5.7L5 10l5.7 1.3L12 17l1.3-5.7L19 10l-5.7-1.3L12 3ZM19 16l-.6 2.4L16 19l2.4.6L19 22l.6-2.4L22 19l-2.4-.6L19 16Z" />
      </>
    ),
  };
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  );
}

const Dashbord = () => {
  const chat = useChat();
  const user = useSelector((state) => state.auth.user);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [activeChat, setActiveChat] = useState(history[0]);
  const [messages, setMessages] = useState(starterMessages);
  const [draft, setDraft] = useState("");
  const textareaRef = useRef(null);

  useEffect(() => {
    chat.initializeSocketConnection();
  }, []);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    textarea.style.height = "auto";
    textarea.style.height = `${Math.min(textarea.scrollHeight, 210)}px`;
    textarea.style.overflowY = textarea.scrollHeight > 210 ? "auto" : "hidden";
  }, [draft]);

  const displayName = user?.username || user?.name || "Alex Morgan";
  const email = user?.email || "alex@perplexcity.ai";
  const initials = displayName.slice(0, 2).toUpperCase();

  function selectChat(title) {
    setActiveChat(title);
    setMessages(title === history[0] ? starterMessages : []);
    setSidebarOpen(false);
  }

  function startNewChat() {
    setActiveChat(null);
    setMessages([]);
    setDraft("");
    setSidebarOpen(false);
  }

  function submitMessage(event) {
    event.preventDefault();
    const content = draft.trim();
    if (!content) return;
    setMessages((current) => [...current, { role: "user", content }]);
    setDraft("");
  }

  return (
    <main className="flex h-screen min-h-0 overflow-hidden bg-[#0a0a0a] font-sans text-[#f5f5f5] selection:bg-sky-500/30">
      <div
        className={`fixed inset-0 z-30 bg-black/60 transition-opacity lg:hidden ${isSidebarOpen ? "opacity-100" : "pointer-events-none opacity-0"}`}
        onClick={() => setSidebarOpen(false)}
      />
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-69 flex-col border-r border-[#242424] bg-[#0d0d0d] px-4 py-5 transition-transform duration-300 ease-out lg:static lg:translate-x-0 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-between px-1 pb-8">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-[10px] border border-zinc-200/80 bg-zinc-100 text-[#0a0a0a] shadow-[0_0_18px_rgba(255,255,255,0.06)]">
              <Icon name="spark" size={16} />
            </span>
            <span className="text-[15px] font-semibold tracking-[-0.01em] text-zinc-100">
              PerplexCity
            </span>
          </div>
          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="rounded-lg p-2 text-zinc-500 transition hover:bg-[#1b1b1b] hover:text-zinc-100 lg:hidden"
            aria-label="Close sidebar"
          >
            <Icon name="menu" size={18} />
          </button>
        </div>
        <button
          type="button"
          onClick={startNewChat}
          className="mb-8 flex h-11 items-center gap-2.5 rounded-xl border border-[#343434] bg-[#171717] px-4 text-[13px] font-medium text-zinc-100 transition-all duration-200 ease-out hover:border-[#484848] hover:bg-[#202020] focus:outline-none focus:ring-2 focus:ring-sky-500/50"
        >
          <Icon name="plus" size={17} /> New chat
        </button>
        <div className="mb-3 flex items-center justify-between px-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-600">
          <span>Recent chats</span>
          <Icon name="search" size={13} />
        </div>
        <nav className="space-y-0.5" aria-label="Chat history">
          {history.map((title) => (
            <button
              key={title}
              type="button"
              onClick={() => selectChat(title)}
              className={`group flex min-w-0 w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-[13px] transition-all duration-150 ease-out ${activeChat === title ? "bg-[#181818] text-zinc-200" : "text-zinc-500 hover:bg-[#151515] hover:text-zinc-200"}`}
            >
              <span className="min-w-0 flex-1 truncate">{title}</span>
              <span
                className={`shrink-0 text-zinc-600 transition-opacity duration-150 group-hover:opacity-100 ${activeChat === title ? "opacity-100" : "opacity-0"}`}
              >
                <Icon name="more" size={15} />
              </span>
            </button>
          ))}
        </nav>
        <div className="mt-auto border-t border-[#242424] pt-4">
          <div className="flex items-center gap-3 rounded-xl px-2 py-2.5 transition-colors hover:bg-[#151515]">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sky-500/15 text-xs font-semibold text-sky-300">
              {initials}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-zinc-200">
                {displayName}
              </p>
              <p className="truncate text-[11px] text-zinc-600">{email}</p>
            </div>
            <button
              type="button"
              className="rounded-lg p-1.5 text-zinc-600 transition hover:bg-[#1b1b1b] hover:text-zinc-200"
              aria-label="Open settings"
            >
              <Icon name="settings" size={16} />
            </button>
          </div>
        </div>
      </aside>

      <section className="flex min-h-0 min-w-0 flex-1 flex-col">
        <header className="flex h-14 shrink-0 items-center justify-between border-b border-[#1f1f1f] px-4 sm:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="rounded-lg p-2 text-zinc-500 transition-colors hover:bg-[#1b1b1b] hover:text-zinc-100 lg:hidden"
              aria-label="Open sidebar"
            >
              <Icon name="menu" />
            </button>
            <div className="min-w-0">
              <h1 className="truncate text-[13px] font-medium text-zinc-200">
                {activeChat || "New conversation"}
              </h1>
              <p className="mt-1 text-[10px] tracking-wide text-zinc-600">
                PerplexCity · Standard
              </p>
            </div>
          </div>
          <button
            type="button"
            className="hidden items-center gap-2 rounded-lg border border-transparent px-3 py-1.5 text-xs text-zinc-500 transition-all duration-150 hover:border-[#292929] hover:bg-[#161616] hover:text-zinc-200 sm:flex"
            aria-label="Select model"
          >
            Standard <span className="text-zinc-600">⌄</span>
          </button>
        </header>

        <div className="flex min-h-0 flex-1 flex-col">
          <div className="flex-1 overflow-y-auto px-4 py-8 pb-10 scrollbar-thin [scrollbar-color:#292929_transparent] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#292929] [&::-webkit-scrollbar-track]:bg-transparent sm:px-8 sm:py-10 sm:pb-14 lg:px-12">
            <div className="mx-auto flex min-h-full w-full max-w-3xl flex-col">
              {messages.length === 0 ? (
                <EmptyState
                  onSuggestion={(suggestion) => {
                    setDraft(suggestion);
                    setActiveChat(suggestion);
                  }}
                />
              ) : (
                <div className="space-y-10 pb-14">
                  {messages.map((message, index) =>
                    message.role === "user" ? (
                      <div key={index} className="flex justify-end">
                        <div className="max-w-[88%] rounded-2xl rounded-br-md border border-[#292929] bg-[#191919] px-4 py-3 text-[14px] leading-6 text-zinc-200 sm:max-w-[68%]">
                          {message.content}
                        </div>
                      </div>
                    ) : (
                      <article key={index} className="flex gap-3">
                        <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-[7px] bg-zinc-100 text-[#0a0a0a]">
                          <Icon name="spark" size={13} />
                        </div>
                        <div className="min-w-0 max-w-170 space-y-4 text-[15px] leading-7 text-zinc-300">
                          {message.content}
                          <div className="flex items-center gap-1 pt-0.5 text-zinc-600">
                            <button
                              type="button"
                              className="rounded-md p-1.5 transition-colors hover:bg-[#1a1a1a] hover:text-zinc-300"
                              aria-label="Copy response"
                            >
                              <Icon name="copy" size={15} />
                            </button>
                            <button
                              type="button"
                              className="rounded-md p-1.5 transition-colors hover:bg-[#1a1a1a] hover:text-zinc-300"
                              aria-label="More response actions"
                            >
                              <Icon name="more" size={15} />
                            </button>
                          </div>
                        </div>
                      </article>
                    ),
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="sticky bottom-0 w-full shrink-0 bg-[#0a0a0a] px-4 pb-3 sm:px-8 sm:pb-6 lg:px-12">
            <form
              onSubmit={submitMessage}
              className="mx-auto max-w-3xl rounded-[18px] border border-[#2a2a2a] bg-[#151515] p-3.5 shadow-[0_12px_40px_rgba(0,0,0,0.28)] transition-colors focus-within:border-[#444444]"
            >
              <textarea
                ref={textareaRef}
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault();
                    submitMessage(event);
                  }
                }}
                rows="1"
                placeholder="Ask anything..."
                aria-label="Message"
                className="max-h-52.5 min-h-11 w-full resize-none overflow-x-hidden bg-transparent px-2 py-1 text-[14px] leading-6 text-zinc-200 outline-none placeholder:text-zinc-500 scrollbar-thin [scrollbar-color:#3f3f46_transparent] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#3f3f46] [&::-webkit-scrollbar-thumb:hover]:bg-[#52525b] [&::-webkit-scrollbar-button]:hidden"
              />
              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-xs text-zinc-500 transition-colors hover:bg-[#202020] hover:text-zinc-200"
                >
                  <Icon name="paperclip" size={16} /> Attach
                </button>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    className="rounded-lg p-2 text-zinc-600 transition-colors hover:bg-[#202020] hover:text-zinc-300"
                    aria-label="Use microphone"
                  >
                    <Icon name="mic" size={17} />
                  </button>
                  <button
                    type="submit"
                    disabled={!draft.trim()}
                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-100 text-[#0a0a0a] transition-colors hover:bg-white disabled:cursor-not-allowed disabled:bg-[#292929] disabled:text-zinc-600"
                    aria-label="Send message"
                  >
                    <Icon name="arrow" size={17} />
                  </button>
                </div>
              </div>
            </form>
            <p className="pt-2 text-center text-[10px] text-zinc-700">
              PerplexCity can make mistakes. Check important information.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

function EmptyState({ onSuggestion }) {
  const suggestions = [
    "Explain quantum computing",
    "Help me plan a trip",
    "Analyze this document",
    "Write a JavaScript function",
  ];
  return (
    <div className="mx-auto my-auto w-full max-w-xl py-14 text-center">
      <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-[#2d2d2d] bg-[#151515] text-zinc-300">
        <Icon name="spark" size={21} />
      </div>
      <h2 className="text-2xl font-medium tracking-tight text-zinc-100 sm:text-3xl">
        Where knowledge meets curiosity.
      </h2>
      <p className="mt-3 text-sm text-zinc-500">
        Search, explore, and understand anything.
      </p>
      <div className="mt-8 grid grid-cols-1 gap-2 text-left sm:grid-cols-2">
        {suggestions.map((suggestion) => (
          <button
            key={suggestion}
            type="button"
            onClick={() => onSuggestion(suggestion)}
            className="flex items-center justify-between rounded-xl border border-[#242424] bg-[#111111] px-3.5 py-3 text-sm text-zinc-400 transition-colors hover:border-[#414141] hover:bg-[#171717] hover:text-zinc-100"
          >
            <span>{suggestion}</span>
            <span className="text-zinc-700">↗</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default Dashbord;
