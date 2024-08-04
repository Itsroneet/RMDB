let create = document.querySelector(".create-account")
let haveaccount = document.querySelector(".have-account")
let container = document.querySelector(".container")
let loginarea = document.querySelector(".login-box")
let signuparea = document.querySelector(".signup-box")
let loginbtn = document.querySelector(".loginbtn")
let signupbtn = document.querySelector(".signupbtn")
let forgetbtn = document.querySelector(".forgot-password")
let forgetarea = document.querySelector(".forgot")


const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  });


create.addEventListener("click", function () {
    container.classList.add("container-active");
    signuparea.classList.add("signup-active");
    loginarea.classList.remove("login-active");
    document.title=("Signup - RMDB")
})

haveaccount.addEventListener("click", function () {
    container.classList.remove("container-active");
    signuparea.classList.remove("signup-active");
    loginarea.classList.add("login-active");
    document.title=("login - RMDB")
})

forgetbtn.addEventListener("click", function () {
    window.location.href = `forgot.html`;
})


// password show hide

// login page

let password = document.querySelector(".password-login")
let passshow = document.querySelector(".pass-show-login")
let passshide = document.querySelector(".pass-hide-login")

passshow.addEventListener("click", function () {

    if (password.value.length >= 1) {
        passshow.style.display = ("none")
        passshide.style.display = ("block")
        password.type = ("text")
    }
    
})

passshide.addEventListener("click", function () {
    passshow.style.display = ("block")
    passshide.style.display = ("none")
    password.type = ("password")
})


// signup page

let password2 = document.querySelector(".password-signup")
let passshow2 = document.querySelector(".pass-show-signup")
let passshide2 = document.querySelector(".pass-hide-signup")

passshow2.addEventListener("click", function () {

    if (password2.value.length >= 1) {
        passshow2.style.display = ("none")
        passshide2.style.display = ("block")
        password2.type = ("text")
    }
    
})

passshide2.addEventListener("click", function () {
    passshow2.style.display = ("block")
    passshide2.style.display = ("none")
    password2.type = ("password")
})


// login process

let loginform = document.getElementById('login-form')

loginform.addEventListener('submit', function (event) {
    event.preventDefault();
    Toast.fire({
        icon: "error",
        title: "Invalid username/email or password."
      });
    });
    
    
    //signup process
    
let signupform = document.getElementById('signup-form')

signupform.addEventListener('submit', function (event) {
    event.preventDefault();
    if (password2.value.length<5) {
        Toast.fire({
            icon: "error",
            title: "Password must be more than 5 letters."
          });
          
        } else {
            Toast.fire({
                icon: "error",
                title: "couldnt register."
              });
              
    }
});



