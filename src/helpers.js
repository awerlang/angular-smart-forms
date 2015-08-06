var KEYS = {
  RETURN: 13,
  
  SPACE: 32,
  
  PLUS: 43,
  COMMA: 44,
  MINUS: 45,
  DOT: 46
};

function isItMobile() {
    return ('ontouchstart' in document.documentElement && window.innerWidth < 768);
}

function map(array, callbackFn) {
  return Array.prototype.map.call(array, callbackFn);
}

function find(element, selector) {
    return angular.element(map(element, function (item) {
      return item.querySelector(selector);
    }));
}
