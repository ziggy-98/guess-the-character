module.exports = {
  presets: [
    ["@babel/preset-react", {"runtime": "automatic"}],
    "@babel/preset-typescript",
  ],
  plugins: [
    "@babel/plugin-syntax-dynamic-import",
    "@babel/plugin-transform-runtime",
    "@babel/plugin-proposal-export-default-from",
    "@babel/plugin-proposal-nullish-coalescing-operator",
  ]
};