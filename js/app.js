let imageUrl = [];
let imageName = [];
const imageContainer = document.querySelector(".imageContainer");
const navUl = document.querySelector("#navUl");
const mainBody = document.querySelector("#main-body");
let cats = document.querySelector("#Dogs")
var mybutton = document.getElementById("myBtn");

// Searching for photos from unsplash


//Things that are done

//highlighing section when it is in viewport(using add/remove classlist)
// Dynamic section adding via search for photos
// clicking on navigation link on the nav bar makes it smooth scrolling to the section

// Newly created section has smooth scrolling added to them, but when a new section is added,
//forEach loop runs for all of the lis again, this maybe optimized

// Things left to do.....
// back to top button  appearing when scrolling down

const searchPhotos = () => {
	// imageContainer.innerHTML = "";
	const input = document.querySelector("#search");
	let searchTerm = input.value;
	let newSection = `<section id="${searchTerm}" class="imageContainer">
					 	<h3 class="section-heading">${searchTerm}</h3>
					 `;
	mainBody.innerHTML += newSection;
	let createdSection = document.querySelector(`#${searchTerm}`);
	let clientId = "88i7qHkpW1-r-T3rR0tk7OEwVE4KGDCJD04P_ZLyGYs";
	let url = `http://api.unsplash.com/search/photos/?client_id=${clientId}&query=${searchTerm}`;

	fetch(url)
		.then((response) => response.json())
		.then((datas) =>
			{
				let imageArray = datas.results;
				for (let i = 0; i < 4; i++) {
					let imageDiv = `<div class="card">
									<img
										class = 'responsive'
										src=${imageArray[i].urls.regular}
										alt='${imageArray[i].alt_description}'
										/>
										<h3 class="card-text">${imageArray[i].alt_description}</h3>
									</div>
								`;

					createdSection.innerHTML += imageDiv;
				}
			}
		);
		addNavigation(searchTerm);
		showMessage(searchTerm);
};

function isInViewport(elem) {
	var bounding = elem.getBoundingClientRect();
	return (
		bounding.top >= 0 &&
		bounding.left >= 0 &&
		bounding.bottom <=
			(window.innerHeight || document.documentElement.clientHeight) &&
		bounding.right <=
			(window.innerWidth || document.documentElement.clientWidth)
	);
}

window.onscroll = function(){
	scrollFunction()
	let Sections = document.querySelectorAll('.imageContainer')
	Sections.forEach((section)=> {
		if(isInViewport(section)) {
			section.classList.add("active-section")
		} else {
			section.classList.remove("active-section")
		}
	})
}

function showMessage(term) {
		let message = document.querySelector("#notification");
		message.innerHTML = `Images of ${term} has been added!!`;
		setTimeout(function () {
			console.log(message)
			message.innerHTML = "";
				}, 2000);
		}


function addNavigation(term) {
	let newLi = `<li><a href="#${term}">${term}</a></li>`
	navUl.innerHTML += newLi;
}
// window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}