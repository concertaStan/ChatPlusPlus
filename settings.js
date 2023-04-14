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
    chrome.storage.sync.get(['font', 'backgroundImageUrl', 'backgroundOpacity'], function (data) {
        if (data.font) {
            document.getElementById('font').value = data.font;
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
    const backgroundImageUrl = document.getElementById('backgroundImageUrl').value;
    const backgroundOpacity = document.getElementById('backgroundOpacity').value;

    chrome.storage.sync.set({
        font: font,
        backgroundImageUrl: backgroundImageUrl,
        backgroundOpacity: backgroundOpacity
    }, function () {
        console.log('Settings saved');
    });
}

// Event listener for when user hits "save"
document.getElementById('saveButton').addEventListener('click', function () {
    saveSettings();
});

document.getElementById('saveButton').addEventListener('click', saveCustomizations);
document.addEventListener('DOMContentLoaded', loadCustomizations);
