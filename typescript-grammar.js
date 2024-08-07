module.exports = grammar({
  name: 'typescript',

  rules: {
    source_file: $ => repeat($._statement),

    _statement: $ => choice(
      $.import_statement,
      $.export_statement,
      $.function_declaration,
      $.variable_declaration,
      // Add more statement types as needed
    ),

    // Define other rules here
  }
});
