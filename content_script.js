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
            applyBackgroundImageAndOpacity(data.backgroundImageUrl, data.backgroundOpacity);
        }
    });
}

function applyBackgroundImageAndOpacity(imageUrl, opacity) {
    const isLightMode = document.documentElement.classList.contains('light');
    const customStyle = document.createElement('style');
    customStyle.textContent = `
        .dark .dark\\:bg-gray-800, .light .light\\:bg-gray-50 {
            --tw-bg-opacity: ${opacity};
        }
        .dark .dark\\:bg-\\[\\#444654\\], .light .light\\:bg-\\[\\#444654\\] {
            --tw-bg-opacity: ${opacity};
        }
        .dark body, .dark html {
            background-image: url(${imageUrl});
            --tw-bg-opacity: ${opacity};
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
        }
    `;
    if (isLightMode) {
        customStyle.textContent += `
            body, html {
                background-image: url(${imageUrl});
                --tw-bg-opacity: ${opacity};
                background-size: cover;
                background-position: center;
                background-repeat: no-repeat;
            }
            .bg-gray-50 {
                --tw-bg-opacity: ${opacity};
                background-color: rgba(247,247,248,var(--tw-bg-opacity));
            }
            #__next, #root {
                background-color: rgba(247,247,248,var(--tw-bg-opacity));
                --tw-bg-opacity: ${opacity};
            }
        `;
    }
    document.head.appendChild(customStyle);
}

applyCustomizations();

chrome.storage.onChanged.addListener(function (changes, namespace) {
    for (let key in changes) {
        let storageChange = changes[key];
        console.log('Storage key "%s" changed from "%s" to "%s"', key, storageChange.oldValue, storageChange.newValue);
    }
    applyCustomizations();
});
