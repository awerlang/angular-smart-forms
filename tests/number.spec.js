/* global inject */
/// <reference path="../typings/jquery/jquery.d.ts"/>
/// <reference path="../typings/angularjs/angular.d.ts"/>
/// <reference path="../typings/jasmine/jasmine.d.ts"/>

describe("number directive", function () {
	var testElement,
		scope;

	beforeEach(module('wt.smart'));
	beforeEach(inject(function ($rootScope, $compile) {
		scope = $rootScope.$new();

		testElement = $([
			'<input type="number" ng-model="number" wt-number>',
		].join(''));
		testElement.appendTo(document.body);

		$compile(testElement)(scope);
	}));

	afterEach(function () {
		testElement.remove();
	});

	describe('presents formatted field', function () {
	
		it("as an empty string when model is undefined", function () {
			scope.number = undefined;
			scope.$digest();
			expect(testElement.val()).toEqual('');
		});
	
		it("as an empty string when model is null", function () {
			scope.number = null;
			scope.$digest();
			expect(testElement.val()).toEqual('');
		});

		it("as formatted string when model is defined", function () {
			scope.number = 12345.6;
			scope.$digest();
			expect(testElement.val()).toEqual('12.345,60');
		});
	
		it("appends 2 decimal places when model is integer value", function () {
			scope.number = 12345;
			scope.$digest();
			expect(testElement.val()).toEqual('12.345,00');
		});
	
		xit("rounds to 2 decimal places when necessary", function () {
			scope.number = 12345.678;
			scope.$digest();
			expect(testElement.val()).toEqual('12.345,67');
		});
	});

	describe('while typing', function () {

		it("parses an empty string as a null value", function () {
			testElement.val('');
			testElement.trigger($.Event('input'));
			expect(scope.number).toEqual(null);
		});

		it("parses a numeric value as a number", function () {
			testElement.val('1');
			testElement.trigger($.Event('input'));
			expect(scope.number).toEqual(1);
		});

		it("ignores leading zeros", function () {
			testElement.val('0');
			testElement.trigger($.Event('input'));
			expect(scope.number).toBeNull();

			testElement.val('01');
			testElement.trigger($.Event('input'));
			expect(scope.number).toEqual(1);
		});

		it("limits to 2 decimal places", function () {
			testElement.val('123,456');
			testElement.trigger($.Event('input'));
			expect(testElement.val()).toEqual('123,45');
		});
	});

	describe('on blur', function () {

		it("leave alone if empty", function () {
			testElement.val('');
			testElement.trigger($.Event('focusout'));
			expect(testElement.val()).toEqual('');
			expect(scope.number).toBe(undefined);
		});

		it("appends 2 decimal places as necessary", function () {
			testElement.val('123');
			testElement.trigger($.Event('focusout'));
			expect(testElement.val()).toEqual('123,00');

			testElement.val('123,4');
			testElement.trigger($.Event('focusout'));
			expect(testElement.val()).toEqual('123,40');

			testElement.val('123,45');
			testElement.trigger($.Event('focusout'));
			expect(testElement.val()).toEqual('123,45');
		});
	});
});
