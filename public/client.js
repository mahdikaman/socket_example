const socket = io();

const formUser = document.querySelector("#formUser");
const inputUser = document.querySelector("#inputUser");
const messages = document.querySelector("#messages");
const formMessage = document.querySelector("#formMessage");
const inputMessage = document.querySelector("#inputMessage");
const userContianer = document.querySelector("#userContainer");
const terning = document.querySelector("#rnd");
const nuummer = document.querySelector("#nuummer");

let myUser;
let summan = 0;

formUser.addEventListener("submit", function (e) {
  e.preventDefault();
  myUser = inputUser.value;
  userContianer.innerHTML = "<h2>Välkommen " + myUser + "</h2>";
  document.getElementById("user").style.display = "none";
  document.getElementById("message").style.display = "block";
});

formMessage.addEventListener("submit", function (e) {
  e.preventDefault();
  if (inputMessage.value) {
    socket.emit("chatMessage", { user: myUser, message: inputMessage.value });
    inputMessage.value = "";
  }
});

socket.on("newChatMessage", function (msg) {
  let item = document.createElement("li");
  item.textContent = msg;
  messages.appendChild(item);
});

terning.addEventListener("click", getRndInteger);
function getRndInteger() {
  let rndTerning = Math.floor(Math.random() * 6) + 1;
  summan += rndTerning;
  socket.emit("rollTerning", {
    user: myUser,
    tirning: rndTerning,
    sim: summan,
  });
}

socket.on("dice", function (value) {
  console.log(value);
  console.log(value.newTarning);

  let itemm = document.createElement("li");
  itemm.textContent =
    value.newUser +
    " slog " +
    "nummer : " +
    " " +
    value.newTarning +
    " " +
    "summan : " +
    value.summan;
  nuummer.appendChild(itemm);
});
