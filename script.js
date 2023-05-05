const password = document.querySelector("#user-password"),
      passwordConfirm = document.querySelector("#user-password-confirm"),
      email = document.querySelector("#email"),
      error = document.getElementsByClassName("error"),
      inputs = document.querySelectorAll("input"),
      createBtn = document.querySelector(".create-account"),
      phone = document.querySelector("#phone-number"),
      inputValid = Array(inputs.length).fill(false),
      fName = document.querySelector("#first-name"),
      lName = document.querySelector("#last-name");

function displayError() {
    for (let i = 0; i < inputs.length; i++) {
        console.log(inputs[i]);
        console.log(error[i]);
    }
}

for (let i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener("focus", () => {
        error[i].textContent = "";
    });

    inputs[i].addEventListener("blur", () => {
        if (inputs[i].value !== "") {
            error[i].textContent = "";
        }
        else {
            error[i].textContent = "REQUIRED";
        }
    });
}

function updateCreateBtn() {
    if (inputValid.every(valid => valid)) {
        createBtn.classList.add("enabled");
    } else {
        createBtn.classList.remove("enabled");
    }
}

fName.addEventListener("blur", (e) => {
    e.target.value.length === 0 ? inputValid[0] = false : inputValid[0] = true;
    updateCreateBtn();
});

lName.addEventListener("blur", (e) => {
    e.target.value.length === 0 ? inputValid[1] = false : inputValid[1] = true;
    updateCreateBtn();
})

email.addEventListener("blur", (e) => {
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

phone.addEventListener("blur", (e) => {
    if (!(e.target.value.match(/^[0-9]+$/)) || e.target.value.length < 10) {
        error[3].textContent = "INVALID NUMBER";
        inputValid[3] = false;
    }
    else {
        inputValid[3] = true;
    }
    updateCreateBtn();
});

password.addEventListener("blur", (e) => {
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

passwordConfirm.addEventListener("blur", (e) => {
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

function enablePasswordConfirm() {
    passwordConfirm.style.backgroundColor = "rgb(70, 70, 70)";
    passwordConfirm.style.pointerEvents = "auto";
}

function disablePasswordConfirm() {
    passwordConfirm.style.backgroundColor = "rgb(40, 40, 40)";
    passwordConfirm.style.pointerEvents = "none";
    passwordConfirm.value = "";
}

function mutePasswordConfirm() {
    error[5].textContent = "";
}