module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json", // Adjust the path if necessary
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "next/core-web-vitals",
  ],
  rules: {
    // Disable warnings for missing dependencies in useEffect
    "react-hooks/exhaustive-deps": "off",

    // Disable the warning for using <img> instead of <Image>
    "@next/next/no-img-element": "off",

    // Disable the forbidden `require()` import warning
    "@typescript-eslint/no-require-imports": "off",

    // Other ESLint rules can be added or adjusted here based on your needs
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
