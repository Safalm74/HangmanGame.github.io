const imageBox = document.getElementById('imageBox');
const AnswerBox = document.getElementById('AnswerBox');
const QuestionBox = document.getElementById('QuestionBox');
const keyboard = document.getElementById('keyboardTable');
const refreshBtn = document.getElementById('refreshBtn');
//creating keyboard
var tablestring = "<tr>";
var allalpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
for (let i = 0; i < 26; i++) {
    if ((i) % 5 == 0) {
        tablestring = tablestring + "</tr>\n<tr>"
    }
    tablestring = tablestring + "\n<td><button class='keys'>" + allalpha[i] + "</button></td>"
}

tablestring = tablestring + "</tr>";
keyboard.innerHTML = tablestring;

const buttons = Array.from(document.querySelectorAll('.keys'));

//refresh
var currentHint;
var currentAnswer;
var lifeline;
var tempAnswer;
var chartaken;

function refresh() {
    AnswerBox.innerHTML = "";
    lifeline = 6;
    chartaken = "";
    randomQuestion = (questions[Math.floor(Math.random() * questions.length)]).split('|');
    currentHint = randomQuestion[0];
    currentAnswer = randomQuestion[1].toUpperCase();
    tempAnswer = currentAnswer;
    QuestionBox.innerHTML = `Hint:${currentHint}`;
    //buttons listeners
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].disabled = false;
        buttons[i].addEventListener("click", function() {
            checkChar(i);
            buttons[i].disabled = true;
        });
    }
    displayChanger()
    imageChanger(0);
    var randomhintchar = (currentAnswer[Math.floor(Math.random() * currentAnswer.length)]);
    checkChar(Array.from(allalpha).indexOf(randomhintchar));
}

//Questions And Answers
const questions = [
    "A Camera Company|Canon",
    "A Fruit|Mango",
    "A Fruit|Persimmon",
    "A Fruit|Durian",
];

function imageChanger(index) {
    let imagestring = `<img src='images/${index}.jpg'>`;
    imageBox.innerHTML = imagestring;
    return;
}

function displayChanger() {
    AnswerBox.innerHTML = "";
    var displayString = "";
    for (let i = 0; i < currentAnswer.length; i++) {
        if (chartaken.includes(currentAnswer[i])) {
            displayString = displayString + currentAnswer[i]
        } else {
            displayString = displayString + "_";
        }
    }
    AnswerBox.innerHTML = displayString;
    return;
}


function checkChar(inputCharindex) {
    if (lifeline == 0) {
        imageBox.innerHTML = `<label class='gamename'>Game Over\nAnswer:${currentAnswer}</label>`;
        return;
    }
    if (currentAnswer.includes(allalpha[inputCharindex])) {
        chartaken = chartaken + allalpha[inputCharindex];
        tempAnswer = tempAnswer.replaceAll(allalpha[inputCharindex], '');
        displayChanger();
        if (tempAnswer == '') {
            imageBox.innerHTML = "<label class='gamename'>You Won The game</label>";
            for (let i = 0; i < buttons.length; i++) {
                buttons[i].disabled = true;
            }
        }
    } else {
        lifeline = lifeline - 1;
        imageChanger(6 - lifeline);
    }
    return;
}
refresh();
refreshBtn.addEventListener('click', refresh);