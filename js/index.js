/* global navigator */
const submitter = document.getElementById('poem-submitter');
const spinner = document.getElementById('poem-spinner');
const poemCard = document.getElementById('poem-card');
const poemImg = document.getElementById('poem-card-img');
const errCard = document.getElementById('error-card');
const browser = get_browser();
const toasts = [];

let font = 'm1';

M.Dropdown.init(document.getElementById('poem-dropdown'));
submitter.addEventListener('click', function() {
    this.classList.add('disabled');
    errCard.classList.add('hidden');
    spinner.classList.remove('hidden');

    sendPoem().then(() => {
        this.classList.remove('disabled');
        spinner.classList.add('hidden');
    }).catch(err => {
        this.classList.remove('disabled');
        spinner.classList.add('hidden');

        handleError(err);
    });
});

console.log(`Detected Browser Version: ${browser.name} ${browser.version} \nInclude this output on when you report an issue in GitHub.`);

function makeToast(text) {
    // This actually broke Materialize.
    //for (let oldToast of toasts) oldToast.dismiss();

    toasts.push(M.toast({html: text}));
}

function sendPoem() {
    return new Promise((resolve, reject) => {
        let text = document.getElementById('poem-text').value;
        let payload = {
            font: font,
            poem: text
        };
        let req = new XMLHttpRequest();

        if (!text) {
            makeToast('Please provide a poem to generate.');
            return resolve();
        } else if (!['m1', 'n1', 's1', 'y1', 'y2', 'y3'].includes(font)) {
            makeToast('Invalid font. Please use the dropdown to select a font.');
            return resolve();
        }

        req.open('POST', 'http://sy-stage-chinodesuuu-run.8a09.starter-us-east-2.openshiftapps.com/generate', true);
        req.setRequestHeader('Content-Type', 'application/json');
        req.send(JSON.stringify(payload));

        req.addEventListener('load', function() {
            if (this.status !== 200) return reject(new Error(`Invalid response code: ${this.statusText}`));

            let resp = JSON.parse(this.responseText);

            if (resp.error) return reject(new Error(resp.error));

            poemCard.classList.remove('hidden');

            poemImg.href = resp.url;
            poemImg.children[0].src = resp.url;

            resolve();
        });
        req.addEventListener('error', () => {
            reject(new Error('An unknown network error occurred.'));
        });
    });
}

function handleError(err) {
    makeToast('Failed to generate poem!');

    errCard.classList.remove('hidden');
    document.getElementById('error-text').innerHTML = err.mesasge || err;
}

/**
 * Gets the browser version 
 * @returns {Object}
 */
function get_browser() {
    var ua = navigator.userAgent,tem,M=ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || []; 
    if(/trident/i.test(M[1])){
        tem=/\brv[ :]+(\d+)/g.exec(ua) || []; 
        return {name:'IE',version:(tem[1]||'')};
        }   
    if(M[1]==='Chrome'){
        tem=ua.match(/\bOPR|Edge\/(\d+)/);
        if(tem!=null)   {return {name:'Opera', version:tem[1]};}
        }   
    M=M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
    if((tem=ua.match(/version\/(\d+)/i))!=null) {M.splice(1,1,tem[1]);}
    return {
      name: M[0],
      version: M[1]
    };
 }