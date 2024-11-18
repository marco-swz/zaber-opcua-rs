function handleClickTab(type) {
    document.getElementsByClassName('tab active')[0].classList.remove('active');
    document.querySelector('#tab-' + type).classList.add('active');

    document.querySelector('.visible').classList.remove('visible');
    document.querySelector('#' + type).classList.add('visible');
}

function handleClickRefresh() {
    fetch('/refresh')
        .then(x => x.json())
        .then(x => Object.entries(x)
            .forEach(function([key, val]) {
                document.querySelector('#' + key).innerHTML = val;
            })
        );
}

function handleClickSaveConfig() {
    /** @type {HTMLFormElement} */
    const $form = document.querySelector('#form-config');
    if (!$form.checkValidity()) {
        return;
    }

    fetch('/config', {
        method: 'POST',
        body: new URLSearchParams(new FormData($form)),
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
    })
        .then(() => loadConfig());
}

function handleClickStart() {
    fetch('/start', {
        method: 'POST',
    })
        .then(() => handleClickRefresh());
}

function handleClickStop() {
    fetch('/stop', {
        method: 'POST',
    })
        .then(() => handleClickRefresh());
}

function loadConfig() {
    fetch('/config')
        .then(x => x.json())
        .then(x => Object.entries(x)
            .forEach(function([key, val]) {
                document.querySelector(`[name=${key}]`).value = val;
            })
        );
}

function loadOpcua() {
    fetch('/opcua')
        .then(x => x.json())
        .then(x => {
            let $form = document.querySelector('#form-opcua > div');
            Object.entries(x)
            .forEach(function([key, val]) {
                let $label = document.createElement('label');
                $input.name = key;
                let $input = document.createElement('input');
                $label.innerHTML = key;
                $label.value = val;

                $form.append($label);
                $form.append($input);
            })
        });
}

handleClickRefresh();
loadConfig();
loadOpcua();
