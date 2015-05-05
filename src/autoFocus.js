function autoFocus() {
    if (isItMobile()) return {};

    return {
        restrict: 'A',
        link: function (scope, element) {
            scope.$on('$viewContentLoaded', setFocusOnPartialLoaded);
            scope.$on('$includeContentLoaded', setFocusOnPartialLoaded);

            element.on('submit', setFocusOnFormSubmit);

            function setFocus(selector) {
                var firstElement = element[0].querySelector(selector);
                if (firstElement) {
                    console.log(firstElement.id);
                    firstElement.focus();
                }
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
