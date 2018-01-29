/* global navigator */
/* global M */

/**
 * Gets the browser version 
 * @returns {Object}
 */
function get_browser() {
    var ua = navigator.userAgent,
        tem, M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if (/trident/i.test(M[1])) {
        tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
        return { name: 'IE', version: (tem[1] || '') };
    }
    if (M[1] === 'Chrome') {
        tem = ua.match(/\bOPR|Edge\/(\d+)/);
        if (tem != null) { return { name: 'Opera', version: tem[1] }; }
    }
    M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
    if ((tem = ua.match(/version\/(\d+)/i)) != null) { M.splice(1, 1, tem[1]); }
    return {
        name: M[0],
        version: M[1]
    };
}


var elem = document.getElementById('unsupported-modal');
var instance = M.Modal.init(elem, {
    dismissible: false
});

var acceptedVersions = [
    "Chrome59",
    "Chrome61",
    "Chrome62",
    "Opera15",
    "Firefox57",
    "Firefox58",
    "Firefox59"
];

//check browser version if in whitelist. If it doesn't exist
if (get_browser().name + get_browser().version !== acceptedVersions) {
    instance.open();
}
