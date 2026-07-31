const pollTemplate = document.getElementById("poll-template");
const pollContainer = document.getElementById("poll-container");

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

	const btnVote = poll.querySelector("button.vote");
	btnVote.addEventListener("click", function handleButtonVote() {
		console.log("casted vote");
		handleVote("1", "1");
	});

	return poll;
}

async function handleFetchPoll(uuid) {
	const request = await fetch(`/api/polls/${uuid}`);
	const result = await request.json();

	if(result.status != 'ok') throw new Error(`Cannot get poll with uuid:${uuid}`);

	pollContainer.appendChild(createPoll(result.data));
}

async function handleVote(uuid, optionId) {
	const request = await fetch(`/api/polls/vote`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				uuid, optionId
			})
		}
	);
	const result = await request.json();
	if(result.status != 'ok') throw new Error(`Cannot get poll with uuid:${uuid}`);

	console.log("ok");
}

async function loadSVGIconFor(iconEl, callback = (()=>{})) {
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
routerInit();