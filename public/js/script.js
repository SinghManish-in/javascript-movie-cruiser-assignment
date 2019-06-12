function getMovies() {
	console.log("getMovies");
	var request = new XMLHttpRequest();
	request.onload = requestListener;
	request.onerror = requestError;
	request.open('get', 'movies', true);
	request.send();
}

function getMoviesById(id) {
	var url = "movies/" + id;
	var request = new XMLHttpRequest();
	request.onload = requestListener1;
	request.onerror = requestError;
	request.open('get', url, true);
	request.send();
}

function postAjax(url, data, success) {
    var params = typeof data == 'string' ? data : Object.keys(data).map(
            function(k){ return encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) }
        ).join('&');

    var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
    xhr.open('POST', url);
    xhr.onreadystatechange = function() {
        if (xhr.readyState>3 && xhr.status==200) { success(xhr.responseText); }
    };
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(params);
    return xhr;
}


function getFavourites() {

}

function addFavourite(data) {
	console.log("addFavourite "+data.image)
	postAjax("favourites",data,true);
}

function requestListener1() {
	var data = JSON.parse(this.responseText);
	console.log(data);
	addFavourite(data);
}

function requestListener() {
	var data = JSON.parse(this.responseText);
	console.log("data " + JSON.stringify(data[0].id));
	for (var i = 0; i < data.length; i++) {
		$('<div id ="MS_' + data[i].id + '" class="card item" ><img src="' + data[i].image + '"alt="don"><div class="card-body"><a href="#" class="btn btn-primary" style="width:100%;" onclick="test(' + data[i].id + ')">Add to favorite</a></div><div class="carousel-caption"></div></div>').appendTo('.carousel-inner');
		$('<li data-target="#carousel-example-generic" data-slide-to="' + i + '"></li>').appendTo('.carousel-indicators')

	}
	$('.item').first().addClass('active');
	$('.carousel-indicators > li').first().addClass('active');
	$('#carousel-example-generic').carousel();

	console.log(data);
}

function requestError(error) {
	console.log('We have an issue', error);
}

$(document).ready(function () {
	console.log("ready");
	getMovies();
});

function test(id) {
	console.log("MS  " + id);
	getMoviesById(id);
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


