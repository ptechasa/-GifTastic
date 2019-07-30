var animals = ["beaver", "bird", "elephant", "tiger", "rabbit"]

function renderButtons() {
    $('#button-view').empty();

    //generating the button for each animal in the array
    for (var i = 0; i < animals.length; i++) {

        var createBtn = $('<button>')
        createBtn.text(animals[i])
        createBtn.attr('data-name', animals[i])
        createBtn.addClass('animal')

        //adding the button to HTML
        $('#button-view').append(createBtn)
    }
}

function renderImages(response) {
    var displayAnimals = response
    console.log(response)
    $('#animal-result').empty()
    for (var i = 0; i < displayAnimals.data.length; i++) {

        // var rating = displayAnimals.data[i].rating;
        // var pTag = $('<p>').text('Rating: ' + rating);
        // var gifAnimals = $('<img>').attr('src', displayAnimals.data[i].images["480w_still"].url) 
        var gifAnimals = $('<img>')
        .attr('src', displayAnimals.data[i].images.fixed_width.url)
        .attr('data-animate', displayAnimals.data[i].images.fixed_width.url)
        .attr('data-still', displayAnimals.data[i].images.fixed_width_still.url)
        .attr('data-isanimate', true)
        .addClass('gif')
        

        // console.log(gifAnimals);
        $('#animal-result').append(gifAnimals)
    }
}

//When button is cliclked, this function will handle the events
$('.add-animal').on('click', function () {
    //Prevent the page from refreshing
    event.preventDefault();

    var favAnimal = $('.animal-input').val()
    animals.push(favAnimal)
    $('.animal-input').val('')


    renderButtons()
})

$(document).on('click', '.animal', function () {
    var animalName = $(this).attr('data-name')
    console.log(animalName)

    //URL with API request
    var apiKey = '&api_key=4HU9iEgwZEeC5VzHUYuIa0w3TIroBsCg';
    var queryUrl = 'http://api.giphy.com/v1/gifs/search?q=' + animalName + apiKey;

    $.ajax({
        url: queryUrl,
        method: 'GET'
    }).then(function (response) {
        renderImages(response)
    })
});

renderButtons()

