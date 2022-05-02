// Ude Import export (MANDATORY)
// Onclicking store the news in local storage with key "news" so that you can access that on news.html page
import { navbar } from "../components/navbar.js";

let navbar1 = document.getElementById("navbar");
navbar1.innerHTML = navbar();

let append = (data) => {
	let resultdiv = document.getElementById("results");
	resultdiv.innerHTML = null;
	data.forEach((el) => {
		let div = document.createElement("div");
		div.setAttribute("class", "results");

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
		div.append(img, title, description);
		resultdiv.append(div);
		div.addEventListener("click", function () {
			newsPageFn(el);
		});
		// console.log(el.urlToImage, "11111", el.title);
	});
};

// append();

let sideFetch = async () => {
	let query = localStorage.getItem("searchIp");
	// console.log(query);
	let url = `https://masai-mock-api.herokuapp.com/news?q=${query}`;
	let res = await fetch(url);
	let data = await res.json();

	let data1 = data.articles;

	append(data1);
};

sideFetch();

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
