function applyCustomizations() {
    chrome.storage.sync.get(['font', 'colors', 'backgroundImage', 'theme', 'backgroundImageUrl', 'backgroundOpacity'], function (data) {
        if (data.font) {
            document.body.style.fontFamily = data.font;
        }

        if (data.colors) {
            document.body.style.color = data.colors.textColor;
            document.body.style.backgroundColor = data.colors.backgroundColor;
        }

        if (data.backgroundImageUrl && data.backgroundOpacity) {
            const customStyle = document.createElement('style');
            customStyle.textContent = `
                .dark .dark\\:bg-gray-800 {
                    --tw-bg-opacity: ${data.backgroundOpacity};
                }
                .dark .dark\\:bg-\\[\\#444654\\] {
                    --tw-bg-opacity: ${data.backgroundOpacity};
                }
                .dark body, .dark html {
                    background-image: url(${data.backgroundImageUrl});
                    --tw-bg-opacity: ${data.backgroundOpacity};
                    background-size: cover;
                    background-position: center;
                    background-repeat: no-repeat;
                }
            `;
            document.head.appendChild(customStyle);
        }
    });
}

applyCustomizations();

//This code snippet listens for any changes in the extension's storage and calls the applyCustomizations() function to update the website's appearance dynamically.
chrome.storage.onChanged.addListener(function (changes, namespace) {
    for (let key in changes) {
        let storageChange = changes[key];
        console.log('Storage key "%s" changed from "%s" to "%s"', key, storageChange.oldValue, storageChange.newValue);
    }
    applyCustomizations();
});

function createConfirmSendElement() {
    const confirmSend = document.createElement('span');
    confirmSend.id = 'confirm-send';
    confirmSend.textContent = 'Confirm send?';
    confirmSend.style.display = 'none';
    confirmSend.style.color = 'red';
    confirmSend.style.marginLeft = '8px';
    return confirmSend;
}

function setInputFieldId() {
    const inputField = document.querySelector('textarea[placeholder="Send a message..."]');
    inputField.id = 'custom-input-field';
}

function injectConfirmSend() {
    const inputField = document.getElementById('custom-input-field');
    const inputContainer = inputField.parentElement;
    const confirmSend = createConfirmSendElement();
    inputContainer.insertBefore(confirmSend, inputField);
}

function handleInputKeyDown(e) {
    const confirmSend = document.getElementById('confirm-send');
    if (e.key === 'Enter') {
        if (confirmSend.style.display === 'none') {
            e.stopImmediatePropagation(); // Stop other event handlers from executing
            e.preventDefault(); // Prevent the message from being sent
            confirmSend.style.display = 'inline';
        } else {
            confirmSend.style.display = 'none';
        }
    } else if (e.key === 'Escape' || e.key === 'Backspace') {
        confirmSend.style.display = 'none';
    }
}

function addInputEventListener() {
    const inputField = document.getElementById('custom-input-field');
    inputField.addEventListener('keydown', handleInputKeyDown);
}

applyCustomizations();
setInputFieldId();
injectConfirmSend();
addInputEventListener();