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
  var script = document.createElement("script");
  script.src = "my-es6-file.js";
  document.head.appendChild(script);
  console.log('Browser supports ECMAScript 6.')
} else {
     instance.open();
}