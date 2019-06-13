
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
		console.log("getMovies " + JSON.stringify(result));
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
		//Populate into the DOM
		console.log("getFavourites " + JSON.stringify(result));
		createFavouriteList(result);
		return result;
	}).catch(error => {
		console.log(error);
		return error;
	})
}

//Post Movie API
let postFavourites = function (favItem) {
	console.log("favItem "+favItem);
	return fetch("http://localhost:3000/favourites", {
		method: 'POST',
		body: JSON.stringify(favItem),
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json'
		}
	}).then((result) => {
		if (result.status == 201) {
			return Promise.resolve(result.json());
		} else {
			return Promise.reject("Duplicate data");
		}
	})
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
		onclick="addFavourites(${element.id})" type="button" class="btn btn-dark">
		Add to Favourites
		</button>
		</div>
		`;
	});
	document.getElementById("moviesList").innerHTML = domMovieList;
}

const getMovieById = (id) =>{
	movieItems.forEach(element=>{
		if(element.id === id){
		return element;
		}
	});
	return null;
}

function addFavourites(id) {
	console.log("addFavourites " + id);
	if (!isMoviePresentInFavourites(id)) {
		postFavourites(getMovieById(id)).then(result => {
			console.log("updated successfully");
			let childNode = document.getElementById("favouritesList");
			childNode.innerHTML = '';
			getFavourites();
		}).catch(error => {
			console.log("error", error);
		})
	}
}

const isMoviePresentInFavourites = (id) => {
	console.log(JSON.stringify("favItems" + favItems));
	favItems.forEach(element => {
		if (element.id === id) {
			return true;
		}
	})
	return false;
}

const createFavouriteList = (favouriteResponse) => {
	favItems = favouriteResponse;
	let domFavouriteList = '';
	favouriteResponse.forEach(element => {
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


// module.exports = {
// 	getMovies,
// 	getFavourites,
// 	addFavourite
// };

// You will get error - Uncaught ReferenceError: module is not defined
// while running this script on browser which you shall ignore
// as this is required for testing purposes and shall not hinder
// it's normal execution


