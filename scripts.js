const form = document.querySelector("#formValidationTest");
const formName = document.querySelector("#name");
const formNameError = document.querySelector("#name + .error")
const email = document.querySelector("#email")
const emailError = document.querySelector("#email + .error")
const newPassword = document.querySelector("#password")
const newPasswordError = document.querySelector("#password + .error")
const confirmPassword = document.querySelector("#confirmPassword")
const confirmPasswordError = document.querySelector("#confirmPassword + .error")
const confirmPhone = document.querySelector("#phoneNumber")
const confirmPhoneError = document.querySelector("#phoneNumber + .error")
const successSubmit = document.querySelector(".success")
const phoneNumberRegex = /^(?:\+1\s?)?(?:\(\d{3}\)|\d{3})[-.\s]?\d{3}[-.\s]?\d{4}$/;
//check errors on form submit
form.addEventListener("submit",(event) =>{
    if(!formName.validity.valid){
        showNameError()
        event.preventDefault()
      
    }
    if (!email.validity.valid){
        event.preventDefault()
        showEmailError()
    }
    if (!newPassword.validity.valid){
        event.preventDefault()
        showNewPasswordError()
    }
    if(newPassword.value != confirmPassword.value || !confirmPassword.validity.valid){
        event.preventDefault()
        showConfirmPasswordError()
    }
    if(!confirmPhone.validity.valid || !phoneNumberRegex.test(confirmPhone.value)){
        event.preventDefault()
        showPhoneError()
    }
    if(formName.validity.valid){
        event.preventDefault()
        form.reset()
        successSubmit.innerHTML ="Form was Submitted Succesfully "
    }
    
})
//checks form name for errors
formName.addEventListener("input",(event)=>{
    if(formName.validity.valid){
        formNameError.innerHTML = ""
        formNameError.className = "error"
    }else{
        showNameError();
    }
})
function showNameError(){
    if (formName.validity.valueMissing){
        formNameError.innerHTML = "Name is Missing"
    }
    else if (formName.validity.tooShort){
        formNameError.textContent = `Name should be at least ${formName.minLength} characters; you entered ${formName.value.length}.`;
    }
    formNameError.className = "error active"
}
// checks email for errors
email.addEventListener("input",(event)=>{
    if(email.validity.valid){
        emailError.innerHTML = ""
        emailError.className = "error"
    }else{
        showEmailError();
    }
})
function showEmailError(){
    if(email.validity.valueMissing){
        emailError.innerHTML = "Email is Missing"
    }
    else if(email.validity.typeMismatch){
        emailError.innerHTML = "Enter a valid email"
    }
    emailError.className = "error active"
}
// checks first password for errors
newPassword.addEventListener("input",(event)=>{
    if(newPassword.validity.valid){
        newPasswordError.innerHTML = ""
        newPasswordError.className = "error"
    }else{
        showNewPasswordError()
    }
})
function showNewPasswordError(){
    if(newPassword.validity.valueMissing){
        newPasswordError.innerHTML = "Password Missing"
    }else if(newPassword.validity.patternMismatch){
        const number = checkPasswordNumber()
        const lower = checkPasswordLower()
        const upper = checkPasswordUpper()
        let errorMessage = "Password should contain the follkowing:<br>"
        if (!number) {
            errorMessage += "- One number<br>";
        }
        if (!lower) {
            errorMessage += "- One lowercase letter<br>";
        }
        if (!upper) {
            errorMessage += "- One uppercase letter<br>";
        }
        if (newPassword.value.length < 6 || newPassword.value.length > 16) {
            errorMessage += "- Between 6 and 16 characters long<br>";
        }
        newPasswordError.innerHTML = errorMessage;
    }
    newPasswordError.className = "error active"
}
function checkPasswordNumber(){
    const string = newPassword.value
    const regex = /\d/
    return regex.test(string)
}
function checkPasswordLower(){
    const string = newPassword.value
    const regex = /[a-z]/
    return regex.test(string)
}
function checkPasswordUpper(){
    const string = newPassword.value
    const regex = /[A-Z]/
    return regex.test(string)
}
//checks confirm password to see if it equals first password
confirmPassword.addEventListener("input",(event)=>{
    if(confirmPassword.validity.valid && newPassword.value === confirmPassword.value){
        confirmPasswordError.innerHTML = ""
        confirmPasswordError.className = "error"
    }else{
        showConfirmPasswordError()
    }
})
function showConfirmPasswordError(){
    if (confirmPassword.validity.valueMissing){
        confirmPasswordError.innerHTML = "Password is Missing"
    }else if(newPassword.value != confirmPassword.value){
        confirmPasswordError.innerHTML = "Passwords must match"
    }
    confirmPasswordError.className = "error active"
}
//checks phone number
confirmPhone.addEventListener("input",(event)=>{
    if(!phoneNumberRegex.test(confirmPhone.value)){
        showPhoneError()
        return
    }
    if(confirmPhone.validity.valid){
        confirmPhoneError.innerHTML = ""
        confirmPhoneError.className = "error"
    }else{
        showPhoneError()
    }
})
function showPhoneError(){
    if(confirmPhone.validity.valueMissing){
        confirmPhoneError.innerHTML = "Phone Number Missing"
    }else if(!phoneNumberRegex.test(confirmPhone.value)){
        confirmPhoneError.innerHTML = "Must be a valid US phone number"
    }
    confirmPhoneError.className = "error active"
}
