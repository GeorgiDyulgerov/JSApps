/**
 * Created by Go6koy on 3/12/2016.
 */

document.getElementById("submitBtn").onclick = function (){
    localStorage.clear();
    console.log( $("input[name=answer1]:checked").text());
    saveData();
    var answers;
    answers = "<p>Your answer to Question 1 is " + localStorage.q1 +".</p>\n" + "<p>Your answer to Question 2 is " + localStorage.q2 +".</p>";
    $("form").hide();
    $("button").hide();
    $("#time").hide();
    $("#outTime").hide();
    $("body").append(answers);
    console.log(localStorage.q1);
    console.log(localStorage.q2);

}


function saveData() {
        localStorage.q1 = $("input[name=answer1]:checked").val();
        localStorage.q2 = $("input[name=answer2]:checked").val();
}

function loadSavedData() {
    switch (localStorage.q1) {
        case 'C#':
            $('#c').attr('checked', true);
            break;
        case 'Java':
            $('#j').attr('checked', true);
            break;
        case 'English':
            $('#e').attr('checked', true);
            break;
        case 'What':
            $('#wha').attr('checked', true);
            break;
    }

    switch (localStorage.q2) {
        case 'Windows':
            $('#w').attr('checked', true);
            break;
        case 'Linux':
            $('#l').attr('checked', true);
            break;
        case 'Both':
            $('#b').attr('checked', true);
            break;
        case 'What':
            $('#what').attr('checked', true);
            break;
    }
}

function getAnswers(){
    console.log("Hi");
    return "answer";
}


var once=true;

function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function () {

        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);


        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        saveData();
        display.textContent = minutes + ":" + seconds;


        if (--timer < 0) {
            timer = 0;
            if (once) {
                localStorage.clear();
                once = false;
                $("form").hide();
                $("button").hide();
                $("#time").before("<h1 id='outTime'>Out of time</h1>");
                $("#outTime").css("color", "red");
            }
        }
    }, 1000);
}

window.onload = function () {
    loadSavedData();
    var fiveMinutes = 60*5,
        display = document.querySelector('#time');
    startTimer(fiveMinutes, display);
};