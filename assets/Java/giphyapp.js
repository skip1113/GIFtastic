//Array of shows for gifs
var memes = ["the simpsons", "spongebob", "king of the hill", "south park", "bobs burger", "family guy", "tom and jerry"];
//API test
// var memes = $(this).attr("data-name");
//     var queryURL = "https://api.giphy.com/v1/gifs/search?q=simpsons&api_key=LS1HNxaxg8yQf68z10qhwgr4cY9m12FU";



// //ajax call for giphy url
// $.ajax({
//     url: queryURL,
//     method: "GET"
// }).then(function(results) {
//     console.log("rating " + results[0].rating);
//})
// gif ,rating display
function displayGif() {
    var limit = 10;
    // var memes = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + memes + "&limit=" + limit + "&api_key=LS1HNxaxg8yQf68z10qhwgr4cY9m12FU";

    //ajax call for giphy url
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        var results = response.data;
        console.log(results);
        // var imgUrl = response[0].url;
        for (var i = 0; i < results.length; i++) {
            
            //create gif div
            var gifDiv = $("<div>");
            //store gif ratings
            var rating = results[i].rating;
            //creating p tag with rating and rating results
            var p = $("<p>").text("Rating: " + rating);
            //creating image tag
            var gifImage = $("<img>");
            //give gifimage src attribute for image
            gifImage.attr("src", results[i].images.fixed_height_small.url);
            //append image and rating to new div created
            gifDiv.append(gifImage);
            gifDiv.append(p);
            //prepend image and rating to html
            $("#gifs-here").prepend(gifDiv);
        }    


    });
}
// displayGif();
//function to display meme buttons
function displayButton() {
    $("#button-view").empty();

    for (var i = 0; i < memes.length; i++) {
        var a = $("<button>");
        a.addClass("meme-btn");
        a.attr("data-name", memes[i]);
        a.text(memes[i]);
        $("#button-view").append(a);
    }
}
$("#add-gif").on("click", function (event) {
    event.preventDefult();
    var meme = $("#gif-input").val().trim();
    meme.push(memes);
    displayButton();
    displayGif();
})
//add event click function on all gif-btn
$(document).on("click", ".meme-btn", displayGif);
displayButton();