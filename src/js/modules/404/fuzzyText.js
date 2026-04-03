export async function initFuzzyText(containerId, options = {}) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const {
        text = "404",
        fontSize = 'clamp(4rem, 15vw, 12rem)',
        fontWeight = 900,
        fontFamily = '"Space Grotesk", sans-serif', // Preso dal tuo root.scss
        color = '#00FFFF', // tech-cyan dal tuo root.scss
        enableHover = true,
        baseIntensity = 0.18,
        hoverIntensity = 0.5,
        fuzzRange = 30,
        fps = 60
    } = options;

    const canvas = document.createElement('canvas');
    container.appendChild(canvas);
    const ctx = canvas.getContext('2d');

    // Caricamento Font
    const fontString = `${fontWeight} ${fontSize} ${fontFamily}`;
    try {
        await document.fonts.load(fontString);
    } catch (e) {
        await document.fonts.ready;
    }

    // Calcolo dimensione font numerica
    const temp = document.createElement('span');
    temp.style.fontSize = fontSize;
    temp.style.visibility = 'hidden';
    document.body.appendChild(temp);
    const numericFontSize = parseFloat(window.getComputedStyle(temp).fontSize);
    document.body.removeChild(temp);

    const offscreen = document.createElement('canvas');
    const offCtx = offscreen.getContext('2d');

    offCtx.font = `${fontWeight} ${fontSize} ${fontFamily}`;
    const metrics = offCtx.measureText(text);
    const actualLeft = metrics.actualBoundingBoxLeft ?? 0;
    const actualRight = metrics.actualBoundingBoxRight ?? metrics.width;
    const actualAscent = metrics.actualBoundingBoxAscent ?? numericFontSize;
    const actualDescent = metrics.actualBoundingBoxDescent ?? numericFontSize * 0.2;

    const textBoundingWidth = Math.ceil(actualLeft + actualRight);
    const tightHeight = Math.ceil(actualAscent + actualDescent);
    const extraWidthBuffer = 20;
    const offscreenWidth = textBoundingWidth + extraWidthBuffer;

    offscreen.width = offscreenWidth;
    offscreen.height = tightHeight;

    offCtx.font = `${fontWeight} ${fontSize} ${fontFamily}`;
    offCtx.textBaseline = 'alphabetic';
    offCtx.fillStyle = color;
    offCtx.fillText(text, extraWidthBuffer / 2 - actualLeft, actualAscent);

    const horizontalMargin = fuzzRange + 20;
    canvas.width = offscreenWidth + horizontalMargin * 2;
    canvas.height = tightHeight;
    ctx.translate(horizontalMargin, 0);

    let isHovering = false;
    let currentIntensity = baseIntensity;
    let lastFrameTime = 0;
    const frameDuration = 1000 / fps;

    const run = (timestamp) => {
        if (timestamp - lastFrameTime < frameDuration) {
            requestAnimationFrame(run);
            return;
        }
        lastFrameTime = timestamp;

        ctx.clearRect(-horizontalMargin, 0, canvas.width, canvas.height);

        const targetIntensity = isHovering ? hoverIntensity : baseIntensity;
        currentIntensity = targetIntensity; // Semplificato senza transition duration per performance

        for (let j = 0; j < tightHeight; j++) {
            const dx = Math.floor(currentIntensity * (Math.random() - 0.5) * fuzzRange);
            ctx.drawImage(offscreen, 0, j, offscreenWidth, 1, dx, j, offscreenWidth, 1);
        }
        requestAnimationFrame(run);
    };

    if (enableHover) {
        canvas.addEventListener('mousemove', (e) => {
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            isHovering = (x > horizontalMargin && x < horizontalMargin + offscreenWidth);
        });
        canvas.addEventListener('mouseleave', () => isHovering = false);
    }

    requestAnimationFrame(run);
}