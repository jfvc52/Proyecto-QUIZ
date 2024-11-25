console.log("comenzamos Ejerc URL API + SPA + QUIZ");

// traigo del HTML los botones y los elementos que quiero manipular --diapo 22--
const questionContainerElement = document.querySelector("#question-container");
const questionElement = document.querySelector("#question");
const answerButtonsElement = document.querySelector("#answer-buttons");
const startButton = document.querySelector("#start-btn");
const nextButton = document.querySelector("#next-btn");
console.log(questionContainerElement,questionElement,answerButtonsElement,nextButton,startButton);

let questions = [];
const getQuestions = async() => {
    const res = await axios.get("https://opentdb.com/api.php?amount=10&difficulty=easy");
    //console.log(res);  para ver por consola el array de datos que nos llega.
    //"questions" nombre asignado a la variable GLOBAL (fuera de una Funcion, se podra usar en cualquier sentencia/código)
    questions = res.data.results.map((questionObj) => {  // modificamos los datos del Array "question" obteniendo "data" y "result"
      // que son las preguntas que queremos re-estructurar y reformar el Array con Objetos y para ello USAMOS bucle MAP 
      
      // guardamos las respuestas incorrectas en formato array de objetos
        let answers = questionObj.incorrect_answers.map((answer) => { // PARA  LAS RESPUESTAS INCORRECTAS!!
          // guardamos en la variable respuestas "answers" sacamos de "questionObj" las respuestas INCORRECTAS, "nombre correct" = false
        return { text: answer, correct: false }; // esta es la forma que se guardaran en el nuevo Array/Object (usamos "return").
    });
    
    //console.log(answers); // muestras las repuestas INCORRECTAS...
            
    //añadimos (push) al "array anwers" el objeto de la repuesta correcta (en formato "return" {text: answer, correct:true}) (el formato que obtuvimos de MAP).
    answers.push({ text: questionObj.correct_answer, correct: true }); // buscamos ahora las respuestas correctas, "correct = true" y las agregamos al Array/objeto ("push")

    /**   comentamos porcion codigo que se repetira mas adelante
    // creamos un OBJETO delue contiene la PREGUNTA y el ARRAY de la RESPUESTA que hemos creado previamente (ANSWER)    
    const newQuestion = {
    question: questionObj.question,
    answers,  // esto es lo mismo que: answers:answers
    };
    return {newQuestion}
});
    console.log(questions);
}    
getQuestions();
 hasta aqui lo comentado...... */

// esta Función que desordena, porque tenemos 1ro las respuestas INCORRECTAS y al FINAL la respuesta CORRECTA, 
// para solucionarlo creamos la Func **shuffle" pasamos parametro "array" y luego "answer" donde estaran las respuestas, que la Función desordenara.
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // nos da indice aleatorio
        // Intercambiar elementos, mezcla los "False" con los "True".
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
    const unOrderedAnswers = shuffle(answers);  // guarda los cambios en una variable...
    // console.log(unOrderedAnswers);  NOS MUESTRA las respuestas (answers) en ORDER CAMBIADO (aleatorio)
    // creamos un objeto que contiene las preguntas (question) incluido el array con las respuestas que hemos DESORDENADO previamente
    const newQuestion = {
        question: questionObj.question,
        answers: unOrderedAnswers, // esto es lo mismos que: answers:answers
      };
    //devolvemos el objeto creado para que se guarde en "question"
    return newQuestion;
  });
    console.log(questions);
};
// click booton function
getQuestions(); 
/**
mi c o d i g o o o o o   en
diapositiva 20   colocar en HTML
diapositiva 21   colocar  en   CSS
diapositiva 22   traemos los ID definidos en HTML y los colocamos en JavaScript
diapo       23   QUESTIONS,  YA LO TENEMOS son las preguntas y respuestas acomodadas, OK!!!
diapo       24  "startGame"   comienza manejo preguntas con QUIZ: 
seguir hasta el final....*/

let currentQuestionIndex;  // defino variable que siempre me DIRA  en que NRO de pregunta estamos
function startGame() { /**--diapo 24-- Creamos la Función "startGame" para empezar el Quiz: --FIN diapo 24-- */
  startButton.classList.add("hide"); /** creamos class hide para que que el buuton START DEJE de verse */
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove("hide"); 
  /** le quitamos la clase hide al contenedor de las preguntas y respuestas para que se muestren --FIN diapo 24-- */
}
// click boton START  --diapo 25--
startButton.addEventListener("click", startGame); /** Ahora le decimos que cuando cliquen en el botón "start" se ejecute la Función "startGame"
con esta funcion muestro las preguntas en pantalla  */

/** --diapo 26--Creamos la Función "showQuestion()" esta función se encargará de mostrar en el HTML la pregunta en la que estemos, 
                lo primero que haremos será mostrar el enunciado de la pregunta: */
function showQuestion(question) { // (question) = recibe por PARAMETRO un Array que tiene "las preguntas" que trajimos del Link 
    questionElement.innerText = question.question; // (question) = pintamos en HTML la Question    **FIN diapo 26**
}

// Diapo 27--Creamos la Función "setNextQuestion()"" que recibirá por parámetro la pregunta correspondiente con sus respuestas:
function setNextQuestion() {
    showQuestion(questions[currentQuestionIndex]);
} // --FIN diapo 27-- 

// --diapo 28-- Actualizamos la Función "startGame"--creada en Diapo 24--, y le agregamos que ejecute la Funcion "setNextQuestion()" (creada en --Diapo 27--).
function startGame() {
    startButton.classList.add("hide");
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove("hide");
    setNextQuestion();  // --creada en Diapo 27-- le decimos que llame a la función "setNextQuestion()"" para que pinte la pregunta
}
/**--Diapo 29--Continuamos en la función "showQuestion"--Diapo 27(cuerpo)--y ahora vamos a hacer (y se la agregare mos) la lógica para mostrar las respuestas a la pregunta:  */
function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach((answer) => {
    const button = document.createElement("button"); // creamos el boton para las respuestas
    button.innerText = answer.text; // pintamos el texto de las respuestas en HTML.
    if (answer.correct) {
      button.dataset.correct = true;// si la respuesta es correcta, al botón de esa respuesta le añadimos el atributo "correct" que será igual a "true"
    }
    answerButtonsElement.append(button); // le decimos que nos pinte los botones de las respuestas en el HTML
  });
}
/**--Diapo 30--la función "showQuestion"  COMPLETA. */
/**--Diapo 31--agregamos a CSS:  Creamos las clases "correct" y "wrong". */

/** Vamos a crear la Función "setStatusClass()" que lo que hará es que si el EL ELEMENTO CLICADO ES CORRECTO!!, 
 le añadirá la clase "correct" (de CSS) y sino le añadirá la clase "wrong" (de CSS).  */
 function setStatusClass(element) {
  console.log(element.dataset)
   if (element.dataset.correct == "true") { // "dataset" en un metodo que nos permite crear desde JS una "Class" en HTML. 
    element.classList.add("correct");   
    console.log("eee",element)
  } else {
    element.classList.add("wrong");
  }
}
/** --Diapo 33--En esta función **selectAnswer** recorremos los botones de las respuestas 
 y se lo pasamos por parámetro a la función **setStatusClass()** 
 Además creamos un "**if"** que chequee que si la pregunta actual no es la última 
 aparezca el botón **NEXT**  y en caso contrario, aparecera el boton **START**.   */
 function selectAnswer() {
   //array from...
   Array.from(answerButtonsElement.children).forEach((button) => { // VER error!!!
    setStatusClass(button);
  });
  if (questions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("hide");  //en JS podemos con el método "classList" cambiar atributos en HTML.
  } else {
    startButton.innerText = "Restart";
    startButton.classList.remove("hide");
  }
}
  //--Diapo 34-- Actualizamos la función **showQuestion()**:
  function showQuestion(question) {
      questionElement.innerText = question.question;
      question.answers.forEach((answer) => {
        const button = document.createElement("button");
        button.innerText = answer.text;
        if (answer.correct) {
          button.dataset.correct = true;
        }
        button.addEventListener("click", selectAnswer); // le decimos que cuando clique el botón ejecute la función
        answerButtonsElement.append(button);
      });
    }
/** --Diapo 35--Ahora le decimos que cuando clique en el **botón NEXT** sume 1 a **currentQuestionIndex** 
 // (VARIABLE QUE CUENTA LAS PREGUNTAS PROCESADAS) y luego se ejecuta la función **setNextQuestion** que creamos en la **Diapo 37**. 
     // que acabamos de crear:   */
     nextButton.addEventListener("click", () => {
       currentQuestionIndex++;
       setNextQuestion();
      });
      // **Diapo 36+** Creamos la función **resetState()**, básicamente lo que hará es que "borrará las respuestas escritas":
      function resetState() {
        nextButton.classList.add("hide");
        answerButtonsElement.innerHTML=""  // copia encima un " " (vacio) para borrar lo que estaba escrito en cada sentencia.
      }
      // **Diapo 37** Actualizamos la función **setNextQuestion()** pasandole la función **resetState()**:
      function setNextQuestion() {
        resetState();
        showQuestion(questions[currentQuestionIndex]);
      }    
      
  // click boton ANSWER
  nextButton.addEventListener("click", (e) => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      setNextQuestion();
    } else {
      alert("Has terminado el juego!");
      questionContainerElement.classList.add("hide");
      startButton.classList.remove("hide");
    }
  });