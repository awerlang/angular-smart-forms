'use strict';

angular.module('wt.smart', [])
    .directive('wtAutoFocus', [autoFocus])
    .directive('ngInclude', [ngIncludeFocus])
    .directive('wtSmartForm', [smartForm])
    .directive('wtIsoDate', [isoDate])
    .filter('wtIsoDate', ['$filter', isoDateFilter])
    .directive('wtNumber', [numberInput])
    .directive('wtNumpad', [numpadInput])
    .directive('wtModelIsError', [modelIsError]);
