var supportsOurES6 = (function() {
    try {
        new Function("() => null;");
        new Function("const foo = null;");
        new Function("let foo = null;");

        if (!window.Promise) {
            return false;
        } else {
            return true;
        }
    } catch(err) {
        return false;
    }
})();

if (supportsOurES6) {
    window.allowPassThrough = true;
    console.log('Browser supports what we need.');
} else {
    window.allowPassThrough = false;
    M.Modal.init(document.getElementById('unsupported-modal'), {dismissible: false}).open();
}