document.addEventListener('DOMContentLoaded', function () {
    const imagesInput = document.getElementById('images');
    const musicInput = document.getElementById('music');
    const textInput = document.getElementById('text');
    const generatePreviewButton = document.getElementById('generate-preview');
    const generateLinkButton = document.getElementById('generate-link');
    const previewSlideshow = document.getElementById('preview-slideshow');
    const previewText = document.getElementById('preview-text');
    const previewMusic = document.getElementById('preview-music');
    const generatedLinkContainer = document.getElementById('generated-link-container');

    generatePreviewButton.addEventListener('click', function () {
        const files = imagesInput.files;
        const musicFile = musicInput.files[0];
        const customText = textInput.value;

        previewSlideshow.innerHTML = '';
        previewText.innerText = '';
        previewMusic.src = '';

        const imageUrls = [];
        Array.from(files).forEach(file => {
            const url = URL.createObjectURL(file);
            imageUrls.push(url);
            let media;
            if (file.type.startsWith('video')) {
                media = document.createElement('video');
                media.src = url;
                media.controls = true;
            } else {
                media = document.createElement('img');
                media.src = url;
            }
            media.classList.add('slides');
            previewSlideshow.appendChild(media);
        });

        // Exibir o slideshow de imagens/vídeos
        let currentSlide = 0;
        function showSlides() {
            const slides = document.getElementsByClassName("slides");
            for (let i = 0; i < slides.length; i++) {
                slides[i].style.display = "none";
            }
            currentSlide++;
            if (currentSlide > slides.length) {
                currentSlide = 1;
            }
            slides[currentSlide - 1].style.display = "block";
            setTimeout(showSlides, 2000); // Troca a cada 2 segundos
        }
        showSlides();

        if (musicFile) {
            const musicUrl = URL.createObjectURL(musicFile);
            previewMusic.src = musicUrl;
            previewMusic.play();
        }

        previewText.innerText = customText;
    });

    generateLinkButton.addEventListener('click', function () {
        const files = imagesInput.files;
        const musicFile = musicInput.files[0];
        const customText = textInput.value;

        const imageUrls = [];
        Array.from(files).forEach(file => {
            const url = URL.createObjectURL(file);
            imageUrls.push(url);
        });

        let musicUrl = '';
        if (musicFile) {
            musicUrl = URL.createObjectURL(musicFile);
        }

        const queryString = `?images=${encodeURIComponent(JSON.stringify(imageUrls))}&music=${encodeURIComponent(musicUrl)}&text=${encodeURIComponent(customText)}`;
        const previewLink = `preview.html${queryString}`;

        generatedLinkContainer.innerHTML = `<a href="${previewLink}" target="_blank">Visualizar Prévia</a>`;
    });
});
