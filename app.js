const startButton = document.querySelector("#start-button");
const introCard = document.querySelector(".intro-card");
const questionnaire = document.querySelector("#questionnaire");
const questionForm = document.querySelector("#question-form");
const result = document.querySelector("#result");

startButton.addEventListener("click", () => {
  introCard.hidden = true;
  questionnaire.hidden = false;

  questionnaire.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
});

questionForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const selectedAnswer = document.querySelector(
    'input[name="third-country-import"]:checked'
  );

  if (!selectedAnswer) {
    result.hidden = false;
    result.className = "result-card result-warning";
    result.innerHTML = `
      <h3>Bitte wählen Sie eine Antwort aus.</h3>
      <p>
        Für die erste Einschätzung benötigen wir eine Antwort
        auf die angezeigte Frage.
      </p>
    `;
    return;
  }

  if (selectedAnswer.value === "yes") {
    result.className = "result-card result-relevant";
    result.innerHTML = `
      <h3>Mögliche Rolle: Importeur</h3>
      <p>
        Ihr Unternehmen bezieht Verpackungen oder verpackte Waren
        unmittelbar aus einem Drittstaat. Daher könnte für diesen
        Vorgang eine Importeurrolle nach der PPWR bestehen.
      </p>
      <p>
        Für eine verlässliche Einordnung müssen die konkrete
        Lieferkette, die betroffene Verpackung und das erstmalige
        Bereitstellen auf dem Unionsmarkt geprüft werden.
      </p>
    `;
  }

  if (selectedAnswer.value === "no") {
    result.className = "result-card result-neutral";
    result.innerHTML = `
      <h3>Kein unmittelbarer Hinweis auf eine Importeurrolle</h3>
      <p>
        Aus dieser Antwort ergibt sich zunächst kein Hinweis auf
        eine Importeurrolle aufgrund eines unmittelbaren Bezugs
        aus einem Drittstaat.
      </p>
      <p>
        Ihr Unternehmen kann dennoch andere Rollen nach der PPWR
        erfüllen. Diese werden in weiteren Fragen geprüft.
      </p>
    `;
  }

  if (selectedAnswer.value === "unsure") {
    result.className = "result-card result-warning";
    result.innerHTML = `
      <h3>Weitere Prüfung erforderlich</h3>
      <p>
        Prüfen Sie, wo Ihr unmittelbarer Vertragspartner ansässig
        ist und aus welchem Staat die Waren in die Europäische Union
        gelangen.
      </p>
      <p>
        Die konkrete Rollenzuordnung sollte anhand der Lieferkette
        und der Vertragsbeziehungen geprüft werden.
      </p>
    `;
  }

  result.hidden = false;

  result.scrollIntoView({
    behavior: "smooth",
    block: "nearest"
  });
});
