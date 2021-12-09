window.addEventListener("load", () => {
	const copyBtn = document.querySelector(".mjml2html_btn");
	if (copyBtn) {
		let timeout;
		copyBtn.addEventListener("click", (e) => {
			e.preventDefault();
			const copyBtnLabel = copyBtn.innerHTML;
			copyBtn.innerHTML = copyBtn.dataset.copying;
			copyBtn.style.pointerEvents = "none";
			loadPage(
				copyBtn.href,
				(content) => {
					copyTextToClipboard(content);
					copyBtn.innerHTML = copyBtn.dataset.copied;
					timeout = setTimeout(() => {
						copyBtn.innerHTML = copyBtnLabel;
						copyBtn.style.pointerEvents = "";
					}, 2000);
				},
				() => {
					copyBtn.innerHTML = copyBtnLabel;
					copyBtn.style.pointerEvents = "";
				}
			);
		});
	}
});
function loadPage(url, callback, error) {
	const xhr = new XMLHttpRequest();
	xhr.addEventListener('readystatechange', (e) => {
		if (xhr.readyState === XMLHttpRequest.DONE) {
			if (xhr.status === 0 || (xhr.status >= 200 && xhr.status < 400)) {
				if (xhr.responseType === "json") {
					xhr.responseText = JSON.parse(xhr.responseText);
				}
				callback(xhr.responseText);
			} else {
				error();
			}
		}
	});
	xhr.open('GET', url, true);
	xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
	xhr.send();
}
// https://stackoverflow.com/a/30810322
function fallbackCopyTextToClipboard(text) {
	const textArea = document.createElement("textarea");
	textArea.value = text;
	textArea.style.top = "0";
	textArea.style.left = "0";
	textArea.style.position = "fixed";
	document.body.appendChild(textArea);
	textArea.focus();
	textArea.select();
	try {
		var successful = document.execCommand('copy');
		var msg = successful ? 'successful' : 'unsuccessful';
		console.log('Fallback: Copying text command was ' + msg);
	} catch (err) {
		console.error('Fallback: Oops, unable to copy', err);
	}
	document.body.removeChild(textArea);
}
function copyTextToClipboard(text) {
	if (!navigator.clipboard) {
		fallbackCopyTextToClipboard(text);
		return;
	}
	navigator.clipboard.writeText(text).then(function() {
		console.log('Async: Copying to clipboard was successful!');
	}, function(err) {
		console.error('Async: Could not copy text: ', err);
	});
}