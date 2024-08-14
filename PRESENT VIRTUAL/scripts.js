document.addEventListener('DOMContentLoaded', function() {
    const imageUpload = document.getElementById('image-upload');
    const musicUpload = document.getElementById('music-upload');
    const customText = document.getElementById('custom-text');
    const previewContainer = document.getElementById('preview-container');
    const generatePreviewButton = document.getElementById('generate-preview');
    const generatedLinkContainer = document.getElementById('generated-link-container');

    generatePreviewButton.addEventListener('click', function() {
        const files = imageUpload.files;
        const music = musicUpload.files[0];
        const text = customText.value;

        if (files.length === 0 || !music || !text) {
            alert('Por favor, envie fotos, selecione uma música e escreva uma mensagem.');
            return;
        }

        const imageSources = [];
        for (let i = 0; i < files.length; i++) {
            const reader = new FileReader();
            reader.onload = function(e) {
                imageSources.push(e.target.result);
                if (imageSources.length === files.length) {
                    generatePreview(imageSources, music, text);
                }
            };
            reader.readAsDataURL(files[i]);
        }
    });

    function generatePreview(images, music, text) {
        const previewHtml = `
            <div id="preview-slideshow"></div>
            <div id="preview-text">${text}</div>
            <audio id="preview-music" controls autoplay>
                <source src="${URL.createObjectURL(music)}" type="${music.type}">
            </audio>
        `;
        previewContainer.innerHTML = previewHtml;

        const previewSlideshow = document.getElementById('preview-slideshow');
        images.forEach(src => {
            const img = document.createElement('img');
            img.src = src;
            img.classList.add('slides');
            previewSlideshow.appendChild(img);
        });

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
            setTimeout(showSlides, 2000);
        }
        showSlides();

        const params = new URLSearchParams();
        params.append('images', JSON.stringify(images));
        params.append('music', URL.createObjectURL(music));
        params.append('text', text);

        const previewLink = document.createElement('a');
        previewLink.href = `preview.html?${params.toString()}`;
        previewLink.textContent = 'Clique aqui para ver a prévia completa';
        previewLink.target = '_blank';

        generatedLinkContainer.innerHTML = '';
        generatedLinkContainer.appendChild(previewLink);
    }
});
