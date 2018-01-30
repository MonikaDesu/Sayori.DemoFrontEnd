var a = function() {
  try {
    new Function("(a = 0) => a");
    return true;
  }
  catch (err) {
    return false;
  }
}();

var elem = document.getElementById('unsupported-modal');
var instance = M.Modal.init(elem, {
    dismissible: false
});

if (a) {
  console.log('Browser supports ECMAScript 6.');
} else {
  instance.open();
  console.error('Browser does not support ECMAScript 6.')
}