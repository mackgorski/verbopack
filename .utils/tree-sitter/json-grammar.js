module.exports = grammar({
  name: 'json',

  rules: {
    document: $ => choice($.object, $.array),

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
        $._value,
        repeat(seq(',', $._value)),
        optional(',')
      )),
      ']'
    ),

    pair: $ => seq(
      field('key', $.string),
      ':',
      field('value', $._value)
    ),

    _value: $ => choice(
      $.object,
      $.array,
      $.string,
      $.number,
      $.true,
      $.false,
      $.null
    ),

    string: $ => /"(?:[^\\"]|\\.)*"/,
    number: $ => /-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?/,
    true: $ => 'true',
    false: $ => 'false',
    null: $ => 'null'
  }
});
