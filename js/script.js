let objects = [];
let bannerQuizz, questionsList, elementAnswerQuizz, elementQuestionsListArticle, elementAnswersLi;    

function loadQuizzList(){    
    const promise = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes");
    promise.then(fillQuizz);

    const quizzesList = document.querySelector('.quizzes-list');
    const count = quizzesList.children.length; // = 5
    let titlesCheck = [];
    let idsCheck = [];
    function fillQuizz(reply){
        objects = reply;
        for(let i = 0; i < reply.data.length; i++){
            if(!titlesCheck.includes(reply.data[i].title)){
                titlesCheck.push(reply.data[i].title);
                idsCheck.push(i);
                quizzesList.innerHTML += `
                <li class="quizz" onclick="expandQuizz(this)">
                    <div class="quizz-card">
                        <h3>${reply.data[i].title}</h3>
                    </div>
                </li>
                `;
            }
        }
        
        for(let j = count, i = 0; j < document.querySelector(".quizzes-list").children.length; j++, i++){
            quizzesList.children[j].children[0].style.backgroundImage = `linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.5) 65%, #000000 100%), url(${reply.data[idsCheck[i]].image})`;
        }
    }
}
loadQuizzList();

function expandQuizz(element){
    let title = element.children[0].children[0].innerHTML;
    let tempObject = {};
    for(let i = 0; i < objects.data.length; i++){
        if(title === objects.data[i].title){
            tempObject = objects.data[i];
            break;
        }
    }
    document.querySelector(".quizz-page").innerHTML = '';
    document.querySelector(".initial-page").classList.add("hide");
    document.querySelector(".quizz-page").classList.remove("hide");

    bannerQuizz = `<div class="banner-quizz" style="background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.57), rgba(0, 0, 0, 0.57)), url(${tempObject.image})"><h1>${tempObject.title}</h1></div>` ;
    questionsList = `<div class="container questions-list"></div>`;
    
    elementAnswerQuizz = `
    <article class="questions"></article>
    `;

    function fillQuestionsAndAnswers(){
        document.querySelector(".quizz-page").innerHTML = bannerQuizz + questionsList;
        for(let i = 0; i < tempObject.questions.length; i++){
            document.querySelector(".questions-list").innerHTML += `${elementAnswerQuizz}`;
        }
        for(let i = 0; i < tempObject.questions.length; i++){
            elementQuestionsListArticle = `
                <div class="question">
                    <div class="question-title" style="background-color: ${tempObject.questions[i].color}"}"><h2>${tempObject.questions[i].title}</h2></div>
                    <ul class="answers"></ul>
                </div>
            `;
            document.querySelector(".questions-list").children[i].innerHTML += elementQuestionsListArticle;
        }
        for(let i = 0; i < tempObject.questions.length; i++){
            for(let j = 0; j < tempObject.questions[i].answers.length; j++){
                elementAnswersLi = `
                <li class="answer">
                    <div class="answer-image" style="background-image: url(${tempObject.questions[i].answers[j].image})"></div>
                    <div class="answer-text"><h3>${tempObject.questions[i].answers[j].text}</h3></div>
                </li>
                `;
                document.querySelector(".questions-list").children[i].children[0].children[1].innerHTML += elementAnswersLi;
            }
        }
    }
    fillQuestionsAndAnswers();
}

const urlChecker = (url) => {
    try {
        new URL(url);
    } catch (e) {
        console.error(e);
        return false;
    }
    return true;
}

const quizzTitleChecker = (quizzTitle) => {
    return quizzTitle.length >= 20 && quizzTitle.length <= 65 ? true : false;
}

const hexColorChecker = (color) => {
    const regExp = /^#([0-9A-F]{3}){1,2}$/i;

    return regExp.test(color);
}