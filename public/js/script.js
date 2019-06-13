function getMovies() {
	return fetch("http://localhost:3000/movies").then((result) => {
		if (result.status == 200) {
			return Promise.resolve(result.json());
		} else {
			return Promise.reject(null);
		}
	}).then(result =>{
		//Populate into the DOM
		console.log("getMovies "+result);
		result.forEach(movie => {
			createCard(movie);
		})
		return result;
	}).catch(error => {
		console.log(error);
		return error;
	})
}



//Get All Movie API
let getMovieById = function (id) {
	return fetch(`http://localhost:3000/movies?id=${id}`).then((result) => {
		if (result.status == 200) {
			return Promise.resolve(result.json());
		} else {
			return Promise.reject("Error");
		}
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
			return Promise.resolve(result.json());
		} else {
			return Promise.reject("Duplicate data");
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
		//Populate into DOM
		result.forEach(movie => {
			createFavouriteMovieCard(movie);
		})
		return result;
	}).catch(error =>{
		return error
	})

}

function addFavourite(e) {
	getMovieById(this.value).then(selectedMovie => {
		//Push to the Favourites list.
		postMovie(selectedMovie[0]).then(result => {
			console.log("updated successfully");
			let childNode = document.getElementById("favouritesList");
			childNode.innerHTML = '';
			getFavourites();
		}).catch(error => {
				console.log("error", error);
		})
	})
}

function createCard(movie) {
	//Create card
	let div0 = document.createElement("div");
	div0.className = "card w-50 h-25 mb-3";
	div0.style = "width: 18rem;";

	//Image
	let img = document.createElement("img");
	img.className = "card-img-top";
	img.src =  movie.img;
	img.alt = "Card image cap";

	//card body
	let div1 = document.createElement("div");
	div1.className = "card-body h-10";

	//H5
	let h5 = document.createElement("h5");
	h5.className = "card-title";
	h5.textContent = movie.name;

	//H6
	let h6 = document.createElement("h6");
	h6.className = "card-title";
	h6.textContent = "Rating: " + movie.rating;

	//Button
	let button = document.createElement("button");
	button.className = "btn btn-primary";
	button.textContent = "Add Favourites";
	button.id = movie.id;
	button.value = movie.id;
	button.addEventListener("click", addFavourite)
	
	div1.appendChild(h5);
	div1.appendChild(h6);
	div1.appendChild(button);
	div0.appendChild(img);
	div0.appendChild(div1);

	document.getElementById("moviesList").appendChild(div0);

}

function createFavouriteMovieCard(movie) {
	//Create card
	let div0 = document.createElement("div");
	div0.className = "card w-50 mb-3";
	div0.style = "width: 18rem;";

	//Image
	let img = document.createElement("img");
	img.className = "card-img-top";
	img.src = movie.posterPath;
	img.alt = "Card image cap";

	//card body
	let div1 = document.createElement("div");
	div1.className = "card-body";

	//H5
	let h5 = document.createElement("h5");
	h5.className = "card-title";
	h5.textContent = movie.name;

	div1.appendChild(h5);
	div0.appendChild(img);
	div0.appendChild(div1);

	document.getElementById("favouritesList").appendChild(div0);
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


