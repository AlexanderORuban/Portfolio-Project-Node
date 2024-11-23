document.getElementById("contact-form").onsubmit = function () {
    clearErrors();
    let isValid = true;

    let fname = document.getElementById("fname").value;
    let lname = document.getElementById("lname").value;
    let linkedin = document.getElementById("linkedin").value;
    let email = document.getElementById("email").value;
    let mailinglist = document.getElementById("mailinglist").checked;
    let met = document.getElementById("met").value;

    if (fname == "") {
        document.getElementById("err-fname").style.display = "inline";
        isValid = false;
    }

    if (lname == "") {
        document.getElementById("err-lname").style.display = "inline";
        isValid = false;
    }

    if (linkedin != "" && !(linkedin.startsWith("https://linkedin.com/in/") || linkedin.startsWith("https://www.linkedin.com/in/"))) {
        document.getElementById("err-linkedin").style.display = "inline";
        isValid = false;
    }

    if (email != "" && (!email.includes('@') || !email.includes('.'))) {
        document.getElementById("err-email").style.display = "inline";
        isValid = false;
    }

    if (mailinglist) {
        document.getElementById("Radio").style.display = "inline";
    }

    if (mailinglist && email == "") {
        document.getElementById("Radio").style.display = "inline";
        document.getElementById("err-mailinglist").style.display = "inline";
        isValid = false;
    } 

    if (met == "none") {
        document.getElementById("err-met").style.display = "inline";
        isValid = false;
    }

    else  if (met == "Other") {
        document.getElementById("Othermeet").style.display = "inline";
    }

    return isValid;
}

function clearErrors() {
    let errors = document.getElementsByClassName("err");
    for (let i = 0; i < errors.length; i++) {
        errors[i].style.display = "none";
    }
}
