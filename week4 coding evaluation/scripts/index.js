// Ude Import export (MANDATORY)
// Onclicking store the news in local storage with key "news" so that you can access that on news.html page

import { navbar } from "../components/navbar.js";

let navbar1 = document.getElementById("navbar");
navbar1.innerHTML = navbar();
let country;
let sideFetch = async (country) => {
	let res = await fetch(
		`https://masai-mock-api.herokuapp.com/news/top-headlines?country=${country}`
	);
	let data = await res.json();
	return data;
};

let append = (data) => {
	let resultdiv = document.getElementById("results");
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
		div.append(img, title, description);
		resultdiv.append(div);
		div.addEventListener("click", function () {
			newsPageFn(el);
		});
		// console.log(el.urlToImage, "11111", el.title);
	});
};

let localnews = [];
function newsPageFn(el) {
	localnews.push(el);
	localStorage.setItem("news", JSON.stringify(localnews));
	window.location.href = "news.html";
}

function cSearchCount(country) {
	if (this) {
		country = this.id || "in";

		console.log(country);
	}

	sideFetch(country).then((data) => {
		let data1 = data.articles;
		console.log(data1);
		append(data1);
	});
	// let sideUrl = `https://masai-mock-api.herokuapp.com/news/top-headlines?country=${country}`
	// let res = fetch(sideUrl)
}

let sidebar = document.getElementById("sidebar").children;

for (let country of sidebar) {
	country.addEventListener("click", cSearchCount);
}

cSearchCount("in");

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
