function getMovies() {
	var request = new XMLHttpRequest();
	request.onload = requestListener;
	request.onerror = requestError;
	request.open('get', 'movies', true);
	request.send();
}

function getFavourites() {

}

function addFavourite() {

}

function requestListener() {
	var data = JSON.parse(this.responseText);
	
	console.log(data[0].id);
}

function requestError(error) {
	console.log('We have an issue', error);
}

$(document).ready(function(){  
	var m = ["images/don.jpg","images/lagaan.jpg"];
  for(var i=0 ; i< m.length ; i++) {
    $('<div id ="MS_'+i+'" class="card item" ><img src="'+m[i]+'"alt="don"><div class="card-body"><a href="#" class="btn btn-primary" style="width:100%;" onclick="test('+i+')">Add to favorite</a></div><div class="carousel-caption"></div></div>').appendTo('.carousel-inner');
    $('<li data-target="#carousel-example-generic" data-slide-to="'+i+'"></li>').appendTo('.carousel-indicators')

  }
  $('.item').first().addClass('active');
  $('.carousel-indicators > li').first().addClass('active');
  $('#carousel-example-generic').carousel();
});

function test(hello){
	console.log(hello);
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


