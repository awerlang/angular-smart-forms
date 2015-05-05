function TestController() {
    this.submitForm = function () {
        this.message = "Submitted at " + new Date().toLocaleString();
    };
}

angular.module('app', ['wt.smart'])
    .controller('TestController', TestController);
