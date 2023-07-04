// DOM Variables
const inputLink = document.getElementById('input-link');
const submitBtn = document.getElementById('submitBtn');
const mainLink = document.querySelector('.main-link');
const shortLinkContainer = document.querySelector('.shorten-links-container');
const errMsg = document.getElementById('error-msg');

// External source to bring in a function to shorten a link
const apiEndpoint = 'https://url-shortener23.p.rapidapi.com/shorten';

// Utility function to check valid URL
function isValidURL(url) {
    const urlRegex = /^(https?:\/\/)?([a-z0-9-]+\.)+[a-z]{2,}(\/.*)*$/i;
    return urlRegex.test(url);
}

// Async function to shorten URL
async function shortenURL(url) {
    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': '0cb53522a6msh62f6c735efaa78bp1f7530jsn80c3c4265981',
            'X-RapidAPI-Host': 'url-shortener23.p.rapidapi.com'
        },
        body: JSON.stringify({ url })
    };

    try {
        const response = await fetch(apiEndpoint, options);
        const result = await response.json();
        return isValidURL(url) ? result.short_url : 'Please Enter a valid URL';
    } catch (error) {
        console.error(error);
        throw error;
    }
}

// Function to create a new shortened link element
function createShortenedLinkElement(originalURL, shortenedURL) {
    const newDiv = document.createElement('div');
    newDiv.classList.add('shorten-link');
    newDiv.innerHTML = `
    <div class="shorten-link">
        <div class="main-link">${originalURL}</div>
        <div class="sep"></div>
        <div class="short-link-div">
            <div class="short-link">${shortenedURL}</div>
            <button class="copyBtn">Copy!</button>
        </div>
    </div>
  `;
    return newDiv;
}

// Function to handle copying text to clipboard
function copyTextToClipboard(text) {
    navigator.clipboard.writeText(text)
        .then(() => {
            console.log('Copied to clipboard:', text);
        })
        .catch((error) => {
            console.error('Failed to copy to clipboard:', error);
        });
}

// Click event listener for submit button
submitBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    const inputValue = inputLink.value.trim();

    if (isValidURL(inputValue)) {
        inputLink.style.borderColor = 'transparent';
        errMsg.innerText = '';

        try {
            const shortenedURL = await shortenURL(inputValue);
            const newLinkElement = createShortenedLinkElement(inputValue, shortenedURL);
            const copyBtn = newLinkElement.querySelector('.copyBtn');

            copyBtn.addEventListener('click', (e) => {
                e.preventDefault();
                copyTextToClipboard(shortenedURL);
                copyBtn.innerText = 'Copied!';
                copyBtn.style.backgroundColor = 'var(--Very-Dark-Violet)';
                setTimeout(() => {
                    copyBtn.innerText = 'Copy!';
                    copyBtn.style.backgroundColor = 'var(--Cyan)';
                }, 1000);
            });

            shortLinkContainer.appendChild(newLinkElement);
        } catch (error) {
            console.error(error);
        }
    } else {
        inputLink.style.borderColor = 'red';
        errMsg.innerText = 'Please enter a valid URL';
    }
});

// Hamburger Menu 
// DOM Variables
const menu = document.querySelector('.bx-menu')
const xCircle = document.querySelector('.bx-x-circle')
const linkCon = document.querySelector('.link-container')
// EventListeners for Link Container
menu.addEventListener('click', toggleMenu)
xCircle.addEventListener('click', toggleMenu)
// Function to toggle menu
function toggleMenu() {
    menu.classList.toggle('hide')
    xCircle.classList.toggle('hide')
    linkCon.classList.toggle('hide')
}