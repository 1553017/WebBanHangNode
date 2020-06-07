var modal = document.getElementById("sign-up-in");

window.onclick = function (event) {
  if (event.target == model) {
    this.modal.style.display = "none";
  }
};

function Login_up() {
  var form = document.getElementById("sign-up-in");
  form.style.display = "block";
}

function Cancel_login_up() {
  var form = document.getElementById("sign-up-in");
  form.style.display = "none";
}

var typeEnum = {
  SMALL: 1,
  MEDIUM: 2,
  LARGE: 3,
  properties: {
    0: { name: "Rau củ quả", value: 1, code: "S" },
    2: { name: "medium", value: 2, code: "M" },
    3: { name: "large", value: 3, code: "L" },
  },
};