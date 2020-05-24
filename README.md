# JavaScript Blueprint Notation

## Introduction
JavaScript Blueprint Notation, JSBN, is a middleware to transform blueprint to JSON data, according to some instructions.

## Functions
`$vars` (object) Key-value pairs where each key is the variable name of its corresponding value.
  * Special function for variable declaration. The variables are visible from the current scopes throughout its subobjects.

`$var` (string) The name of the variable to refer.
  * Return the value of the specified variable.

`$duplicate`
  * `%content` (object) The data to duplicate.
  * `%count` (number) The amount to duplicate.
  * Return the data after generating from `%content` repeatedly for `%count` times.

`$pick`
  * `%options` (array) Available options to choose from.
  * `%distinct` (boolean) If set true, chosen options will be removed from the options array.
  * Randomly select an element from `%options` to return. Remove it from `%options` if `%distinct`.

`$random`
  * `%from` (number)
  * `%to` (number)
  * Generate a random number from `%from` to `%to`.

## License
[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2019, veringsek