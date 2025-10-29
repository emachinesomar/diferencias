// Datos del juego - 20 frases con sus clasificaciones y explicaciones
const phrases = [
    {
        text: "Tu esfuerzo fue increíble, se nota que te preparaste.",
        isPraise: true,
        explanation: "¡Correcto! Este es un elogio sincero que reconoce el esfuerzo específico de la persona."
    },
    {
        text: "Eres el único que puede hacer esto, si no lo haces, todo saldrá mal.",
        isPraise: false,
        explanation: "¡Exacto! Esta es una forma de manipulación que crea presión y miedo para controlar a la persona."
    },
    {
        text: "Me encanta cómo ayudas a los demás sin esperar nada a cambio.",
        isPraise: true,
        explanation: "¡Muy bien! Este elogio reconoce una cualidad positiva real sin pedir nada a cambio."
    },
    {
        text: "Si no estás en el equipo, seguro perdemos.",
        isPraise: false,
        explanation: "¡Así es! Esta frase pone demasiada presión y hace sentir responsable por cosas que no puede controlar."
    },
    {
        text: "Tu dibujo tiene mucha creatividad, ¡bien hecho!",
        isPraise: true,
        explanation: "¡Perfecto! Este es un elogio específico que celebra el trabajo realizado."
    },
    {
        text: "Solo tú puedes salvar esta presentación.",
        isPraise: false,
        explanation: "¡Correcto! Esta frase sobrecarga de responsabilidad y crea ansiedad innecesaria."
    },
    {
        text: "Tu opinión fue clara y respetuosa, gracias por compartirla.",
        isPraise: true,
        explanation: "¡Excelente! Este elogio valora cómo se expresó la persona de forma constructiva."
    },
    {
        text: "Eres el mejor, nadie más se compara contigo.",
        isPraise: false,
        explanation: "¡Muy bien! Aunque suena positivo, esta frase crea competencia y puede hacer sentir mal a los demás."
    },
    {
        text: "Tu trabajo fue excelente, se nota tu dedicación.",
        isPraise: true,
        explanation: "¡Así es! Este elogio reconoce el resultado y el proceso que llevo a ese resultado."
    },
    {
        text: "Si no vienes, será un desastre.",
        isPraise: false,
        explanation: "¡Exacto! Esta frase manipula haciéndote sentir culpable por situaciones que no controlas."
    },
    {
        text: "Me gustó cómo escuchaste a todos antes de decidir.",
        isPraise: true,
        explanation: "¡Correcto! Este elogio valora una habilidad social importante: la escucha activa."
    },
    {
        text: "Eres tan especial que todos deberían hacer lo que tú digas.",
        isPraise: false,
        explanation: "¡Muy bien! Esta frase suena halagadora pero promueve actitudes egocéntricas y poco saludables."
    },
    {
        text: "Tu idea fue original y ayudó al grupo.",
        isPraise: true,
        explanation: "¡Perfecto! Este elogio reconoce tanto la originalidad como el impacto positivo en el grupo."
    },
    {
        text: "Sin ti, esto no tiene sentido.",
        isPraise: false,
        explanation: "¡Así es! Esta frase exagera tu importancia y puede hacer sentir presionado o manipulado."
    },
    {
        text: "Gracias por colaborar con paciencia y respeto.",
        isPraise: true,
        explanation: "¡Excelente! Este elogio valora cualidades importantes como la paciencia y el respeto."
    },
    {
        text: "Eres perfecto, no necesitas mejorar nada.",
        isPraise: false,
        explanation: "¡Correcto! Nadie es perfecto y decir esto puede impedir el crecimiento personal y el aprendizaje."
    },
    {
        text: "Tu actitud positiva contagia al grupo.",
        isPraise: true,
        explanation: "¡Muy bien! Este elogio reconoce cómo tu actitud afecta positivamente a los demás."
    },
    {
        text: "Solo tú sabes cómo hacerlo bien.",
        isPraise: false,
        explanation: "¡Exacto! Esta frase crea presión y hace sentir que los demás no son capaces o importantes."
    },
    {
        text: "Tu esfuerzo constante es admirable.",
        isPraise: true,
        explanation: "¡Así es! Este elogio reconoce la constancia, una cualidad valiosa y positiva."
    },
    {
        text: "Si tú no lo haces, nadie más podrá.",
        isPraise: false,
        explanation: "¡Perfecto! Esta frase manipula haciéndote sentir que eres el único responsable de todo."
    }
];

// Variables del juego
let currentQuestion = 0;
let score = 0;
let gamePhrases = [];

// Elementos del DOM
const welcomeScreen = document.getElementById('welcome-screen');
const gameScreen = document.getElementById('game-screen');
const finalScreen = document.getElementById('final-screen');
const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');
const phraseText = document.getElementById('phrase-text');
const phraseCard = document.getElementById('phrase-card');
const answerButtons = document.querySelectorAll('.btn-answer');
const feedback = document.getElementById('feedback');
const feedbackIcon = document.getElementById('feedback-icon');
const feedbackTitle = document.getElementById('feedback-title');
const feedbackText = document.getElementById('feedback-text');
const continueBtn = document.getElementById('continue-btn');
const scoreElement = document.getElementById('score');
const finalScore = document.getElementById('final-score');
const finalMessage = document.getElementById('final-message');
const progressFill = document.getElementById('progress-fill');
const questionCounter = document.getElementById('question-counter');

// Funciones del juego
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

function startGame() {
    // Mezclar las frases
    gamePhrases = shuffleArray(phrases);
    currentQuestion = 0;
    score = 0;
    
    // Actualizar interfaz
    scoreElement.textContent = '0';
    updateProgress();
    
    // Cambiar a pantalla del juego
    welcomeScreen.classList.remove('active');
    gameScreen.classList.add('active');
    
    // Mostrar primera pregunta
    showQuestion();
}

function showQuestion() {
    if (currentQuestion >= gamePhrases.length) {
        endGame();
        return;
    }
    
    const currentPhrase = gamePhrases[currentQuestion];
    
    // Actualizar contador
    questionCounter.textContent = `${currentQuestion + 1}/20`;
    updateProgress();
    
    // Animar entrada de la tarjeta
    phraseCard.classList.add('slide-in');
    
    setTimeout(() => {
        phraseText.textContent = currentPhrase.text;
        phraseCard.classList.remove('slide-in');
        
        // Habilitar botones
        answerButtons.forEach(btn => {
            btn.disabled = false;
            btn.classList.remove('disabled');
        });
        
        // Ocultar retroalimentación
        feedback.classList.remove('show');
        feedback.classList.add('hidden');
    }, 300);
}

function updateProgress() {
    const progress = ((currentQuestion) / gamePhrases.length) * 100;
    progressFill.style.width = `${progress}%`;
}

function handleAnswer(userAnswer) {
    const currentPhrase = gamePhrases[currentQuestion];
    const isCorrect = userAnswer === currentPhrase.isPraise;
    
    // Deshabilitar botones
    answerButtons.forEach(btn => {
        btn.disabled = true;
        btn.classList.add('disabled');
    });
    
    // Actualizar puntuación
    if (isCorrect) {
        score++;
        scoreElement.textContent = score;
    }
    
    // Mostrar retroalimentación
    showFeedback(isCorrect, currentPhrase.explanation);
}

function showFeedback(isCorrect, explanation) {
    // Configurar retroalimentación
    if (isCorrect) {
        feedback.classList.add('correct');
        feedback.classList.remove('incorrect');
        feedbackIcon.innerHTML = '<i class="fas fa-check-circle"></i>';
        feedbackTitle.textContent = '¡Correcto!';
    } else {
        feedback.classList.add('incorrect');
        feedback.classList.remove('correct');
        feedbackIcon.innerHTML = '<i class="fas fa-times-circle"></i>';
        feedbackTitle.textContent = 'Ups, no es así';
    }
    
    feedbackText.textContent = explanation;
    
    // Actualizar texto del botón
    if (currentQuestion === gamePhrases.length - 1) {
        document.getElementById('continue-text').textContent = 'Ver resultados';
    } else {
        document.getElementById('continue-text').textContent = 'Siguiente';
    }
    
    // Mostrar retroalimentación
    feedback.classList.remove('hidden');
    setTimeout(() => {
        feedback.classList.add('show');
    }, 100);
}

function nextQuestion() {
    currentQuestion++;
    
    // Animar salida de la tarjeta
    phraseCard.classList.add('slide-out');
    
    setTimeout(() => {
        phraseCard.classList.remove('slide-out');
        showQuestion();
    }, 300);
}

function endGame() {
    // Cambiar a pantalla final
    gameScreen.classList.remove('active');
    finalScreen.classList.add('active');
    
    // Mostrar puntuación final
    finalScore.textContent = score;
    
    // Mensaje motivador según el puntaje
    let message = '';
    const percentage = (score / gamePhrases.length) * 100;
    
    if (percentage >= 90) {
        message = "¡Increíble! Eres un experto identificando elogios sinceros y manipulaciones. ¡Tu intuición es excelente! 🌟";
    } else if (percentage >= 70) {
        message = "¡Muy bien! Tienes un buen sentido para distinguir entre elogios y engaños. ¡Sigue practicando! 👏";
    } else if (percentage >= 50) {
        message = "¡Bien hecho! Estás aprendiendo a identificar las diferencias. ¡La práctica hace al maestro! 💪";
    } else {
        message = "¡No te preocupes! Aprender a identificar estos patrones toma tiempo. ¡Cada intento te hace más fuerte! 🌈";
    }
    
    finalMessage.textContent = message;
}

function restartGame() {
    finalScreen.classList.remove('active');
    welcomeScreen.classList.add('active');
}

// Event listeners
startBtn.addEventListener('click', startGame);
restartBtn.addEventListener('click', restartGame);

answerButtons.forEach(button => {
    button.addEventListener('click', () => {
        const answer = button.dataset.answer === 'true';
        handleAnswer(answer);
    });
});

continueBtn.addEventListener('click', nextQuestion);

// Animaciones adicionales
document.addEventListener('DOMContentLoaded', () => {
    // Agregar efectos hover a los botones
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Efecto de parpadeo en el icono de bienvenida
    const welcomeIcon = document.querySelector('.game-icon');
    if (welcomeIcon) {
        setInterval(() => {
            welcomeIcon.style.transform = 'scale(1.05)';
            setTimeout(() => {
                welcomeIcon.style.transform = 'scale(1)';
            }, 200);
        }, 3000);
    }
});