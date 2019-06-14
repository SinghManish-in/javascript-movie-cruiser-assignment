let movieList;
let favMovieList;
let selectedMovie;

function getMovies() {
	return fetch("http://localhost:3000/movies").then((result) => {
		if (result.status == 200) {
			return Promise.resolve(result.json());
		} else {
			return Promise.reject("Unable to retrieve the movie list");
		}
	}).then(resultMovie => {
		movieItems = resultMovie;
		//Populate into the DOM
		createMovieList();
		return movieItems;
	}).catch(error => {
		throw new Error(error);
	})
}


//Post Movie API
let postMovie = function (myMovie) {
	return fetch("http://localhost:3000/favourites", {
		method: 'POST',
		body: JSON.stringify(myMovie),
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json'
		}
	}).then((result) => {
		if (result.status == 201) {
			return Promise.resolve(favMovieList);
		} else {
			return Promise.reject("Movie is already added to favourites");
		}
	})
}


//Get the Favourites Movie list
function getFavourites() {
	//API call
	return fetch("http://localhost:3000/favourites").then((result) => {
		if (result.status == 200) {
			return Promise.resolve(result.json());
		} else {
			return Promise.reject("Error");
		}
	}).then(result => {
		favMovieList = result;
		populateFavouriteMovieList(favMovieList);
		return result;
	}).catch(error => {
		throw new Error(error);
	})

}

function populateFavouriteMovieList(favMovieList) {
	let childNode = document.getElementById("favouritesList");
	childNode.innerHTML = '';
	//Populate into DOM
	createFavouriteList();
}
function addFavouriteHandler(e) {
	addFavourite(this.value)
}

function addFavourite(selectedId) {
	if (!findDuplicate(selectedId)) {
		let movieObject = getMovieObject(selectedId)
		favMovieList.push(movieObject);
		//Add Favourite call
		return fetch("http://localhost:3000/favourites", {
			method: 'POST',
			body: JSON.stringify(movieObject),
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			}
		}).then((result) => {
			if (result.status == 200 || result.status == 201) {
				return Promise.resolve(favMovieList);
			} else {
				return Promise.reject("Movie is already added to favourites");
			}
		}).then((favMovieResult) => {
			populateFavouriteMovieList(favMovieResult);
			return favMovieResult;
		}).catch(err => {
			throw new Error(err);
		})

	} else {
		throw new Error("Movie is already added to favourites");
	}

}

function findDuplicate(selectedMovieId) {
	for (let favmovie in favMovieList) {
		if (selectedMovieId == favMovieList[favmovie].id) {
			return true;
		}
	}
	return false;
}

function getMovieObject(selectedMovieId) {
	for (let movie in movieItems) {
		if (selectedMovieId == movieItems[movie].id) {
			return movieItems[movie];
		}
	}
}

const createMovieList = () => {
	let domMovieList = '';
	movieItems.forEach(element => {
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
	favMovieList.forEach(element => {
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



