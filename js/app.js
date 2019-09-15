//Declaración de Variables:
var pica;
var fija;
var randomNumber;
var newNumber;

//Función para generar el número secreto inicial:
function newRandomNumber() {
    var numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    var number = [];

    function newRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
    for (var i = 1; i <= 4; i++) {
        number.push(numbers.splice(newRandomInt(0, numbers.length), 1).pop().toString());
    }
    return number;
}

//Función para comparar el número secreto con el número introducido:
function compareNumbers(newNumber) {
    pica = 0;
    fija = 0;
    randomNumber.forEach(function(item, index) {
        if (item === newNumber[index]) {
            fija++;
        } else if (newNumber.indexOf(item) !== -1) {
            pica++;
        }
    });
}

//Función de validación:
function validateNumber(number) {
    if (number.length !== 4) {
        return false;
    } else {
        return (new Set(number)).size === number.length;
    }
}

//Función para inicializar el juego
function initialize() {
    //Obtener un número nuevo aleatorio:
    randomNumber = newRandomNumber();
    console.log(randomNumber.join(""));
    //Reestrablece la tabla de resultados:
    $(".results").remove();
    var template = Handlebars.compile($('#results-template').html());
    $(".container").append(template());
    //Ocultar el mensaje de Ganaste:
    $(".congrats").removeClass("show");
}

//Cuerpo del código del juego
$("#new-number").keypress(function(e) {
    $("#new-number, p > span").removeClass("wrong");
    if (e.which == 13) { //13 == Enter
        newNumber = $(this).val().split("");
        if (validateNumber(newNumber)) {
            compareNumbers(newNumber);
            $(this).val("");
            if (fija === randomNumber.length) {
                $(".congrats").addClass("show");
            } else {
                var rowTemplate = Handlebars.compile($('#results-row-template').html());
                $(".results > tbody").prepend(rowTemplate({
                    number: newNumber.join(""),
                    pica: pica,
                    fija: fija
                }));
            }
        } else {
            $("#new-number, p > span").addClass("wrong");
        }
    }
});

//Inicializar el juego pulsando el botón Jueva Nuevamente
$(document).ready(function() {
    initialize();
});

$(".reset").click(function() {
    initialize();
});