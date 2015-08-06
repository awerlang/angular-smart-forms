function smartForm() {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.on('input', tabOnMaxLength);
            element.on('keydown', tabOnEnter);

            function tabOnMaxLength(event) {
                var maxLength = event.target.maxLength;
                if (maxLength && event.target.value.length === maxLength) {
                    tabToNext(event.target, element[0]);
                }
            }
            function tabOnEnter(event) {
                if (event.which === KEYS.RETURN) {
                    var el = event.target;
                    switch (el.tagName) {
                        case "INPUT":
                            if (el.type === "submit" || el.type === "button") return;
                        case "SELECT":
                            tabToNext(event.target, element[0]);
                            event.preventDefault();
                            break;
                    }
                }
            }
        }
    };
}
