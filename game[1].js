const question = document.querySelector('#question2');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progrssBarFull');

let currentQusetion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: "what is 2 + 2?",
        choice1: "3",
        choice2: "4",
        choice3: "21",
        choice4: "17",
        answer: 2,
    },
    {
        question: "The tallest building in the world is located in with city",
        choice1: "Dubai",
        choice2: "New York",
        choice3: "Shanghai",
        choice4: "None on the above",
        answer: 1,
    },
    {
        question: "What percent of American adults believe that chocolate milk comes from brown cows?",
        choice1: "20%",
        choice2: "18%",
        choice3: "7",
        choice4: "33%",
        answer: 3,
    },
    {
        question: "Approximately what percent of U.S power outages are caused by squirrels?",
        choice1: "10-20%",
        choice2: "5-10%",
        choice3: "15-20%",
        choice4: "30-40%",
        answer: 1,
    }
]



const SCORE_POINTS = 100
const MAX_QUESTIONS = 4

startGame = () => {
    questionsCounter = 0
    score = 0 
    availableQuestions = [...questions]
    getNewQuestitons()
}

getNewQuestitons = () => {
    console.log(questionCounter)
    if(availableQuestions.length == 0 || questionCounter > MAX_QUESTIONS  ) {
            localStorage.setItem('mostRecentScore', score);
        return window.location.assign('./end.html')
    }
    
    questionCounter++
    
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    // console.log(`${(questionCounter/MAX_QUESTIONS) * 100}%`);
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    curretnQusetion = availableQuestions[questionsIndex]
    question.innerText = curretnQusetion.question
    
    
    
    choices.forEach(choice => {
        const number = choice.getAttribute('data-number')
        choice.innerText = curretnQusetion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']
        // console.log(curretnQusetion.answer)

        let classToApply = selectedAnswer == curretnQusetion.answer ? 'correct' :
         'incorrect'
        //  console.log(classToApply)
        
        if(classToApply == 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestitons()

        }, 1000)
    })
})

incrementScore = num => {
    
    score +=num
    console.log(score)
    scoreText.innerText = score
}

startGame()        