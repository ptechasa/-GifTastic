var animals = ["beaver", "rhinoceros", "elephant", "tiger", "rabbit", "frog", "Shark", "Donkey", "Chipmunk", "Kangaroo"]

function renderButtons() {
    $('.button-view').empty();

    //creating new buttons for each animal in array
    for (var i = 0; i < animals.length; i++) {

        var createBtn = $('<button>')
        createBtn.text(animals[i])
        createBtn.attr('data-name', animals[i])
        createBtn.addClass('animal')

        $('.button-view').append(createBtn)
    }
}

function renderImages(response) {
    var displayAnimals = response
    console.log(response)

    //clear the box before adding new one
    $('#animal-result').empty()
    for (var i = 0; i < displayAnimals.data.length; i++) {

        //display rating for each GIPHY API
        var divTag = $('<div>').addClass('item')
        var rating = displayAnimals.data[i].rating
        var pTag = $('<p>').text('Rating: ' + rating)

        var gifAnimals = $('<img>')
            .attr('src', displayAnimals.data[i].images.fixed_width.url)
            .attr('data-animate', displayAnimals.data[i].images.fixed_width.url)
            .attr('data-still', displayAnimals.data[i].images.fixed_width_still.url)
            .attr('data-isanimate', true)
            .addClass('gif')

        // console.log(gifAnimals);
        divTag.append(gifAnimals, pTag)
        $('#animal-result').append(divTag)
    }
}

//When button is cliclked, this function will handle the events
$('.add-animal').on('click', function () {
    //Prevent the page from refreshing
    event.preventDefault();

    //create alert when user is not fill in the box
    if ($('.animal-input').val().trim() == '') {
        alert('Please input your favorite animal')

    } else {
        var favAnimal = $('.animal-input').val()
        animals.push(favAnimal)
        $('.animal-input').val('')
    }
    renderButtons()
})

$(document).on('click', '.animal', function () {
    var animalName = $(this).attr('data-name')
    console.log(animalName)

    //URL with API request
    var apiKey = '&api_key=4HU9iEgwZEeC5VzHUYuIa0w3TIroBsCg';
    
    //limit Gif to display only 10
    var limitGif = 10
    var queryUrl = 'https://api.giphy.com/v1/gifs/search?q=' + animalName + "&limit=" + limitGif + apiKey;

    //creating an AJAX call
    $.ajax({
        url: queryUrl,
        method: 'GET'
    }).then(function (response) {
        renderImages(response)
    })
});

$(document).on('click', '.gif', function () {
    console.log(this)
    var isAnimate = $(this).attr('data-isanimate')

    //when user clicks the gif, it stops playing
    if (isAnimate == 'true') {
        var animateStill = $(this).attr('data-still')
        $(this).attr('src', animateStill)
        $(this).attr('data-isanimate', false)

        //Once user clicks one of the still GIPHY images, the gif will animate. 
    } else if (isAnimate != 'true') {
        var dataAnimate = $(this).attr('data-animate')
        $(this).attr('src', dataAnimate)
        $(this).attr('data-isanimate', true)

    }

});

renderButtons()

