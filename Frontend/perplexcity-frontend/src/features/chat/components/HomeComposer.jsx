import { useLayoutEffect } from "react";
import { IconArrowUp } from "./Icons";

const HomeComposer = ({
  theme,
  message,
  setMessage,
  selectedImage,
  setSelectedImage,
  textareaRef,
  handleSubmit,
}) => {

  useLayoutEffect(() => {
    const textarea = textareaRef?.current;

    if (!textarea) return;

    textarea.style.height = "auto";

    const maxHeight = 200;

    textarea.style.height = `${Math.min(
      textarea.scrollHeight,
      maxHeight
    )}px`;
  }, [message, textareaRef]);

  return (
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
          bg-linear-to-r
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
          rounded-3xl
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
        {/* IMAGE PREVIEW */}

        {selectedImage && selectedImage.preview && (
          <div
            className="
              mb-2
              flex
              items-center
              gap-3
              rounded-xl
              border
              border-white/10
              bg-black/20
              p-2
            "
          >
            <img
              src={selectedImage.preview}
              alt="Selected"
              className="
                h-14
                w-14
                shrink-0
                rounded-lg
                object-cover
              "
            />

            <div className="min-w-0 flex-1">
              <p className="truncate text-xs text-white">
                {selectedImage.file?.name}
              </p>

              <p className="text-[10px] text-gray-500">
                {selectedImage.file
                  ? (selectedImage.file.size / 1024 / 1024).toFixed(2)
                  : "0.00"}{" "}
                MB
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                if (selectedImage.preview) {
                  URL.revokeObjectURL(selectedImage.preview);
                }

                setSelectedImage(null);
              }}
              className="
                flex
                h-7
                w-7
                shrink-0
                items-center
                justify-center
                rounded-full
                text-gray-400
                transition
                hover:bg-white/10
                hover:text-white
              "
              title="Remove image"
              aria-label="Remove image"
            >
              ×
            </button>
          </div>
        )}

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
            block w-full
            min-h-16
            max-h-50
            resize-none
            overflow-y-auto
            bg-transparent
            px-2.5 py-2
            text-[14px]
            leading-6
            outline-none

            sm:min-h-18
            sm:px-3
            sm:text-[15px]

            ${theme.placeholder}
          `}
        />

        {/* HIDDEN IMAGE INPUT */}

        <input
          type="file"
          accept="image/*"
          id="image-upload-home"
          className="hidden"
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

        {/* BOTTOM ACTIONS */}

        <div
          className="
            flex items-center
            justify-between
            px-1.5 pt-1
            sm:px-2
          "
        >
          <label
            htmlFor="image-upload-home"
            className={`
              flex
              h-9
              w-9
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

          <button
            type="submit"
            disabled={!message.trim() && !selectedImage}
            className="
              flex
              h-9
              w-9
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
              cursor-pointer
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

export default HomeComposer;