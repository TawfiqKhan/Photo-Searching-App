const imageContainer = document.querySelector(".imageContainer");
const navUl = document.querySelector("#navUl");
const mainBody = document.querySelector("#main-body");
var mybutton = document.getElementById("myBtn");

const searchPhotos = () => {
	const input = document.querySelector("#search");
	let searchTerm = input.value;
	//Creating new Section based on used input in the search box
	let newSection = `<section id="${searchTerm}" class="imageContainer" tabindex="0">
					 	<h3 class="section-heading">${searchTerm}</h3>
					 `;
	mainBody.innerHTML += newSection;
	// Grabbing the newly created section for later appending of child element into it
	let createdSection = document.querySelector(`#${searchTerm}`);
	// Credentials for unsplash api
	let clientId = "88i7qHkpW1-r-T3rR0tk7OEwVE4KGDCJD04P_ZLyGYs";
	let url = `http://api.unsplash.com/search/photos/?client_id=${clientId}&query=${searchTerm}`;

	fetch(url)
		.then((response) => response.json())
		.then((datas) => {
			let imageArray = datas.results;
			for (let i = 0; i < 4; i++) {
				// From the fetched Array creating Div with image and image title in the form of h3
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
		});
	// After appneding the Divs now adding corresponding section link in the navigation menu
	addNavigation(searchTerm);
	// Short display of Success Message
	showMessage(searchTerm);
};

window.onscroll = function () {
	// running back to top button handler function
	scrollFunction();
	// grabbing all the imagecontainer section
	let Sections = document.querySelectorAll(".imageContainer");
	// looping through each section to check if they are in viewport
	Sections.forEach((section) => {
		if (isInViewport(section)) {
			//if a section is in viewport adding active class to them
			section.classList.add("active-section");
		} else {
			section.classList.remove("active-section");
		}
	});
};

// Function to check if an element is in viewport
function isInViewport(elem) {
	var bounding = elem.getBoundingClientRect();
	// returning true or false
	return (
		bounding.top >= 0 &&
		bounding.left >= 0 &&
		bounding.bottom <=
			(window.innerHeight || document.documentElement.clientHeight) &&
		bounding.right <=
			(window.innerWidth || document.documentElement.clientWidth)
	);
}

//Function that handles the displaying of success message

function showMessage(term) {
	let message = document.querySelector("#notification");
	message.innerHTML = `Images of ${term} has been added!!`;
	setTimeout(function () {
		console.log(message);
		message.innerHTML = "";
	}, 2000);
}

//function to add new link in the menu
function addNavigation(term) {
	let newLi = `<li><a href="#${term}">${term}</a></li>`;
	navUl.innerHTML += newLi;
}


// Function for handingling the back to top button's display
function scrollFunction() {
	if (
		document.body.scrollTop > 20 ||
		document.documentElement.scrollTop > 20
	) {
		mybutton.style.display = "block";
	} else {
		mybutton.style.display = "none";
	}
}

function topFunction() {
	document.body.scrollTop = 0;
	document.documentElement.scrollTop = 0;
}
