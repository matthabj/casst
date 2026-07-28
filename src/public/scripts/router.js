const paths = window.location.pathname.split('/');
paths.shift();

function pathAt(index) {
	return paths[index];
}

function routerInit() {
	if(paths.length <= 0) return;

	const basePath = pathAt(0);

	if(basePath == "polls") {
		if(paths.length !== 2) return;

		const uuid = pathAt(1);
		console.log(`Fetching poll ${uuid}`);
		handleFetchPoll(uuid);
		return;
	}
}