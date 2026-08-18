import { useEffect } from "react";

const ChatMessages = ({
  theme,
  messages,
  isLoading,
}) => {
  useEffect(() => {
    const lastUserMessage = [...messages]
      .reverse()
      .find((msg) => msg.role === "user");

    if (lastUserMessage) {
      document
        .getElementById(
          `message-${messages.lastIndexOf(lastUserMessage)}`
        )
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    }
  }, [messages]);

  return (
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
            <div className="max-w-[92%] sm:max-w-[82%]">
              {/* Message Bubble */}

              <div
                className={`
                  break-words
                  rounded-2xl
                  px-3.5 py-2.5
                  text-[13.5px]
                  leading-6
                  shadow-sm
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
                <div className="space-y-2">
                  {/* Image */}

                  {msg.image && (
                    <img
                      src={msg.image}
                      alt="Uploaded"
                      className="
                        max-h-[320px]
                        max-w-full
                        rounded-xl
                        object-contain
                      "
                    />
                  )}

                  {/* Text */}

                  {msg.content && (
                    <div
                      className="
                        whitespace-pre-wrap
                        break-words
                        [overflow-wrap:anywhere]
                      "
                    >
                      {msg.content}
                    </div>
                  )}
                </div>
              </div>

              {/* AI Feedback */}

              {!isUser && (
                <div className="mt-2 flex items-center gap-3 px-1">
                  <button
                    type="button"
                    onClick={() =>
                      console.log("Liked:", msg.content)
                    }
                    title="Good response"
                    className="
                      cursor-pointer
                      text-gray-400
                      transition
                      hover:text-white
                    "
                  >
                    👍🏻
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      console.log("Disliked:", msg.content)
                    }
                    title="Bad response"
                    className="
                      cursor-pointer
                      text-gray-400
                      transition
                      hover:text-white
                    "
                  >
                    👎🏻
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      navigator.clipboard.writeText(
                        msg.content || "",
                      )
                    }
                    title="Copy response"
                    className="
                      cursor-pointer
                      text-gray-400
                      transition
                      hover:text-white
                    "
                  >
                    ⧉
                  </button>
                </div>
              )}
            </div>
          </div>
        );
      })}

      {/* Loading */}

      {isLoading && (
        <div className="flex items-center gap-2 px-4 py-3">
          <div className="flex gap-1">
            <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400" />
            <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:150ms]" />
            <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:300ms]" />
          </div>

          <span className="text-sm text-gray-400">
            AI is thinking...
          </span>
        </div>
      )}
    </div>
  );
};

export default ChatMessages;