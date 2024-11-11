tailwind.config = {
  theme: {
    extend: {
      colors: {
        warmYellow: "#FFEFC9 ",
        yellow: "#FED425",
        white: "#FFFFFF",
        offwhite: "#F9F8F7",
        gray: "#EFEFEF",
        white2: "#EEF0F2",
        brown: "#451503",
        orange: "#C98269",
        error: "#F96262",
        errorlight: "#F962621A",
        placeholder: "#45150333",
        hover: "#4515030A",
      },
      boxShadow: {
        custom: "0px 4px 12px 0px #45150314",
        custom2: "0px 4px 12px 0px rgba(69, 21, 3, 0.078)",
        modal: "0px 4px 12px 0px #45150329",
        time: "0px 4px 12px 0px #45150314",
        tag: "0px 4px 12px 0px #45150314",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        jetbrains: ["JetBrains Mono", "monospace"],
        inknut: ["Inknut Antiqua", "serif"],
      },
      backgroundColor: {
        "black-transparent": "#00000099", // Custom background color
      },
      backdropBlur: {
        8: "8px", // Custom blur value
      },
    },
  },
};
