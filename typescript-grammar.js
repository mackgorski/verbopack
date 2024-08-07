const {Grammar, Rule} = require('tree-sitter');

function grammar(config) {
  return new Grammar(config);
}

function rule(name) {
  return new Rule(name);
}

function choice(...args) {
  return {type: 'CHOICE', members: args};
}

function seq(...args) {
  return {type: 'SEQ', members: args};
}

function repeat(rule) {
  return {type: 'REPEAT', content: rule};
}

function optional(rule) {
  return {type: 'CHOICE', members: [rule, {type: 'BLANK'}]};
}

function prec(precedence, rule) {
  return {type: 'PREC', value: precedence, content: rule};
}

module.exports = grammar({
  name: 'typescript',

  rules: {
    source_file: () => repeat(rule('_statement')),

    _statement: () => choice(
      rule('import_declaration'),
      rule('export_statement'),
      rule('function_declaration'),
      rule('variable_declaration'),
      rule('interface_declaration'),
      rule('class_declaration'),
      rule('type_alias_declaration'),
      rule('enum_declaration'),
      rule('expression_statement')
    ),

    import_declaration: () => seq(
      'import',
      choice(
        seq(rule('import_clause'), 'from'),
        rule('string')
      ),
      rule('string'),
      ';'
    ),

    import_clause: $ => choice(
      $.namespace_import,
      $.named_imports,
      seq($.identifier, optional(seq(',', $.named_imports)))
    ),

    export_statement: $ => choice(
      $.export_declaration,
      seq('export', $.declaration)
    ),

    export_declaration: $ => choice(
      seq('export', '*', 'from', $.string, ';'),
      seq('export', $.import_clause, 'from', $.string, ';'),
      seq('export', '{', commaSep($.export_specifier), '}', optional(seq('from', $.string)), ';')
    ),

    export_specifier: $ => seq(
      $.identifier,
      optional(seq('as', $.identifier))
    ),

    declaration: $ => choice(
      $.function_declaration,
      $.variable_declaration,
      $.class_declaration,
      $.interface_declaration,
      $.type_alias_declaration,
      $.enum_declaration
    ),

    function_declaration: $ => seq(
      'function',
      $.identifier,
      $.parameter_list,
      optional(seq(':', $.type)),
      $.statement_block
    ),

    variable_declaration: $ => seq(
      choice('var', 'let', 'const'),
      $.identifier,
      optional(seq(':', $.type)),
      optional(seq('=', $._expression)),
      ';'
    ),

    interface_declaration: $ => seq(
      'interface',
      $.identifier,
      optional($.type_parameters),
      optional($.extends_clause),
      $.object_type
    ),

    class_declaration: $ => seq(
      'class',
      $.identifier,
      optional($.type_parameters),
      optional($.extends_clause),
      optional($.implements_clause),
      $.class_body
    ),

    type_alias_declaration: $ => seq(
      'type',
      $.identifier,
      optional($.type_parameters),
      '=',
      $.type,
      ';'
    ),

    enum_declaration: $ => seq(
      optional('const'),
      'enum',
      $.identifier,
      $.enum_body
    ),

    expression_statement: $ => seq($._expression, ';'),

    _expression: $ => choice(
      $.identifier,
      $.number,
      $.string,
      $.true,
      $.false,
      $.null,
      $.object,
      $.array
    ),

    identifier: () => /[a-zA-Z_]\w*/,
    number: () => /\d+/,
    string: () => /'[^']*'|"[^"]*"/,
    true: () => 'true',
    false: () => 'false',
    null: () => 'null',

    object: $ => seq(
      '{',
      optional(seq(
        $.pair,
        repeat(seq(',', $.pair)),
        optional(',')
      )),
      '}'
    ),

    array: $ => seq(
      '[',
      optional(seq(
        $._expression,
        repeat(seq(',', $._expression)),
        optional(',')
      )),
      ']'
    ),

    pair: $ => seq(
      choice($.identifier, $.string),
      ':',
      $._expression
    ),

    type: $ => choice(
      $.identifier,
      $.union_type,
      $.intersection_type,
      $.function_type,
      $.object_type,
      $.array_type
    ),

    union_type: $ => prec.left(1, seq($.type, '|', $.type)),
    intersection_type: $ => prec.left(1, seq($.type, '&', $.type)),
    function_type: $ => seq($.parameter_list, '=>', $.type),
    object_type: $ => seq('{', optional(seq($.type_member, repeat(seq(',', $.type_member)), optional(','))), '}'),
    array_type: $ => seq($.type, '[]'),

    parameter_list: $ => seq('(', optional(seq($.parameter, repeat(seq(',', $.parameter)))), ')'),
    parameter: $ => seq($.identifier, optional(seq(':', $.type))),

    statement_block: $ => seq('{', repeat($._statement), '}'),

    type_parameters: $ => seq('<', $.type_parameter, repeat(seq(',', $.type_parameter)), '>'),
    type_parameter: $ => seq($.identifier, optional(seq('extends', $.type))),

    extends_clause: $ => seq('extends', $.type),
    implements_clause: $ => seq('implements', $.type, repeat(seq(',', $.type))),

    class_body: $ => seq('{', repeat($.class_member), '}'),
    class_member: $ => choice(
      $.method_definition,
      $.property_definition
    ),

    method_definition: $ => seq(
      optional('static'),
      $.identifier,
      $.parameter_list,
      optional(seq(':', $.type)),
      $.statement_block
    ),

    property_definition: $ => seq(
      optional('static'),
      $.identifier,
      optional(seq(':', $.type)),
      optional(seq('=', $._expression)),
      ';'
    ),

    enum_body: $ => seq('{', optional(seq($.enum_member, repeat(seq(',', $.enum_member)), optional(','))), '}'),
    enum_member: $ => seq($.identifier, optional(seq('=', $._expression))),

    type_member: $ => choice(
      seq($.identifier, optional('?'), ':', $.type),
      seq('[', $.identifier, ':', $.type, ']', ':', $.type)
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
    )
  }
});

function commaSep(rule) {
  return optional(seq(rule, repeat(seq(',', rule)), optional(',')));
}

module.exports.commaSep = commaSep;
