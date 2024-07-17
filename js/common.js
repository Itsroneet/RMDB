let mobilemenuopen = document.getElementById("mobile-menu-open");
let mobilemenuclose = document.getElementById("mobile-menu-close");
let mobilemenu = document.querySelector(".nav .nav-items ul");
let menuitem = document.querySelectorAll(".nav .nav-items ul li a");


mobilemenuopen.addEventListener("click", function () {
  mobilemenu.classList.add("nav-active");
});

function menuhide() {
  mobilemenu.classList.remove("nav-active");
}

mobilemenuclose.addEventListener("click", menuhide);
menuitem.forEach(item => {
    item.addEventListener("click", menuhide);
});

