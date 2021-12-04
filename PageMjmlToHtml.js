window.addEventListener("load", () => {
	var copyBtn = document.querySelector(".mjml2html_btn");
	if (copyBtn) {
		copyBtn.addEventListener("click", (e) => {
			e.preventDefault();
			const copyBtnLabel = e.target.innerHTML;
			e.target.innerHTML = e.target.dataset.copying;
			e.target.style.pointerEvents = "none";
			loadPage(
				e.target.href,
				(content) => {
					navigator.clipboard.writeText(content);
					e.target.innerHTML = e.target.dataset.copied;
					setTimeout(() => {
						e.target.innerHTML = copyBtnLabel;
						e.target.style.pointerEvents = "";
					}, 2000);
				},
				() => {
					e.target.innerHTML = copyBtnLabel;
					e.target.style.pointerEvents = "";
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
				if (xhr.responseType) {
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