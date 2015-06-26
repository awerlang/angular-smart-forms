function numberInput() {
    return {
        restrict: 'A',
        priority: 1,
        require: 'ngModel',
        link: function(scope, element, attrs, ngModelCtrl) {
            element.attr('type', 'text');

            ngModelCtrl.$parsers.unshift(function (value) {
              if (value == null) return value;
              if (value.trim() === '') return null;

              return parseToModel(value);
            });
            ngModelCtrl.$formatters.unshift(function (value) {
              if (value == null) return value;

              return formatWithThousandSep(value);
            });
            element.on('focusout', function(e) {
                var inputVal = element.val();
                if (inputVal === '') return;

                element.val(formatWithDecimalSep(inputVal));
            });
            element.on('input', function(e) {
                var inputVal = element.val();

                var res = formatOnInput(inputVal);

                if (ngModelCtrl.$viewValue === res) return;
                
                scope.$apply(function() {
                  //element.val(res);
                  ngModelCtrl.$setViewValue(res);
                  ngModelCtrl.$render();
                });

            });

        }
    };
}

function splice(intPart, idx, rem, s) {
  return intPart.slice(0, idx) + s + intPart.slice(idx + Math.abs(rem));
}

function formatWithThousandSep(nStr)
{
  nStr += '';
  var x = nStr.split('.');
  var x1 = x[0];
  var x2 = x.length > 1 ? ',' + x[1] : '';
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
      x1 = x1.replace(rgx, '$1' + '.' + '$2');
  }
  return x1 + x2;
}

function formatWithDecimalSep(value) {
  var regex = /\,(\d*)/;
  var result = regex.exec(value);
  var decPart = 2 - (result ? result[1].length : 0);
  if (result && result[0] == null) value = "0" + value;
  if (result === null) value += ',';
  while (decPart-- > 0) value += "0";
  return value;
}

function parseToModel(value) {
  return parseFloat(value.replace(/\./g, '').replace(',', '.'));
}

function formatOnInput(value) {
  var inputVal = value;
  //clearing left side zeros
  while (inputVal.charAt(0) === '0' && inputVal.charAt(0) !== ',') {
      inputVal = inputVal.substr(1);
  }
  
  if (inputVal.charAt(0) === ',') inputVal = '0' + inputVal;
  
  inputVal = inputVal.replace(/[^\d.\',']/g, '');

  var point = inputVal.indexOf(",");
  if (point >= 0) {
      inputVal = inputVal.slice(0, point + 3);
  }

  var decimalSplit = inputVal.split(",");
  var intPart = decimalSplit[0];
  var decPart = decimalSplit[1];

  intPart = intPart.replace(/[^\d]/g, '');
  if (intPart.length > 3) {
      var intDiv = Math.floor(intPart.length / 3);
      while (intDiv > 0) {
          var lastComma = intPart.indexOf(".");
          if (lastComma < 0) {
              lastComma = intPart.length;
          }

          if (lastComma - 3 > 0) {
              intPart = splice(intPart, lastComma - 3, 0, ".");
          }
          intDiv--;
      }
  }

  if (decPart === undefined) {
      decPart = "";
  }
  else {
      decPart = "," + decPart;
  }
  var res = intPart + decPart;
  return res;
}