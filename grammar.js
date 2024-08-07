/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

module.exports = grammar({
  name: "typescript",

  rules: {
    source_file: $ => repeat($._statement),

    _statement: $ => choice(
      $.import_declaration,
      $.export_statement,
      $.function_declaration,
      $.variable_declaration,
      $.expression_statement
    ),

    import_declaration: $ => seq(
      'import',
      choice(
        seq($.import_clause, 'from'),
        $.string
      ),
      $.string,
      optional(';')
    ),

    export_statement: $ => choice(
      seq('export', '*', 'from', $.string, optional(';')),
      seq('export', $.declaration)
    ),

    function_declaration: $ => seq(
      'function',
      $.identifier,
      $.parameter_list,
      $.statement_block
    ),

    variable_declaration: $ => seq(
      choice('var', 'let', 'const'),
      $.identifier,
      optional(seq('=', $._expression)),
      optional(';')
    ),

    expression_statement: $ => seq($._expression, optional(';')),

    _expression: $ => choice(
      $.identifier,
      $.number,
      $.string
    ),

    identifier: () => /[a-zA-Z_]\w*/,
    number: () => /\d+/,
    string: () => /'[^']*'|"[^"]*"/,

    import_clause: $ => choice(
      $.namespace_import,
      $.named_imports,
      seq($.identifier, optional(seq(',', $.named_imports)))
    ),

    namespace_import: $ => seq('*', 'as', $.identifier),
    named_imports: $ => seq(
      '{',
      optional(seq(
        $.import_specifier,
        repeat(seq(',', $.import_specifier)),
        optional(',')
      )),
      '}'
    ),
    import_specifier: $ => choice(
      $.identifier,
      seq($.identifier, 'as', $.identifier)
    ),

    declaration: $ => choice(
      $.function_declaration,
      $.variable_declaration
    ),

    parameter_list: $ => seq(
      '(',
      optional(seq(
        $.identifier,
        repeat(seq(',', $.identifier))
      )),
      ')'
    ),

    statement_block: $ => seq(
      '{',
      repeat($._statement),
      '}'
    )
  }
});
