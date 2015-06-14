'use strict';

angular.module('wt.smart', [])
    .directive('wtAutoFocus', [autoFocus])
    .directive('wtSmartForm', [smartForm])
    .directive('wtIsoDate', [isoDate])
    .directive('wtNumber', [numberInput]);
