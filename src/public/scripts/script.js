const pollTemplate = document.getElementById("poll-template");
const pollContainer = document.getElementById("poll-container");

function createPollOption(metadata) {
	const optionEl = document.createElement("button");
	optionEl.classList.add("option");

	const optionPercentEl = document.createElement("div");
	optionPercentEl.classList.add("option-percent");
	optionPercentEl.innerText = "0%";

	const optionContentEl = document.createElement("div");
	optionContentEl.classList.add("option-content");
	optionContentEl.innerText = metadata.value;

	const optionRadioEl = document.createElement("div");
	optionRadioEl.classList.add("icon");
	optionRadioEl.classList.add("radio-icon");
	optionRadioEl.setAttribute("data-src", "assets/radio-checked.svg")
	loadSVGIconFor(optionRadioEl, function afterRadioLoads() {
		const optionRadioMiddle = optionRadioEl.querySelector("path.middle");
		optionRadioMiddle.style.display = "none";
	});
	

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

	const optionsParentEl = poll.querySelector(".poll-options");
	optionsParentEl.innerHTML = "";

	const radioGroup = new RadioGroup(metadata.options);

	radioGroup.options.forEach(option => {
		optionsParentEl.appendChild(option.element);
	})

	// metadata.options.forEach(option => {
	// 	const optionEl = createPollOption(option.value);

	// 	optionEl.addEventListener("click", function handleRadioSelect() {
	// 		optionArray.forEach(currentOption => {
	// 			const currentRadioIcon = currentOption.querySelector("div.radio-icon");
	// 			const isCurrentChecked = (currentOption == optionEl);
	// 			const optionRadioMiddle = currentRadioIcon.querySelector("path.middle");
	// 			optionRadioMiddle.style.display = isCurrentChecked ? "block" : "none";
	// 		})
	// 	})

	// 	optionArray.push(optionEl);
	// 	optionsParentEl.appendChild(optionEl);
	// });

	return poll;
}

async function handleFetchPoll(uuid){
	const request = await fetch(`/polls/${uuid}`);
	const result = await request.json();

	if(result.status != 'ok') throw new Error(`Cannot get poll with uuid:${uuid}`);

	pollContainer.appendChild(createPoll(result.data));
}

handleFetchPoll('1');

async function loadSVGIconFor(iconEl, callback = ()=>{}) {
	const src = iconEl.getAttribute('data-src');
	const response = await fetch(src);
	const svgContent = await response.text();
	
	const parser = new DOMParser();
	const docSvg = parser.parseFromString(svgContent, 'image/svg+xml');
	const loadedSvg = docSvg.documentElement;
	
	iconEl.innerHTML = loadedSvg.outerHTML;
	iconEl.setAttribute('viewBox', loadedSvg.getAttribute('viewBox'));

	callback();
}

function loadSVGIcons() {
	const iconsArray = document.querySelectorAll("div.icon[data-src]");

	iconsArray.forEach(loadSVGIconFor);
}

loadSVGIcons();


class RadioGroup
{
	constructor(options, type="single") {
		this.options = options;
		this.init();
	}

	init() {
		this.options.forEach(option => {
			const optionEl = createPollOption(option);
			option.element = optionEl;
			
			optionEl.addEventListener("click", this.handleRadioClick.bind(this, optionEl))
		});
	}

	updateRadioState(option) {
		const radioMiddle = option.element.querySelector("path.middle");
		radioMiddle.style.display = option.checked ? "block" : "none";
	}

	handleRadioClick(optionEl) {
		for(let i = 0; i<this.options.length; i++) {
			const currentOption = this.options[i];
			const isChecked = (currentOption.element == optionEl);

			this.options[i].checked = isChecked;
			this.updateRadioState(this.options[i])
		}
	}
}