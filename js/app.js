let imageUrl = [];
let imageName = [];
const imageContainer = document.querySelector('.imageContainer')

// Searching for photos from unsplash
const searchPhotos = () => {
	imageContainer.innerHTML =""
	const input = document.querySelector("#search");
	let searchTerm = input.value;
	let clientId = "88i7qHkpW1-r-T3rR0tk7OEwVE4KGDCJD04P_ZLyGYs";
	let url = `http://api.unsplash.com/search/photos/?client_id=${clientId}&query=${searchTerm}`;

	fetch(url)
		.then((response) => response.json())
		.then((datas) => {
			datas.results.forEach(data=> {

				//creating image hrf and alt description from unsplash returned data
				//the appending the image (<img />) tage to the DIV

				let image = `<img class = 'responsive' src=${data.urls.regular} alt='${data.alt_description}' />`
				imageContainer.innerHTML += image
			})
			// console.log(datas)
		}
		);



};
