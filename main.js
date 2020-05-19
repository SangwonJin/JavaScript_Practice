function $(selector) {
    return document.querySelector(selector);
}

//1. Make Changes
// My answer

function makingChange() {
    let amountValue = $('#amount').value;

    if (amountValue < 0 && amountValue > 99 && isNaN(amountValue)) {
        $('#result1').innerHTML = 'Invalid number';

        return;
    }

    const coinTypes = [25, 10, 5, 1];
    const coinCountList = [];

    let remainingChange = 100 - amountValue;

    coinTypes.forEach((coin) => {
        const coinCount = parseInt(remainingChange / coin);
        coinCountList.push(coinCount);

        remainingChange -= coinCount * coin;
    });

    $('#result1').innerHTML = coinCountList.join(' ');
}

$('#submit1').addEventListener('click', makingChange);

//2. spy encoding
// My answer
function SpyMessage(message, month, date) {
    this.message = message;
    this.month = month;
    this.date = date;
    this.decode = function () {
        let decodedMessage = '';
        for (let i = 0; i < this.message.length; i++) {
            let c = this.message.charAt(i);
            if (this.isAlpha(c)) {
                let shiftedBy = this.isUpperCase(c) ? this.month : this.date;
                let minCharCode = this.isUpperCase(c) ? 'A'.charCodeAt(0) : 'a'.charCodeAt(0);
                let newAsciiCode = c.charCodeAt(0) - shiftedBy;
                if (newAsciiCode < minCharCode) {
                    newAsciiCode += 26;
                }
                decodedMessage += String.fromCharCode(newAsciiCode);
            } else {
                decodedMessage += c;
            }
        }
        return decodedMessage;
    };
    this.isAlpha = function (char) {
        return char.length === 1 && char.match(/[a-z]/i);
    };
    this.isUpperCase = function (char) {
        return char.length === 1 && char.match(/[A-Z]/);
    };
}

function decodeMessage() {
    let message = $('#message').value;
    let dateWritten = $('#date_written').value;

    if (!message) {
        $('#result2').innerHTML = 'Enter your message';
        return;
    }

    if (!dateWritten) {
        $('#result2').innerHTML = 'Choose the date written';
        return;
    }
    dateWritten = dateWritten.split('-');
    let spyMessage = new SpyMessage(message, dateWritten[1], dateWritten[2]);
    $('#result2').innerHTML = spyMessage.decode();
}

$('#submit2').addEventListener('click', decodeMessage);

//3. dollar-bill collectors
// My answer
const checkTypes = () => {
    let input = $('#input').value;
    let checkedNum = [];
    let message = 'notSpecial';

    if (input.length < 7) {
        $('#result3').innerHTML = 'the number of input should be 7';
        return;
    }

    for (let i = 0; i < input.length; i++) {
        if (!checkedNum.includes(input.charAt(i))) {
            checkedNum.push(input.charAt(i));
        }
    }

    if (checkedNum.length == 2) {
        message = 'binary';
    }
    if (checkedNum.length == 1) {
        message = 'block';
    }
    $('#result3').innerHTML = message;
};

$('#submit3').addEventListener('click', checkTypes);


// Common input box Ui for question 4,5
const generateInputBoxes = (numValue, inputName) => {
    if (isNaN(numValue) || numValue < 0 || numValue == "") {
        $(`#${inputName}Msg`).innerHTML = "Pleas enter a positive integer.";
        return;
    }

    $(`#${inputName}Msg`).innerHTML = "";
    num = parseInt(numValue);
    let inputSection = $(`#${inputName}_input`);

    for (let i = 1; i <= num; i++) {
        let div = document.createElement('div');
        const id = inputName + i;
        let label = document.createElement('label');
        label.setAttribute('for', id);
        let t = document.createTextNode(i);
        label.appendChild(t);

        div.appendChild(label);

        let input = document.createElement('input');
        input.id = id;
        input.type = "text";

        div.appendChild(input);

        inputSection.appendChild(div);
    }

    $(`#${inputName}_form`).style.display = 'block';
    $(`#${inputName}_generateInputBoxes`).setAttribute("disabled", "disabled");
}

const reset = (inputName) => {
    $(`#${inputName}_num`).value = '';
    $(`#${inputName}_input`).innerHTML = '';
    $(`#${inputName}_form`).style.display = 'none';
    $(`#${inputName}_generateInputBoxes`).removeAttribute("disabled");
}


//4. communication towers 
//UI for towers input box
const towerInputName = 'towers';
const makeTowerInputBox = () => {
    let numValue = $('#towers_num').value;
    generateInputBoxes(numValue, towerInputName);
}
const makeResetForTower = () => {
    reset(towerInputName);
    towers = [];
}
$('#towers_generateInputBoxes').addEventListener('click', makeTowerInputBox);
$('#towers_reset').addEventListener('click', makeResetForTower);

//UI for locations input box
const locationInputName = 'locations';
const makeLocationInputBox = () => {
    let numValue = $('#locations_num').value;
    generateInputBoxes(numValue, locationInputName);
}
const makeResetForLocation = () => {
    reset(locationInputName);
    locations = [];
}
$('#locations_generateInputBoxes').addEventListener('click', makeLocationInputBox);
$('#locations_reset').addEventListener('click', makeResetForLocation);

// My answer
class coordinates {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

var towers = [];
var locations = [];

const insertTower = () => {
    towers = [];
    let numTowers = $('#towers_num').value;

    for (let i = 0; i < numTowers; i++) {
        let towerInput = $(`#towers${i + 1}`).value;
        if (towerInput == "") {
            $('#towersMsg').innerHTML = 'check the location input';
        } else {
            towerInput.split(' ');
            towers.push(new coordinates(towerInput[0], towerInput[2]))
        }
    }

    if (numTowers == towers.length) {
        $('#towersMsg').innerHTML = 'ready for towers';
    } else {
        $('#towersMsg').innerHTML = 'please check the number of towers input you entered';
    }
}

const insertLocation = () => {
    locations = []
    let numLocations = $('#locations_num').value;

    for (let i = 0; i < numLocations; i++) {
        let locationInput = $(`#locations${i + 1}`).value;
        if (locationInput == "") {
            $('#locationsMsg').innerHTML = 'check the location input';
        } else {
            locationInput.split(' ');
            locations.push(new coordinates(locationInput[0], locationInput[2]))
        }
    }

    if (numLocations == locations.length) {
        $('#locationsMsg').innerHTML = 'ready for locations';
    } else {
        $('#locationsMsg').innerHTML = 'please check the number of locations input you entered';
    }
}

const checkDistance = () => {
    if (towers.length > 0 && locations.length > 0) {
        for (let i = 0; i < locations.length; i++) {
            for (let j = 0; j < towers.length; j++) {
                let distance = Math.sqrt(Math.pow((locations[i].x - towers[j].x), 2) + Math.pow((locations[i].y - towers[j].y), 2));
                if (distance > 5) {
                    $('#result4').innerHTML += (i + 1) + '<br>';
                    break;
                }
            }
        }
    } else {
        $('#result4').innerHTML = 'Check towers or locations';
    }
}



$('#towerSubmit').addEventListener('click', insertTower);
$('#locationSubmit').addEventListener('click', insertLocation);
$('#submit4').addEventListener('click', checkDistance);


//5. neighbor fencing disputes
//input box Ui
const inputName = 'neighbor';
var neighbors = [];
const makeNeighborInputBox = () => {
    let numValue = $('#neighbor_num').value;
    generateInputBoxes(numValue, inputName);
}
const makeResetForNeighbor = () => {
    neighbors = [];
    reset(inputName);
}
$('#neighbor_generateInputBoxes').addEventListener('click', makeNeighborInputBox);
$('#neighbor_reset').addEventListener('click', makeResetForNeighbor);
// My answer
function neighbor(str) {
    let arr = str.split(' ');
    this.x_min = parseInt(arr[0]);
    this.y_max = parseInt(arr[1]);
    this.x_max = parseInt(arr[0]) + parseInt(arr[2]);
    this.y_min = parseInt(arr[1]) - parseInt(arr[3]);
    this.overlapped = false;
    this.setOverlapped = function (val) {
        this.overlapped = val;
    }
}



const checkDisputes = () => {
    neighbors = [];
    let num = $('#neighbor_num').value;
    for (let i = 0; i < num; i++) {
        let neighborInput = $(`#neighbor${i + 1}`).value;
        if (neighborInput == "") {
            $('#neighborMsg').innerHTML = 'check the location input';
        } else {
            neighbors.push(new neighbor(neighborInput));
        }
    }
    for (let i = 0; i < neighbors.length; i++) {
        for (let j = 0; j < neighbors.length; j++) {
            if (i != j && !neighbors[j].overlapped) {
                if (neighbors[i].x_min < neighbors[j].x_max && neighbors[i].x_max > neighbors[j].x_min &&
                    neighbors[i].y_max > neighbors[j].y_min && neighbors[i].y_min < neighbors[j].y_max) {
                    neighbors[i].setOverlapped(true);
                    neighbors[j].setOverlapped(true);
                }
            }
        }
    }
    let result = neighbors.filter(neighbor => neighbor.overlapped).length;
    $('#neighborMsg').innerHTML = `${result} neibors are overlapped.`;
}

$('#neighborSubmit').addEventListener('click', checkDisputes);

//num 6 ~ 8 are implemented in each file


