import { IconSparkle, IconArrowRight } from "./Icons";
import HomeComposer from "./HomeComposer";

const HomeScreen = ({
  theme,
  darkMode,
  message,
  setMessage,
  selectedImage,
  setSelectedImage,
  textareaRef,
  handleSubmit,
}) => {
  const suggestions = [
    "Explain JavaScript closures simply",
    "Help me build a React project",
    "Give me a full stack roadmap",
  ];

  return (
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
              bg-linear-to-br
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
            max-w-75
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
        {["For You", "Study", "Business", "Health"].map((item, index) => (
          <button
            key={item}
            type="button"
            style={{
              animation: `fadeInUp .4s ease-out ${index * 0.06}s both`,
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
        ))}
      </div>

      {/* Home Composer */}

      <HomeComposer
        theme={theme}
        message={message}
        setMessage={setMessage}
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
        textareaRef={textareaRef}
        handleSubmit={handleSubmit}
      />

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
            <span className="min-w-0 wrap-break-word">
              {suggestion}
            </span>

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
  );
};

export default HomeScreen;