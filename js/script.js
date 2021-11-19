function loadQuizzList(){    
        let promise = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes");
        promise.then(fillQuizz);
        function fillQuizz(reply){
            const quizzesList = document.querySelector('.quizzes-list');
        const quizzesListUser = document.querySelector('.quizzes-list-user');
        for(let i = 0; i < reply.data.length; i++){
            quizzesList.innerHTML += `
            <li class="quizz">
            <div class="quizz-card">
            <h2>${reply.data[i].title}</h2>
            </div>
            </li>
            `;
        }
        for(let j = 0; j < document.querySelector(".quizzes-list").children.length; j++){
            console.log(quizzesList.children[j].children[0])
            quizzesList.children[j].children[0].style.backgroundImage = `linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.5) 65%, #000000 100%), url(${reply.data[j].image})`;
        }
    }
}

loadQuizzList();