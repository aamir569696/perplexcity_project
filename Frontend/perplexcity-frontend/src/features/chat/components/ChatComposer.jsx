//import { IconArrowUp } from "./Icons";
import { useLayoutEffect, useRef } from "react";
import { IconArrowUp } from "./Icons";

const ChatComposer = ({
  theme,
  message,
  setMessage,
  selectedImage,
  setSelectedImage,
  handleSubmit,
}) => {

 const textareaRef = useRef(null);

  useLayoutEffect(() => {
    const textarea = textareaRef.current;

    if (!textarea) return;

    textarea.style.height = "auto";

    const maxHeight = 200;

    textarea.style.height = `${Math.min(
      textarea.scrollHeight,
      maxHeight
    )}px`;
  }, [message]);

  return (
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
          relative
          rounded-[20px]
          border
          p-2
          backdrop-blur-xl
          transition-all duration-300
          focus-within:border-[#CFA458]/50

          ${theme.composerShadow}
          ${theme.focusRing}
          ${theme.input}

          sm:rounded-2xl
          sm:p-3
        `}
      >
        {/* IMAGE PREVIEW */}

        {selectedImage && (
          <div className="mb-2 px-1">
            <div className="relative inline-block">
              <img
                src={selectedImage.preview}
                alt="Selected"
                className="
                  h-16
                  w-16
                  rounded-xl
                  border
                  border-white/10
                  object-cover
                  shadow-lg
                "
              />

              <button
                type="button"
                onClick={() => {
                  URL.revokeObjectURL(
                    selectedImage.preview,
                  );

                  setSelectedImage(null);
                }}
                className="
                  absolute
                  -right-2
                  -top-2
                  flex
                  h-5
                  w-5
                  items-center
                  justify-center
                  rounded-full
                  bg-black/90
                  text-xs
                  text-white
                  shadow-md
                  transition
                  hover:scale-110
                  hover:bg-red-500
                "
                aria-label="Remove image"
              >
                ×
              </button>
            </div>
          </div>
        )}

        {/* MAIN INPUT ROW */}

        <div
          className="
            relative
            flex
            items-end
            gap-2
            sm:gap-3
          "
        >
          {/* HIDDEN IMAGE INPUT */}

          <input
            type="file"
            accept="image/*"
            className="hidden"
            id="chat-image-upload-bottom"
            onChange={(e) => {
              const file = e.target.files?.[0];

              if (!file) return;

              setSelectedImage({
                file,
                preview: URL.createObjectURL(file),
              });

              e.target.value = "";
            }}
          />

          {/* TEXTAREA */}

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
              block
              min-w-0
              flex-1
              max-h-50
              min-h-9.5
              resize-none
              overflow-y-auto
              bg-transparent
              px-2
              py-1.5
              text-[13.5px]
              leading-6
              outline-none

              sm:min-h-10
              sm:text-[14.5px]

              ${theme.placeholder}
            `}
          />

          {/* IMAGE BUTTON */}

          <label
            htmlFor="chat-image-upload-bottom"
            className={`
              flex
              h-9
              w-9
              shrink-0
              cursor-pointer
              items-center
              justify-center
              rounded-full
              border
              transition-all
              duration-200
              hover:scale-105
              active:scale-95

              ${theme.border}
              ${theme.muted}
              ${theme.hover}
            `}
            aria-label="Upload image"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="h-4 w-4"
            >
              <rect
                x="3"
                y="4"
                width="18"
                height="16"
                rx="3"
                stroke="currentColor"
                strokeWidth="1.7"
              />

              <circle
                cx="8.5"
                cy="9"
                r="1.5"
                stroke="currentColor"
                strokeWidth="1.7"
              />

              <path
                d="m4.5 17 4.5-4.5 3.5 3 2.5-2.5 4.5 4"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </label>

          {/* SEND */}

          <button
            type="submit"
            disabled={!message.trim() && !selectedImage}
            className="
              flex
              h-9
              w-9
              shrink-0
              items-center
              justify-center
              rounded-full
              bg-linear-to-br
              from-[#EFD69C]
              via-[#CFA458]
              to-[#96742E]
              text-[#0c0c0e]
              shadow-[0_7px_20px_-8px_rgba(207,164,88,.7)]
              transition-all
              duration-200
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
      </div>
    </form>
  );
};

export default ChatComposer;