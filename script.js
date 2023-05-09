// Declarations
const fName = document.querySelector("#first-name"),
      lName = document.querySelector("#last-name"),
      email = document.querySelector("#email"),
      phone = document.querySelector("#phone-number"),
      password = document.querySelector("#user-password"),
      passwordConfirm = document.querySelector("#user-password-confirm"),
      createBtn = document.querySelector(".create-account"),
      error = document.getElementsByClassName("error"),
      inputs = document.querySelectorAll("input"),
      inputValid = Array(inputs.length).fill(false);

// Dynamically update error display fields depending on if input field is filled or empty.
for (let i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener("input", () => {
        if (inputs[i].value !== "") {
            error[i].textContent = "";
        }
        else {
            error[i].textContent = "REQUIRED";
        }
    });
}

// If every input is filled and valid, turn on the create account button.
function updateCreateBtn() {
    if (inputValid.every(valid => valid)) {
        createBtn.classList.add("enabled");
    } else {
        createBtn.classList.remove("enabled");
    }
}

// Check if input is filled. If so, turn the inputValid array index to true.
fName.addEventListener("input", (e) => {
    e.target.value.length === 0 ? inputValid[0] = false : inputValid[0] = true;
    updateCreateBtn();
});

lName.addEventListener("input", (e) => {
    e.target.value.length === 0 ? inputValid[1] = false : inputValid[1] = true;
    updateCreateBtn();
})

// Check if email input is valid according to regex.
email.addEventListener("input", (e) => {
    // Using Abstract API's email validation regex, we are able to check for the email field
    // https://www.abstractapi.com/tools/email-regex-guide
    if (!(e.target.value.match("^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$"))) {
        error[2].textContent = "INVALID EMAIL";
        inputValid[2] = false;
    }
    else {
        inputValid[2] = true;
    }
    updateCreateBtn();
});

// Check if phone input is valid by seeing if there are any non integers.
phone.addEventListener("input", (e) => {
    if (!(e.target.value.match(/^[0-9]+$/)) || e.target.value.length < 10) {
        error[3].textContent = "INVALID NUMBER";
        inputValid[3] = false;
    }
    else {
        inputValid[3] = true;
    }
    updateCreateBtn();
});

// Check if password is more than 10 characters.
password.addEventListener("input", (e) => {
    if (e.target.value.length < 10 && e.target.value.length !== 0) {
        error[4].textContent = "PASSWORD MINIMUM 10 CHARACTERS";
        inputValid[4] = false;
        disablePasswordConfirm()
    }
    else if (e.target.value.length === 0) {
        inputValid[4] = false;
        mutePasswordConfirm()
        disablePasswordConfirm()
    }
    else {
        inputValid[4] = true;
        enablePasswordConfirm();
    }
    updateCreateBtn();
});

// Check if password is valid. If so, open the password confirmation field. Also checks if passwords match.
passwordConfirm.addEventListener("input", (e) => {
    if (password.value.length !== 0 && !(password.value.length < 10)) {
        if (e.target.value !== password.value) {
            error[5].textContent = "PASSWORDS MUST MATCH";
            inputValid[5] = false;
        }
        else {
            inputValid[5] = true;
        }
    }
    else {
        inputValid[5] = false;
        mutePasswordConfirm()
    }
    updateCreateBtn();
});

// Enable password confirm colors/style
function enablePasswordConfirm() {
    passwordConfirm.style.backgroundColor = "rgb(70, 70, 70)";
    passwordConfirm.style.pointerEvents = "auto";
}

// Disable password confirm colors/style
function disablePasswordConfirm() {
    passwordConfirm.style.backgroundColor = "rgb(40, 40, 40)";
    passwordConfirm.style.pointerEvents = "none";
    passwordConfirm.value = "";
}

// Clear password confirm error field
function mutePasswordConfirm() {
    error[5].textContent = "";
}