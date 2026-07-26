
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
			option.percent = 0;
			
			optionEl.addEventListener("click", this.handleRadioClick.bind(this, option))
			this.updateRadioState(option);
		});
	}

	updateRadioState(option) {
		const radioIconEl = option.element.querySelector(".radio-icon");
		const radioIconActiveEl = option.element.querySelector(".radio-icon-active");

		if(option.checked) {
			radioIconEl.style.display = "none";
			radioIconActiveEl.style.display = "block";
		} 
		else {
			radioIconEl.style.display = "block";
			radioIconActiveEl.style.display = "none";
		}
		
		const radioBarEl = option.element.querySelector(".option-bar");
		radioBarEl.style.width = `${option.percent}%`;

		const radioPercentEl = option.element.querySelector(".option-percent");
		radioPercentEl.innerText = `${option.percent}%`;
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