// https://github.com/awerlang/angular-smart-forms
(function() {
    function isItMobile() {
        return "ontouchstart" in document.documentElement && window.innerWidth < 768;
    }
    function findNextTabStop(el, parent) {
        var universe = (parent || document).querySelectorAll("input, button, select, textarea, a[href]");
        var list = Array.prototype.filter.call(universe, function(item) {
            return item.tabIndex >= "0";
        });
        var index = list.indexOf(el);
        return list[index + 1] || list[0];
    }
    function tabToNext(currentElement, parent) {
        var nextElement = findNextTabStop(currentElement);
        if (nextElement) {
            nextElement.focus();
        }
    }
    function smartForm() {
        return {
            restrict: "A",
            link: function(scope, element, attrs) {
                element.on("input", tabOnMaxLength);
                element.on("keydown", tabOnEnter);
                function tabOnMaxLength(event) {
                    var maxLength = event.target.maxLength;
                    if (maxLength && event.target.value.length === maxLength) {
                        tabToNext(event.target, element[0]);
                    }
                }
                function tabOnEnter(event) {
                    if (event.which === 13) {
                        var el = event.target;
                        switch (el.tagName) {
                          case "INPUT":
                            if (el.type === "submit" || el.type === "button") return;

                          case "SELECT":
                            tabToNext(event.target, element[0]);
                            event.preventDefault();
                            break;
                        }
                    }
                }
            }
        };
    }
    function autoFocus() {
        if (isItMobile()) return {};
        return {
            restrict: "A",
            link: function(scope, element) {
                scope.$on("$viewContentLoaded", setFocusOnPartialLoaded);
                scope.$on("$includeContentLoaded", setFocusOnPartialLoaded);
                element.on("submit", setFocusOnFormSubmit);
                function setFocus(selector) {
                    var firstElement = element[0].querySelector(selector);
                    if (firstElement) {
                        firstElement.focus();
                    }
                }
                function setFocusOnPartialLoaded() {
                    setFocus([ "input:not([disabled])", "select:not([disabled])", "fieldset:not([disabled]) input:not([disabled])", "fieldset:not([disabled]) select:not([disabled])" ].join(","));
                }
                function setFocusOnFormSubmit() {
                    setFocus(".ng-invalid");
                }
            }
        };
    }
    function isoDate() {
        return {
            restrict: "A",
            require: "ngModel",
            link: function(scope, element, attrs, ngModelCtrl) {
                ngModelCtrl.$parsers.push(function isoDateParser(value) {
                    console.debug("parse", typeof value, value);
                    return value && value.toISOString().substring(0, 10) + "T00:00:00.000Z";
                });
                ngModelCtrl.$formatters.push(function isoDateFormatter(value) {
                    console.debug("format", typeof value, value);
                    if (typeof value === "string") {
                        var regex = /(\d{4})-(\d{2})-(\d{2})T?.*/;
                        var dateParts = regex.exec(value);
                        if (dateParts) {
                            return new Date(parseInt(dateParts[1], 10), parseInt(dateParts[2], 10) - 1, parseInt(dateParts[3], 10));
                        }
                    }
                    return value;
                });
            }
        };
    }
    "use strict";
    angular.module("wt.smart", []).directive("wtAutoFocus", [ autoFocus ]).directive("wtSmartForm", [ smartForm ]).directive("wtIsoDate", [ isoDate ]);
})();