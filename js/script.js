function loadQuizzList(){    
        let promise = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes");
        promise.then(fillQuizz);
        const quizzesList = document.querySelector('.quizzes-list');
        const count = quizzesList.children.length;

        function fillQuizz(reply){
        const quizzesListUser = document.querySelector('.quizzes-list-user');
        for(let i = count; i < reply.data.length; i++){
            quizzesList.innerHTML += `
            <li class="quizz">
            <div class="quizz-card">
            <h2>${reply.data[i].title}</h2>
            </div>
            </li>
            `;
        }

        for(let j = count; j < document.querySelector(".quizzes-list").children.length; j++){
            quizzesList.children[j].children[0].style.backgroundImage = `linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.5) 65%, #000000 100%), url(${reply.data[j].image})`;
        }
    }
}

loadQuizzList();