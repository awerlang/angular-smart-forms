function isItMobile() {
    return ('ontouchstart' in document.documentElement && window.innerWidth < 768);
}
