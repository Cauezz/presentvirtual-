let images = [];
let musicFile = '';

document.getElementById('image-upload').addEventListener('change', function(event) {
    images = [];
    const files = event.target.files;
    for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.onload = function(e) {
            images.push(e.target.result);
        };
        reader.readAsDataURL(files[i]);
    }
});

document.getElementById('music-upload').addEventListener('change', function(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function(e) {
        musicFile = e.target.result;
    };
    reader.readAsDataURL(file);
});

function showPreview() {
    const previewContainer = document.getElementById('preview-container');
    previewContainer.innerHTML = '';

    // Mostrar imagens
    images.forEach(src => {
        const img = document.createElement('img');
        img.src = src;
        img.classList.add('slides');
        previewContainer.appendChild(img);
    });

    // Mostrar texto
    const customText = document.getElementById('custom-text').value;
    const textElement = document.createElement('div');
    textElement.id = 'preview-text';
    textElement.innerText = customText;
    previewContainer.appendChild(textElement);

    // Adicionar música
    if (musicFile) {
        const audioElement = document.createElement('audio');
        audioElement.controls = true;
        audioElement.src = musicFile;
        audioElement.autoplay = true;
        audioElement.loop = true;
        previewContainer.appendChild(audioElement);
    }

    // Iniciar slide show
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
}

function generateHTML() {
    const imagesHTML = images.map(src => `<img src="${src}" class="slides">`).join('');
    const customText = document.getElementById('custom-text').value;
    const musicHTML = musicFile ? `<audio controls autoplay loop><source src="${musicFile}" type="audio/mpeg">Seu navegador não suporta o elemento de áudio.</audio>` : '';

    const htmlContent = `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Nosso Amor</title>
        <style>
            body {
                font-family: 'Comic Sans MS', cursive, sans-serif;
                background-color: #fff0f5;
                color: #ff1493;
                text-align: center;
                padding: 20px;
                overflow-x: hidden;
                position: relative;
            }

            h1 {
                font-size: 3em;
                margin-bottom: 20px;
                color: #ff69b4;
                text-shadow: 2px 2px 5px #ff1493;
            }

            #preview-slideshow {
                position: relative;
                width: 100%;
                max-width: 600px;
                margin: 0 auto;
                aspect-ratio: 9 / 16;
            }

            .slides {
                display: none;
                width: 100%;
                border: 5px solid #ff69b4; /* Contorno rosa */
                border-radius: 15px;
                aspect-ratio: 9 / 16; /* Define a proporção 9:16 */
            }

            #preview-text {
                margin-top: 20px;
                font-size: 1.5em;
                color: #ff1493;
                text-align: center;
            }

            @media screen and (max-width: 768px) {
                .slides {
                    max-width: 100%;
                }

                #preview-text {
                    font-size: 1.2em;
                }
            }
        </style>
    </head>
    <body>
        <div id="preview-slideshow">${imagesHTML}</div>
        <div id="preview-text">${customText}</div>
        ${musicHTML}

        <script>
            document.addEventListener('DOMContentLoaded', function() {
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
            });
        </script>
    </body>
    </html>
    `;

    const linkContainer = document.getElementById('generated-link-container');
    linkContainer.innerHTML = `<a href="data:text/html;charset=utf-8,${encodeURIComponent(htmlContent)}" target="_blank">Visualizar o HTML gerado</a>`;
}
function generateHTML() {
    const imagesHTML = images.map(src => `<img src="${src}" class="slides">`).join('');
    const customText = document.getElementById('custom-text').value;
    const musicHTML = musicFile ? `<audio controls autoplay loop><source src="${musicFile}" type="audio/mpeg">Seu navegador não suporta o elemento de áudio.</audio>` : '';

    const htmlContent = `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Nosso Amor</title>
        <style>
            body {
                font-family: 'Comic Sans MS', cursive, sans-serif;
                background-color: #fff0f5;
                color: #ff1493;
                text-align: center;
                padding: 20px;
                overflow-x: hidden;
                position: relative;
            }

            h1 {
                font-size: 3em;
                margin-bottom: 20px;
                color: #ff69b4;
                text-shadow: 2px 2px 5px #ff1493;
            }

            #preview-slideshow {
                position: relative;
                width: 100%;
                max-width: 600px;
                margin: 0 auto;
                aspect-ratio: 9 / 16;
            }

            .slides {
                display: none;
                width: 100%;
                border: 5px solid #ff69b4; /* Contorno rosa */
                border-radius: 15px;
                aspect-ratio: 9 / 16; /* Define a proporção 9:16 */
            }

            #preview-text {
                margin-top: 20px;
                font-size: 1.5em;
                color: #ff1493;
                text-align: center;
            }

            @media screen and (max-width: 768px) {
                .slides {
                    max-width: 100%;
                }

                #preview-text {
                    font-size: 1.2em;
                }
            }
        </style>
    </head>
    <body>
        <div id="preview-slideshow">${imagesHTML}</div>
        <div id="preview-text">${customText}</div>
        ${musicHTML}

        <script>
            document.addEventListener('DOMContentLoaded', function() {
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
            });
        </script>
    </body>
    </html>
    `;

    // Criar uma nova janela e escrever o HTML nela
    const newWindow = window.open('', '_blank');
    newWindow.document.open();
    newWindow.document.write(htmlContent);
    newWindow.document.close();
}
