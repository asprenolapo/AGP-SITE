// modules/404/noise.js

export function initNoise(options = {}) {
    const { 
        patternRefreshInterval = 2, 
        patternAlpha = 15 
    } = options;

    // Se esiste già un overlay, lo rimuoviamo per evitare duplicati al resize
    const existingCanvas = document.querySelector('.noise-overlay');
    if (existingCanvas) existingCanvas.remove();

    const canvas = document.createElement('canvas');
    canvas.className = "noise-overlay";
    
    // CSS inline critico per assicurarci che non blocchi i click
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '0'; // Sta sotto al contenuto (z-index: 10) e all'header
    canvas.style.imageRendering = 'pixelated';
    
    // Lo aggiungiamo alla section (come richiesto, senza ID)
    const section = document.querySelector('section');
    if (section) {
        section.appendChild(canvas);
    } else {
        document.body.appendChild(canvas);
    }

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let frame = 0;
    let animationId;
    const canvasSize = 512; // Dimensione della texture interna (ottimale per performance)

    const resize = () => {
        canvas.width = canvasSize;
        canvas.height = canvasSize;
        // Aggiorniamo le dimensioni reali del CSS per coprire tutto lo schermo
        canvas.style.width = window.innerWidth + 'px';
        canvas.style.height = window.innerHeight + 'px';
    };

    const drawGrain = () => {
        const imageData = ctx.createImageData(canvasSize, canvasSize);
        const data = imageData.data;
        
        for (let i = 0; i < data.length; i += 4) {
            const value = Math.random() * 255;
            data[i] = value;     // R
            data[i + 1] = value; // G
            data[i + 2] = value; // B
            data[i + 3] = patternAlpha; // Trasparenza del rumore
        }
        ctx.putImageData(imageData, 0, 0);
    };

    const loop = () => {
        if (frame % patternRefreshInterval === 0) {
            drawGrain();
        }
        frame++;
        animationId = window.requestAnimationFrame(loop);
    };

    // Gestione del resize per smartphone/tablet
    let resizeTimeout;
    const handleResize = () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            resize();
        }, 150);
    };

    window.addEventListener('resize', handleResize);
    
    resize();
    loop();

    // Pulizia in caso di cambio pagina (opzionale, utile per SPA)
    return () => {
        window.removeEventListener('resize', handleResize);
        window.cancelAnimationFrame(animationId);
    };
}