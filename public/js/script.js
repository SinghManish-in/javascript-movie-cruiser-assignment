
let movieItems;
let favItems;

function getMovies() {
	return fetch("http://localhost:3000/movies").then((result) => {
		if (result.status == 200) {
			return Promise.resolve(result.json());
		} else {
			return Promise.reject(null);
		}
	}).then(result => {
		//Populate into the DOM
		createMovieList(result);
		return result;
	}).catch(error => {
		console.log(error);
		return error;
	})
}

//Get the Favourites Movie list 
function getFavourites() {
	return fetch("http://localhost:3000/favourites").then((result) => {
		if (result.status == 200) {
			return Promise.resolve(result.json());
		} else {
			return Promise.reject(null);
		}
	}).then(result => {
		favItems = result;
		//Populate into the DOM
		createFavouriteList();
		return result;
	}).catch(error => {
		console.log(error);
		return error;
	})
}

//Post Movie API
let postFavourites = function (favItem) {
	return fetch("http://localhost:3000/favourites", {
		method: 'POST',
		body: JSON.stringify(favItem),
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json'
		}
	}).then((result) => {
		if (result.status == 201) {
			favItems.push(favItem);
			return Promise.resolve(result.json());
		} else {
			return Promise.reject("Duplicate data");
		}
	})
}

function addFavourite(id) {
	if (!isMoviePresentInFavourites(id)) {
		return postFavourites(getMovieById(id)).then(result => {
			document.getElementById("favouritesList").innerHTML = '';
			createFavouriteList();
		}).catch(error => {
			console.log("error", error);
		})
	}
}

const getMovieById = (id) =>{
	var response = {};
	movieItems.forEach(element=>{
		if(element.id == id){
			response = element;
		}
	});
	return response;
}



const isMoviePresentInFavourites = (id) => {
	let isMoviePresent = false;
	favItems.forEach(element => {
		if (element.id == id) {
			isMoviePresent = true;
		}
	})
	return isMoviePresent;
}

const createMovieList = (movieResponse) => {
	movieItems = movieResponse;
	let domMovieList = '';
	movieResponse.forEach(element => {
		domMovieList = domMovieList + `
		<div id="${element.id}" class="list-group-item d-flex flex-column align-items-center">
		<h6>${element.title}</h6>
		<img src="${element.posterPath}" class="img-fluid pb-2" alt="Responsive image">
		<p>Year: <span id="year">${element.releaseDate}</span></p>
		<button
		onclick="addFavourite(${element.id})" type="button" class="btn btn-dark">
		Add to Favourites
		</button>
		</div>
		`;
	});
	document.getElementById("moviesList").innerHTML = domMovieList;
}

const createFavouriteList = () => {
	let domFavouriteList = '';
	favItems.forEach(element => {
		domFavouriteList = domFavouriteList + `
		<div id="${element.id}" class="list-group-item d-flex flex-column align-items-center">
		<h6>${element.title}</h6>
		<img src="${element.posterPath}" class="img-fluid pb-2" alt="Responsive image">
		<p>Year: <span id="year">${element.releaseDate}</span></p>
		</div>
		`;
	});
	document.getElementById("favouritesList").innerHTML = domFavouriteList;
}


module.exports = {
	getMovies,
	getFavourites,
	addFavourite
};


