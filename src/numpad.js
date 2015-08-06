function numpadInput() {
  return {
    link: function(scope, element, attrs) {
      var selector = element.attr('wt-numpad'),
          input = selector ? find(element, selector) : element;

      input.attr('type', 'number').addClass('wt-numpad');
      input.on('keypress', function(event) {
        switch (event.which) {
          case KEYS.PLUS:
          case KEYS.COMMA:
          case KEYS.MINUS:
          case KEYS.DOT:
            event.preventDefault();
            break;
        }
      });
    }
  };
}
