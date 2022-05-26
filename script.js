const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion()
})

function startGame() {
    console.log('Started')
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove('hide')
    setNextQuestion()
}

function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text;
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}

function resetState() {
    // CHECK THIS FOR BUGS IF TIMER NOT WORKING
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')
    } else {
        // ADD HIGH SCORE FUNCTIONALITY HERE
        startButton.innerText = 'Restart'
        startButton.classList.remove('hide')
    }

}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

// Questions

const questions = [
    {
        question: "What does HTML stand for?",
        answers: [
            { text: 'Hypertext Markup Language', correct: true },
            { text: 'Happy Turtle Meetup Lawyers', correct: false }
        ]
    },
    {
        question: "What does CSS stand for?",
        answers: [
            { text: 'Cascading Style Sheets', correct: true },
            { text: 'Corrosive Septic Squalor', correct: false }
        ]
    },
    {
        question: "Which language is used for scripting in Web Development?",
        answers: [
            { text: 'JavaScript', correct: true },
            { text: 'Lisp', correct: false }
        ]
    },
    {
        question: "Which is a web api?",
        answers: [
            { text: 'local storage', correct: true },
            { text: 'LUA', correct: false }
        ]
    },
    {
        question: "What tag is used to connect JavaScript to an index.html file?",
        answers: [
            { text: '<script>', correct: true },
            { text: '<div>', correct: false }
        ]
    }
]