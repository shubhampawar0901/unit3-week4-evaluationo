// Ude Import export (MANDATORY)
import { navbar } from "../components/navbar.js";

let navbar1 = document.getElementById("navbar");
navbar1.innerHTML = navbar();

let newsdata = JSON.parse(localStorage.getItem("news"));
console.log(newsdata);

let append = (data) => {
	let resultdiv = document.getElementById("detailed_news");
	resultdiv.innerHTML = null;
	data.forEach((el) => {
		let div = document.createElement("div");
		div.id = "news_div";
		let img = document.createElement("img");
		img.id = "img";
		img.src = el.urlToImage;

		let title = document.createElement("h3");
		title.id = "title";
		title.innerText = el.title;

		let content = document.createElement("p");
		content.id = "content";
		content.innerText = el.content;

		let description = document.createElement("p");
		description.id = "description";
		description.innerText = el.description;
		div.append(img, title, description, content);
		resultdiv.append(div);
		// console.log(el.urlToImage, "11111", el.title);
	});
};

append(newsdata);
let sr = [];
let inpFn = (e) => {
	if (e.key == "Enter") {
		let searchIp = document.getElementById("search_input").value;
		sr.push(searchIp);
		localStorage.setItem("searchIp", sr);
		window.location.href = "search.html";
	}
};

let inp = document.getElementById("search_input");

inp.addEventListener("keydown", inpFn);
