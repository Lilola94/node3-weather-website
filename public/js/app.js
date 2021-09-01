console.log("Client side javascript file");

const weatherform = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-one");
const messageTwo = document.querySelector("#message-two");

messageOne.textContent = "from javascript";

weatherform.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;
  messageOne.textContent = "Loading";
  messageTwo.textContent = "";
  fetch("http://localhost:3000/weather?address=" + location).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          messageTwo.textContent = data.error;
        } else {
          console.log(data);
          messageOne.textContent = data.location;
          messageTwo.textContent = data.forecast.description;
        }
      });
    }
  );
});
