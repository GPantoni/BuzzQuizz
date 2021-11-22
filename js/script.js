let objects = [];
let bannerQuizz, questionsList, elementAnswerQuizz, elementQuestionsListArticle, elementAnswersLi;
let quizz = {
    title:'',
    image:'',
    questions:[],
    levels:[]
};
let question = {};
let numberOfQuestions = 0;
let numberOfLevels = 0;


/* ============ puxando quizzes pelo ID para teste ============ */
/* const testando = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/1");
testando.then(postQuizz);

function postQuizz(resposta){
    console.log(resposta.data);
    let objeto = resposta.data;
    
    //const testesupremo = axios.post("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes", testao);
    //testesupremo.then(dale);
    //function dale(resposta){
    //    console.log("DEU BOM PORRA");
    //}
} */

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
    if(document.querySelector(".quizzes-list-user").children.length === 0){
        document.querySelector(".quizzes-list-user").parentNode.classList.add("hide");
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
        let listQuestions = document.querySelector(".questions-list");
        let testTemp = [];

        for(let i = 0; i < listQuestions.children.length; i++){ // percorre todas as perguntas
            
            const lengthAnswers = listQuestions.children[i].children[0].children[1].children.length;
            for(let j = 0; j < listQuestions.children[i].children[0].children[1].children.length; j++){
                testTemp.push(listQuestions.children[i].children[0].children[1].children[j]);
            }

            listQuestions.children[i].children[0].children[1].innerHTML = "";
            testTemp.sort(comparador);
            
            for(let j = 0; j < lengthAnswers; j++){
                listQuestions.children[i].children[0].children[1].innerHTML += testTemp[j].outerHTML;
            }
            
            testTemp = [];

        }

        function comparador() { 
            return Math.random() - 0.5; 
        }
    }
    fillQuestionsAndAnswers();
    document.querySelector("header").scrollIntoView();
}

function createQuizzExpand(){
    const arraySections = ["initial-page", "quizz-page", "quizz-maker"];

    for(let i = 0; i < arraySections.length; i++){
        let section = document.querySelector(`.${arraySections[i]}`);
        if(!section.classList.contains("hide")){
            section.classList.add("hide");
        }
    }
    document.querySelector(`.${arraySections[2]}`).classList.remove("hide");
}

function initial(){
    window.location.reload();
}


/* ++++++++++++++++++++++ script form abaixo ++++++++++++++++++++++++++++++++ */

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

const textSizeChecker = (text) => {
    return text.length > 20 ? true : false;
}

function openForm(expandButton) {
    let form = expandButton;
    
    form.parentNode.parentNode.parentNode.classList.toggle('closed-form');
}

function quizzDefinition() {
    const quizzDefinitionPage = document.querySelector('.quizz-definition');
    const quizzQuestionsPage = document.querySelector('.quizz-questions');
    
    let testTitle = document.querySelector('.test-title').value;
    let testImageUrl = document.querySelector('.test-image-url').value;
    numberOfQuestions = parseInt(document.querySelector('.number-of-questions').value);
    numberOfLevels = parseInt(document.querySelector('.number-of-levels').value);

    quizzTitleChecker(testTitle) ? quizz.title = testTitle : alert('Invalid title');
    urlChecker(testImageUrl) ? quizz.image = testImageUrl : alert('Invalid url');
    if(numberOfQuestions < 3){alert('minimun 3 questions')};
    if(numberOfLevels < 2){alert('minimun 2 levels')};

    if(quizz.title !== '' && quizz.image !== '' && numberOfQuestions >= 3 && numberOfLevels >= 2) {
        for(let i = 1; i < numberOfQuestions; i++) {
            quizzQuestionsPage.innerHTML += `
            <div class="box flex-left closed-form">
                <div    class="question-maker">
                    <div class="open-form">
                        <h2>Pergunta ${i+1}</h2>
                        <ion-icon name="create-outline" onclick="openForm(this)"></ion-icon>
                    </div>
                    <input type="text" placeholder="Texto da pergunta">
                    <input type="text" placeholder="Cor de fundo da pergunta">
                    <h2>Reposta correta</h2>
                    <input type="text" placeholder="Resposta correta">
                    <input type="url" placeholder="URL da imagem">
                    <h2>Respostas incorretas</h2>
                    <input type="text" placeholder="Resposta incorreta 1">
                    <input type="url" placeholder="URL da imagem 1">
                    <input type="text" placeholder="Resposta incorreta 2">
                    <input type="url" placeholder="URL da imagem 2">
                    <input type="text" placeholder="Resposta incorreta 3">
                    <input type="url" placeholder="URL da imagem 3">
                </div>
            </div>
            `
        }
        
        quizzQuestionsPage.innerHTML += `<button onclick="quizzQuestions()">Prosseguir pra criar níveis</button>`
        
        quizzDefinitionPage.classList.add('hide');
        quizzQuestionsPage.classList.remove('hide');
    }
}

function quizzQuestions() {
    let questions = document.querySelectorAll('.question-maker');
    
    for(let i = 0; i < numberOfQuestions; i++) {
        let prototypeQuestion = questions[i];
        if(textSizeChecker(prototypeQuestion.querySelector('input:firstChild').value)){
            question.title = prototypeQuestion.querySelector('input:firstChild').value;
        } else { alert('Texto da pergunta deve ter amanho mínimo de 20 caracteres')}

    }
}