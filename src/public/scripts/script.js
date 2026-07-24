const pollTemplate = document.getElementById("poll-template");
const pollContainer = document.getElementById("poll-container");

function createPollOption(content) {
	const optionEl = document.createElement("div");
	optionEl.classList.add("option");

	const optionPercentEl = document.createElement("div");
	optionPercentEl.classList.add("option-percent");
	optionPercentEl.innerText = "0%";

	const optionContentEl = document.createElement("div");
	optionContentEl.classList.add("option-content");
	optionContentEl.innerText = content;

	const optionRadioEl = document.createElement("div");
	optionRadioEl.classList.add("icon");
	optionRadioEl.classList.add("radio-icon");
	optionRadioEl.setAttribute("data-src", "assets/radio.svg")

	optionEl.appendChild(optionPercentEl);
	optionEl.appendChild(optionContentEl);
	optionEl.appendChild(optionRadioEl);

	return optionEl;
}

function createPoll(metadata) {
	const clone = pollTemplate.content.cloneNode(true);
	const poll = clone.querySelector('.poll');

	poll.removeAttribute("id");
	
	const titleEl = poll.querySelector(".poll-title");
	titleEl.innerText = metadata.title;

	const optionArray = [];
	const optionsParentEl = poll.querySelector(".poll-options");
	optionsParentEl.innerHTML = "";
	metadata.options.forEach(option => {
		const optionEl = createPollOption(option.value);

		optionEl.addEventListener("click", () => {
			optionArray.forEach(currentOption => {
				const currentRadioIcon = currentOption.querySelector("div.radio-icon");
				const isCurrentChecked = (currentOption == optionEl);
				const currentIconSrc = isCurrentChecked ? "assets/radio-checked.svg" : "assets/radio.svg";
				currentRadioIcon.setAttribute("data-src", currentIconSrc);
				loadSVGIconFor(currentRadioIcon);
			})
		})

		optionArray.push(optionEl);
		optionsParentEl.appendChild(optionEl);
	});

	return poll;
}

async function handleFetchPoll(uuid){
	const request = await fetch(`/polls/${uuid}`);
	const result = await request.json();

	if(result.status != 'ok') throw new Error(`Cannot get poll with uuid:${uuid}`);

	pollContainer.appendChild(createPoll(result.data));
}

handleFetchPoll('1');

async function loadSVGIconFor(iconEl) {
	const src = iconEl.getAttribute('data-src');
	const response = await fetch(src);
	const svgContent = await response.text();
	
	const parser = new DOMParser();
	const docSvg = parser.parseFromString(svgContent, 'image/svg+xml');
	const loadedSvg = docSvg.documentElement;
	
	iconEl.innerHTML = loadedSvg.outerHTML;
	iconEl.setAttribute('viewBox', loadedSvg.getAttribute('viewBox'));
}

function loadSVGIcons() {
	const iconsArray = document.querySelectorAll("div.icon[data-src]");

	iconsArray.forEach(loadSVGIconFor);
}

loadSVGIcons();