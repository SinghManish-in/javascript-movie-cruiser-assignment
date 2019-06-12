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
	//test1();

	console.log(data[0].id);
}

function requestError(error) {
	console.log('We have an issue', error);
}

function test1(){
	var elm = document.getElementById('moviesCarousel_inner');
	//var newElement = document.createElement('div');
	elm.innerHTML = createmyElements();
	//elm.appendChild(newElement);
	console.log( createmyElements());
}

function createmyElements(){
   return [
           '<div id="moviesCarousel" class="carousel slide" style="width:50%;" data-ride="carousel">',
						'<ol class="carousel-indicators">',
							'<li data-target="#moviesCarousel" data-slide-to="0" class="active"></li>',
							'<li data-target="#moviesCarousel" data-slide-to="1"></li>',
							'<li data-target="#moviesCarousel" data-slide-to="2"></li>',
						'</ol>',
						'<div class="carousel-inner">',
							'<div class="card item active">',
								'<img src="images/don.jpg" alt="don" style="width:100%">',
								'<div class="card-body">',
									'<a href="#" class="btn btn-primary" onclick="getMovies()">Add to favorite</a>',
								'</div>',
							'</div>',
							'<div class="item">',
								'<img src="images/lagaan.jpg" alt="lagaan" style="width:100%;">',
								'<div class="card-body">',
									'<a href="#" class="btn btn-primary">Add to favorite</a>',
								'</div>',
							'</div>',
							'<div class="item">',
								'<img src="images/rawDeal.jpg" alt="rawDeal" style="width:100%;">',
								'<div class="card-body">',
									'<a href="#" class="btn btn-primary">Add to favorite</a>',
								'</div>',
							'</div>',
						'</div>',
						'<a class="left carousel-control" href="#myCarousel" data-slide="prev">',
							'<span class="glyphicon glyphicon-chevron-left"></span>',
							'<span class="sr-only">Previous</span>',
						'</a>',
						'<a class="right carousel-control" href="#myCarousel" data-slide="next">',
							'<span class="glyphicon glyphicon-chevron-right"></span>',
							'<span class="sr-only">Next</span>',
						'</a>',
				'</div>'
          ].join('\n');
}	

function addDivElements(){
	var innerHtml="<div class=\"card item\"><img src=\"images/don.jpg\" alt=\"don\" style=\"width:100%;\">"
	+"<div class=\"card-body\">"
	+"<a href=\"#\" class=\"btn btn-primary\">Add to favorite</a>"
	+"</div>"
	+"</div>";
	return innerHtml;
}

function addDivElementsActive(){
	var innerHtml="<div class=\"card item active\"><img src=\"images/don.jpg\" alt=\"don\" style=\"width:100%;\">"
	+"<div class=\"card-body\">"
	+"<a href=\"#\" class=\"btn btn-primary\">Add to favorite</a>"
	+"</div>"
	+"</div>";
	return innerHtml;
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


