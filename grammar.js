/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

module.exports = grammar({
  name: "vercel_foundation",

  rules: {
    // TODO: add the actual grammar rules
    source_file: $ => "hello"
  }
});
