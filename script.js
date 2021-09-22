// gather each DOM element
const numberButtons = document.querySelectorAll("[data-number]")
const operationButtons = document.querySelectorAll("[data-operation]")
const equalsButton = document.querySelector("[data-equal]")
const deleteButton = document.querySelector("[data-delete]")
const allClearButton = document.querySelector("[data-all-clear]")
const previousOperandText = document.querySelector("[data-previous-operand]")
const currentOperandText = document.querySelector("[data-current-operand]")

// create a Calculator class, which takes in two params, and default is empty by using clear function;
class Calculator {
    constructor(previousOperandText, currentOperandText) {
        this.previousOperandText = previousOperandText;
        this.currentOperandText = currentOperandText;
        this.clear();
    }

    // clear ALL the input and set it to default empty/undefined
    clear() {
        this.previousOperand = "";
        this.currentOperand = "";
        this.operation = undefined;
    }

    // delete the last entered number
    delete() {
        // since the currentOperand variable is a string, we can use slice to remove the last character
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    // append number together
    appendNumber(number) {
        // edge case: we should only enter . once, if our currentOperand includes . already, we return nothing (stop execute)
        if(number === "." && this.currentOperand.includes(".")) return
        // then we concat. the number into string
        let a = this.currentOperand += number;
    }

    // when user choosed operation (+ - * /)
    chooseOperation(operation) {
        // edge case: if user entered empty currentOperand, we stop the function
        if(this.currentOperand === "") return
        // if the previousOperand has a number, we do the computation. for cases like user do multiple expression at a time instead of using "=" sign (like 1+1, +2, +3)
        if(this.previousOperand !== "") {
            this.compute();
        }
        // set the operation user clicked
        this.operation = operation;
        // pass the currentOperand value to previousOperand because once user clicked operation, the first number(currentOperad) should pass over the previousOperad
        this.previousOperand = this.currentOperand;
        // clear out the currentOperand to empty string, so we can use it later
        this.currentOperand = "";
    }

    // actual computation process
    compute() {
        // create three var to start with, result to store the computed amount
        let result;
        // convert the string to float
        const num1 = parseFloat(this.previousOperand);
        const num2 = parseFloat(this.currentOperand);
        //edge case, if either num1 or num2 isNAN, we stop the compute
        if(isNaN(num1) || isNaN(num2)) return 
        // if num1 and num2 are numbers, we do compute based on entered operation
        switch(this.operation) {
            case "+":
                result = num1 + num2;
                break;
            case "-":
                result = num1 - num2;
                break;
            case "*":
                result = num1 * num2;
                break;
            case "/":
                result = num1 / num2;
                break;
            // default is similar to last else statement, if user pressed other button than(+ - * /), we do nothing
            default:
                return;
        }
        // once computation is done, we want to store the result into currentOperand for display purpose and clear operation and previousOperand variables
        this.currentOperand = result;
        this.operation = undefined;
        this.previousOperand = "";
    }

    // get nice number like 1,133, put comma for every thousand number
    getDisplayNumber(number) {
        /* 
        //***DOES NOT WORK***
        console.log(typeof(number));
        const floatNum = parseFloat(number);
        // console.log(typeof(floatNum));
        // edge case, if the float is not a number, then we want to do nothing
        if(isNaN(floatNum)) return ""

        // else we put a comma for every thousand numbers, but below does not work for decimal, so we need to split the number into int and decimal, so we can apply toLocaleString on int part, then concat. them later
        return floatNum.toLocaleString("en");
        */
    
        // number is a string
        console.log(typeof(number));
        // we still convert to String for safe play, otherwise we might run into problem when we split it
        const numberString = number.toString();
        // so we use split function to seperate the number string into 2 part: integer and decimal place
        const intNum = parseFloat(numberString.split(".")[0]);
        // console.log(typeof(intNum));
        // console.log(intNum);
        // we keep the decimal part as an array for later use, to cancatenate back
        const decNum = numberString.split(".")[1];
        // console.log(decNum);
        // edge case: if user entered not-number like . first, instead of number, then we set intDisplay as empty string
        let intDisplay;
        if(isNaN(intNum)) {
            intDisplay = "";
        } else {
            // we apply toLocaleString to int part, and we put the condition of (maximumFractionDigits) which limits the maximum number of digits after the decimal separator.
            intDisplay = intNum.toLocaleString("en", {maximumFractionDigits: 0})
        }
        // we check if there's any decimal number we have
        if(decNum) {
            // if we have it, we concatenate them together for dispay
            return `${intDisplay}.${decNum}`
        } else {
            // else, we just display integer part
            return intDisplay;
        }
    }

    // update HTML display to this.currentOperand, which come from appendNumber();
    updateDisplay() {
        // display the currentOperand on the HTML
        this.currentOperandText.innerText = this.getDisplayNumber(this.currentOperand); 
        // but if we have an operation clicked, we want to concat. the number with operation and display on the previous field
        if(this.operation) {
            this.previousOperandText.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`; 
            // if an operation does not exist, like we pressed = sign, then we clear the previous record
        } else {
            this.previousOperandText.innerText = "";
        }
    }
}

// create a Calculator instance
const calculator = new Calculator(previousOperandText, currentOperandText);

// numberButtoms is an array
// console.log(numberButtons);
// for each loop the array, and for each element(button)
numberButtons.forEach(element => {
    // we add click event listener click, and it will takes in a function when clicked
    element.addEventListener("click", ()=> {
        // we call appendNumber(takes in the button value as param) and update display()
        calculator.appendNumber(element.innerText);
        calculator.updateDisplay();
    })
})

// operationButtons is an array
// console.log(operationButtons);
// for each loop the array, and for each element(button)
operationButtons.forEach(element => {
    // we add click event listener, and it will takes in a function
    element.addEventListener("click", ()=> {
        // invoke chooseOperation() and updatedisplay()
        calculator.chooseOperation(element.innerHTML);
        calculator.updateDisplay();
    })
})

// when user clicked equal button, we want to run compute() and updateDisplay()
equalsButton.addEventListener("click", function() {
    calculator.compute();
    calculator.updateDisplay();
})

// all clear button will trigger clear(), so set everything to default, and update display
allClearButton.addEventListener("click", function() {
    calculator.clear();
    calculator.updateDisplay();
})

// delete button will delete the last entered number and update the display
deleteButton.addEventListener("click", function() {
    calculator.delete();
    calculator.updateDisplay();
})