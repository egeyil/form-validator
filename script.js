const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

// Show input error message
function showError (input, message) {
    const formControl = input.parentElement;
    formControl.classList.add('error');
    const small = formControl.querySelector('small');
    small.innerText = message;
}

// Show success outline 
function showSuccess (input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

// Check email is valid 
function checkEmail (input) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(input.value.trim())) {
        showSuccess(input);
    }   else {
        showError(input, 'Email is not valid');
    }
}

// Check Required Fields 
function checkRequired (inputArr) {
    inputArr.forEach(function(input) {
        if (input.value.trim() === '') {
            showError(input, `${getFieldName(input)} is required`);
        }   else {
            showSuccess(input);
        }
    });
}

// Get id name of the fields 
function getFieldName (input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Check passwords match 
function checkPasswordsMatch (input1, input2) {
    if (input1.value !== input2.value) {
        showError(input2, 'Passwords must match')
    }  
    else if (input2.value.length !== 0) {
        showSuccess(input1);
        showSuccess(input2);
    }
}

// Check input length 
function checkLength (input, min, max) {
    if (input.value.length < min) {
        showError(input, `${getFieldName(input)} must be at least ${min} characters long`);
    }   else if (input.value.length > max) {
        showError(input, `${getFieldName(input)} must be less than ${max} characters`);
    }   else {
        showSuccess(input);
    }
}


// ================ Event Listeners =================
// If you don't use .value it will return a html element

form.addEventListener('submit', function(e) {
    e.preventDefault(); //otomatik submitlemesini engelliyoruz

    checkRequired([username, email, password]);
    checkLength(username, 3, 15);
    checkEmail(email);
    checkPasswordsMatch(password, password2);
    checkLength(password, 6, 25);
});