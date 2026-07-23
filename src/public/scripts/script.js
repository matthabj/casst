function loadSVGIcons() {
	const iconsArray = document.querySelectorAll("div.icon[data-src]");

	iconsArray.forEach(async iconEl => {
		const src = iconEl.getAttribute('data-src');
		const response = await fetch(src);
		const svgContent = await response.text();
		
		const parser = new DOMParser();
		const docSvg = parser.parseFromString(svgContent, 'image/svg+xml');
		const loadedSvg = docSvg.documentElement;
		
		iconEl.innerHTML = svgContent;
		iconEl.setAttribute('viewBox', loadedSvg.getAttribute('viewBox'));
	});
}

loadSVGIcons();