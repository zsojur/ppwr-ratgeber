const startButton = document.querySelector("#start-button");
const introCard = document.querySelector(".intro-card");
const questionnaire = document.querySelector("#questionnaire");

startButton.addEventListener("click", () => {
  introCard.hidden = true;
  questionnaire.hidden = false;

  questionnaire.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
});
