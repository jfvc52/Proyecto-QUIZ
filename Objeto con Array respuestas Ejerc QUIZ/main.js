
// Define the questions array with objects containing question and answer options. Each object can have a correct answer and multiple incorrect answers.
let questions = [];
questions = [
  {
    question: "What is 2 + 2?",
    answers: [
      { text: "4", correct: true },
      { text: "22", correct: false },
    ],
  },
  {
    question: "Is web development fun?",
    answers: [
      { text: "Kinda", correct: false },
      { text: "YES!!!", correct: true },
      { text: "Um no", correct: false },
      { text: "IDK", correct: false },
    ],
  },
  {
    question: "Is web development fun?",
    correct_answer: "Dogs",
    incorrect_answers: ["Birds", "Flying", "Germs"],
  },
  {
    question: "What is 4 * 2?",
    answers: [
      { text: "6", correct: false },
      { text: "8", correct: true },
      { text: "Yes", correct: false },
    ],
  },
];

/* const getQuestions = async () => {
  const res = await axios.get(
    "https://opentdb.com/api.php?amount=10&difficulty=easy"
  );
  console.log(res.data.results);
}; */

// Call the function to get the questions from the API and log them to the console.
//getQuestions();
const getQuestions = async() => {
    const res = await axios.get(
        "https://opentdb.com/api.php?amount=10&difficulty=easy"
    );
    // agrego esto:
    console.log(res.data.results);
    questions = res.data.results.map((questionObj) => {
        // guardamos las respuestas incorrectas en formato array de objetos
        let answers = [];
        answers = questionObj.incorrect_answers.map((answer) => {
            return { text: answer, correct: false };
        });
        // añadimos al array anwers el objeto de la repsuesta correcta
        answers.push({ text: questionObj.correct_answer, correct: true })

        // //función que desordena el Array SIN SEGUIR NINGUN PATRON..
        function shuffle(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1)); // nos da indice aleatorio
                // Intercambiar elementos
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        }
        const unOrderedAnswers = shuffle(answers);

        //creamos un objeto que contiene la pregunta y el array de respuestas que hemos creado previamente
        const newQuestion = {
            question: questionObj.question,
            answers, // esto es lo mismos que: answers:answers
        };
        //devolvemos el objeto creado para que se guarde en questions
        return newQuestion;
    });
    console.log(questions);
};
getQuestions(); (editado) 
//aqui tu código, seguir con diapositiva SPA
//diapositiva 24

