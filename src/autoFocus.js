function autoFocus() {
    if (isItMobile()) return {};

    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            if (angular.isDefined(attrs['uiView'])) {
                scope.$on('$viewContentLoaded', setFocusOnPartialLoaded);
            } else {
                scope.$on('$includeContentLoaded:focus', setFocusOnPartialIncluded);
            }
            if (element[0].tagName === 'FORM') {
                element.on('submit', setFocusOnFormSubmit);
            }

            function setFocus(selector, sourceElement) {
                scope.$applyAsync(function () {
                    var firstElement = (sourceElement || element)[0].querySelector(selector);
                    if (firstElement) {
                        firstElement.focus();
                    }
                });
            }
            function setFocusOnPartialIncluded(event, data) {
                setFocus([
                    'input:not([disabled])',
                    'select:not([disabled])',
                    'fieldset:not([disabled]) input:not([disabled])',
                    'fieldset:not([disabled]) select:not([disabled])'
                ].join(','), data.sourceElement);
            }
            function setFocusOnPartialLoaded() {
                setFocus([
                    'input:not([disabled])',
                    'select:not([disabled])',
                    'fieldset:not([disabled]) input:not([disabled])',
                    'fieldset:not([disabled]) select:not([disabled])'
                ].join(','));
            };
            function setFocusOnFormSubmit() {
                setFocus('.ng-invalid');
            }
        }
    };
}

function ngIncludeFocus() {
    if (isItMobile()) return {};
    return {
        link: function (scope, element) {
            scope.$emit("$includeContentLoaded:focus", { sourceElement: element });
        }
    };
}
