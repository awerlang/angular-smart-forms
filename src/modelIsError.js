function modelIsError() {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attrs, ngModelCtrl) {
            ngModelCtrl.$validators['modelIsError'] = function (modelValue, viewValue) {
                return modelValue !== true;
            };
        }
    };
}
