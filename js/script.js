let objects = [];

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
    //Já temos o objeto no tempObject
    //Resta exibir a página do quizz e esconder a anterior.
    document.querySelector(".quizz-page").classList.remove("none");
    document.querySelector(".initial-page").classList.add("none");
}

let elementAnswerQuizz = `
    <article class="questions">
        <div class="question">
            <div class="question-title color0"><h2>|>>>>>|titulo_da_pergunta_aqui|<<<<<|</h2></div>

            <ul class="answers">
                <li class="answer">
                    <div class="answer-image">|>>>>>|image_deve_ser_trocada_nos_estilos|<<<<<|</div>
                    <div class="answer-text"><h3>|>>>>>|resposta_aqui}</h3></div>
                </li>

                ///// LI's de acordo com a quantidade de respostas do objeto

                </ul>
                </div>
                </article>
                `;
                
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