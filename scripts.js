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
                overflow: hidden;
                position: relative;
            }

            h1 {
                font-size: 3em;
                margin-bottom: 20px;
                color: #ff69b4;
                text-shadow: 2px 2px 5px #ff1493;
            }

            #preview-slideshow {
                max-width: 100%;
                margin: 0 auto;
            }

            .slides {
                display: none;
                width: 100%;
                max-width: 600px;
                margin: 0 auto;
                border-radius: 15px;
            }

            #preview-text {
                margin-top: 20px;
                font-size: 1.5em;
                color: #ff1493;
            }

            .heart {
                position: absolute;
                width: 20px;
                height: 20px;
                background-color: #ff69b4;
                transform: rotate(45deg);
                animation: float 5s infinite;
            }

            .heart::before, .heart::after {
                content: "";
                position: absolute;
                width: 20px;
                height: 20px;
                background-color: #ff69b4;
                border-radius: 50%;
            }

            .heart::before {
                top: -10px;
                left: 0;
            }

            .heart::after {
                top: 0;
                left: -10px;
            }

            @keyframes float {
                0% {
                    transform: translateY(0) rotate(45deg);
                    opacity: 1;
                }
                100% {
                    transform: translateY(-800px) rotate(45deg);
                    opacity: 0;
                }
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
        <h1>Nosso Amor</h1>
        <div id="preview-slideshow">${imagesHTML}</div>
        <div id="preview-text">${customText}</div>
        ${musicHTML}
        <div id="hearts-container"></div>

        <script>
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

            function createHeart() {
                const heart = document.createElement('div');
                heart.className = 'heart';
                heart.style.left = Math.random() * 100 + 'vw';
                heart.style.animationDuration = Math.random() * 3 + 2 + 's';
                document.body.appendChild(heart);
                setTimeout(() => heart.remove(), 5000);
            }
            setInterval(createHeart, 500);
        </script>
    </body>
    </html>`;

    // Criar um link para a visualização online
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank'); // Abre o conteúdo em uma nova aba
}

function downloadHTML() {
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
                overflow: hidden;
                position: relative;
            }

            h1 {
                font-size: 3em;
                margin-bottom: 20px;
                color: #ff69b4;
                text-shadow: 2px 2px 5px #ff1493;
            }

            #preview-slideshow {
                max-width: 100%;
                margin: 0 auto;
            }

            .slides {
                display: none;
                width: 100%;
                max-width: 600px;
                margin: 0 auto;
                border-radius: 15px;
            }

            #preview-text {
                margin-top: 20px;
                font-size: 1.5em;
                color: #ff1493;
            }

            .heart {
                position: absolute;
                width: 20px;
                height: 20px;
                background-color: #ff69b4;
                transform: rotate(45deg);
                animation: float 5s infinite;
            }

            .heart::before, .heart::after {
                content: "";
                position: absolute;
                width: 20px;
                height: 20px;
                background-color: #ff69b4;
                border-radius: 50%;
            }

            .heart::before {
                top: -10px;
                left: 0;
            }

            .heart::after {
                top: 0;
                left: -10px;
            }

            @keyframes float {
                0% {
                    transform: translateY(0) rotate(45deg);
                    opacity: 1;
                }
                100% {
                    transform: translateY(-800px) rotate(45deg);
                    opacity: 0;
                }
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
        <h1>Nosso Amor</h1>
        <div id="preview-slideshow">${imagesHTML}</div>
        <div id="preview-text">${customText}</div>
        ${musicHTML}
        <div id="hearts-container"></div>

        <script>
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

            function createHeart() {
                const heart = document.createElement('div');
                heart.className = 'heart';
                heart.style.left = Math.random() * 100 + 'vw';
                heart.style.animationDuration = Math.random() * 3 + 2 + 's';
                document.body.appendChild(heart);
                setTimeout(() => heart.remove(), 5000);
            }
            setInterval(createHeart, 500);
        </script>
    </body>
    </html>`;

    // Criar um blob e gerar um link de download
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);

    // Criar um link de download
    const a = document.createElement('a');
    a.href = url;
    a.download = 'meu-site-romantico.html';
    a.click();
    URL.revokeObjectURL(url);
}
