'use strict';

angular.module('wt.smart', [])
    .directive('wtAutoFocus', [autoFocus])
    .directive('wtSmartForm', [smartForm])
    .directive('wtIsoDate', [isoDate])
    .filter('wtIsoDate', ['$filter', isoDateFilter])
    .directive('wtNumber', [numberInput]);
