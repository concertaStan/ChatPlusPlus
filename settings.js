function saveCustomizations() {
    const font = document.getElementById('font').value;
    const backgroundImageUrl = document.getElementById('backgroundImageUrl').value;
    const backgroundOpacity = document.getElementById('backgroundOpacity').value;

    chrome.storage.sync.set({
        font: font,
        backgroundImageUrl: backgroundImageUrl,
        backgroundOpacity: backgroundOpacity
        /*, other customization options */
    }, function () {
        // Display a confirmation message or update the UI to reflect the saved settings
    });
}

function loadCustomizations() {
    chrome.storage.sync.get(['font', 'customFont', 'backgroundImageUrl', 'backgroundOpacity'], function (data) {
        if (data.font) {
            document.getElementById('font').value = data.font;
        }
        if (data.customFont) {
            document.getElementById('customFont').value = data.customFont;
            const customOption = document.createElement('option');
            customOption.value = data.customFont;
            customOption.text = data.customFont;
            if (data.font === data.customFont) {
                customOption.selected = true;
            }
            document.getElementById('font').add(customOption);
        }
        if (data.backgroundImageUrl) {
            document.getElementById('backgroundImageUrl').value = data.backgroundImageUrl;
        }
        if (data.backgroundOpacity) {
            document.getElementById('backgroundOpacity').value = data.backgroundOpacity;
        }
    });
}


function saveSettings() {
    const font = document.getElementById('font').value;
    const customFont = document.getElementById('customFont').value;
    const backgroundImageUrl = document.getElementById('backgroundImageUrl').value;
    const backgroundOpacity = document.getElementById('backgroundOpacity').value;

    chrome.storage.sync.set({
        font: font,
        customFont: customFont,
        backgroundImageUrl: backgroundImageUrl,
        backgroundOpacity: backgroundOpacity
    }, function () {
        console.log('Settings saved');
    });
}


// Event listener for when the user hits "load custom font"
document.getElementById('loadCustomFont').addEventListener('click', function (event) {
    event.preventDefault(); // Prevent the form from being submitted and the page from reloading
    const customFont = document.getElementById('customFont').value;
    if (customFont) {
        const fontLink = document.createElement('link');
        fontLink.href = `https://fonts.googleapis.com/css?family=${encodeURIComponent(customFont)}&display=swap`;
        fontLink.rel = 'stylesheet';
        document.head.appendChild(fontLink);

        const customFontOption = document.createElement('option');
        customFontOption.value = customFont;
        customFontOption.textContent = customFont;
        customFontOption.selected = true;
        document.getElementById('font').appendChild(customFontOption);
    }
});



// Event listener for when user hits "save"
document.getElementById('saveButton').addEventListener('click', function () {
    saveSettings();
});


document.addEventListener('DOMContentLoaded', loadCustomizations);
