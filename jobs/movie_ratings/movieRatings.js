function search(){
	$(".hide").hide();
    $(".movie_not_found").hide();
    $(".loader").slideDown();
    var title = document.getElementById("txt_fname").value;
    console.log(title);
    var movie_title = encodeURI(title).toLowerCase();
    var DATAURL = "http://www.omdbapi.com/?t="+movie_title+"&y=&plot=full&r=json";

	$.getJSON(DATAURL, function(data) {
        if(data.Error == "Movie not found!"){
            console.log("error");
            $(".loader").hide();
            $(".movie_not_found").slideDown();
        }else{
            console.log(data);
            var query = data.Title+" movie poster";
                query = encodeURIComponent(query.toLowerCase());
            console.log(query);

            var imgSearchURL = "https://www.googleapis.com/customsearch/v1?key=AIzaSyCmOCvrsYh0h1UbKRhlfQxxmeKD-4FhZ_o&cx=001653789731970415629:6kh5cl9qaga&q="+query+"&searchType=image&alt=json";
            $.getJSON(imgSearchURL, function(results) {
                var patt = new RegExp("impawards");
                var patt2 = new RegExp("disney");
                for (var i = 0; i < results.items.length; i++) {
                    if(!(patt.test(results.items[i].link)) && !(patt2.test(results.items[i].link))){
                        console.log(results.items[i]);
                        var posterImg = results.items[i].link;
                        console.log(posterImg);
                        document.getElementById("poster").style.backgroundImage = "url("+posterImg+")";
                        break;
                    }
                }
                
            });


            $('.movie_title').text(data.Title);
            $('.movie_id').attr("href", "http://www.imdb.com/title/"+data.imdbID+"/");
            $('.movie_imdb_rating').text(data.imdbRating);
            $('.movie_year').text(data.Year);
            $('.movie_public').text(data.Rated);
            $('.movie_release').text(data.Released);
            $('.movie_runtime').text(data.Runtime);
            $('.movie_genre').text(data.Genre);
            $('.movie_director').text(data.Director);
            $('.movie_writers').text(data.Writer);
            $('.movie_actors').text(data.Actors);
            $('.movie_plot').text(data.Plot);
            $('.movie_language').text(data.Language);
            $('.movie_country').text(data.Country);
            $('.movie_awards').text(data.Awards);


            $(".loader").hide();
            $(".hide").slideDown();
        }

     });

    return false;
}