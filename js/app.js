//The following code makes a list of all of the symbols and then calls the function that shuffles the list
let symbols = ['fa fa-diamond', 'fa fa-diamond', 'fa fa-paper-plane-o', 'fa fa-paper-plane-o', 'fa fa-anchor', 'fa fa-anchor', 'fa fa-bolt', 'fa fa-bolt', 'fa fa-cube', 'fa fa-cube', 'fa fa-leaf', 'fa fa-leaf', 'fa fa-bicycle', 'fa fa-bicycle', 'fa fa-bomb', 'fa fa-bomb'];
shuffle(symbols);

//This code assigns the symbols to each of the cards
$('.card').each(function(i){
    $(this).children().addClass(symbols[i]);
});


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

//This listener even looks for a card to be clicked and then calls a the pickTwo function
$('.card').click(pickTwo);

//Counts how many cards are showing, the contents and symbols of the cards in play, and the number of moves.
let count = 0;
let card = [];
let cardSymbol = [];
let moves = 0;
let matches = 0;
let starRating = '3 Stars';

//This function shows the 2 clicked cards and looks to see if they match
function pickTwo(){

    //The following code decides if the card needs to be shown or if it need to be hid
    if($(this).hasClass('show') && !$(this).hasClass('match')){
        $(this).removeClass('open show')
        count --;
    }
    else if($(this).hasClass('match')){

    }
    else{
        $(this).addClass('open show')
        count ++;

        if(count == 1){
            cardSymbol[0] = classAssignment($(this).children());
            card[0] = $(this);
        }
        else if(count == 2){
            cardSymbol[1] = classAssignment($(this).children());
            card[1] = $(this);
        }
    }

    //Once two cards are chosen the following code determines if they are a match or not.
    //Depending on if they are a match it adds or removes the appropriate classes.
    if(count === 2){
       
        //The following code shows the number of moves
        moves++;
        $('.moves').text(moves);
        stars();

        //Turns the mouse functions off until the animation is over
        $(".card").off("click");
        setTimeout(mouseOn, 1250);
        
        //The following code determines if the two cards are a match or not
        if(cardSymbol[0] === cardSymbol[1]){
            count = 0;
            card[0].addClass('match animated bounce');
            card[1].addClass('match animated bounce');
            setTimeout(remove, 1250);
            matches++;

            if(matches === 8){
                winner();
            }
        }
        else{
            count = 0;
            card[0].addClass('no-match animated shake');
            card[1].addClass('no-match animated shake');
            setTimeout(remove, 1250);
        }
    }

    // function to turn the mouse functions back on
    function mouseOn(){
        $('.card').click(pickTwo);
    }

    //function to remove excess classes after a match or no match
    function remove(){
        card[0].removeClass('open show animated bounce shake no-match');
        card[1].removeClass('open show animated bounce shake no-match');
    }

    //This function determines and returns the symbol of the chosen card.
    function classAssignment(card){
        if(card.hasClass('fa-diamond')){
            return 'diamond';
        }
        else if(card.hasClass('fa-paper-plane-o')){
            return 'plane';
        }
        else if(card.hasClass('fa-anchor')){
            return 'anchor';
        }
        else if(card.hasClass('fa-bolt')){
            return 'bolt';
        }
        else if(card.hasClass('fa-cube')){
            return 'cube';
        }
        else if(card.hasClass('fa-leaf')){
            return 'leaf';
        }
        else if(card.hasClass('fa-bicycle')){
            return 'bicycle';
        }
        else if(card.hasClass('fa-bomb')){
            return 'bomb';
        }
    }

    //The following function is the congratulations window. It stops the time, displays a message, and lets the user play again if they wish.
    function winner(){
        $('.deck').children('li').remove();
        $('.score-panel').remove();
        $('.deck').append("<div class='congrats'><h1>Congratulations!</h1><br /><h3>You were able to complete the game in " +minutes +" minutes and " +seconds +" seconds</h3><h3>You earned "+starRating +"!</h3><ul class='stars'><li><i id='oneStar' class='fa fa-star'></i></li><li><i id='twoStar' class='fa fa-star'></i></li><li><i id='threeStar' class='fa fa-star'></i></li></ul><br /><br /><h2>Would you like to play again?</h2><div class='yes'><h3>Yes!</h3></div></div>")
        if(starRating == '2 Stars'){
            $('.congrats #threeStar').removeClass('fa-star');
            $('.congrats #threeStar').addClass('fa-star-o animated rotateIn');
        }
        else if(starRating == '1 Star'){
            $('.congrats #threeStar').removeClass('fa-star');
            $('.congrats #threeStar').addClass('fa-star-o animated rotateIn');
            $('.congrats #twoStar').removeClass('fa-star');
            $('.congrats #twoStar').addClass('fa-star-o animated rotateIn');
        }
        mouseOn();

        //This listener even looks for the yes button to be pressed, then reloads the page when it is hit
        $('.yes').click(function(){console.log("success");location.reload();});
    }
}

//The following function adjusts the stars according to the number of moves
function stars(){

    //Takes away a star at 16 moves and takes away another star at 26 moves
    if(moves === 16){
        $('#threeStar').removeClass('fa-star');
        $('#threeStar').addClass('fa-star-o animated rotateIn');
        starRating = '2 Stars';
    }
    else if(moves === 26){
        $('#twoStar').removeClass('fa-star');
        $('#twoStar').addClass('fa-star-o animated rotateIn');
        starRating = '1 Star';
    }
}

//The following keeps track of the game clock. Calls for the gameTime function every second
let minutes = 0;
let seconds = 0;
let time;

$('.card').one('click', function(){if(!time){time = setInterval(gameTime, 1000)}});

//This function adjusts and displays the game clock
function gameTime(){
    //Makes the seconds increase by one
    seconds++;

    //Flips over the minute at 60 seconds and resets the seconds
    if(seconds == 60){
        minutes++;
        seconds = 0;
    }

    //Adds a 0 in front of single digit numbers to emulate a clock, which converts seconds to a string. So it is converted back to a number at 10.
    if(seconds >=0 && seconds <=9){
        seconds = '0' + seconds;
    }
    else if(seconds === 10){
        seconds = 10;
    }

    //Prints out the clock above the game board
    $('.clock').text(minutes +':' +seconds);
    
}

//This listener even looks for the restart button to be pressed, then reloads the page when it is hit
$('.restart').click(function(){location.reload();});

