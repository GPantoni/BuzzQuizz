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


/* let testao = {};
testao = {"title":"O quão Potterhead é você?","image":"https://s3-alpha-sig.figma.com/img/60f6/4bae/cb4c4e815fc36d9f0f0579a657241eba?Expires=1638144000&Signature=cqsR1gZIngLBQPZ6LeL~vWnXsiDVfmQfBKYm6yHFxTCpkJNI4l~uNmpM4KredvdqP4M4T8h2xvw-kEkW91z3Ii8L~jTr-AIxLemInFf6fpM1-9tG2vQjPhlIeSgyhGfLiR5p53jnvg~uRzAgjshXhSaSxCjbyCtFzBmvzLYS8Zq0GxXw2MKCq3xRg18DnPy~qpJTrPQnSwp-h1dEFiVC5vcriL42Rn4qCtaKpDlf8KPGTVZO8WmsDKlW-IzcZhbLaRpc3HacjA9EELnZR8nZzw22qHuROyoyhKmVGM1OU2OF9Nej~Y~p5eFFXWzcLQ0VjG-0dApwkzDBqnpchxoF8w__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA","questions":[{"title":"o qual animal Olho-Tonto Moody transfigurou Malfoy?","color":"#434CA0","answers":[{"text":"Gatíneo","image":"https://s3-alpha-sig.figma.com/img/7212/aa92/e0229a2cb5aea15ab3fd2b5d36cb9a60?Expires=1638144000&Signature=E-djO4UvnSNyGrh4porzOF3~ateDCWBO7F03TgYzJFjSa02ZWO-YximHyOVzp2mV87abw44lrUzQjKrJ44Acd-S2xSfkrtbDvTQN3-QiLDB-fJH8ml48RD6RD-X7V9oKUBg7NFaZzmq~V3ra~iewSHFKNFS9d5KUwQanKvcqYIYKgmkEaePHMifpKIJ3FSjXHeV1JTP7VLnuFKIM5qbwhCJVlYJsv29HmJDft6BpbXsss0atSrtN2VdLkr4vnnbeGl9luFqV0MtM3djI5FjBhy3FUGrNvU2MPEUVEfChpLh1zcER1JBAsXC8iW3fELbPU0WwN2P9A1l5Ob5fSenSIA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA","isCorrectAnswer":false},{"text":"Ratata","image":"https://s3-alpha-sig.figma.com/img/6070/8f4d/4fe85b83d17f9b3c7faf3a738a2df140?Expires=1638144000&Signature=MIFffQtyvsz8Cb3c5F~KI6DCs8nJhw8sIs6D2jAusXPFAoDI~jIbRR8CEqI5HBuLxMuGAA3x2yEWTLBrx0vaHVYxQW7meyl8Qf1PJU~QeDuqM99PquCyvW8OXtGT1YUZnR5XF-qdhgkpwGhzCze0rF-KQIYpDC4S6ah3tCTj4C2KsS-B4fmWS4rnl2kWONRJdWMAWOnB-euSct3qU3gRxn7Iq1G15E3vMc0eUBoSIHooyCEaDMKyJyA0QvduyIKJ3FqB2WCx6-8CC~XqrO4K9sBDLYOrrqnqdwmzqyOGp2b9v~bFK~FzXJXGjvtth9W25BW5KCsREzOFUCjVmZB1hA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA","isCorrectAnswer":false},{"text":"Sapo gordo","image":"https://s3-alpha-sig.figma.com/img/c7e0/64f3/0145b79667e2e9f0f8193b64984531af?Expires=1638144000&Signature=LPJeK-SLHYDHkHbcn-ZSs7PNM2E4WcDnTIQzWNtdK7wVysYL9ML2B3bhPBfzs0al4b0UHoMP5dEFNCkgmYDmWy1zRr2KWQzVUSkQWmYKVZX2~yv-1aT2nvLDSUd0kCXMYII314M-dssachHGjvlzT6rjis0llYC-UTO9y5DhVfaBqmz~FGxUwkxvGZ9PeIS7E4MRAhk1R~6gjL59QEXD04kwpKmGOfHCjYpNJSoNk3d0LEZzb4vzJdk3Is9A09oTfkJ1PtBgulwinCu8VHIyM0m3LHukyZIA0jeNo2YOkXX4yK8xLKjv-z7QgMaQNTFMu2dXBTAnC0zEOL8~4ELuDg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA","isCorrectAnswer":false},{"text":"Mustela putorius (o Furão)","image":"https://s3-alpha-sig.figma.com/img/4bfb/7d5f/52d4ab9bee7b444cfed9506a1c2bc0ea?Expires=1638144000&Signature=Eec70CIe4MMPSI1sER~FsSP2W7Y6WCXg6yxFMbY8M7-DO5wDf3Y72G2AuJzz9ujtAXDEss92nvNQ20~H76EP9byY1vUb--mHYLzWzAusI5Z99hZr12XCVjeewEyBeNEtTE-vN2s400nIVCx1~8rlw80wMKcRd0nDMbFAoXnfbtSe9KYbgCQGjFpKDJeGXOOMefr9GaAHZjMeoA136uNeEYQhz0M7eH7bC6e~mS6y3YSRccNUu21~L69mJZuGOJpwigIVJwz~LWp2MBUkhDyBH9HdumuZ5mSA3ZIFrBulQkBJeCP1WrQ5k0i9rYfnLQiKDRt1vEAfswNoIl7Z88tZtg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA","isCorrectAnswer":true}]},{"title":"Qual dos objetos abaixo NÃO é uma horcrux?","color":"#A0438D","answers":[{"text":"The boy who lived","image":"https://s3-alpha-sig.figma.com/img/2740/7e61/76bf2840f187b7ce4cb283ea504a15ef?Expires=1638144000&Signature=CgMViY~br3d0wEDyrMVktK5F7mHESpVWO4L50TD3wTOVYOq6fymNHmtPCpbun~B7fJKVlRw9VzuXdhwdYQThzESuFOzu2AV5O5Q0j3tm99cb~YCj3dt3R7pLiXigsd6X9P2CZI5Jd~AYk~i8Nq8e4KJXgz0p4EVyx5M5Zh93VmR43L4Y3oUU~8Jk6jLNogv1ZjP8odO~bqo5CdgzKfQY2CIbUdWeD7hyBT-nijy~0eZxROOP-5V3P-eJ21UKNa5Zw1vM9~Vm3ZHV-MJSbfmb4g745~BjzSW0Q-Im4vnUULyQC8qHgx2C1nj9wXAQK85R-zjbq1y1FEdELf4rd~xa6Q__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA","isCorrectAnswer":false},{"text":"O livro monstruoso dos monstros","image":"https://s3-alpha-sig.figma.com/img/3755/8b53/b9c97f627e2eef3a1ced585d7854cc4a?Expires=1638144000&Signature=QAvlsYD35ooPKmRwkbOKDtoVAmzZau2AUKjKOs9LahenZfBCvS8cY~7fSnQHwT4RE750rr1fwKrFxHpg6ZH59KgTB9euTA~~U8C5Dpg8PKuLGP5dQYWJQVjJAXD3epUrGlQxQG75b1-04v1R0LmVCEOwAoN6dCJIOkp-tg6VjgntTOHmc5PTJfOr6Junlrqf50XEgbDMRIW~oUG9qfzzsOIwNZ~Vny26QGAGzYjU8q1ryLoISOXxXYYVZDpI5EEJm~BZlpqqSNfF9Ec4byb7WlQgA15l3L8FyqueRJjcfCYaw3WuQue9czYb2ut9Xepf8XNLTL3zHOP4-kPJaW54tw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA","isCorrectAnswer":true},{"text":"Anel velho","image":"https://s3-alpha-sig.figma.com/img/90b9/a1c9/a69e93b136bcf4c2f58e546fe7c5eb7f?Expires=1638144000&Signature=ZyodZNDe9EOG0Eq~1tNS4g1JPWT9~1V~BEBioOJTXcBgxCPHUzUBhEKI4HmwJ0aMJH3YU6plxj4Qa-ZXdXdDic1eKEIH4fL4u9uqdjFyDjDxKhJxputzD0jzWzTGjJ5xZva6lRcvJq0YVoZAM9K5SsknOId3MuSQqFsYLDrTt2EpywjoA2LS9pRnIaYQOFeLhOIR32xRC-3AEMyEQ13lIz6Pb2nHA0Iy0rIxWWtcPXA3H6jVItDSaUz5aC~DcQXZbY7ShQubg~T0DWCmiJ75STQpl1aggwOLWCazBVcGIoqHXmTR7NGprV7hB-a9FwST3vZnCfU~xVKtWLhc-8SRww__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA","isCorrectAnswer":false},{"text":"Diadema da Revenclaw","image":"https://s3-alpha-sig.figma.com/img/44b3/55b9/309baf633b5cf3311081d33cd5ae90af?Expires=1638144000&Signature=B56BRF2~-own79pUSmSM5tUJ6spc098~ynN0-Ot25Gh75nOn~A0wR0ar~iC9SWOZCXBhGwAshCRwIYyjyVPlW5YPYMBKDqiVyfbYT0ZDGsuqwswo1jkYeV9Zy2htJX~ehBbatLB1k4LNptABeiSCQVnoms49EPmJI1UXnPBa8STn7BQuZeVLrDV7yo01Q1FS-ugwd2KrKbW5CF3ugXlwnwutk9xDRvozvoXTiHqcWRCS0fXwf4QJyANn~Op0pw7jhSLRbzFhrmsjPZS2zlzpBBJty1I3ks80DA2eUYKwoSWvtebjrqISB6pr1VscYP5OpbE2VdooGWK4bMK9wwdpMA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA","isCorrectAnswer":false}]},{"title":"Em quem foi o primeiro beijo de Harry?","color":"#123456","answers":[{"text":"Cho Chang","image":"http://images5.fanpop.com/image/photos/28200000/Cho-Chang-promo-pics-ravenclaw-28214458-1919-2560.jpg","isCorrectAnswer":true},{"text":"Gina Weasley","image":"http://3.bp.blogspot.com/_8WWXEMIBGG4/SFEMxE_7vfI/AAAAAAAAAEc/QuhKEeq4cec/s320/18738813.jpg","isCorrectAnswer":false},{"text":"Hermione Granger","image":"https://upload.wikimedia.org/wikipedia/en/thumb/d/d3/Hermione_Granger_poster.jpg/220px-Hermione_Granger_poster.jpg","isCorrectAnswer":false},{"text":"Luna Lovegood","image":"https://static.wikia.nocookie.net/harrypotter/images/e/e0/00b9f68d18d99b06ed839d0b86425a0c.jpg/revision/latest/top-crop/width/360/height/450?cb=20201128020550&path-prefix=pt-br","isCorrectAnswer":false}]}],"levels":[{"title":"Nível básico: Só as clichês","image":"https://img.quizur.com/f/img60a5389b511b19.70117162.jpg?lastEdited=1621440693","text":"Descrição do nível 1","minValue":0},{"title":"Nível médio: Quero ver!","image":"https://img.quizur.com/f/img619514d2dc29e4.78114568.jpg?lastEdited=1637160157","text":"Descrição do nível 2","minValue":50},{"title":"Nível difícil: Poxa! Você realmente é um Potterhead","image":"https://static1.purebreak.com.br/articles/8/15/12/8/@/74547-harry-hermione-e-rony-de-harry-diapo-2.jpg","text":"Descrição do nível 2","minValue":90}]};

const testesupremo = axios.post("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes", testao);
testesupremo.then(dale);
function dale(resposta){
    console.log("DEU BOM PORRA");
} */

/* ============ puxando quizzes pelo ID para teste ============ */
/* const testando = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/38");
testando.then(postQuizz);

function postQuizz(resposta){
    console.log(resposta.data);
    let objeto = resposta.data;

    let testao = {};
    testao = {"title":"O quão Potterhead é você?","image":"https://s3-alpha-sig.figma.com/img/60f6/4bae/cb4c4e815fc36d9f0f0579a657241eba?Expires=1638144000&Signature=cqsR1gZIngLBQPZ6LeL~vWnXsiDVfmQfBKYm6yHFxTCpkJNI4l~uNmpM4KredvdqP4M4T8h2xvw-kEkW91z3Ii8L~jTr-AIxLemInFf6fpM1-9tG2vQjPhlIeSgyhGfLiR5p53jnvg~uRzAgjshXhSaSxCjbyCtFzBmvzLYS8Zq0GxXw2MKCq3xRg18DnPy~qpJTrPQnSwp-h1dEFiVC5vcriL42Rn4qCtaKpDlf8KPGTVZO8WmsDKlW-IzcZhbLaRpc3HacjA9EELnZR8nZzw22qHuROyoyhKmVGM1OU2OF9Nej~Y~p5eFFXWzcLQ0VjG-0dApwkzDBqnpchxoF8w__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA","questions":[{"title":"o qual animal Olho-Tonto Moody transfigurou Malfoy?","color":"#434CA0","answers":[{"text":"Gatíneo","image":"https://s3-alpha-sig.figma.com/img/7212/aa92/e0229a2cb5aea15ab3fd2b5d36cb9a60?Expires=1638144000&Signature=E-djO4UvnSNyGrh4porzOF3~ateDCWBO7F03TgYzJFjSa02ZWO-YximHyOVzp2mV87abw44lrUzQjKrJ44Acd-S2xSfkrtbDvTQN3-QiLDB-fJH8ml48RD6RD-X7V9oKUBg7NFaZzmq~V3ra~iewSHFKNFS9d5KUwQanKvcqYIYKgmkEaePHMifpKIJ3FSjXHeV1JTP7VLnuFKIM5qbwhCJVlYJsv29HmJDft6BpbXsss0atSrtN2VdLkr4vnnbeGl9luFqV0MtM3djI5FjBhy3FUGrNvU2MPEUVEfChpLh1zcER1JBAsXC8iW3fELbPU0WwN2P9A1l5Ob5fSenSIA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA","isCorrectAnswer":false},{"text":"Ratata","image":"https://s3-alpha-sig.figma.com/img/6070/8f4d/4fe85b83d17f9b3c7faf3a738a2df140?Expires=1638144000&Signature=MIFffQtyvsz8Cb3c5F~KI6DCs8nJhw8sIs6D2jAusXPFAoDI~jIbRR8CEqI5HBuLxMuGAA3x2yEWTLBrx0vaHVYxQW7meyl8Qf1PJU~QeDuqM99PquCyvW8OXtGT1YUZnR5XF-qdhgkpwGhzCze0rF-KQIYpDC4S6ah3tCTj4C2KsS-B4fmWS4rnl2kWONRJdWMAWOnB-euSct3qU3gRxn7Iq1G15E3vMc0eUBoSIHooyCEaDMKyJyA0QvduyIKJ3FqB2WCx6-8CC~XqrO4K9sBDLYOrrqnqdwmzqyOGp2b9v~bFK~FzXJXGjvtth9W25BW5KCsREzOFUCjVmZB1hA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA","isCorrectAnswer":false},{"text":"Sapo gordo","image":"https://s3-alpha-sig.figma.com/img/c7e0/64f3/0145b79667e2e9f0f8193b64984531af?Expires=1638144000&Signature=LPJeK-SLHYDHkHbcn-ZSs7PNM2E4WcDnTIQzWNtdK7wVysYL9ML2B3bhPBfzs0al4b0UHoMP5dEFNCkgmYDmWy1zRr2KWQzVUSkQWmYKVZX2~yv-1aT2nvLDSUd0kCXMYII314M-dssachHGjvlzT6rjis0llYC-UTO9y5DhVfaBqmz~FGxUwkxvGZ9PeIS7E4MRAhk1R~6gjL59QEXD04kwpKmGOfHCjYpNJSoNk3d0LEZzb4vzJdk3Is9A09oTfkJ1PtBgulwinCu8VHIyM0m3LHukyZIA0jeNo2YOkXX4yK8xLKjv-z7QgMaQNTFMu2dXBTAnC0zEOL8~4ELuDg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA","isCorrectAnswer":false},{"text":"Mustela putorius (o Furão)","image":"https://s3-alpha-sig.figma.com/img/4bfb/7d5f/52d4ab9bee7b444cfed9506a1c2bc0ea?Expires=1638144000&Signature=Eec70CIe4MMPSI1sER~FsSP2W7Y6WCXg6yxFMbY8M7-DO5wDf3Y72G2AuJzz9ujtAXDEss92nvNQ20~H76EP9byY1vUb--mHYLzWzAusI5Z99hZr12XCVjeewEyBeNEtTE-vN2s400nIVCx1~8rlw80wMKcRd0nDMbFAoXnfbtSe9KYbgCQGjFpKDJeGXOOMefr9GaAHZjMeoA136uNeEYQhz0M7eH7bC6e~mS6y3YSRccNUu21~L69mJZuGOJpwigIVJwz~LWp2MBUkhDyBH9HdumuZ5mSA3ZIFrBulQkBJeCP1WrQ5k0i9rYfnLQiKDRt1vEAfswNoIl7Z88tZtg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA","isCorrectAnswer":true}]},{"title":"Qual dos objetos abaixo NÃO é uma horcrux?","color":"#A0438D","answers":[{"text":"The boy who lived","image":"https://s3-alpha-sig.figma.com/img/2740/7e61/76bf2840f187b7ce4cb283ea504a15ef?Expires=1638144000&Signature=CgMViY~br3d0wEDyrMVktK5F7mHESpVWO4L50TD3wTOVYOq6fymNHmtPCpbun~B7fJKVlRw9VzuXdhwdYQThzESuFOzu2AV5O5Q0j3tm99cb~YCj3dt3R7pLiXigsd6X9P2CZI5Jd~AYk~i8Nq8e4KJXgz0p4EVyx5M5Zh93VmR43L4Y3oUU~8Jk6jLNogv1ZjP8odO~bqo5CdgzKfQY2CIbUdWeD7hyBT-nijy~0eZxROOP-5V3P-eJ21UKNa5Zw1vM9~Vm3ZHV-MJSbfmb4g745~BjzSW0Q-Im4vnUULyQC8qHgx2C1nj9wXAQK85R-zjbq1y1FEdELf4rd~xa6Q__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA","isCorrectAnswer":false},{"text":"O livro monstruoso dos monstros","image":"https://s3-alpha-sig.figma.com/img/3755/8b53/b9c97f627e2eef3a1ced585d7854cc4a?Expires=1638144000&Signature=QAvlsYD35ooPKmRwkbOKDtoVAmzZau2AUKjKOs9LahenZfBCvS8cY~7fSnQHwT4RE750rr1fwKrFxHpg6ZH59KgTB9euTA~~U8C5Dpg8PKuLGP5dQYWJQVjJAXD3epUrGlQxQG75b1-04v1R0LmVCEOwAoN6dCJIOkp-tg6VjgntTOHmc5PTJfOr6Junlrqf50XEgbDMRIW~oUG9qfzzsOIwNZ~Vny26QGAGzYjU8q1ryLoISOXxXYYVZDpI5EEJm~BZlpqqSNfF9Ec4byb7WlQgA15l3L8FyqueRJjcfCYaw3WuQue9czYb2ut9Xepf8XNLTL3zHOP4-kPJaW54tw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA","isCorrectAnswer":true},{"text":"Anel velho","image":"https://s3-alpha-sig.figma.com/img/90b9/a1c9/a69e93b136bcf4c2f58e546fe7c5eb7f?Expires=1638144000&Signature=ZyodZNDe9EOG0Eq~1tNS4g1JPWT9~1V~BEBioOJTXcBgxCPHUzUBhEKI4HmwJ0aMJH3YU6plxj4Qa-ZXdXdDic1eKEIH4fL4u9uqdjFyDjDxKhJxputzD0jzWzTGjJ5xZva6lRcvJq0YVoZAM9K5SsknOId3MuSQqFsYLDrTt2EpywjoA2LS9pRnIaYQOFeLhOIR32xRC-3AEMyEQ13lIz6Pb2nHA0Iy0rIxWWtcPXA3H6jVItDSaUz5aC~DcQXZbY7ShQubg~T0DWCmiJ75STQpl1aggwOLWCazBVcGIoqHXmTR7NGprV7hB-a9FwST3vZnCfU~xVKtWLhc-8SRww__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA","isCorrectAnswer":false},{"text":"Diadema da Revenclaw","image":"https://s3-alpha-sig.figma.com/img/44b3/55b9/309baf633b5cf3311081d33cd5ae90af?Expires=1638144000&Signature=B56BRF2~-own79pUSmSM5tUJ6spc098~ynN0-Ot25Gh75nOn~A0wR0ar~iC9SWOZCXBhGwAshCRwIYyjyVPlW5YPYMBKDqiVyfbYT0ZDGsuqwswo1jkYeV9Zy2htJX~ehBbatLB1k4LNptABeiSCQVnoms49EPmJI1UXnPBa8STn7BQuZeVLrDV7yo01Q1FS-ugwd2KrKbW5CF3ugXlwnwutk9xDRvozvoXTiHqcWRCS0fXwf4QJyANn~Op0pw7jhSLRbzFhrmsjPZS2zlzpBBJty1I3ks80DA2eUYKwoSWvtebjrqISB6pr1VscYP5OpbE2VdooGWK4bMK9wwdpMA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA","isCorrectAnswer":false}]},{"title":"Em quem foi o primeiro beijo de Harry?","color":"#123456","answers":[{"text":"Cho Chang","image":"http://images5.fanpop.com/image/photos/28200000/Cho-Chang-promo-pics-ravenclaw-28214458-1919-2560.jpg","isCorrectAnswer":true},{"text":"Gina Weasley","image":"http://3.bp.blogspot.com/_8WWXEMIBGG4/SFEMxE_7vfI/AAAAAAAAAEc/QuhKEeq4cec/s320/18738813.jpg","isCorrectAnswer":false},{"text":"Hermione Granger","image":"https://upload.wikimedia.org/wikipedia/en/thumb/d/d3/Hermione_Granger_poster.jpg/220px-Hermione_Granger_poster.jpg","isCorrectAnswer":false},{"text":"Luna Lovegood","image":"https://static.wikia.nocookie.net/harrypotter/images/e/e0/00b9f68d18d99b06ed839d0b86425a0c.jpg/revision/latest/top-crop/width/360/height/450?cb=20201128020550&path-prefix=pt-br","isCorrectAnswer":false}]}],"levels":[{"title":"Nível básico: Só as clichês","image":"https://img.quizur.com/f/img60a5389b511b19.70117162.jpg?lastEdited=1621440693","text":"Descrição do nível 1","minValue":0},{"title":"Nível médio: Quero ver!","image":"https://img.quizur.com/f/img619514d2dc29e4.78114568.jpg?lastEdited=1637160157","text":"Descrição do nível 2","minValue":50},{"title":"Nível difícil: Poxa! Você realmente é um Potterhead","image":"https://static1.purebreak.com.br/articles/8/15/12/8/@/74547-harry-hermione-e-rony-de-harry-diapo-2.jpg","text":"Descrição do nível 2","minValue":90}]};
    
    const testesupremo = axios.post("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes", testao);
    testesupremo.then(dale);
    function dale(resposta){
        console.log("DEU BOM PORRA");
    }
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
    quizzResult = `<div class="container quizz-result hide"><div class="result"><div class="result-grid"><div class="text-result"><h2>PORRA CARALHO</h2></div><div class="image-result"></div><div class="description-result"><h2></h2></div></div></div></div>`;

    

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
                if(percentage > tempObject.levels[popo].minValue){
                    level = tempObject.levels[popo];
                }
            }
            document.querySelector(".result-grid").children[0].children[0].innerHTML = `${percentage}% de acerto: ${level.title}`; //title
            document.querySelector(".result-grid").children[1].style.backgroundImage = `url(${level.image})`; //img
            document.querySelector(".result-grid").children[2].children[0].innerHTML = level.text; //description
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
        quizz.questions.push(question);
    }
    console.log(quizz);
}