(function() {
    if (!window.allowPassThrough) return;

    const submitter = document.getElementById('poem-submitter');
    const spinner = document.getElementById('poem-spinner');
    const poemCard = document.getElementById('poem-card');
    const poemImg = document.getElementById('poem-card-img');
    const errCard = document.getElementById('error-card');
    const loading = document.getElementsByClassName('loading')[0];
    const toasts = [];

    window.font = 'm1';

    function makeToast(text) {
        // This actually broke Materialize.
        //for (let oldToast of toasts) oldToast.dismiss();

        toasts.push(M.toast({ html: text }));
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
            }
            else if (!['m1', 'n1', 's1', 'y1', 'y2', 'y3'].includes(font)) {
                makeToast('Invalid font. Please use the dropdown to select a font.');
                return resolve();
            }

            poemCard.classList.add('hidden');

            req.open('POST', 'https://sayori.headbow.stream/generate', true);
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

    setTimeout(() => {
        loading.style.opacity = '0';

        setTimeout(() => {
            loading.style.display = 'none';
        }, 750);
    }, 1000);
})();

// analytics reminder

setTimeout(() => {
    let toasts = [];
    function makeToast(text) {
        // This actually broke Materialize.
        for (var oldToast of toasts) oldToast.dismiss();

        toasts.push(M.toast({ html: text }));
    }
    makeToast("Hey fam, just a little reminder we're analyzing data using Google Analytics to improve user experience. Don't worry, we only collect browser version and traffic, not personal info, Promise~!");
}, 1000);


