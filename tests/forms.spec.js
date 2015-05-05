/* global inject */
/// <reference path="../typings/jquery/jquery.d.ts"/>
/// <reference path="../typings/angularjs/angular.d.ts"/>
/// <reference path="../typings/jasmine/jasmine.d.ts"/>

describe("forms", function () {
	var testElement;

	beforeEach(module('wt.smart'));
	beforeEach(inject(function ($rootScope, $compile) {
		var scope = $rootScope.$new();

		testElement = $([
			'<form wt-smart-form>',
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

	it("tab on max length", function () {
		expect(document.activeElement.id).toEqual('');
		var f1 = testElement.find('input');
		f1[0].focus();
		expect(document.activeElement.id).toEqual('f1');
		f1.val("123");
		
		f1.trigger($.Event('input'));
		
		expect(document.activeElement.id).toEqual('f2');
	});

	it("tab on enter", function () {
		expect(document.activeElement.id).toEqual('');
		var f1 = testElement.find('input');
		f1[0].focus();

		f1.trigger($.Event('keydown', {which: 13}));
		
		expect(document.activeElement.id).toEqual('f2');
	});
});