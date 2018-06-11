var time = 0;
var running = 0;
// We first start by defining a variable called 'time' which will be changing as our clock counts upwards.
// We define another varibale called 'running' which will be represent our time in motion.

function startPause() {
  if (running == 0) {
    running = 1;
    increment();
    document.getElementById('start_pause_button').innerHTML = 'PAUSE';
  } else {
    running = 0;
    document.getElementById('start_pause_button').innerHTML = 'RESUME';
  }
}
// Here we define a function that will be affected by the 'start_pause_button' we created in our HTML file. In the even of a click this function will either make the clock tick upwards or pause it.
// We start by setting a conditional statement by saying 'if running is equals to 0'... Essentially we are saying that if time is not running right now than do something (run time)...
// ...Than we set the running variable to 1 to be the opposite of the condition. Here we are basically starting to execute upon time and.
// On the next line is where we actually start incrementing upon 'running' which we just set to 1.
// On the next line when the time starts incrementing upwards we change what is inside of the 'start_pause_button' (the innerHTML value) to 'PAUSE' string. We are now changing the function of the button from 'start' to 'pause', which (once pressed) will execute a stop on the incrementation of running.
// Further on we set an 'else' condition.
// ...We are saying 'if running does not equals to 0 (or is running)' than execute a block of code....
// In the block of code to be executed we are saying 'set running to 0 and grab the start_pause_button and set the innerHTML value of it to RESUME so that we can start the timer again once we click on the RESUME button'.

function increment() {
  if (running == 1) {
    setTimeout(function() {
      time++;
      var tenths = time % 10;
      var seconds = Math.floor(time/10);
      var minutes = Math.floor(time/10/60);
      if (seconds < 10) {
        seconds = '0' + seconds;
      }
      if (minutes < 10) {
        minutes = '0' + minutes;
      }
      if (seconds == 59) {
        seconds.innerHTML = 0;
      }
      document.getElementById('output').innerHTML = minutes + ':' + seconds + ':' + '0' + tenths;
      increment();
    }, 100);
  }
}
// Here we define a function that will do the meat of the timer function. This is the function that will actually make the timer count upwards.
// We start by definging a condition. We say 'if running is equals to 1'... Than execute the followig block of code....
// On the following line we define a timing method called setTimeout and give it function that will later increment tenths of seconds, seconds and minutes which will be defined below.
// We than start incrementing the 'time' variable by one.
// On the next line we define the 'tenths' of a second by dividing whatever time is (which is 1) by 10 so that we can see the tenths of a second being counted upwards.
// On the next line we define the 'seconds' and its condition rounding down what time is to only increment one second by one every 10 miliseconds.
// On the next line we define the 'minutes' and its condition rounding down what time is to only increment one minute by one every 60 seconds.
// In the following condition we work around the fact that there is only one digit showing on the seconds variable by adding a '0' string in front of it.
// In the following condition we work around the face that there is only one digit showing on the minutes variable by also adding a '0' string in front of it.
// On the next line we grab the innerHTML value of 'output' and set it to the three variables (tenths/seconds/minutes) and finish on the last line by defining the last part of the setTimeout function making it change values every tenth of a second.

function reset() {
  running = 0;
  time = 0;
  document.getElementById('start_pause_button').innerHTML = 'START';
  document.getElementById('output').innerHTML = '00:00:00';
  newBoard();
}
// Here we define a function that will reset the clock time for all three variables (tenths/seconds/minutes) to zero and will shuffle and reset the game board.
// In the following line we set the running to 0 which will stop the running variable.
// In the folowing line we set the time to 0 which will reset all the time variables back to zero.
// In the next line we take whatever the innerHTML value of the start_pause_button is and set it to 'START' denoting that we can start the timer and therefore the game again.
// In the next line we take whatever the innerHTML value of the 'output' (which is the timer string that is visible on the page) and set all of its values to zero so that when 'START' is clicked it can start incrementing from zero again.
// On the last line we just execute the newBoard() function that will shuffle and reset all the characters in different places and will close all the boxes.

var characters = ['U', 'U', 'S', 'S', 'Q', 'Q', 'H', 'H', 'P', 'P', 'G', 'G', 'L', 'L', 'F', 'F', 'O', 'O', 'E', 'E', 'J', 'J', 'A', 'A'];
// Creating an array of letters that will represent different characters (when using a special font).

var placeHolderValues = [];
// Creating an empty array that will hold certain values as we are clicking on boxes and creating mataches. This array will typically hold no more than two values at a time and will be set to empty after every match is made. The name basically implies its purpose. It's a temporary placeholder for values.

var pictureIds = [];
// Creating another empty array that will hold the ID's of the boxes that are being flipped so that we can keep track of the specific boxes that are being opened and closed and their matches that were made.

var totalPicturesTurned = 0;
// Creating a variable that will hold the values of all the matched indexes. Once the value number reaches the length of the 'characters' array this will help in giving a 'You Won' type message. This is what will tell us that all the matches have been made.

Array.prototype.imageShuffle = function() {
  var l = this.length;
  var n;
  var t;
    while(--l > 0) {
      n = Math.floor(Math.random() * (l+1));
      t = this[n];
      this[n] = this[l];
      this[l] = t;
    }
}
// The first line (Array.protype.imageShuffle) is where we are setting this whole function to be a kind of a protype that can be applied to any array and to shuffle its contents. It's basically like building a stamp machine that will create shuffles for you every time you apply it.
// Variabl 'l' will stand for the length of the array that we apply this shuffle method to. It will represent all the 24 index values in the 'characters' array.
// Variable 'n' will stand for a random number/index that'll be generated as we go through the loop below it. It will represent whatever index we randomly pick.
// Variable 't' will stand for a temporary value as the values of the 'characters' array are being swapped.
// In the loop condition we are saying 'as long as 'l' is greater than index 0 subtract one from 'l''; which means that 'n' will be/start at index 35 and will loop backwards from index 35 to index 1 until it reaches index 1 (excluding index 0).
// In the first line of the block of code following the condition we are setting 'n' to a random number by applying the Math.random() function. It will basically generate a random number that'll represent one of the indexes between the last one run and index 0. It's essentially picking a random index.
// In the second line of the block of code following the condition we are taking whatever value 'n' now has (at whatever index it picked) and setting 't' to the value of that index.
// In the third line of the block of code following the condition we are setting whatever temporary value we were holding in 't' and placing it in the index that our 'l' is at the moment in the loop process.
// 'this' stands for/is substituted for whatever array we are applying this shuffle method to. If we were to put the actual name of the array there we could only apply it to that array. Putting 'this' in there allows us to apply it to any/all arrays.

function newBlock() {
  totalPicturesTurned = 0;
  var output = '';
  characters.imageShuffle();
  for (var a = 0; a < characters.length; a++) {
    output += '<div id="tile_'+a+'" onclick="flipBox(this,\''+characters[a]+'\')"></div>';
  }
  document.getElementById('memory_block').innerHTML = output;
}
// We start by defining the function and giving it a name.
// In the first line of code we set the variable 'totalPicturesTurned' to 0 because we setting an empty block of boxes that has no turned pictures yet and no matches made.
// With the next line we are creating a variable that'll represent whatever output/value that we will be creating in the boxes. Put it another way, we are essentially creating an empty value inside these boxes (by setting an empty string) so that we can than put something inside of it.
// Than on the next line we go and call up the array above (of all the pictures) and use the shuffle protype/function to randomize the values of all the indexes and put them in a different place inside the array.
// On the next line we create a 'for' loop that will essentially actually set the boxes and their values on the page. We set a variable called "A". Than we say 'as long as A is less than the whole length of the array keep adding one index'.
// Furtherore we are basically going through the 'characters' array (by looping), grabbing a value from an index and throwing whatever the value of that index into the box we are creating. By looping through the array are basically setting each index to a box and making it appear on the page.
// On the following line is where the actual meat of the function happens. We are taking what is typically HTML syntax and dynamically placing actual divs/boxes into the page by creating boxes with this HTML syntax.
// We start by saying 'create a div with the dynamic id called tile_(value of the index)'. The id="tile_'+A+'" is where we are concotanating the word tile and whatever value of the index is.
// We than say 'when onclick happens we want function flipBox() to happen'. When you click on the box, this function will open up and show you whatever value you have in there.
// Inside this function we pass two arguments. The "this" argument represents the div/box we have created and are clicking on. The \''+characters[A]+'\' represents whatever value we have at the current index/box and we insert that value into the function.
// The \''\ inside this argument will take the value of the index and work with it as a string because we essentially set all the indexes in the array as strings (even though in our case those indes strings hold links to pictures).
// On the last line (that is outside the initial function) we are pointing all this information (above) and telling it to appear inside the 'memory_block' that was statically created by HTML and throwing all the values inside these boxes.
// the innerHTML = output is what tells the value to be inside the boxes.

function flipBox(tile, val) {
  if (tile.innerHTML == '' && placeHolderValues.length < 2) {
    tile.innerHTML = val;
    if (placeHolderValues.length == 0) {
      placeHolderValues.push(val);
      pictureIds.push(tile.id);
    } else if (placeHolderValues.length == 1) {
      placeHolderValues.push(val);
      pictureIds.push(tile.id);
      if (placeHolderValues[0] == placeHolderValues[1]) {
        totalPicturesTurned += 2;
        placeHolderValues = [];
        pictureIds = [];
        if (totalPicturesTurned == characters.length) {
          alert('You win! Your time was ' + output.innerHTML);
          document.getElementById('memory_block').innerHTML = '';
          newBlock();
          reset();
        }
      } else {
        function flipBoxBack() {
          var tileOne = document.getElementById(pictureIds[0]);
          var tileTwo = document.getElementById(pictureIds[1]);
          tileOne.innerHTML = '';
          tileTwo.innerHTML = '';
          placeHolderValues = [];
          pictureIds = [];
        }
        setTimeout(flipBoxBack, 500);
      }
    }
  }
}

// We define the function that will flip the tiles and define how the logic will work. This is where we are starting to work with 'if box 1 and box 2 match, keep open; if not, than close both' logic. It's essentially a bunch of if/than conditions. We give it two arguments: tile which represent the tile we are clicking on and value which is the value that will be added to certain arrays/boxes.
// There are levels of if/than statements. In the first leve we start by saying 'if the value of the tile we are clicking on is empty and the placeHolderValues array has less than 2 values'... We are essentially setting a condition for the following code block.
// In this line we are calling the tile/box and setting a value inside the innerHTML. The innerHTML is where the value resides..
// Than we add an addition condition because we need to keep track of a few other values. We say 'if the placeHolderValues' array is equal to 0'... It's like saying 'if there are no values in the placeHolderValues array' than....
// ...'than push a value into the placeHolderValues array from the box you just clicked'.
// ...'also push the id of the box into the pictureIds array to keep track of which box you are clicking on'.
// Than we say 'otherwise if the placeHolderValues array already has one value inside of it'....
// ...'push another value of the box you just clicked on (denoting that you probably already clicked on a box before this one) into the placeHolderValues array to make it two values that will be compared in the code below'.
// ...'and also push the id of this box into the pictureIds array to keep track of it as well'.
// Than we go on to create an additional consition. This one is the most important because it actually does the comparing between the two boxes and their values. We say 'if the value at index 0 of the placeHolderValues array and the value at index 1 are the same'....
// ... 'than add 2 values to the totalPicturesTurned array because we have made a match and we need to keep track of how many matches have already been made'.
// ...'also empty the placeHolderValues array of all its values and indexes because we will still need to make more matches'.
// ...'and set the pictureIds array to zero as well because now we will need to enter new values into it'.
// Than we set the final condition of the matching by simply saying 'if there are 36 values inside the totalPicturesTurned array which is equal to the length of the characters array'... (esentially saying 'if all the boxes have been opened and all the matches made').
// ...'than create an alert box that says"You win! Your time was (time it took to make all the matches)"'.
// After all the matches have been made and the win alert happened we reset the values inside all the blocks to be empty strings again as they were at the beginning of the game.
// And execute the function that creates a new block of boxes.
// AND we reset the timer to start from the beginning.
// The 'else' here denotes another general condition in case we click on two boxes and they do not match.
// Here we define and name the function.
// Here we create a varibale called tileOne and set its value to whatever is inside index 0 of the pictureIds array since we know that we already clicked on at least one box and at least one value has been added to this array.
// Here we create another variable called tileTwo and its value to whatever is inside index 1 of the pictureIds array since we know that we already clicked on two boxes and there is two values inside this array.
// Than we set the background of the first tile that was clicked to the color that it was originally at when the game started which was a lightly transparent gray.
// Than we set the innerHTML value of the box to empty because there was no match made.
// Here we also set the background of the second tile that was clicked to the color that it was originally at when the game started which was also a lightly tranparent gray.
// Than set the the innerHTML value of this box to empty as well because no match was made.
// We reset the placeHolderValues array to empty because we will be attempting to make another match.
// We also reset the pictureIds array to empty so that we can enter other values to keep track of.
// Here we say 'if the match was not made flip these boxes back after 0.5 seconds' by creating a timeOut function and running the flipBoxBack function inside it and giving a time limit of 0.7 seconds.

window.addEventListener(this, newBlock());
// This the event listener function that connects the newBlock() function to the actual page.