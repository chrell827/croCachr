$(document).ready(function(){

var queryURL = "https://api.giphy.com/v1/gifs/search?q=";
var api_key = "&api_key=1uizGhkNGhsf6Q6GQOndNQXoaeldkTl4";
var animals = ["dogs", "cats", "birds", "hamsters", "monkeys", "snakes"];
var imageLimit = "&limit="+10;
renderButtons();

function renderButtons (){
    $("#button-div").empty();
    for (var i = 0; i < animals.length; i++) {
        var a = $("<button>");
        a.addClass("animal-btn");
        a.attr("data-name", animals[i]);
        a.text(animals[i]);
        $("#button-div").append(a);
    }
}

$("#add-animal").on("click",function(event){
    event.preventDefault();
    animals.push($("#animal-input").val().trim())
    renderButtons();
    $('#animal-form')[0].reset();
})

//animal button click listener
$(document).on("click", ".animal-btn", displayContent);
function displayContent(){

    $("#image-div").empty();

    var query = queryURL + $(this).attr("data-name") + api_key + imageLimit;
    console.log(query);
    var stillImage;
    var animateImage;
    var imageRating;
    $.ajax({url: query, method: "GET"}).then(function(response){

        console.log(response);
        for(var i = 0; i < response.data.length; i++)
        {
            stillImage = response.data[i].images.fixed_height_still.url;
            animateImage = response.data[i].images.fixed_height.url
            imageRating = response.data[i].rating;
            var animalImage = $("<img>");
            animalImage.addClass("gif");
            animalImage.attr({
            "src": stillImage,
            "data-animate": animateImage,
            "data-still": stillImage,
            "data-state": "still"});
            $("#image-div").append(animalImage);
            $("#image-div").append(" Rating: " + imageRating+"<br>");
        }
        
    })

}

//image click listener 
$(document).on("click" , ".gif", animateContent);
function animateContent(){
    var state = $(this).attr("data-state");
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
}


});