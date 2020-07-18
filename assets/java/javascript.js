//Array of shows for gifs
const memes = ["Simpsons", "Spongebob", "King of the hill", "South park", "Bobs burger", "Family guy", "Tom and jerry"];

function displayGif() {
    // var limit = 10;
    const searchMemes = $(this).attr("data-name");
    // var queryURL = `https://api.giphy.com/v1/gifs/search?q=${searchMemes}&limit=${limit}&api_key=LS1HNxaxg8yQf68z10qhwgr4cY9m12FU`;
    const queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchMemes + "&limit=10&api_key=LS1HNxaxg8yQf68z10qhwgr4cY9m12FU";
    //ajax call for giphy url
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        let results = response.data;
        console.log(results);
        displayFunc(response);
    });
}
function displayFunc(response) {
    $("#gifs-here").empty();
    let results = response.data;
    for (let i = 0; i < results.length; i++) {
        let gifDiv = $("<div id='gifId'>").addClass("mx-auto text-center");
        let ratings = results[i].rating;
        let p = $("<p>").text("Rated: " + ratings);
        let headClick = $("<p>").text("Click to Animate!");
        let gifImage = $("<img>").addClass("jiff");
        gifImage.attr("src", results[i].images.fixed_height_still.url).append(gifImage);
        gifImage.attr("data-still", results[i].images.fixed_height_still.url).append(gifImage);
        gifImage.attr("data-animate", results[i].images.fixed_height.url).append(gifImage);
        gifDiv.append(headClick);
        gifImage.attr("data-state", "still").append(gifImage);
        gifDiv.append(gifImage);
        gifDiv.append(p);
        $("#gifs-here").prepend(gifDiv);        
    };    
};

function displayButton() {
    $("#buttons-view").empty();
    for (let i = 0; i < memes.length; i++) {
        let a = $("<button>");
        a.addClass("gif-btn btn btn-info");
        a.attr("data-name", memes[i]);
        a.text(memes[i]);
        $("#buttons-view").append(a);
    };
};
$("#add-gif").on("click", function(event) {
    event.preventDefault();
    let meme = $("#gif-input").val().trim();
    memes.push(meme);
    displayButton();
});
//add event click function on all gif-btn
$(document).on("click", ".gif-btn", displayGif);
//click event to animate gifs
$(document).on("click", ".jiff", function() {
    let state = $(this).attr("data-state");
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});
displayButton();