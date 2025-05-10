
const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-lengthNumber]")
const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generateButton");
const allCheckbox = document.querySelectorAll("input[type=checkbox]");
const symbols = '~`!@#$%^&*()_-+={[}]:;"<,>.?/';

let password = "";
let passwordLength = 10 ;
let checkCount = 0;

setIndicator("#ccc");

handleSlider();
// set password length 
function handleSlider(){
    inputSlider.value = passwordLength;
    console.log("innertext ");
    lengthDisplay.innerText = passwordLength ;
    const min = inputSlider.min;
    const max = inputSlider.max;
    inputSlider.style.backgroundSize = ((passwordLength-min)*100/(max-min)) + " % 100%" ;
}

function setIndicator (color){
   indicator.style.backgroundColor = color ;
   //shadow 
   indicator.style.boxshadow = `0px 0px 12px 1px ${color}`;

}

function getRndInteger(min , max){
   return  Math.floor(Math.random() * (max - min)) + min ;
}

function generateRandomNumber(){
    return getRndInteger(0,9);

}

function generateLowercase(){
   return  String.fromCharCode(getRndInteger(97, 123));
}

function generateUppercase(){
    return String.fromCharCode(getRndInteger(65,91));
}

function generateSymbol (){
   const rndNum = getRndInteger(0 , symbols.length);
   return symbols.charAt(rndNum);
}

function calcStrength(){
    let hasUpper = false ;
    let hasLower = false ;
    let hasNum = false;
    let hasSym = false;
    if (uppercaseCheck.checked) hasUpper = true ;
    if(lowercaseCheck.checked) hasLower = true ;
    if (numbersCheck.checked ) hasNum = true;
    if (symbolsCheck.checked) hasSym = true ;
    if (hasUpper && hasLower && (hasNum || hasSym) && passwordLength >= 8){
        setIndicator("#0f0");
    }
    else if (( hasLower || hasUpper) &&
    (hasNum && hasSym) &&
    passwordLength >= 6 ){
     setIndicator("#ff0");
    }
    else{
        setIndicator("#f00");
    }
}

 async function copyContent(){
    try{
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText = "copied";
    }
    catch(e) {
copyMsg.innertext = "failed";
    }
    // to make copy span visible 
    copyMsg.classList.add("active");
    setTimeout( () => {
copyMsg.classList.remove ("active");
    } , 2000);
}
inputSlider.addEventListener('input' , (e)=>{
    passwordLength = e.target.value ;
     handleSlider();
})

copyBtn.addEventListener('click' , () =>{
    if (passwordDisplay.value)
    copyContent();
})

function handleCheckboxChange(){
    checkCount = 0 ;
    allCheckbox.forEach( (checkbox)=>{
        if (checkbox.checked){
            checkCount++ ;
        }

    });
  
    
    if (passwordLength < checkCount){
        passwordLength = checkCount ;
        handleSlider();
    }
}

allCheckbox.forEach((checkbox)=>{
    checkbox.addEventListener('change' , handleCheckboxChange);
})

generateBtn.addEventListener('click' ,()=>{
  
    if (checkCount == 0 )   
    return;
    if (passwordLength < checkCount){
        passwordLength = checkCount;
        handleSlider();

    }  
 
    password = "";
   

    let funcArr = [];
    if (uppercaseCheck.checked){
        funcArr.push(generateUppercase);
    }
    if(lowercaseCheck.checked){
        funcArr.push(generateLowercase);
    }
    if(numbersCheck.checked){
        funcArr.push(generateRandomNumber);
    }
    if(symbolsCheck.checked){
        funcArr.push(generateSymbol);
    }
 
     for (let i = 0 ; i < funcArr.length ; i++){
        password += funcArr[i]();
     }

 for (let i = 0 ; i < passwordLength-funcArr.length ; i ++){
    let randIndex = getRndInteger(0,funcArr.length);
    password += funcArr[randIndex]();
 }


 password = shufflePassword(Array.from(password));
 // show in UI
 passwordDisplay.value = password;
 
 calcStrength();
});

function shufflePassword(array) {
    // fisher Yates Method 
    for (let i = array.length -1 ; i> 0 ; i--){
        // random j find out using random function
        const j  = Math.floor(Math.random()*(i+1));
        // swap number at i index and j index 
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp ;
     }
     let str  = "";
     array.forEach((el) => (str += el));
     return str ;
}





