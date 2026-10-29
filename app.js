const WKO_BASE = "https://www.wko.at/abfall/";

const countries = [
  ["be", "Belgien", "ppwr-belgien"], ["bg", "Bulgarien", "ppwr-bulgarien"],
  ["dk", "Dänemark", "ppwr-daenemark"], ["de", "Deutschland", "ppwr-deutschland"],
  ["ee", "Estland", "ppwr-estland"], ["fi", "Finnland", "ppwr-finnland"],
  ["fr", "Frankreich", "ppwr-frankreich"], ["gr", "Griechenland", "ppwr-griechenland"],
  ["ie", "Irland", "ppwr-irland"], ["it", "Italien", "ppwr-italien"],
  ["hr", "Kroatien", "ppwr-kroatien"], ["lv", "Lettland", "ppwr-lettland"],
  ["lt", "Litauen", "ppwr-litauen"], ["lu", "Luxemburg", "ppwr-luxemburg"],
  ["mt", "Malta", "ppwr-malta"], ["nl", "Niederlande", "ppwr-niederlande"],
  ["pl", "Polen", "ppwr-polen"], ["pt", "Portugal", "ppwr-portugal"],
  ["ro", "Rumänien", "ppwr-rumaenien"], ["se", "Schweden", "ppwr-schweden"],
  ["sk", "Slowakei", "ppwr-slowakei"], ["si", "Slowenien", "ppwr-slowenien"],
  ["es", "Spanien", "ppwr-spanien"], ["cz", "Tschechien", "ppwr-tschechien"],
  ["hu", "Ungarn", "ppwr-ungarn"], ["cy", "Zypern", "ppwr-zypern"]
];

const questions = {
  activity: {
    id: "activity", type: "checkbox",
    title: "Welche Situationen kommen in Ihrem Betrieb vor?",
    help: "Wählen Sie alle passenden Situationen aus. Die Antworten schließen einander nicht aus.",
    purpose: "Ein Betrieb kann für verschiedene Verpackungen unterschiedliche Rollen haben. Entscheidend ist daher nicht nur, was Sie mit Ihrer Ware tun, sondern auch welche Verpackung Sie dafür verwenden.",
    hint: "Typische Kombination: Sie verpacken Ihr eigenes Produkt in einer gebrandeten Schachtel und legen diese anschließend in einen neutralen Standard-Versandkarton. Wählen Sie in diesem Fall alle drei passenden Antworten aus.",
    options: [
      ["packFiller", "Wir füllen oder verpacken unsere eigenen Waren selbst.", "Beispiel: Sie legen selbst hergestellte Seifen in Schachteln und verschließen diese."],
      ["brandOwner", "Wir verwenden gebrandete oder eigens für uns angefertigte Verpackungen.", "Beispiel: Auf der Verpackung steht Ihr Logo oder der Karton wurde nach Ihren besonderen Maßen und Vorgaben hergestellt."],
      ["neutralTransport", "Wir verwenden zusätzlich oder ausschließlich neutrale Transport- oder Versandverpackungen als Standardware.", "Beispiel: Sie kaufen unbedruckte Standardkartons, Paletten oder Stretchfolie beim Verpackungshändler und verwenden sie unverändert."],
      ["physicalProducer", "Wir stellen leere Verpackungen für andere Betriebe her oder bearbeiten sie.", "Beispiel: Sie fertigen Kartons oder bedrucken Tragetaschen im Auftrag eines Kunden."],
      ["supply", "Wir verkaufen leere Verpackungen oder Verpackungsmaterial, ohne sie selbst zu befüllen.", "Beispiel: Sie handeln mit leeren Flaschen, Folienrollen oder Kartonzuschnitten."],
      ["resell", "Wir verkaufen bereits verpackte Waren unverändert weiter.", "Beispiel: Sie kaufen verpackte Produkte beim Hersteller und verkaufen sie im Großhandel oder Geschäft weiter."],
      ["nonEuImport", "Wir kaufen Verpackungen oder verpackte Waren direkt außerhalb der EU ein.", "Beispiel: Sie bestellen bereits verpackte Elektrogeräte unmittelbar bei einem Lieferanten in China."],
      ["fulfilment", "Wir lagern, verpacken oder versenden Waren im Auftrag anderer Betriebe.", "Beispiel: Sie betreiben ein Lager und verschicken die Onlinebestellungen eines Kunden."],
      ["representative", "Wir übernehmen schriftlich PPWR- oder Verpackungspflichten für einen anderen Betrieb.", "Beispiel: Ein ausländisches Unternehmen bestellt Sie schriftlich als Bevollmächtigten in Österreich."],
      ["none", "Keine dieser Tätigkeiten trifft zu.", "Beispiel: Sie kaufen verpackte Produkte nur für den eigenen Betrieb und geben sie nicht weiter."]
    ]
  },
  packagingSource: {
    id: "packagingSource", type: "checkbox",
    title: "Woher kommen die Verpackungen in Ihrem Betrieb?",
    help: "Wählen Sie auch hier alle passenden Antworten aus. Produktverpackung und Transportverpackung können unterschiedlich beschafft werden.",
    purpose: "Diese Unterscheidung zeigt, wer für die Konformität der jeweiligen Verpackung verantwortlich sein kann. Eine gebrandete Sonderanfertigung wird anders beurteilt als ein neutraler Standardkarton.",
    hint: "Beispiel: Eigene Produktverpackung mit Logo plus neutraler Versandkarton aus dem Standardsortiment – wählen Sie „gebrandet oder individuell“ und „neutrale Standardverpackung“.",
    options: [
      ["ownBrand", "Gebrandete oder individuell angefertigte Verpackung", "Unsere Marke oder unser Name steht darauf oder die Verpackung wird nach unseren besonderen Maßen und Vorgaben hergestellt."],
      ["standardB2B", "Neutrale Standardverpackung vom gewerblichen Anbieter", "Wir kaufen zum Beispiel unbedruckte Standardkartons, Paletten oder Stretchfolie aus einem fertigen Betriebssortiment."],
      ["customerBrand", "Verpackung nach den Vorgaben unseres Kunden", "Unser Kunde bestimmt Gestaltung oder Marke; wir fertigen oder liefern die Verpackung für ihn."],
      ["retailMaterial", "Material aus dem Einzelhandel für den Privatgebrauch", "Wir verwenden zum Beispiel Haushaltsfolie, Geschenkpapier oder Luftpolsterfolie aus einem normalen Privatkundengeschäft."],
      ["reused", "Bereits gebrauchte Verpackung", "Wir verwenden vorhandene Kartons oder anderes gebrauchtes Verpackungsmaterial erneut."],
      ["unknown", "Noch unklar", "Wir können Herkunft oder Ausgestaltung einzelner Verpackungen noch nicht sicher zuordnen."]
    ]
  },
  customers: {
    id: "customers", type: "checkbox",
    title: "An wen liefern Sie die verpackte Ware?",
    help: "Mehrere Antworten sind möglich.",
    hint: "Ein Endkunde verwendet die Ware selbst. Ein Händler oder Verarbeiter verkauft oder verarbeitet sie weiter.",
    options: [
      ["consumers", "An private Kundinnen und Kunden."],
      ["businessEnd", "An Betriebe, die die Ware selbst verwenden."],
      ["resellers", "An Händler oder Verarbeiter, die die Ware weiterverkaufen oder weiterverarbeiten."],
      ["none", "Wir liefern keine verpackten Produkte."]
    ]
  },
  firstAustria: {
    id: "firstAustria", type: "radio",
    title: "Sind Sie der erste Betrieb, der diese Verpackung in Österreich verkauft oder weitergibt?",
    help: "Es geht um die erste Bereitstellung in Österreich – nicht darum, wer die Verpackung hergestellt hat.",
    hint: "Beispiel: Sie kaufen verpackte Ware in Deutschland und verkaufen sie erstmals in Österreich. Dann lautet die Antwort in der Regel „Ja“.",
    options: [["yes", "Ja"], ["no", "Nein"], ["unsure", "Unsicher"]]
  },
  destinations: {
    id: "destinations", type: "checkbox",
    title: "Wohin liefern oder versenden Sie?",
    help: "Wählen Sie alle Gebiete aus, in die Sie derzeit oder konkret geplant liefern.",
    hint: "Bei Lieferungen ins Ausland können zusätzliche Registrierung, Meldungen und Verpackungsentgelte anfallen.",
    options: [
      ["eu", "Ja, in andere EU-Mitgliedstaaten."],
      ["eea", "Ja, nach Island, Liechtenstein oder Norwegen."],
      ["third", "Ja, in andere Staaten außerhalb von EU und EWR."],
      ["none", "Nein, nur innerhalb Österreichs."]
    ]
  },
  crossBorderModel: {
    id: "crossBorderModel", type: "checkbox",
    title: "An wen liefern Sie in den anderen EU-Ländern?",
    help: "Mehrere Antworten sind möglich.",
    hint: "Direkt bedeutet: Die Ware geht von Ihnen an den Endkunden, ohne dass ein Händler im Zielland dazwischensteht.",
    options: [
      ["directEnd", "Direkt an private oder gewerbliche Endkunden."],
      ["foreignReseller", "An einen Händler oder Verarbeiter im Zielland."],
      ["marketplace", "Über einen Online-Marktplatz oder ein Lager im Zielland."],
      ["mixed", "Auf mehreren dieser Wege."],
      ["unsure", "Noch unklar."]
    ]
  },
  countries: {
    id: "countries", type: "countries",
    title: "In welche EU-Länder liefern Sie?",
    help: "Wählen Sie alle aktuellen oder konkret geplanten Zielländer. Österreich ist nicht aufgeführt.",
    hint: "Im Ergebnis erhalten Sie für jedes gewählte Land einen direkten Link zu den aktuellen Länderinformationen."
  },
  foreignEstablishment: {
    id: "foreignEstablishment", type: "radio",
    title: "Hat Ihr Betrieb in diesen Ländern eine eigene Niederlassung?",
    help: "Gemeint ist eine feste eigene Niederlassung – nicht ein Paketdienst, Händler oder externer Lageranbieter.",
    hint: "Ohne eigene Niederlassung kann eine bevollmächtigte Person oder Firma im Zielland nötig sein.",
    options: [["yes", "Ja, in allen ausgewählten Ländern."], ["no", "Nein."], ["mixed", "Nur in einigen Ländern."], ["unsure", "Unsicher."]]
  },
  packaging: {
    id: "packaging", type: "checkbox",
    title: "Welche Verpackungsarten sind betroffen?",
    help: "Wählen Sie alle Verpackungsarten aus, die Ihr Betrieb verwendet, befüllt, herstellt, importiert oder weiterverkauft.",
    purpose: "Die PPWR beurteilt nicht nur das Produkt, sondern jede einzelne Verpackung. Für Produktkarton, Versandkarton, Füllmaterial und Palette können deshalb unterschiedliche Rollen, Nachweise und spätere Vorgaben gelten.",
    hint: "Betrachten Sie jedes Verpackungsteil einzeln. Wenn eine Lieferung aus Karton, Folie und Palette besteht, können mehrere Antworten richtig sein.",
    options: [
      ["sales", "Verkaufsverpackung", "Bleibt beim Produkt bis zum Kunden, zum Beispiel Flasche, Dose, Tube oder Produktkarton."],
      ["transport", "Transport- oder Umverpackung", "Schützt oder bündelt Waren bei Lagerung und Transport, zum Beispiel Palette, Stretchfolie, Kiste oder Umkarton."],
      ["ecommerce", "Versand- oder E-Commerce-Verpackung", "Wird für den Versand an den Kunden verwendet, zum Beispiel Paketkarton, Versandtasche und Füllmaterial."],
      ["service", "Serviceverpackung", "Wird erst bei der Übergabe an den Kunden befüllt, zum Beispiel Coffee-to-go-Becher, Imbissschale oder Tragetasche."],
      ["primary", "Primärproduktionsverpackung", "Verpackt unverarbeitete Erzeugnisse aus Landwirtschaft, Tierhaltung oder Fischerei, zum Beispiel Obststeigen oder Eierkartons im Erzeugerbetrieb."],
      ["unknown", "Noch unklar", "Wählen Sie diese Antwort, wenn Sie die Verpackungsart noch nicht sicher zuordnen können."]
    ]
  },
  properties: {
    id: "properties", type: "checkbox",
    title: "Trifft etwas davon auf Ihre Verpackungen zu?",
    help: "Diese Angaben können zusätzliche Anforderungen auslösen.",
    options: [
      ["food", "Die Verpackung berührt Lebensmittel."], ["reusable", "Die Verpackung soll mehrfach verwendet werden."],
      ["takeaway", "Wir geben Speisen oder Getränke zum Mitnehmen aus."], ["plastic", "Die Verpackung besteht ganz oder teilweise aus Kunststoff."],
      ["none", "Nichts davon"]
    ]
  },
  micro: {
    id: "micro", type: "radio",
    title: "Hat Ihr Betrieb weniger als 10 Beschäftigte?",
    help: "Für ein Kleinstunternehmen muss zusätzlich der Jahresumsatz oder die Jahresbilanzsumme höchstens 2 Mio. Euro betragen.",
    hint: "Auch für Kleinstunternehmen gelten viele Pflichten weiter. Die Größe wird nur für einzelne Ausnahmen abgefragt.",
    options: [["yes", "Ja"], ["no", "Nein"], ["unsure", "Unsicher"]]
  }
};

const baseOrder = ["activity", "packagingSource", "customers", "firstAustria", "destinations", "packaging", "properties", "micro"];
const state = { step: 0, answers: {} };
const $ = (selector) => document.querySelector(selector);
const guide = $("#guide");
const results = $("#results");
const stage = $("#question-stage");
const formError = $("#form-error");

function values(id) { return new Set(state.answers[id] || []); }

function activeQuestionIds() {
  const order = [...baseOrder];
  if (values("destinations").has("eu")) {
    const insertAt = order.indexOf("destinations") + 1;
    order.splice(insertAt, 0, "crossBorderModel", "countries", "foreignEstablishment");
  }
  return order;
}

function setVisible(section) {
  guide.hidden = section !== "guide";
  results.hidden = section !== "results";
}

function startGuide() {
  state.step = 0;
  state.answers = {};
  setVisible("guide");
  renderQuestion();
  guide.scrollIntoView({ behavior: "smooth", block: "start" });
}

function renderCountries(saved) {
  return `<div class="country-picker">${countries.map(([code, name]) => `
    <label class="country-option"><input type="checkbox" name="countries" value="${code}" ${saved.includes(code) ? "checked" : ""}><span>${name}</span></label>
  `).join("")}</div>`;
}

function renderQuestion() {
  const active = activeQuestionIds();
  if (state.step >= active.length) state.step = active.length - 1;
  const question = questions[active[state.step]];
  const saved = state.answers[question.id] || [];
  const percent = Math.round(((state.step + 1) / active.length) * 100);
  $("#progress-label").textContent = `Frage ${state.step + 1} von ${active.length}`;
  $("#progress-percent").textContent = `${percent} %`;
  $("#progress-bar").style.width = `${percent}%`;
  $("#back-button").disabled = state.step === 0;
  $("#next-button").textContent = state.step === active.length - 1 ? "Ergebnis anzeigen" : "Weiter";
  formError.hidden = true;

  const choices = question.type === "countries" ? renderCountries(saved) : `
    <div class="option-list">${question.options.map(([value, label, detail]) => `
      <label class="option-card"><input type="${question.type}" name="${question.id}" value="${value}" ${saved.includes(value) ? "checked" : ""}><span><b>${label}</b>${detail ? `<small>${detail}</small>` : ""}</span></label>
    `).join("")}</div>`;

  const purpose = question.purpose ? `<aside class="question-purpose"><strong>Warum wir das fragen</strong><p>${question.purpose}</p></aside>` : "";
  const hint = question.hint ? `<aside class="question-hint"><strong>Hinweis</strong><span>${question.hint}</span></aside>` : "";
  stage.innerHTML = `<fieldset class="question-step"><legend class="sr-only">${question.title}</legend><h3>${question.title}</h3><p class="question-help">${question.help}</p>${purpose}${hint}${choices}</fieldset>`;
  if (question.type === "checkbox") {
    const exclusiveValues = new Set(["none", "unknown", "unsure", "mixed"]);
    const inputs = [...stage.querySelectorAll("input")];
    inputs.forEach((input) => input.addEventListener("change", () => {
      if (!input.checked) return;
      if (exclusiveValues.has(input.value)) inputs.forEach((other) => { if (other !== input) other.checked = false; });
      else inputs.forEach((other) => { if (exclusiveValues.has(other.value)) other.checked = false; });
    }));
  }
  stage.querySelector("input")?.focus({ preventScroll: true });
}

function saveCurrentAnswer(required = true) {
  const active = activeQuestionIds();
  const question = questions[active[state.step]];
  const checked = [...stage.querySelectorAll("input:checked")].map((input) => input.value);
  if (!checked.length && required) {
    formError.hidden = false;
    stage.querySelector("input")?.focus();
    return false;
  }
  if (checked.length) state.answers[question.id] = checked;
  else delete state.answers[question.id];
  if (question.id === "destinations" && !checked.includes("eu")) {
    delete state.answers.crossBorderModel;
    delete state.answers.countries;
    delete state.answers.foreignEstablishment;
  }
  return true;
}

const roleLinks = {
  "Erzeuger": ["WKO-Information zur Erzeugerrolle", "erzeuger-ppwr"],
  "Importeur": ["WKO-Information zur Importeurrolle", "importeur-ppwr"],
  "Lieferant": ["WKO-Information zur Lieferantenrolle", "lieferant-ppwr"],
  "Vertreiber": ["WKO-Information zur Vertreiberrolle", "vertreiber-ppwr"],
  "Hersteller im Sinn der EPR": ["WKO-Information zur Herstellerrolle", "hersteller-ppwr"],
  "Letztvertreiber": ["WKO-Information zu Vertreiber und Letztvertreiber", "vertreiber-ppwr"],
  "Bevollmächtigter": ["WKO-Information zur Bevollmächtigung", "bevollmaechtigter-ppwr"],
  "EPR-Bevollmächtigung im Ausland": ["WKO-Information zur EPR-Bevollmächtigung", "bevollmaechtigter-ppwr"],
  "Fulfilment-Dienstleister": ["WKO-PPWR-Übersicht", "eu-verpackungsverordnung-ppwr"],
  "Endabnehmer oder Sonderfall": ["WKO-PPWR-Übersicht", "eu-verpackungsverordnung-ppwr"]
};

function getRoles() {
  const acts = values("activity");
  const source = values("packagingSource");
  const customers = values("customers");
  const destinations = values("destinations");
  const model = values("crossBorderModel");
  const establishment = values("foreignEstablishment");
  const roles = new Map();
  const add = (name, tag, text) => { if (!roles.has(name)) roles.set(name, { name, tag, text, link: roleLinks[name] }); };

  if (acts.has("brandOwner") || source.has("ownBrand") || source.has("retailMaterial") || (acts.has("physicalProducer") && !source.has("customerBrand"))) {
    add("Erzeuger", "Konformität", "Sie gestalten oder verantworten die Verpackung unter eigenem Namen, lassen sie individuell herstellen oder machen Material erst im Betrieb zur Verpackung. Damit kommen die Konformitätsbewertung, technische Dokumentation und EU-Konformitätserklärung in Betracht.");
  }
  if (acts.has("nonEuImport")) {
    add("Importeur", "Nicht-EU und EWR", "Sie bringen Verpackungen aus einem Drittstaat auf den Unionsmarkt. Nach der aktuellen WKO-Länderübersicht sind auch Bezüge aus Island, Liechtenstein und Norwegen wie Drittlandsimporte zu behandeln, solange die PPWR nicht in das EWR-Abkommen aufgenommen ist.");
  }
  if (acts.has("supply") || source.has("customerBrand") || (acts.has("physicalProducer") && source.has("customerBrand"))) {
    add("Lieferant", "Technische Daten", "Sie liefern Verpackungen oder Material beziehungsweise fertigen unter der Marke und nach Vorgaben eines Kunden. Stellen Sie dem Erzeuger die Daten bereit, die er für seine Konformitätsbewertung benötigt.");
  }
  if (acts.has("resell") || acts.has("neutralTransport") || (acts.has("packFiller") && (source.has("standardB2B") || source.has("reused")))) {
    add("Vertreiber", "Je Verpackung", "Diese Rolle kommt insbesondere für zugekaufte neutrale Standard-Transport- und Versandverpackungen, wiederverwendete Verpackungen oder unverändert weiterverkaufte Waren in Betracht. Prüfen Sie die Angaben von Erzeuger und gegebenenfalls Importeur.");
  }
  if (customers.has("consumers") || customers.has("businessEnd")) {
    add("Letztvertreiber", "Endabgabe", "Sie liefern verpackte Produkte an Endabnehmer. Je nach Verpackung können zusätzlich Rücknahme-, Informations-, Mehrweg- oder Wiederbefüllungspflichten gelten.");
  }
  if (values("firstAustria").has("yes") || values("firstAustria").has("unsure")) {
    add("Hersteller im Sinn der EPR", "Österreich", "Sie stellen Verpackungen möglicherweise erstmals in Österreich bereit. Prüfen Sie Registrierung, Systemteilnahme, Mengenmeldungen und Finanzierung nach den österreichischen EPR-Regeln.");
  }

  const directForeign = destinations.has("eu") && (model.has("directEnd") || model.has("marketplace") || model.has("mixed"));
  if (directForeign && (customers.has("consumers") || customers.has("businessEnd"))) {
    add("Hersteller im Sinn der EPR", "Zielländer", "Bei direkter Lieferung an Endabnehmer in einem anderen EU-Mitgliedstaat können Sie dort Hersteller im Sinn der erweiterten Herstellerverantwortung sein. Die Registrierung und Systemteilnahme sind je Zielland zu prüfen.");
    if (establishment.has("no") || establishment.has("mixed") || establishment.has("unsure")) {
      add("EPR-Bevollmächtigung im Ausland", "Je Zielland", "Ohne Niederlassung im betreffenden Mitgliedstaat ist grundsätzlich ein schriftlich bestellter EPR-Bevollmächtigter im Zielland zu prüfen. Die praktische Umsetzung bleibt national unterschiedlich.");
    }
  }
  if (acts.has("representative")) add("Bevollmächtigter", "Mandat", "Sie übernehmen schriftlich festgelegte Aufgaben für einen Erzeuger oder im Rahmen der erweiterten Herstellerverantwortung. Umfang und Pflichten hängen von der Art des Mandats ab.");
  if (acts.has("fulfilment")) add("Fulfilment-Dienstleister", "Logistik", "Sie erbringen mindestens zwei Fulfilment-Leistungen, ohne Eigentümer der Ware zu sein. Prüfen Sie die besonderen Sorgfalts- und Kooperationspflichten sowie mögliche zusätzliche Rollen.");
  if (!roles.size) add("Endabnehmer oder Sonderfall", "Vertiefung nötig", "Aus den Angaben ergibt sich keine typische Marktrolle. Prüfen Sie die konkrete Verpackung und Lieferkette, bevor Sie von einer Ausnahme ausgehen.");
  return [...roles.values()];
}

function getActions(roles) {
  const names = new Set(roles.map((role) => role.name));
  const props = values("properties");
  const destinations = values("destinations");
  const model = values("crossBorderModel");
  const actions = [];
  const add = (title, text) => actions.push({ title, text });
  add("Verpackungen und Lieferketten erfassen", "Dokumentieren Sie je Verpackungseinheit Material, Gestaltung, Marke, Lieferant, Bezugsland, Vertriebsweg, Zielland sowie Einweg oder Mehrweg.");
  if (names.has("Erzeuger")) add("Konformitätsakte aufbauen", "Prüfen Sie die jeweils anwendbaren Anforderungen der Artikel 5 bis 12 und erstellen Sie technische Dokumentation und EU-Konformitätserklärung nach Anhang VII und VIII.");
  if (names.has("Importeur")) add("Unterlagen vor dem Import absichern", "Fordern Sie EU-Konformitätserklärung und technische Dokumentation an und prüfen Sie Identifikation und Kennzeichnung des Erzeugers vor dem Inverkehrbringen.");
  if (names.has("Lieferant")) add("Technische Datenpakete vereinbaren", "Definieren Sie Materialdaten, Prüfberichte und Nachweise, die Ihre Kunden für ihre Konformitätsbewertung benötigen.");
  if (names.has("Hersteller im Sinn der EPR")) add("EPR je Land prüfen", "Klären Sie Register, PRO beziehungsweise Sammel- und Verwertungssystem, Mengenmeldungen, Finanzierung und Bevollmächtigung getrennt für Österreich und jedes Zielland.");
  if (names.has("Vertreiber") || names.has("Letztvertreiber")) add("Wareneingangs- und Freigabeprüfung ergänzen", "Halten Sie fest, wie Sie Pflichtangaben prüfen und wie Sie bei erkennbarer Nichtkonformität Verkauf, Information und Korrektur steuern.");
  if (destinations.has("eu") && (model.has("foreignReseller") || model.has("mixed"))) add("B2B-Verträge im Zielland prüfen", "Bei Lieferung an einen ausländischen Händler oder Verarbeiter hängt die EPR-Zuordnung vom konkreten Bereitstellungsvorgang ab. Regeln Sie Daten, Registrierung und Kostentragung ausdrücklich.");
  if (destinations.has("eea")) add("EWR-Lieferungen separat behandeln", "Laut WKO-Länderübersicht gilt die PPWR derzeit noch nicht im EWR. Prüfen Sie Island, Liechtenstein und Norwegen nach den dortigen nationalen Regeln; Bezüge in die EU gelten derzeit wie Drittlandsimporte.");
  if (destinations.has("third")) add("Drittstaatenrecht ergänzend prüfen", "Für Ausfuhren außerhalb von EU und EWR gelten die Verpackungs- und EPR-Vorgaben des Ziellands zusätzlich beziehungsweise anstelle der PPWR.");
  if (props.has("food")) add("PFAS- und Lebensmittelkontaktnachweise prüfen", "Seit 12. August 2026 gelten PPWR-Grenzwerte für PFAS in Lebensmittelkontaktverpackungen. Stimmen Sie die Nachweise mit dem Lebensmittelkontaktrecht ab.");
  if (props.has("reusable")) add("Mehrwegkriterien dokumentieren", "Belegen Sie die Kriterien des Artikels 11 und planen Sie Nachweise zu Umläufen, Rücknahme und Wiederaufbereitung.");
  if (props.has("takeaway")) add("Take-away-Prozesse vorbereiten", "Seit 12. Februar 2027 müssen mitgebrachte Behälter ermöglicht werden. Weitere Mehrwegangebote werden ab 12. Februar 2028 relevant.");
  if (props.has("plastic")) add("Rezyklat- und Recyclinganforderungen einplanen", "Prüfen Sie frühzeitig Datenverfügbarkeit und Design, da weitere Anforderungen an Kunststoffverpackungen schrittweise wirksam werden.");
  if (values("micro").has("yes") && (names.has("Erzeuger") || names.has("Hersteller im Sinn der EPR"))) add("Kleinstunternehmens-Ausnahme eng abgrenzen", "Die Erleichterung gilt nicht pauschal. Dokumentieren Sie insbesondere Sitzstaaten, Branding, Auftrag und betroffene Verpackung.");
  return actions;
}

function answerLabel(id) {
  if (id === "countries") return (state.answers.countries || []).map((code) => countries.find((country) => country[0] === code)?.[1]).filter(Boolean).join(", ");
  const question = questions[id];
  return (state.answers[id] || []).map((value) => question.options.find((option) => option[0] === value)?.[1]).filter(Boolean).join("; ");
}

function showResults() {
  const roles = getRoles();
  const actions = getActions(roles);
  $("#result-intro").textContent = `${roles.length} mögliche ${roles.length === 1 ? "Rolle wurde" : "Rollen wurden"} erkannt. Mehrere Rollen können gleichzeitig gelten – zum Beispiel Erzeuger für die gebrandete Produktverpackung und Vertreiber für den neutralen Versandkarton.`;
  $("#role-results").innerHTML = roles.map((role) => {
    const [label, slug] = role.link;
    return `<article class="role-card"><div class="role-top"><h4>${role.name}</h4><span class="role-tag">${role.tag}</span></div><p>${role.text}</p><a class="role-link" href="${WKO_BASE}${slug}" target="_blank" rel="noopener">${label} <span aria-hidden="true">↗</span></a></article>`;
  }).join("");
  $("#action-results").innerHTML = actions.map((action) => `<li><div><strong>${action.title}</strong><p>${action.text}</p></div></li>`).join("");

  const selectedCountries = state.answers.countries || [];
  const countrySection = $("#country-results-section");
  countrySection.hidden = !selectedCountries.length;
  $("#country-results").innerHTML = selectedCountries.map((code) => {
    const [, name, slug] = countries.find((country) => country[0] === code);
    return `<a href="${WKO_BASE}${slug}" target="_blank" rel="noopener"><span>${name}</span><b aria-hidden="true">↗</b></a>`;
  }).join("");

  const active = activeQuestionIds();
  const summaryLabels = {
    activity: "Tätigkeiten", packagingSource: "Verpackung", customers: "Abnehmer", firstAustria: "Österreich",
    destinations: "Auslandsversand", crossBorderModel: "Vertriebsweg", countries: "EU-Zielländer",
    foreignEstablishment: "Niederlassungen", packaging: "Verpackungsarten", properties: "Besonderheiten", micro: "Unternehmensgröße"
  };
  $("#answer-summary").innerHTML = active.map((id) => `<dt>${summaryLabels[id]}</dt><dd>${answerLabel(id)}</dd>`).join("");
  setVisible("results");
  results.scrollIntoView({ behavior: "smooth", block: "start" });
}

$("#start-button").addEventListener("click", startGuide);
$("#restart-button").addEventListener("click", startGuide);
$("#quit-button").addEventListener("click", () => { guide.hidden = true; $("#start").scrollIntoView({ behavior: "smooth" }); });
$("#back-button").addEventListener("click", () => { saveCurrentAnswer(false); state.step = Math.max(0, state.step - 1); renderQuestion(); });
$("#question-form").addEventListener("submit", (event) => {
  event.preventDefault();
  if (!saveCurrentAnswer()) return;
  const active = activeQuestionIds();
  if (state.step < active.length - 1) { state.step += 1; renderQuestion(); }
  else showResults();
});
$("#print-button").addEventListener("click", () => window.print());
