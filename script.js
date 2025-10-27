//Set password length using slider and display length

let passwordlength=10;
const slider=document.querySelector(".slider");
const length=document.querySelector("#datalength");
function handleslider(){
    slider.value=passwordlength;
    length.innerText=passwordlength;
}
handleslider();

slider.addEventListener('input', (event) => {
    passwordlength = event.target.value;
    handleslider();
});
// Generate Random Letters and Number and Symbols
const symbol = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';

function generateRandom(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

// Random Lowercase Letter 
function generateRandomLowercase() {
    return String.fromCharCode(generateRandom(97, 123));
}

// Random Uppercase Letter 
function generateRandomUppercase() {
    return String.fromCharCode(generateRandom(65, 91));
}

// Random Number 
function generateRandomNumber() {
    return generateRandom(1, 10);
}

// Generate Symbol 
function generateRandomSymbol() {
    let index = generateRandom(0, symbol.length);
    return symbol[index];
}


//setting color of indicator

const indicator=document.querySelector("#indicator");

function setcolor(color){
    indicator.style.backgroundColor=color;
    //shadow
     indicator.style.boxShadow = `0 0 12px 1px ${color}`;
}

//Default indicator
setcolor("#a79f9fff");

const uppercase = document.querySelector('#Uppercase');
const lowercase = document.querySelector('#Lowercase');
const numbers = document.querySelector('#Numbers');
const symbols = document.querySelector('#Symbols');

function Strength() {
    let hasUpper = false;
    let hasLower = false;
    let hasNumber = false;
    let hasSymbol = false;

    if (uppercase.checked) hasUpper = true;
    if (lowercase.checked) hasLower = true;
    if (numbers.checked) hasNumber = true;
    if (symbols.checked) hasSymbol = true;

    if (hasUpper && hasLower && (hasNumber || hasSymbol) && passwordlength >= 8) {
        setcolor("#0f0");
    } else if (
        (hasLower || hasUpper) &&
        (hasNumber || hasSymbol) &&
        passwordlength >= 6
    ) {
        setcolor("#ff0");
    } else {
        setcolor("#f00");
    }
}

// Copy Message 
let copyMessage = document.querySelector(".copy");
let copyBtn = document.querySelector(".copybtn");
let passwordDisplay = document.querySelector(".display");

// passwordDisplay.value = "My Name is Priyansh";

// Why we use it - https://stackoverflow.com/questions/45071353/copy-text-string-on-click#:~:text=15-,Use%20the%20Clipboard,-API!
async function copyContent() {
    try {
        await navigator.clipboard.writeText(passwordDisplay.value);

        copyMessage.innerText = "Copied"
    }
    catch (e) {
        // alert("Something went wrong in CopyContent");
        copyMessage.innerText = "Failed";
    }
     
    //to make the copymessage visible
    copyMessage.classList.add('active');

    setTimeout(() => {
        copyMessage.classList.remove('active');
    }, 2000)
}

copyBtn.addEventListener("click", () => {
    if (passwordDisplay.value)
        copyContent();
});

// ------------------------------------ 

// shuffle algorithm is the Fisher-Yates (aka Knuth) Shuffle.
// Shuffle the array randomly - Fisher Yates Method
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
}
// Password Generate 

// By Default UpperCase Checked 
// uppercase.checked = true;

let checkBoxes = document.querySelectorAll(".check input");
// console.log(checkBoxes);

let checkCount = 0;

// CheckBox - Handle 

function handleCheckBoxChange() {
    checkCount = 0;
    checkBoxes.forEach((checkbox) => {
        if (checkbox.checked)
            checkCount++;
    });

    //special condition
    if (passwordlength < checkCount) {
        passwordlength = checkCount;
        handleslider();
    }
}

checkBoxes.forEach((checkbox) => {
    checkbox.addEventListener('change', handleCheckBoxChange);
})



let password = "";
let generateBtn = document.querySelector(".generatebtn");

generateBtn.addEventListener('click', () => {
    if (checkCount <= 0)
        return;

    if (passwordlength < checkCount) {
        passwordlength = checkCount;
        handleslider();
    }
console.log("Start");
    // Remove Previous Password 
    password = "";

    let arrayOfCheckedFunction = [];

    if (uppercase.checked) arrayOfCheckedFunction.push(generateRandomUppercase);
    if (lowercase.checked) arrayOfCheckedFunction.push(generateRandomLowercase);
    if (numbers.checked) arrayOfCheckedFunction.push(generateRandomNumber);
    if (symbols.checked) arrayOfCheckedFunction.push(generateRandomSymbol);

    // Compulsory Addition
    for (let i = 0; i < arrayOfCheckedFunction.length; i++) {
        password += arrayOfCheckedFunction[i]();
    }
console.log("middle");

    // console.log("Password: " + password);

    // Additional addition
    for (let i = 0; i < passwordlength - arrayOfCheckedFunction.length; i++) {
        let randIndex = generateRandom(0, arrayOfCheckedFunction.length);
        password += arrayOfCheckedFunction[randIndex]();
    }
    console.log("end");
    
    // Shuffle Password 
    password = shuffle(Array.from(password));
    passwordDisplay.value = password;
    Strength();
});