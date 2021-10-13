$(function(){

// all questions
const option1 = $('.option1'),
      option2 = $('.option2'),
      option3 = $('.option3'),
      option4 = $('.option4');

// all our options
const   optionElements = document.querySelectorAll('.option');
    //    optionElements = $('.option'),
        question = $('.question'),
        numberOfQuestion = $('#number-of-question'),
        numberOfallQuestion = $('#number-of-all-questions');

let indexOfQuestion,  //индекс текущего вопроса
    indexOfPage = 0;  //индекс страницы

const answerTracker = document.getElementById('answer-tracker'),
// const answerTracker = document.querySelectorAll('$answer-tracker > div'),
      btnNext = $('#btn-next');

let score = 0;  //итоговый результат викторины

const correctAnswer = $('#correct-answer'),
      numberOfallQuestion_2 = $('#number-of-all-questions-2'),
      btnTryAgain = $('#btn-try-again');
//занесем все вопросы и ответы + правильный к ним в объект. и потом какждый вопрос это элемент массива
const questions = [
    {
        question:'Какая моя любимая еда?',
        options:[
            'MacDonalds',
            'Макароны',
            'куриное филе',
            'Доширак'
        ],
        rightAnswer: 1
    },
    {
        question:'Какой у меня рост?',
        options:[
            '172',
            '169',
            '178',
            '180'
        ],
        rightAnswer: 0
    },
    {
        question: 'Какой мой любимый цвет?',
        options:[
            'black',
            'blue',
            'green',
            'aqua'
        ],
        rightAnswer: 2
    },
    {
        question: 'Чем мне нравиться заниматься?',
        options:[
            'плаванием',
            'программированием',
            'играть на флейте',
            'рисовать мелками'
        ],
        rightAnswer: 1
    }
    
]

//сколько всего вопросов автономно
$(numberOfallQuestion).html(questions.length)


//функция, которая будет выводить вопросs и ответы из объекта массива(пишем путь к проперти) в зависимости от индекса вопроса
const load = () => {
    $(question).html(questions[indexOfQuestion].question);

    $('.option1').html(questions[indexOfQuestion].options[0]);
    $('.option2').html(questions[indexOfQuestion].options[1]);
    $('.option3').html(questions[indexOfQuestion].options[2]);
    $('.option4').html(questions[indexOfQuestion].options[3]);

    $(numberOfQuestion).html(indexOfPage + 1); //текущая страница установка номера
    indexOfPage++; //увеличиваем на единицу индекс страницы
};

const comletedAnswers = [];

//сделаем чтобы вопросы выпадали рандомно
const randomQuestion = () => {
    // рандомное число от 0 до 1, поэтому множаем на кол-во вопросов и округляем до целого тогда будет от 0 до n
    let randomNumber = Math.floor(Math.random() * questions.length); //TODO:КОСЯК ПЕРЕСКАКИВАЕТ ЧЕРЕЗ 1
    let hitDublicate = false;

    if(indexOfPage == questions.length){ //когда будет последняя страница будет выводится конец игры
        quizOver();
    }else{
        if(comletedAnswers.length > 0) {
            comletedAnswers.forEach(item =>{
                if(item == randomNumber){
                    hitDublicate = true
                }
            });
            if(hitDublicate){
                randomQuestion();
            }else{
                indexOfQuestion = randomNumber;
                load(); //чтобы подставились все значения
            }
        };
        if (comletedAnswers == 0){
            indexOfQuestion = randomNumber;
            load();
        }
    };
    comletedAnswers.push(indexOfQuestion); //отправляем рандомное число в массив
}

//отследим клик для красного и зеленого
//TODO: выбираем у элемента data атрибут со своим названием(id) и там цифра для удобного сравнения  
const checkerAnswer = el => {
    if(el.target.dataset.id == questions[indexOfQuestion].rightAnswer){
        $(el.target).addClass('correct');
        updateAnswerTracker('correct');

        score++;
    }else{
        $(el.target).addClass('wrong');
        updateAnswerTracker('wrong');
    } 
    disabledOptions();

    

}



for(option of optionElements){
    // option.click(e => checkerAnswer(e))
    option.addEventListener('click',e => checkerAnswer(e));
}



const enableOptions = () => {
    optionElements.forEach(item => {
        item.classList.remove('disabled','correct','wrong')
    })
}

const answerTrackerFun = () =>{
    questions.forEach(()=>{
        // const div = document.createElement('div');
        // answerTracker.appendChild(div);
        $(answerTracker).append('<div></div>');

    })
}

const quizOver = () => {
    document.querySelector('.quiz-over-modal').classList.add('active');
    correctAnswer.html(score);
    numberOfallQuestion_2.html(questions.length);

}

const tryAgain = () =>{
    window.location.reload();
}

$('#btn-try-again').on('click',tryAgain);   

const disabledOptions = () =>{
    optionElements.forEach(item =>{
        $(item).addClass('disabled');
        if(item.dataset.id == questions[indexOfQuestion].rightAnswer){
            $(item).addClass('correct')
        }
    })
}
const updateAnswerTracker = status =>{
    answerTracker.children[indexOfPage - 1].classList.add(`${status}`);
}

const validate = () =>{
    if(!optionElements[1].classList.contains('disabled')){
        alert('Выберите 1 вариант ответа');
    }else{
        randomQuestion();
        enableOptions();
    }
}

$(btnNext).on('click',validate);




//когда прогрузить все окно будет выполняться функция
window.addEventListener('load', () => {
    randomQuestion();
    answerTrackerFun();
    console.log(optionElements);
console.log(answerTracker);
console.log(answerTracker.children);
});


})