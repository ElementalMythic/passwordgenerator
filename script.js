// JavaScript reads top to bottom so create in order to ensure application functions correctly

let generateBtn = document.querySelector("#generate");

function randomInt(min, max) {
  if (!max) {
    max = min
    min = 0
  }

  let rand = Math.random()
  return Math.floor(min*(1 - rand) + rand*max)
}

function randomIndex(list) {
  return list[randomInt(list.length)]
}

//Define what is allowed for the user to enter.

function userInputType(inputType, message, validCondition) {
  let userInput = window.prompt(message)
  let isValidType

  let inputObject = {
    canceled: userInput === null
  }

  if (inputType === "number") {
    userInput = parseInt(userInput)
    isValidType = !isNaN(userInput)
  }

  inputObject.isValidType = isValidType
  inputObject.value = userInput
  inputObject.validCondition = isValidType && validCondition(userInput)

  return inputObject
}

function newPasswordOption(name, generator) {
  return {
    name: name,
    generate: generator,
  }
}

// Use ASCII to keep code less cluttered 

// Symbols are DEC 33 - 47
// Numbers 0 - 9 are DEC 48 - 57
// Lowercase are DEC 97 - 122
// Uppercase are DEC 65 - 90

function randomSymbol() {
  return String.fromCharCode(randomInt(33, 47))
}

function randomNumber() {
  return String.fromCharCode(randomInt(48, 57))
}

function randomLower() {
  return String.fromCharCode(randomInt(97, 122))
}

function randomUpper() {
  return String.fromCharCode(randomInt(65, 90))
}

function generatePassword(minLength, maxLength) {

  let passwordLengthResult

  while (true) {
    passwordLengthResult = userInputType(
      "number", 
      "How mancy characters do you want? Between " + minLength + " and " + maxLength + " characters", 
      function(inputNumber) {
        return inputNumber >= minLength && inputNumber <= maxLength
      }
    )

    if (passwordLengthResult.canceled) return 

    if (!passwordLengthResult.isValidType) {
      window.alert("That is not a number!")

    } else if (!passwordLengthResult.validCondition) {
      window.alert("Password length must be between 8 and 128 characters")

    
    } else {
      break      // use break statement to stop the current loop
    }
  }

  // create list of password options

  let passwordOptions = [
    newPasswordOption("uppercase letters", randomUpper),
    newPasswordOption("lowercase letters", randomLower),
    newPasswordOption("symbols", randomSymbol),
    newPasswordOption("numbers", randomNumber),
  ]

  // Store the password options the user selected with "let" statement

  let selectedPasswordOptions = []

  // iterate over all existing password options, prompting the user for each one
  for (let i = 0; i < passwordOptions.length; i++) {
    let option = passwordOptions[i]
    let userConfirmed = window.confirm("Would you like to include " + option.name + " in your password?")

    // push option to 'selectedPasswordOptions' array if the user confirms the option
    if (userConfirmed) selectedPasswordOptions.push(option)
  }

  // build the password here:

  let passwordBuffer = ""
  for (let i = 0; i < passwordLengthResult.value; i++) {
    passwordBuffer += randomIndex(selectedPasswordOptions).generate()
  }

  return passwordBuffer
}

// Add to the #password input

function writePassword() {
  let password = generatePassword(8, 128);
  let passwordText = document.querySelector("#password");

  if (password) passwordText.value = password;
}


// This connects the buttom to the JavaScript
generateBtn.addEventListener("click", writePassword);