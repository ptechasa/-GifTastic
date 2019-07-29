var animals = ["beaver", "bird", "elephant", "tiger", "dinosaur"]

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

renderButtons()

