const btns = document.querySelector(".calculator-keys");
btns.addEventListener("click", handleBtnClick);

const inputEl = document.querySelector(".calculator-screen");
inputEl.addEventListener("keypress", handleKeyboard);
let firstOperand = "";
let secondOperand = "";
let sign = null;
function updateInput(inputValue) {
  inputEl.value = inputValue;
}
function result(sign) {
  switch (sign) {
    case "+":
      return Number(firstOperand.replace(/[()]/g, "")) + Number(secondOperand.replace(/[()]/g, ""));
    case "-":
      return Number(firstOperand.replace(/[()]/g, "")) - Number(secondOperand.replace(/[()]/g, ""));
    case "*":
      return Number(firstOperand.replace(/[()]/g, "")) * Number(secondOperand.replace(/[()]/g, ""));
    case "/":
      return Number(firstOperand.replace(/[()]/g, "")) / Number(secondOperand.replace(/[()]/g, ""));
  }
}
function reset() {
  firstOperand = "";
  secondOperand = "";
  sign = null;
}
function operandAndValue(operand, val) {
  return operand + val;
}
function handleDeviceInput(value, device) {
  switch (value) {

    case "0":
      if (firstOperand === "") {
        firstOperand = value;
        if (device === "mouse") {
          updateInput(firstOperand);
        }

      } else {
        if (firstOperand !== "0" && sign === null) {
          firstOperand = operandAndValue(firstOperand, value);
          if (device === "mouse") {
            updateInput(firstOperand);
          }
        } else if (sign) {
          if (secondOperand === "") {
            secondOperand = value;
            if (device === "mouse") {
              updateInput(secondOperand);
            }
          } else {
            if (secondOperand !== "0") {
              secondOperand = operandAndValue(secondOperand, value);
              if (device === "mouse") {
                updateInput(secondOperand);
              }
            }
          }
          if (device === "mouse") {
            updateInput(firstOperand + sign + secondOperand);
          }
        }
      }
      break;

    case "-":
    case "+":
    case "*":
    case "/":

        if (firstOperand !== "" && secondOperand === "") {
          sign = value;
          if (device === "mouse") {
            updateInput(firstOperand + sign);
          }
        }
        if (firstOperand.lastIndexOf(".") === firstOperand.length - 1) {
          firstOperand = firstOperand.replace(".", "");
          if (device === "mouse") {
            updateInput(firstOperand + sign);
          }
        }
      
      if (device === "mouse") {
        if (firstOperand === "") {
          firstOperand += value
          updateInput(firstOperand)
        }
      }
      
      if(value === "-" && secondOperand !== ""){
        secondOperand+="-";
        if (device === "mouse") {
        updateInput(firstOperand+ sign + secondOperand)
        }
      }
      break;
    case "(":
      
      if(firstOperand === ""){
        firstOperand += "("
        if (device === "mouse") {
        updateInput(firstOperand)
        }
      }
      if(sign !== null && secondOperand === ""){
        secondOperand += "("
        if (device === "mouse") {
        updateInput(firstOperand + sign + secondOperand)
        }
      }
      break
    case ")":
      
      if(firstOperand.indexOf("(") !== -1 && sign === null){
        firstOperand += ")"
        if (device === "mouse") {
        updateInput(firstOperand)
        }
      }
      else{
          secondOperand += ")"
          if (device === "mouse") {
          updateInput(firstOperand + sign + secondOperand)
          }
      }

      break
    case "=":
      if (secondOperand) {
        const equalResult = result(sign);
        updateInput(equalResult);
      }
      break;
    case "all-clear":
      reset();
      updateInput(0);
      break;
    case ".":
      if (firstOperand !== "" && sign === null) {
        if (firstOperand.indexOf(".") === -1) {
          firstOperand += value;
          if (device === "mouse") {
            updateInput(firstOperand);
          }
        }
      }


      if (firstOperand !== "" && secondOperand !== "" && sign !== null) {
        if (secondOperand.indexOf(".") === -1) {
          secondOperand += value;
          if (device === "mouse") {
            updateInput(firstOperand + sign + secondOperand);
          }
        }
      }
      break;

  }
}
function handleBtnClick(event) {
  const value = event.target.value;
  if (Number(value) > 0 && Number(value) <= 9) {
    if (!sign) {
      if (firstOperand === "0") {
        firstOperand = value;
      } else {
        firstOperand = operandAndValue(firstOperand, value);
      }
      updateInput(firstOperand);
    } else {
      if (secondOperand === "0") {
        secondOperand = value;
      } else {
        secondOperand = operandAndValue(secondOperand, value);
      }
      updateInput(firstOperand + sign + secondOperand);
    }
  } else {
    handleDeviceInput(value, "mouse")
  }
}

///////////////////////////////////////////////////////////////////////////////



function handleKeyboard(event) {
  const value = event.key;
  if (inputEl.value === "0") {
    updateInput('')
  }



  if (Number(value) > 0 && Number(value) <= 9) {
    if (!sign) {
      if (firstOperand === "0") {
        firstOperand = value;
      } else {
        firstOperand = operandAndValue(firstOperand, value);
      }

    } else {
      if (secondOperand === "0") {
        secondOperand = value;
      } else {
        secondOperand = operandAndValue(secondOperand, value);
      }
    }

  } else {
    handleDeviceInput(value, "keyboard")
  }

} 