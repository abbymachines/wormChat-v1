let input, button, speaking;
var txt = ""; // corpus set up as a string
var order = 1; // has to do with markov algorithm
var ngrams = {}; // i think an array of arrays? for the markov
var newTxt = ""; // string var for adding to corpus

// Open your console to see the output
function setup() {
  noCanvas;
  background('grey'); //cute grey square
  
  input = createInput(); // text input box
  input.position(20, 90); // text box location
  input.size(100); // size of text box
  input.input(myInputEvent);
  // sends text input and corpus contents to console
  // whenever text is written in the text field
  
  button = createButton('say'); // "say" button
  button.position(input.x + input.width, 90);
  button.mousePressed(markovIt);
  // run the markovIt function when the button is pressed
  
  answer = createElement('h2', '?');
  // variable to hold current response of chatbot.
  // it is set up here to read "?" at first
  answer.position(20, 5); // location
  
}

function myInputEvent() {
// this function occurs at "input.input()"
  console.log('you are typing: ', this.value());
  // print contents of text box to console
  console.log('corpus: ', txt);
  // print contents of corpus to console
}

function markovIt() {
  let question = createP(input.value());
  question.style('font-size', '15px');
  // formatting for record of user text inputs

  const txtInput = input.value();
  // const containing the contents of text box
  // at the time of button pressing
  txt = txt + ' ' + txtInput;
  // update corpus ("txt") to be the corpus
  // plus a space, and then the current contents of 
  // the text box
  
// markov chain magic below. i know it involves segmenting
// the text into arrays and then calculating likely
// combinations of text based on a probability analysis?
// something like that? deserves a closer look.
    for (var i = 0; i <= txt.length - order; i++){
    var gram = txt.substring(i, i + order);
    
    if (!ngrams[gram]) {
      ngrams[gram] = [];
    } 
    ngrams[gram].push(txt.charAt(i + order));
   }
  
  var currentGram = txt.substring(0, order);
  var result = currentGram;
  // var "result" holds the chatbot response
  
  for (var i = 0; i < 8; i++) {
    var possibilities = ngrams[currentGram];
    if (!possibilities){
      break;
    }
    var next = random(possibilities);
    result += next;
    var len = result.length;
    currentGram = result.substring(len - order, len);
  }
  
  answer.html(result);
  // rewrites the answer at the top to be the
  // new chatbot response
  
  let answerP = createP(result);
  answerP.style('font-size', '31px');
  // creates a record of the chatbot response
  // in 31px font
  
  let speaknow = new SpeechSynthesisUtterance(result); 
  window.speechSynthesis.speak(speaknow); 
  // speaks the chatbot response with
  // speech synthesis
  
  input.value(''); //set input back to blank
}


// // ~~~ 1 ~~~
// //
// // OH, so
// // set up the array.

// // make a method for inputting text.
// // when the "Enter" key is pressed, the contents
// // of the text input are sent to the wordsArray via
// // wordsArray.push(newWords).
// //
// // the way this is done is that the contents of
// // the text input, upon the pressing of the "Enter"
// // key, are set as the new value of (newWords)
// //
// // then, immediately afterwards, the value of newWords
// // is added to the array via wordsArray.push(newWords)
// //
// // immediately after that, all of the text in the
// // input box is deleted. these three things happen
// // consecutively within an if statement.
// //
// // then you add a short delay (3 seconds?)
// //
// // the Markov operation runs and produces new text.
// //
// // if(EnterButtonIsPressed){
// //  newWords = textInput;
// //  wordsArray.push(newWords);
// //  textInput = blank;
// //  setTimeout(function(){ markovchain?("After 5 seconds!"); }, 3000);
// //  (markov operation occurs)
// // 
// // ~~~ 2 ~~~
// //
// // this ended up not being the case, because "txt" is
// // a string, not an array. so the answer was to put this
// // in the "markovIt" function that occurs upon
// // "button.mousePressed." here, the current "input.value()" // // (ie the content of the text field) is set as the
// // content of a variable called txtInput. then, the "txt"
// // string is updated to to be a sum of "txt," and empty
// // space " " (to mark a new word in the corpus), and
