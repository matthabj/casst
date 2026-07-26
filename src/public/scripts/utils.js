function createPollOption(metadata) {
	const optionEl = document.createElement("button");
	optionEl.classList.add("option");

	const optionPercentEl = document.createElement("div");
	optionPercentEl.classList.add("option-percent");
	optionPercentEl.innerText = "0%";

	const optionPercentBarEl = document.createElement("div");
	optionPercentBarEl.classList.add("option-bar");

	const optionContentEl = document.createElement("div");
	optionContentEl.classList.add("option-content");
	optionContentEl.innerText = metadata.value;

	const optionRadioEl = document.createElement("div");
	optionRadioEl.classList.add("icon");
	optionRadioEl.classList.add("radio-icon");
	optionRadioEl.setAttribute("data-src", "assets/radio.svg")
	loadSVGIconFor(optionRadioEl);

	const optionRadioActiveEl = document.createElement("div");
	optionRadioActiveEl.classList.add("icon");
	optionRadioActiveEl.classList.add("radio-icon-active");
	optionRadioActiveEl.setAttribute("data-src", "assets/radio-checked.svg")
	loadSVGIconFor(optionRadioActiveEl);

	optionEl.appendChild(optionPercentEl);
	optionEl.appendChild(optionPercentBarEl);
	optionEl.appendChild(optionContentEl);
	optionEl.appendChild(optionRadioEl);
	optionEl.appendChild(optionRadioActiveEl);

	return optionEl;
}