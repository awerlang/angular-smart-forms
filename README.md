# angular-smart-forms

Angular components for making HTML forms smart.
Compatible with **AngularJS 1.3.4+**.

[Live Demo](http://awerlang.github.io/angular-smart-forms/examples/)

## Why?

HTML5 forms are getting smarter. Let's help this process.

This project provides some directives to be applied on forms and form elements, 
to handle specific requirements not yet covered by native implementations.  

Behaviours implemented:

 * Focus first element on page load;
 * Focus first invalid element on submit, in case it fails;
 * Focus next element on pressing ENTER key;
 * Focus next element on completing input an element;

All this work is based on the following assumptions:

* If it is *flexible*, then it would solve most problems, even ones not aimed by the library author's;
* Provide *convenience* without sacrificing flexibility;
* By keeping *code base simple*, it is easier to reason about and evolve;
* By fully covering with tests, it can *evolve without introducing bugs*.

## Installation

### Bower

    bower install angular-smart-forms --save

### Application

#### HTML

    <script type="text/javascript" src="release/angular-smart-forms.min.js"></script>

#### JavaScript

    var app = angular.module('app', ['wt.smart']);

## License

MIT
