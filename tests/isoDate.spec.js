/* global inject */
/// <reference path="../typings/jquery/jquery.d.ts"/>
/// <reference path="../typings/angularjs/angular.d.ts"/>
/// <reference path="../typings/jasmine/jasmine.d.ts"/>

describe("isoDate", function () {
	var testElement,
		scope;

	beforeEach(module('wt.smart'));
	beforeEach(inject(function ($rootScope, $compile) {
		scope = $rootScope.$new();

		testElement = $([
			'<input type="date" ng-model="date" wt-iso-date>',
		].join(''));
		testElement.appendTo(document.body);

		$compile(testElement)(scope);
	}));

	afterEach(function () {
		testElement.remove();
	});
	
	describe('reading from model', function () {

		it("formats an undefined value as an empty string", function () {
			scope.date = undefined;
			scope.$digest();
			expect(testElement.val()).toEqual('');
		});
	
		it("formats a null value as an empty string", function () {
			scope.date = null;
			scope.$digest();
			expect(testElement.val()).toEqual('');
		});
	
		it("formats an empty string as an empty string", function () {
			scope.date = '';
			scope.$digest();
			expect(testElement.val()).toEqual('');
		});
	
		it("formats an ISO date string as a date", function () {
			expect(testElement.val()).toEqual('');
	
			scope.date = '2015-05-25';
			scope.$digest();
			expect(testElement.val()).toEqual('2015-05-25');
		});
	
		it("formats an ISO date string as a date, ignoring time portion", function () {
			expect(testElement.val()).toEqual('');
	
			scope.date = '2015-05-25T00:00:00';
			scope.$digest();
			expect(testElement.val()).toEqual('2015-05-25');
		});
	});
	
	describe('reading from view', function () {

		it("parses an empty string as a null value", function () {
			testElement.prop('valueAsDate', null);
			testElement.trigger($.Event('input'));
			expect(scope.date).toEqual(null);
		});

		it("parses a date value as an ISO date string", function () {
			testElement.prop('valueAsDate', new Date(2015, 4, 26));
			testElement.trigger($.Event('input'));
			expect(scope.date).toEqual("2015-05-26T00:00:00.000Z");
		});
	});
});
