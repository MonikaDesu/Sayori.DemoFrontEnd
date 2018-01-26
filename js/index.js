const submitter = document.getElementById('poem-submitter');
const spinner = document.getElementById('poem-spinner');
const poemCard = document.getElementById('poem-card');
const poemImg = document.getElementById('poem-card-img');
const errCard = document.getElementById('error-card');

let font = 'm1';

M.Dropdown.init(document.getElementById('poem-dropdown'));
submitter.addEventListener('click', function() {
    this.classList.add('disabled');
    errCard.classList.add('hidden');
    spinner.classList.remove('hidden');

    sendPoem().then(() => {
        this.classList.remove('disabled');
        spinner.classList.add('hidden');
    });
});

function sendPoem() {
    return new Promise((resolve, reject) => {
        let text = document.getElementById('poem-text').value;
        let payload = {
            font: font,
            poem: text
        };
        let req = new XMLHttpRequest();

        req.open('POST', 'http://sy-staging.herokuapp.com/generate', true);
        req.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
        req.send(JSON.stringify(payload));

        req.addEventListener('load', function() {
            if (this.status !== 200) return handleError(new Error(`Failed to generate poem: ${this.statusText}`));

            let resp = JSON.parse(this.responseText);

            if (resp.error) return handleError(new Error(resp.error));

            poemCard.classList.remove('hidden');

            poemImg.href = resp.url;
            poemImg.children[0].src = resp.url;
        });
    });
}

function handleError(err) {
    console.log(err)
}