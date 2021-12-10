window.addEventListener("load", function() {
	if(typeof Promise !== "function") return;
	const copyBtn = document.querySelector(".mjml2html_btn");
	if (copyBtn) {
		copyBtn.addEventListener("click", (e) => {
			e.preventDefault();
			const copyBtnLabel = copyBtn.innerHTML;
			copyBtn.innerHTML = copyBtn.dataset.copying;
			copyBtn.style.pointerEvents = "none";
			loadPage(copyBtn.href)
				.then((content) => {
					copyTextToClipboard(content)
						.then(() => copyBtn.innerHTML = copyBtn.dataset.copied)
						.catch(() => copyBtn.innerHTML = copyBtn.dataset.error)
						.finally(() => {
							setTimeout(() => {
								copyBtn.innerHTML = copyBtnLabel;
								copyBtn.style.pointerEvents = "";
							}, 2000);
						});
				})
				.catch(() => {
					copyBtn.innerHTML = copyBtnLabel;
					copyBtn.style.pointerEvents = "";
				});
		});
	}
	function loadPage(url) {
		return new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest();
			xhr.addEventListener('readystatechange', (e) => {
				if (xhr.readyState === XMLHttpRequest.DONE) {
					if (xhr.status === 0 || (xhr.status >= 200 && xhr.status < 400)) {
						if (xhr.responseType === "json") {
							xhr.responseText = JSON.parse(xhr.responseText);
						}
						resolve(xhr.responseText);
					} else {
						reject();
					}
				}
			});
			xhr.open('GET', url, true);
			xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
			xhr.send();
		});
	}
	// https://stackoverflow.com/a/30810322
	function copyTextToClipboard(text) {
		return new Promise((resolve, reject) => {
			if (!navigator.clipboard) {
				if (fallbackCopyTextToClipboard(text)) {
					resolve();
				} else {
					reject();
				}
			} else {
				navigator.clipboard.writeText(text)
					.then(() => resolve())
					.catch((err) => {
						console.error("Could not copy text: ", err);
						reject();
					});
			}
		});
	}
	function fallbackCopyTextToClipboard(text) {
		const textArea = document.createElement("textarea");
		textArea.value = text;
		textArea.style.top = "0";
		textArea.style.left = "0";
		textArea.style.position = "fixed";
		document.body.appendChild(textArea);
		textArea.focus();
		textArea.select();
		let success = true;
		try {
			var command = document.execCommand("copy");
			if (!command) {
				console.log("An error occured using the copying text command");
				success = false;
			}
		} catch (err) {
			console.error("Could not copy text: ", err);
			success = false;
		}
		document.body.removeChild(textArea);
		return success;
	}
});