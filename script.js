const canvas = document.getElementById("mCanvas");
const context = canvas.getContext('2d');

// Ajustar el tamaño del canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const targetWord = "CHARLIE";
const fontSize = 20;
const columns = Math.floor(canvas.width / fontSize); // Número de columnas
let drops = Array(columns).fill(0); // Posiciones iniciales de las gotas
let currentIndex = 0; // Índice de la letra actual en "CHARLIE"
let fadeOutCounter = 0; // Contador para el desvanecimiento
let isFadingOut = false; // Indica si la palabra está desvaneciéndose

function draw() {
    context.fillStyle = "rgba(0, 0, 0, 0.05)"; // Fondo negro con transparencia
    context.fillRect(0, 0, canvas.width, canvas.height); // Limpiar el canvas

    context.fillStyle = "#0F0"; // Color verde para los caracteres aleatorios
    context.font = `${fontSize}px monospace`; // Fuente monospace

    drops.forEach((y, x) => {
        let text;
        
        if (y < canvas.height / 2) {
            // Mostrar caracteres aleatorios en la mitad superior
            text = characters.charAt(Math.floor(Math.random() * characters.length));
        } else {
            // Mostrar la palabra actual en la parte inferior
            text = targetWord.charAt(x % targetWord.length);
        }

        context.fillText(text, x * fontSize, y * fontSize); // Dibujar texto

        if (y * fontSize > canvas.height && Math.random() > 0.975) {
            drops[x] = 0; // Reiniciar la posición si sale del canvas
        } else {
            drops[x]++; // Incrementar la posición de la gota
        }
    });

    // Dibujar la palabra "CHARLIE" en el centro
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    context.textAlign = "center"; // Centrar texto horizontalmente
    context.textBaseline = "middle"; // Centrar texto verticalmente

    if (currentIndex < targetWord.length) {
        context.fillStyle = "#0F0"; // Color verde brillante para letras que se están formando
        context.fillText(targetWord[currentIndex], centerX, centerY); // Dibujar letra actual
        fadeOutCounter++; // Aumentar contador para mostrar cada letra durante un tiempo

        if (fadeOutCounter > 20) { // Tiempo para mostrar cada letra antes de pasar a la siguiente
            currentIndex++; // Pasar a la siguiente letra
            fadeOutCounter = 0; // Reiniciar contador
        }
    } else if (isFadingOut) {
        const alpha = Math.max(0, 1 - (fadeOutCounter / 100)); // Calcular opacidad
        context.fillStyle = `rgba(0, 255, 0, ${alpha})`; // Color verde con opacidad decreciente
        context.fillText(targetWord, centerX, centerY); // Dibujar palabra completa

        fadeOutCounter++;
        if (fadeOutCounter > 100) {
            isFadingOut = false; // Detener desvanecimiento después de completar
            currentIndex = 0; // Reiniciar índice para volver a formar la palabra
            fadeOutCounter = 0; // Reiniciar contador
        }
    } else if (currentIndex >= targetWord.length) {
        isFadingOut = true; // Iniciar desvanecimiento después de formar la palabra completa
    }
}

setInterval(draw, 33); // Llamar a la función draw cada 33 ms
