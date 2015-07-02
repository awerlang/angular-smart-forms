function isoDate() {
    return {
        restrict: 'A',
		require: 'ngModel',
        link: function (scope, element, attrs, ngModelCtrl) {
			ngModelCtrl.$parsers.push(function isoDateParser(value) {
				if (angular.isDate(value)) {
					return value.toISOString().substring(0, 10) + 'T00:00:00.000Z';
				}
				return value;
			});
			ngModelCtrl.$formatters.push(function isoDateFormatter(value) {
				if (angular.isString(value))
				{
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

function isoDateFilter($filter) {
  var dateFilter = $filter('date');
  return function (date, format) {
    return dateFilter(date, format || 'shortDate', 'UTC');
  };
}
