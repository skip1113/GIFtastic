//Array of shows for gifs
var memes = ["Simpsons", "Spongebob", "King of the hill", "South park", "Bobs burger", "Family guy", "Tom and jerry"];
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
    var searchMemes = $(this).attr("data-name");
    var queryURL = `https://api.giphy.com/v1/gifs/search?q=${searchMemes}&limit=${limit}&api_key=LS1HNxaxg8yQf68z10qhwgr4cY9m12FU`;

    //ajax call for giphy url
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        var results = response.data;
        console.log(results);
        // var imgUrl = response[0].url;
        for (var i = 0; i < results.length; i++) {
            
            //create gif div
            var gifDiv = $("<div id='gifId'>").addClass("mx-auto text-center");
            //store gif ratings
            var ratings = results[i].rating;
            //creating p tag with rating and rating results
            var p = $("<p>").text("Rated: " + ratings);
            var headClick = $("<p>").text("Click to Animate!");
            //creating image tag
            var gifImage = $("<img>").addClass("jiff");
            //give gifimage src attribute for image
            gifImage.attr("src", results[i].images.fixed_height_still.url).append(gifImage);
            //give gifImage attribute of stop and animate
            gifImage.attr("data-still", results[i].images.fixed_height_still.url).append(gifImage);
            gifImage.attr("data-animate", results[i].images.fixed_height_small.url).append(gifImage);
            gifDiv.append(headClick);
            gifImage.attr("data-state", "still").append(gifImage);
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
    $("#buttons-view").empty();

    for (var i = 0; i < memes.length; i++) {
        var a = $("<button>");
        a.addClass("gif-btn btn btn-primary");
        a.attr("data-name", memes[i]);
        a.text(memes[i]);
        $("#buttons-view").append(a);
    }
}
$("#add-gif").on("click", function(event) {
    event.preventDefault();
    var meme = $("#gif-input").val().trim();
    memes.push(meme);
    displayButton();
    // displayGif();
})
//add event click function on all gif-btn
$(document).on("click", ".gif-btn", displayGif);
//click event to animate gifs
$(document).on("click", ".jiff", function() {
    var state = $(this).attr("data-state");
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});
displayButton();