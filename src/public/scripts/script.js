const pollTemplate = document.getElementById("poll-template");
const pollContainer = document.getElementById("poll-container");

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
	constructor(options) {
		this.options = options;
		this.init();
	}

	init() {
		this.options.forEach(option => {
			const optionEl = createPollOption(option);
			option.element = optionEl;
			
			optionEl.addEventListener("click", this.handleRadioClick.bind(this, option))
			this.updateRadioState(option);
		});
	}

	updateRadioState(option) {
		const radioIcon = option.element.querySelector(".radio-icon");
		const radioIconActive = option.element.querySelector(".radio-icon-active");

		if(option.checked) {
			radioIcon.style.display = "none";
			radioIconActive.style.display = "block";
		} 
		else {
			radioIcon.style.display = "block";
			radioIconActive.style.display = "none";
		}
		

		const radioBar = option.element.querySelector(".option-bar");
		radioBar.style.width = `${option.percent}%`;
	}

	handleRadioClick(option) {
		for(let i = 0; i<this.options.length; i++) {
			const currentOption = this.options[i];
			const isChecked = (currentOption.id == option.id);

			this.options[i].checked = isChecked;
			this.options[i].percent = isChecked ? 100 : 0;
			this.updateRadioState(this.options[i])
		}
	}
}