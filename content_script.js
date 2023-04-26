function applyCustomizations() {
    chrome.storage.sync.get(['font', 'customFont', 'colors', 'backgroundImage', 'theme', 'backgroundImageUrl', 'backgroundOpacity'], function (data) {
        if (data.customFont) {
            const fontLink = document.createElement('link');
            fontLink.href = `https://fonts.googleapis.com/css?family=${encodeURIComponent(data.customFont)}&display=swap`;
            fontLink.rel = 'stylesheet';
            document.head.appendChild(fontLink);
            
            // Check if the custom font is already in the font select element
            const fontExists = [...document.getElementById('font').options].some(option => option.value === data.customFont);
            if (!fontExists) {
                // Add the custom font as an option in the font select element
                const customFontOption = document.createElement('option');
                customFontOption.value = data.customFont;
                customFontOption.textContent = data.customFont;
                document.getElementById('font').appendChild(customFontOption);
            }
        
            // Set the font
            document.body.style.fontFamily = data.customFont;
        }
        
        

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
