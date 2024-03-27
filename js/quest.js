
const question=[ {

question: "In che anno è morto Giorgio Vasari?",
answer: [
    {Text:"1574", correct:true},
    {Text:"1450", correct:false},
    {Text:"1905", correct:false},
    {Text:"1569", correct:false}
]

},
{

    question: "Chi fu la prima moglie di Cosimo I?",
    answer: [
        {Text:"Maria Caterina D'Asburgo", correct:false},
        {Text:"Eleonora Di Toledo", correct:true},
        {Text:"Costanza D' Aragona", correct:false},
        {Text:"Isabella Di Castiglia", correct:false}
    ]
    
    },
    {

        question: "In che anno i fiorentini riuscirono a vincere contro i senesi nella battaglia di Scannagallo?",
        answer: [
            {Text:"2019", correct:false},
            {Text:"1780", correct:false},
            {Text:"1653", correct:false},
            {Text:"1554", correct:true}
        ]
        
        },
        {

            question: "Di chi è nipote Cosimo I?",
            answer: [
                {Text:"Lorenzo", correct:true},
                {Text:"Giovanni", correct:false},
                {Text:"Lucrezia", correct:false},
                {Text:"Lucia", correct:false}
            ]
            
            },
            {

                question: "Chi fu il maestro di Giorgio Vasari?",
                answer: [
                    {Text:"Michelangelo", correct:false},
                    {Text:"Filippo Brunelleschi", correct:false},
                    {Text:"Andrea del Sarto", correct:true},
                    {Text:"Arnolfo di cambio", correct:false}
                ]
                
                }
    ];

    const questionElement=document.getElementById('question');
    const answerButtons=document.getElementById('answer-button');
    const nextButton=document.getElementById('next-btn');

    let currentQuestionIndex=0;
    let score=0;
    
    
    function startQuiz(){
        currentQuestionIndex=0;
        score=0
        nextButton.innerHTML="next";
        shuffleQuestions();
        showQuestion()
    }


    
    function shuffleQuestions(){

        
        for(let i = question.length -1; i>0; i--){
            const j = Math.floor(Math.random() * (i + 1));
            [question[i], question[j]] = [question[j], question[i]];
        }

    }









    function showQuestion(){
        resetState()
        let currentQuestion=question[currentQuestionIndex]
        let questionNo=currentQuestionIndex + 1;
        questionElement.innerHTML=questionNo + "." +currentQuestion.question;

    
    currentQuestion.answer.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML=answer.Text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        
        if(answer.correct){
            button.dataset.correct = answer.correct
        }
        button.addEventListener("click", selectanswer)
    });
    
}



function resetState(){
nextButton.style.display="none";
while(answerButtons.firstChild){
answerButtons.removeChild(answerButtons.firstChild);
}
}


function selectanswer(e){
const selecedBtn=e.target;
const isCorrect=selecedBtn.dataset.correct === "true";


if(isCorrect){
    selecedBtn.classList.add("correct");
    score++
    
}else{
    selecedBtn.classList.add("incorrect");
}

Array.from(answerButtons.children).forEach(button => {
    
    if(button.dataset.correct === "true"){
        button.classList.add("correct");
    }
button.disabled = true
});
nextButton.style.display = "block"; 

}



function showScore(){
resetState();
questionElement.innerHTML = `Hai indovinate ${score} su ${question.length}!`;
nextButton.innerHTML= "Gioca di nuovo"
nextButton.style.display="block"
}




function handlenextButton(){
currentQuestionIndex++

if(currentQuestionIndex < question.length){ 
showQuestion();

}else{
    showScore();
}

}




nextButton.addEventListener("click", ()=> {
if (currentQuestionIndex < question.length){
    handlenextButton();
    
}else{
    startQuiz();
}
});

startQuiz();
