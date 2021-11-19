let promise = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes");
promise.then(fillQuizz);

function fillQuizz(reply){
    let quizzInList = `
        <article class="quizz">
            <div class="quizz-card">
                <h2>${reply.data[0].title}</h2>
            </div>
        </article>
        `
    console.log(reply.data[0].image);
    console.dir(document.querySelector(".quizz-card").style);
    console.log(reply.data[0].title);
}