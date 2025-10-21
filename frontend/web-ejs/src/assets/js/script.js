/* LOGIN */
var btnSignin = document.querySelector("#signin");
var btnSignup = document.querySelector("#signup");

var body = document.querySelector("body");

btnSignin.addEventListener("click", function () {
  body.className = "sign-in-js";
});

btnSignup.addEventListener("click", function () {
  body.className = "sign-up-js";
});

/* Garra */
const imagem = document.getElementById("imagem");

imagem.addEventListener("click", () => {
  imagem.classList.toggle("girar");
});
