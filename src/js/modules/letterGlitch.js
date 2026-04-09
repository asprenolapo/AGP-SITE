
export function initLetterGlitch(options = {}) {
    const canvas = document.getElementById(options.canvasId || 'letterGlitchCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const glitchColors = options.colors || ['#00FFFF', '#7D8491', '#0B0C10'];
    const glitchSpeed = options.glitchSpeed || 50;
    const characters = options.characters || 'ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$&*()-_+=/[]{};:<>.,0123456789';
    const smooth = options.smooth ?? true;

    let letters = [];
    let grid = { columns: 0, rows: 0 };
    let lastGlitchTime = Date.now();
    let animationFrame;

    const fontSize = 16;
    const charWidth = 10;
    const charHeight = 20;

    const hexToRgb = (hex) => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : { r: 0, g: 255, b: 255 };
    };

    const resize = () => {
        const parent = canvas.parentElement;
        canvas.width = parent.offsetWidth;
        canvas.height = parent.offsetHeight;
        grid.columns = Math.ceil(canvas.width / charWidth);
        grid.rows = Math.ceil(canvas.height / charHeight);
        
        letters = Array.from({ length: grid.columns * grid.rows }, () => ({
            char: characters[Math.floor(Math.random() * characters.length)],
            color: glitchColors[Math.floor(Math.random() * glitchColors.length)],
            targetColor: glitchColors[Math.floor(Math.random() * glitchColors.length)],
            colorProgress: 1
        }));
    };

    const draw = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.font = `${fontSize}px monospace`;
        ctx.textBaseline = 'top';

        letters.forEach((letter, index) => {
            const x = (index % grid.columns) * charWidth;
            const y = Math.floor(index / grid.columns) * charHeight;
            ctx.fillStyle = letter.color;
            ctx.fillText(letter.char, x, y);
        });
    };

    const update = () => {
        const updateCount = Math.max(1, Math.floor(letters.length * 0.05));
        for (let i = 0; i < updateCount; i++) {
            const index = Math.floor(Math.random() * letters.length);
            letters[index].char = characters[Math.floor(Math.random() * characters.length)];
            letters[index].targetColor = glitchColors[Math.floor(Math.random() * glitchColors.length)];
            letters[index].colorProgress = smooth ? 0 : 1;
        }
    };

    const animate = () => {
        const now = Date.now();
        if (now - lastGlitchTime >= glitchSpeed) {
            update();
            lastGlitchTime = now;
        }

        if (smooth) {
            letters.forEach(letter => {
                if (letter.colorProgress < 1) {
                    letter.colorProgress += 0.05;
                    const start = hexToRgb(letter.color.startsWith('rgb') ? '#00FFFF' : letter.color); // Fallback semplice
                    const end = hexToRgb(letter.targetColor);
                    const r = Math.round(start.r + (end.r - start.r) * letter.colorProgress);
                    const g = Math.round(start.g + (end.g - start.g) * letter.colorProgress);
                    const b = Math.round(start.b + (end.b - start.b) * letter.colorProgress);
                    letter.color = `rgb(${r},${g},${b})`;
                }
            });
        }

        draw();
        animationFrame = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    resize();
    animate();
}