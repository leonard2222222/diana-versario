let currentPage = 1;
let totalPages = 5;

const pages = [
    {
        header: "Texto en la Parte Alta de la Página 1",
        image: "https://via.placeholder.com/120x140",
        text: ["Esta es la primera línea de texto de la página 1.", "Esta es la segunda línea de texto de la página 1."],
        gif: "https://media.giphy.com/media/l0Exk8EUzSLsrErEQ/giphy.gif",
        className: "page1"
    },
    {
        header: "Texto en la Parte Alta de la Página 2",
        image: "https://via.placeholder.com/120x140",
        text: ["Esta es la primera línea de texto de la página 2.", "Esta es la segunda línea de texto de la página 2."],
        gif: "https://media.giphy.com/media/3o7aCTfyhYawdOXcFW/giphy.gif",
        className: "page2"
    },
    {
        header: "Texto en la Parte Alta de la Página 3",
        image: "https://via.placeholder.com/120x140",
        text: ["Esta es la primera línea de texto de la página 3.", "Esta es la segunda línea de texto de la página 3."],
        gif: "https://media.giphy.com/media/xT9IgzoKnwFNmISR8I/giphy.gif",
        className: "page3"
    },
    {
        header: "Texto en la Parte Alta de la Página 4",
        image: "https://via.placeholder.com/120x140",
        text: ["Esta es la primera línea de texto de la página 4.", "Esta es la segunda línea de texto de la página 4."],
        gif: "https://media.giphy.com/media/3o6fJbcUBTlmgHokAY/giphy.gif",
        className: "page4"
    },
    {
        header: "Texto en la Parte Alta de la Página 5",
        image: "https://via.placeholder.com/120x140",
        text: ["Esta es la primera línea de texto de la página 5.", "Esta es la segunda línea de texto de la página 5."],
        gif: "https://media.giphy.com/media/3o7aCTfyhYawdOXcFW/giphy.gif",
        className: "page5"
    }
];

function navigate(direction) {
    currentPage += direction;

    // Ensure the current page number is within bounds
    if (currentPage < 1) {
        currentPage = 1;
    }
    if (currentPage > totalPages) {
        currentPage = totalPages;
    }

    updatePageContent(currentPage);
}

function updatePageContent(page) {
    const pageData = pages[page - 1];

    document.getElementById('headerText').textContent = pageData.header;
    document.getElementById('contentImage').src = pageData.image;

    const contentText = document.getElementById('contentText');
    contentText.innerHTML = "";
    pageData.text.forEach(line => {
        const p = document.createElement('p');
        p.textContent = line;
        contentText.appendChild(p);
    });

    document.getElementById('pageGif').src = pageData.gif;
    document.body.className = pageData.className;

    // Update the page number display
    document.getElementById('pageNumber').textContent = currentPage;

    // Update the state of the buttons
    document.getElementById('prevButton').disabled = currentPage === 1;
    document.getElementById('prevButton').classList.toggle('disabled', currentPage === 1);
    document.getElementById('nextButton').disabled = currentPage === totalPages;
    document.getElementById('nextButton').classList.toggle('disabled', currentPage === totalPages);
}

function showEditPanel() {
    document.getElementById('editPanel').classList.add('open');
    const pageData = pages[currentPage - 1];
    populateEditFields(pageData);
}

function populateEditFields(pageData) {
    document.getElementById('editHeader').value = pageData.header || '';
    document.getElementById('editText1').value = pageData.text[0] || '';
    document.getElementById('editText2').value = pageData.text[1] || '';
    document.getElementById('editImageFile').value = ''; // Clear file input
    document.getElementById('editGifFile').value = ''; // Clear file input
}

function saveChanges() {
    const header = document.getElementById('editHeader').value;
    const imageFile = document.getElementById('editImageFile').files[0];
    const text1 = document.getElementById('editText1').value;
    const text2 = document.getElementById('editText2').value;
    const gifFile = document.getElementById('editGifFile').files[0];

    if (imageFile || gifFile) {
        const reader = new FileReader();
        reader.onload = function (e) {
            updatePageData({
                header,
                image: imageFile ? e.target.result : pages[currentPage - 1].image,
                text: [text1, text2],
                gif: gifFile ? e.target.result : pages[currentPage - 1].gif,
                className: `page${currentPage}`
            });
        };
        reader.readAsDataURL(imageFile || gifFile);
    } else {
        updatePageData({
            header,
            image: pages[currentPage - 1].image,
            text: [text1, text2],
            gif: pages[currentPage - 1].gif,
            className: `page${currentPage}`
        });
    }
}

function updatePageData(data) {
    pages[currentPage - 1] = data;
    updatePageContent(currentPage);
    closeEditPanel();
}

function resetToDefaults() {
    updatePageContent(currentPage);
    closeEditPanel();
}

function closeEditPanel() {
    document.getElementById('editPanel').classList.remove('open');
}

function addPage() {
    const newPageNumber = totalPages + 1;
    pages.push({
        header: `Texto en la Parte Alta de la Página ${newPageNumber}`,
        image: "https://via.placeholder.com/120x140",
        text: [`Esta es la primera línea de texto de la página ${newPageNumber}.`, `Esta es la segunda línea de texto de la página ${newPageNumber}.`],
        gif: "https://media.giphy.com/media/3o7aCTfyhYawdOXcFW/giphy.gif",
        className: `page${newPageNumber}`
    });
    totalPages++;
    currentPage = newPageNumber;
    updatePageContent(currentPage);
}

// Inicializar el contenido de la página
updatePageContent(currentPage);
