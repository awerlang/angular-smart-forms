/* global inject */
/// <reference path="../typings/jquery/jquery.d.ts"/>
/// <reference path="../typings/angularjs/angular.d.ts"/>
/// <reference path="../typings/jasmine/jasmine.d.ts"/>

describe("number directive", function () {
	var testElement,
		scope,
		$compile;

	beforeEach(module('wt.smart'));
	beforeEach(inject(function ($rootScope, _$compile_) {
		$compile = _$compile_;
		scope = $rootScope.$new();
	}));

	afterEach(function () {
		testElement.remove();
	});

	describe('same element', function () {
	
		beforeEach(function () {
			testElement = $([
				'<input type="text" ng-model="code" wt-numpad>'
			].join(''));
			testElement.appendTo(document.body);
			$compile(testElement)(scope);
		});
	
		it("input type is number", function () {
			expect(testElement.attr('type')).toEqual('number');
			expect(testElement.attr('class')).toContain('wt-numpad');
		});
		
		it("only digits are allowed", function () {
			testElement.focus();
			testElement.val('');

			function testKey(which, shouldPreventDefault) {
				var event = $.Event('keypress', {which});
				testElement.trigger(event);
	
				expect(event.isDefaultPrevented()).toEqual(shouldPreventDefault === true);
			}
			
			testKey(KEYS.COMMA, true);
			testKey(KEYS.DOT, true);
			testKey(KEYS.MINUS, true);
			testKey(KEYS.PLUS, true);
			//testKey(KEYS.RETURN, true);
			//testKey(KEYS.SPACE, true);
			
			testKey(49, false);
			testKey(50, false);
			testKey(51, false);
		});
	
	});

	describe('child element', function () {
		var innerEl;
		
		beforeEach(function () {
			testElement = $('<div wt-numpad=".search-box">');
			innerEl = $('<input class="search-box" type="text" ng-model="code">');
			innerEl.appendTo(testElement);
			testElement.appendTo(document.body);
			$compile(testElement)(scope);
		});

		it("input type is number", function () {
			expect(innerEl.attr('type')).toEqual('number');
			expect(innerEl.attr('class')).toContain('wt-numpad');
		});

	});
});
