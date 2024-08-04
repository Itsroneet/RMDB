// forgot password

let forgotform = document.getElementById('forgot-form')
let OTPform = document.getElementById('OTP-form')
let forgetemail = document.getElementById('forgot-email')
let OTPcode = document.getElementById('OTP-code')
let wrongemail = document.getElementById('wrong-email')


forgotform.addEventListener('submit', function (event) {
    event.preventDefault();
    alert(`OTP Sent To ${forgetemail.value}`)
    forgetemail.value=""
    forgotform.style.display = "none"
    wrongemail.style.display = "block"
    OTPform.style.display = "flex"
});

wrongemail.addEventListener('click', function() {
    forgotform.style.display = "flex"
    OTPform.style.display = "none"
    wrongemail.style.display = "none"
});


// Function to generate a 4-digit OTP
function generateOTP() {
   return Math.floor(1000 + Math.random() * 9000).toString();
}

// Generate OTP and store it
const generatedOTP = generateOTP();
console.log("Generated OTP:", generatedOTP); // For testing purposes, print the OTP in the console

OTPform.addEventListener('submit', function (event) {
    event.preventDefault();
    if (OTPcode.value === generatedOTP) {
        OTPcode.value=""
        alert("Account Verified");
    } else {
        OTPcode.value=""
        alert(" Verification failed");
    }
});