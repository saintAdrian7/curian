document.getElementById('confettiButton').addEventListener('click', () => {
    const canvas = document.getElementById('confetti');
    const context = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const confettiPieces = Array.from({ length: 300 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 6 + 2,
        d: Math.random() * 10 + 2,
        color: `hsl(${Math.random() * 360}, 100%, 50%)`,
        tilt: Math.random() * 10 - 10,
        tiltAngle: Math.random() * Math.PI
    }));

    function drawConfetti() {
        context.clearRect(0, 0, canvas.width, canvas.height);

        confettiPieces.forEach(piece => {
            context.beginPath();
            context.lineWidth = piece.r / 2;
            context.strokeStyle = piece.color;
            context.moveTo(piece.x + piece.tilt + piece.r, piece.y);
            context.lineTo(piece.x + piece.tilt - piece.r, piece.y + piece.tilt + piece.r);
            context.stroke();
        });

        updateConfetti();
    }

    function updateConfetti() {
        confettiPieces.forEach(piece => {
            piece.tiltAngle += 0.05;
            piece.y += (Math.cos(piece.d) + 3 + piece.r / 2) / 2;
            piece.x += Math.sin(piece.d) / 2;
            piece.tilt = Math.sin(piece.tiltAngle) * 15;

            if (piece.y > canvas.height) {
                piece.x = Math.random() * canvas.width;
                piece.y = -20;
            }
        });

        requestAnimationFrame(drawConfetti);
    }

    drawConfetti();
});
