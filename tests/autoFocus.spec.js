/* global inject */
/// <reference path="../typings/jquery/jquery.d.ts"/>
/// <reference path="../typings/angularjs/angular.d.ts"/>
/// <reference path="../typings/jasmine/jasmine.d.ts"/>

describe("autoFocus", function () {
	var testElement,
		scope;

	beforeEach(module('wt.smart'));
	beforeEach(inject(function ($rootScope, $compile) {
		scope = $rootScope.$new();

		testElement = $([
			'<form wt-auto-focus>',
			'  <input type="text" id="f1" maxlength="3" value="f1">',
			'  <input type="text" id="f2" value="f2">',
			'  <input type="text" id="f3" value="f3" disabled>',
			'  <fieldset>',
			'    <input type="text" id="f4" value="f4">',
			'  </fieldset>',
			'  <input type="text" id="f5" value="f5">',
			'</form>'
		].join(''));
		testElement.appendTo(document.body);

		$compile(testElement)(scope);
	}));

	afterEach(function () {
		testElement.remove();
	});

	it("focus on $viewContentLoaded", function () {
		expect(document.activeElement.id).toEqual('');
		
		scope.$broadcast('$viewContentLoaded');
		expect(document.activeElement.id).toEqual('f1');
	});

	it("focus on $includeContentLoaded", function () {
		expect(document.activeElement.id).toEqual('');
		
		scope.$broadcast('$includeContentLoaded');
		expect(document.activeElement.id).toEqual('f1');
	});
});