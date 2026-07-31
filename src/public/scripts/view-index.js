const formCreatePoll = document.querySelector(".form-create-poll");

function handleFormCreatePoll(e) {
	e.preventDefault();

	const pollTitle = formCreatePoll.querySelector("input.poll-title").value;
	
	const pollOptions = [];
	formCreatePoll.querySelectorAll("input.poll-option").forEach(optionInput => {
		pollOptions.push(optionInput.value);
	});

	console.log(pollTitle, pollOptions);
}

formCreatePoll.addEventListener("submit", handleFormCreatePoll);