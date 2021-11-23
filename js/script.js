let objects = [];
let bannerQuizz, questionsList, quizzResult, elementAnswerQuizz, elementQuestionsListArticle, elementAnswersLi;
let meter = 0;
let meterTrue = 0;
let meterFalse = 0;
let percentage = 0;
let level = {};
let tempObject = {};

let quizz = {
    title:'',
    image:'',
    questions:[],
    levels:[]
};


let numberOfQuestions = 0;
let numberOfLevels = 0;

let userCreatedQuizz = [];


function loadQuizzListUser(){
    const localQuizzes = JSON.parse(localStorage.getItem('userQuizzes'));
    const quizzesList = document.querySelector('.quizzes-list-user');
    let count = 0;
    if(localQuizzes === null){
        return
    } else {
        count = localQuizzes.length;
    }
    if(count > 0){
        document.querySelector(".create").classList.add("hide");
        document.querySelector(".list-user").classList.remove("hide");
    }
    let i = 0;
    for(i; i < count; i++){
        const promise = axios.get(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${localQuizzes[i].id}`);
        promise.then(fillQuizz);
    }

    function fillQuizz(reply){
        objects = reply;

        quizzesList.innerHTML += `
        <li class="quizz" onclick="expandQuizz(this)">
            <div class="quizz-card" style="background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.5) 65%, #000000 100%), url(${reply.data.image})">
                <h3>${reply.data.title}</h3>
            </div>
        </li>
        `;
    }
}
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
loadQuizzListUser();
loadQuizzList();

function expandQuizz(element){
    percentage, meterFalse, meterTrue, meter = 0;
    let title = element.children[0].children[0].innerHTML;
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
    quizzResult = `<div class="container quizz-result hide"><div class="result"><div class="result-grid"><div class="text-result"><h2></h2></div><div class="image-result"></div><div class="description-result"><h2></h2></div></div></div><div class="container btns"><button onclick="restartQuizz(this)">Reiniciar Quizz</button><div><a href="#" onclick="initial()">Voltar para home</a></div></div></div>`;
    

    elementAnswerQuizz = `
    <article class="questions"></article>
    `;

    function fillQuestionsAndAnswers(){
        document.querySelector(".quizz-page").innerHTML = bannerQuizz + questionsList + quizzResult;
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
                <li class="answer ${tempObject.questions[i].answers[j].isCorrectAnswer}" onclick="checkAnswer(this)">
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

function restartQuizz(element){
    const elementExpand = element.parentNode.parentNode.parentNode;
    setTimeout(() =>{
        document.querySelector("header").scrollIntoView({behavior: "smooth"})
        expandQuizz(elementExpand);
    }, 1000);
}


function checkAnswer(element){
    const ul = element.parentNode.children;
    const scroll = element.parentNode.parentNode.parentNode;
    
    

    for(let i = 0; i < ul.length; i++){
        if(element.parentNode.classList.contains("block")){
            break;
        } else {
            if(element.classList.contains("true")){
                element.classList.remove("true");
                element.classList.add("trueOn");
                element.parentNode.classList.add("block");
                meter++;
                meterTrue++;
                percentageCalculator();
            } else {
                element.classList.remove("false");
                element.classList.add("falseOn");
                element.parentNode.classList.add("block");
                meter++;
                percentageCalculator();
            }
        }
    }
    
    for(let i = 0; i < element.parentNode.children.length; i++){
        if(!(element.parentNode.children[i].classList.contains("trueOn") || element.parentNode.children[i].classList.contains("falseOn"))){
            
            element.parentNode.children[i].classList.add("off");
        }
    }
    function scrollQuestion(){
        if(scroll.nextElementSibling != null){
            scroll.nextElementSibling.scrollIntoView({block: "center", behavior: "smooth"})

        }
    }
    setTimeout(scrollQuestion, 2000);
    

    
    function percentageCalculator(){
        let temp = element.parentNode.parentNode.parentNode.parentNode.children.length;
        
        if(temp == meter){
            document.querySelector(".quizz-result").classList.remove("hide");
            setTimeout(() => {
                document.querySelector(".quizz-result").scrollIntoView({block: "start", behavior: "smooth"});
              }, 2000);

            percentage = Math.round((meterTrue * 100) / meter);
            for(let popo = 0; popo < tempObject.levels.length; popo++){
                if(percentage >= tempObject.levels[popo].minValue){
                    level = tempObject.levels[popo];
                }
            }
            document.querySelector(".result-grid").children[0].children[0].innerHTML = `${percentage}% de acerto: ${level.title}`; //title
            document.querySelector(".result-grid").children[1].style.backgroundImage = `url(${level.image})`;
            document.querySelector(".result-grid").children[2].children[0].innerHTML = level.text;
        }
    }

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
    return text.length >= 20 ? true : false;
}

const levelTitleSizeChecker = (levelTitle) => {
    return levelTitle.length >= 10 ? true : false;
}

const percentageChecker = (percentage) => {
    return percentage >= 0 && percentage <= 100 ? true : false;
}

const levelDescriptionChecker = (description) => {
    return description.length >= 30 ? true : false;
}

function openForm(expandButton) {
    let form = expandButton;
    
    form.parentNode.parentNode.parentNode.classList.toggle('closed-form');
}

function quizzDefinition() {
    const quizzDefinitionPage = document.querySelector('.quizz-definition');
    const quizzQuestionsPage = document.querySelector('.quizz-questions');
    const quizzLevelsPage = document.querySelector('.quizz-levels');
    
    let testTitle = document.querySelector('.test-title').value;
    let testImageUrl = document.querySelector('.test-image-url').value;
    numberOfQuestions = parseInt(document.querySelector('.number-of-questions').value);
    numberOfLevels = parseInt(document.querySelector('.number-of-levels').value);

    quizzTitleChecker(testTitle) ? quizz.title = testTitle : alert('Invalid title');
    urlChecker(testImageUrl) ? quizz.image = testImageUrl : alert('Invalid url');
    if(numberOfQuestions < 3){alert('minimun 3 questions')};
    if(numberOfLevels < 2){alert('minimun 2 levels')};

    if(quizz.title !== '' && quizz.image !== '' && numberOfQuestions >= 3 && numberOfLevels >= 2) {
        for(let i = 0; i < numberOfQuestions; i++) {
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

        for(let i = 0; i < numberOfLevels; i++) {
            quizzLevelsPage.innerHTML += `
            <div class="box closed-form">
                <div class="level flex-left">
                    <div class="open-form">
                        <h2>Nível ${i+1}</h2>
                        <ion-icon name="create-outline" onclick="openForm(this)"></ion-icon>
                    </div>
                    <input type="text" placeholder="Título do nível">
                    <input type="number" placeholder="% de acerto mínima">
                    <input type="url" placeholder="URL da imagem do nível">
                    <input type="text" placeholder="Descrição do nível">
                </div>
            </div>
            `
        }

        quizzLevelsPage.innerHTML += `<button onclick="quizzLevels()">Finalizar Quizz</button>`;
        
        quizzDefinitionPage.classList.add('hide');
        quizzQuestionsPage.classList.remove('hide');
    }
}

function quizzQuestions() {
    let contBreak = 0;
    let questions = document.querySelectorAll('.question-maker');
    quizz.questions = [];
    
    for(let i = 0; i < questions.length; i++){
        if(contBreak !== 0){
            contBreak = 0;
            break;
        }
        let question = {
            title: "",
            color: "",
            answers: []
        };
        for(let j = 1; j < questions[i].children.length; j++){
            let answer = {
                text: "",
                image: "",
                isCorrectAnswer: null
            };
            if(j === 1){
                if(textSizeChecker(questions[i].children[j].value)){
                    question.title = questions[i].children[j].value;
                } else {
                    alert("Texto da questão: tamanho mínimo 20 caracteres.");
                    contBreak++;
                    break;
                }
            }
            if(j === 2){
                if(hexColorChecker(questions[i].children[j].value)){
                    question.color = questions[i].children[j].value;
                } else {
                    alert("Informe uma cor hexadecimal válida.");
                    contBreak++;
                    break;
                }
            }
            if(j === 4){
                if(questions[i].children[j].value !== "" && urlChecker(questions[i].children[j+1].value)){
                    answer.text = questions[i].children[j].value;
                    answer.image = questions[i].children[j+1].value;
                    answer.isCorrectAnswer = true;

                    question.answers.push(answer);
                } else {
                    alert("Texto da resposta correta ou url da imagem inválidas.");
                    contBreak++;
                    break;
                }
            }
            if(j === 7){
                if(questions[i].children[j].value !== "" && urlChecker(questions[i].children[j+1].value)){
                    answer.text = questions[i].children[j].value;
                    answer.image = questions[i].children[j+1].value;
                    answer.isCorrectAnswer = false;

                    question.answers.push(answer);
                } else {
                    alert("Texto da resposta incorreta 1 ou url da imagem inválidas.");
                    contBreak++;
                    break;
                }
            }
            if(j === 9){
                if(questions[i].children[j].value !== "" && questions[i].children[j+1].value != ""){
                    if(questions[i].children[j].value !== "" && urlChecker(questions[i].children[j+1].value)){
                        answer.text = questions[i].children[j].value;
                        answer.image = questions[i].children[j+1].value;
                        answer.isCorrectAnswer = false;

                        question.answers.push(answer);
                    } else {
                        alert("Texto da resposta incorreta 2 ou url da imagem inválidas.");
                        contBreak++;
                        break;
                    }
                }
            }
            if(j === 11){
                if(questions[i].children[j].value != "" && questions[i].children[j+1].value != ""){
                    if(questions[i].children[j].value !== "" && urlChecker(questions[i].children[j+1].value)){
                        answer.text = questions[i].children[j].value;
                        answer.image = questions[i].children[j+1].value;
                        answer.isCorrectAnswer = false;

                        question.answers.push(answer);
                    } else {
                        alert("Texto da resposta incorreta 3 ou url da imagem inválidas.");
                        contBreak++;
                        break;
                    }
                }
            }

        }
        if(contBreak !== 0){
            contBreak = 0;
            break;
        }
        quizz.questions.push(question);
    }

    if(quizz.questions.length === numberOfQuestions) {
        document.querySelector('.quizz-questions').classList.toggle('hide');
        document.querySelector('.quizz-levels').classList.toggle('hide');
    }
}

function quizzLevels() {
    let contBreak = 0;
    let levels = document.querySelectorAll('.level');
    quizz.levels = [];
    let meterValue = [];

    for(let i = 0; i < levels.length; i++) {
        if(contBreak !== 0) {
            contBreak = 0;
            break;
        }

        let level = {
            title: null,
            image: null,
            text: null,
            minValue:null
        }

        for(let j = 1; j < levels[i].children.length; j++) {
            if(j === 1) {
                if(levelTitleSizeChecker(levels[i].children[j].value)) {
                    level.title = levels[i].children[j].value;
                } else {
                    alert('Título do nível: tamanho mínimo 10 caracteres.');
                    contBreak++;
                    break;
                }
            }
            if(j === 2) {
                if(percentageChecker(levels[i].children[j].value)) {
                    level.minValue = parseInt(levels[i].children[j].value);
                    meterValue.push(parseInt(levels[i].children[j].value));
                } else {
                    alert('Porcentagem de acerto deve ser um número entre 0 e 100.');
                    contBreak;
                    break;
                }
            }
            if(j === 3) {
                if(urlChecker(levels[i].children[j].value)) {
                    level.image = levels[i].children[j].value;
                } else {
                    alert('URL inválida.');
                    contBreak++;
                    break;
                }
            }
            if(j === 4) {
                if(levelDescriptionChecker(levels[i].children[j].value)) {
                    level.text = levels[i].children[j].value;
                } else {
                    alert('Descrição do nível: tamanho mínimo 30 caracteres');
                    contBreak++;
                    break;
                }
            }
        }

        if(contBreak !== 0) {
            contBreak = 0;
            break;
        }

        quizz.levels.push(level);
    }

    if(quizz.levels.length === numberOfLevels && quizz.levels.filter(percent => percent.minValue === 0).length === 1) {
        const promise = axios.post("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes", quizz);
        promise.then(postQuizz);
        promise.catch(() => {
            alert.log("ERRO: Recarregue a página!");
        })
    } else {
        alert.log("Tem mais de um níve '0'.");
    }
}

function postQuizz(resposta){
    let userPostedQuizz = {
        id: resposta.data.id,
        key: resposta.data.key
    };

    userCreatedQuizz = localStorage.getItem('userQuizzes');
    
    userCreatedQuizz = JSON.parse(userCreatedQuizz); // Tá como objeto
    
    if(userCreatedQuizz === null){
        userCreatedQuizz = [];
        userCreatedQuizz.push(userPostedQuizz);
    } else {
        userCreatedQuizz.push(userPostedQuizz);
    }
    
    userCreatedQuizz = JSON.stringify(userCreatedQuizz); // Tá como string
    
    localStorage.setItem('userQuizzes', userCreatedQuizz);
    
    const quizzFinishedPage = document.querySelector('.quizz-finished');

    quizzFinishedPage.innerHTML += `
        <h1>Seu quizz está pronto!</h1>
        <div class="finished-created-quizz">
            <li class="quizz" onclick="expandQuizz(this)">
                <div class="quizz-card">
                    <h3>${resposta.data.title}</h3>
                </div>
            </li>
        </div>
        <button onclick="refQuizz()">Acessar Quizz</button>
        <div class="back-btn"><a onclick="initial()">Voltar pra home</a></div>
    `

    quizzFinishedPage.children[1].children[0].children[0].style.backgroundImage = `linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.5) 65%, #000000 100%), url(${resposta.data.image})`;
    
    document.querySelector('.quizz-levels').classList.toggle('hide');
    document.querySelector('.quizz-finished').classList.toggle('hide');
}

function refQuizz(){
    expandQuizz(document.querySelector(".finished-created-quizz .quizz"));
    document.querySelector(".quizz-maker").classList.add("hide");
}
