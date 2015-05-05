function findNextTabStop(el, parent) {
    var universe = (parent || document).querySelectorAll('input, button, select, textarea, a[href]');
    var list = Array.prototype.filter.call(universe, function (item) {
        return item.tabIndex >= '0';
    });
    var index = list.indexOf(el);
    return list[index + 1] || list[0];
}

function tabToNext(currentElement, parent) {
    var nextElement = findNextTabStop(currentElement);
    if (nextElement) {
        nextElement.focus();
    }
}