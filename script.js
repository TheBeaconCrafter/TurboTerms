//.----------------.  .-----------------. .----------------.  .-----------------. .----------------.  .----------------.  .----------------.  .----------------. 
//| .--------------. || .--------------. || .--------------. || .--------------. || .--------------. || .--------------. || .--------------. || .--------------. |
//| | ____   ____  | || | ____  _____  | || |     ______   | || | ____  _____  | || |  _________   | || | _____  _____ | || | _____  _____ | || | _____  _____ | |
//| ||_  _| |_  _| | || ||_   \|_   _| | || |   .' ___  |  | || ||_   \|_   _| | || | |  _   _  |  | || ||_   _||_   _|| || ||_   _||_   _|| || ||_   _||_   _|| |
//| |  \ \   / /   | || |  |   \ | |   | || |  / .'   \_|  | || |  |   \ | |   | || | |_/ | | \_|  | || |  | | /\ | |  | || |  | | /\ | |  | || |  | | /\ | |  | |
//| |   \ \ / /    | || |  | |\ \| |   | || |  | |         | || |  | |\ \| |   | || |     | |      | || |  | |/  \| |  | || |  | |/  \| |  | || |  | |/  \| |  | |
//| |    \ ' /     | || | _| |_\   |_  | || |  \ `.___.'\  | || | _| |_\   |_  | || |    _| |_     | || |  |   /\   |  | || |  |   /\   |  | || |  |   /\   |  | |
//| |     \_/      | || ||_____|\____| | || |   `._____.'  | || ||_____|\____| | || |   |_____|    | || |  |__/  \__|  | || |  |__/  \__|  | || |  |__/  \__|  | |
//| |              | || |              | || |              | || |              | || |              | || |              | || |              | || |              | |
//| '--------------' || '--------------' || '--------------' || '--------------' || '--------------' || '--------------' || '--------------' || '--------------' |
// '----------------'  '----------------'  '----------------'  '----------------'  '----------------'  '----------------'  '----------------'  '----------------' 
//
//  Coded by vncntwww :)
//  This is a simple web app that allows you to create and study flashcards.
//  The app is written in HTML, CSS and JavaScript.
//  Source code was last modified on 2023-10-14

const serverURL = "https://YOURSERVER/server/"; //Modify this to your server URL

var allowPartialCredit = true;
var accuracyThreshold = 0.75;

document.getElementById('importBtn').addEventListener('click', openPopup);
document.getElementById('settingsBtn').addEventListener('click', openSettingsModal);

document.getElementById('importFileBtn').addEventListener('change', function (event) {
    const fileInput = event.target;
    
    // Check if a file is selected and has the correct extension
    if (fileInput.files.length > 0 && fileInput.files[0].name.endsWith('.wvocab')) {
        readFile(fileInput.files[0]);
    } else if (fileInput.files.length > 0 && fileInput.files[0].name.endsWith('.txt')) {
        alert('This file might not be supported correctly. It will still be loaded, but this may change in the future. Please use .wvocab files instead.');
        readFile(fileInput.files[0]);
    } else {
        //alert('Please select a valid .wvocab file.');
        broadcast("Please select a valid .wvocab file.", "Okay", "", closeBroadcast, closeBroadcast)
        // Optionally clear the file input
        fileInput.value = '';
    }
});

//////////
//POPUPS//
//////////

function openPopup() {
    document.getElementById('popup').style.display = 'block';
}

function closePopup() {
    document.getElementById('popup').style.display = 'none';
}


function openSettingsModal() {
  document.getElementById('settingsModal').style.display = 'block';
}

function closeSettingsModal() {
  document.getElementById('settingsModal').style.display = 'none';
}

function openBCNModal() {
    getVocabSets();
    document.getElementById('bcnsetsModal').style.display = 'block';
  }
  
  function closeBCNModal() {
    document.getElementById('bcnsetsModal').style.display = 'none';
  }

function applySettings() {
  allowPartialCredit = document.getElementById('partialCreditCheckbox').checked;
  accuracyThreshold = parseFloat(document.getElementById('accuracyThreshold').value);

  console.log('Allow Partial Credit:', allowPartialCredit);
  console.log('Accuracy Threshold:', accuracyThreshold);

  closeSettingsModal();
}

//////////////////////
//BROADCAST FUNCTION//
//////////////////////

function broadcast(text, button1Text, button2Text, button1Action, button2Action) {

    //EXAMPLE broadcast("What do you want to do?", "Close", "Cancel", closeBroadcast, closeBroadcast)
  
    const popup = document.getElementById('broadcastPopup');
    const popupText = document.getElementById('broadcastText');
    const button1 = document.getElementById('broadcastButton1');
    const button2 = document.getElementById('broadcastButton2');
  
    popup.style.display = 'block';
    // Set the text and actions for the popup
    popupText.innerText = text;
    button1.innerText = button1Text;
    button2.innerText = button2Text;
    button1.onclick = button1Action;
    button2.onclick = button2Action;
  
    if(button2.innerText.length == 0) {
      button2.style.visibility = "hidden"
      button2.style.display = "none"
    } else {
      button2.style.visibility = "visible"
      button2.style.display = "inline-block"
    }
  }

  function closeBroadcast() {
    const popup = document.getElementById('broadcastPopup');
    popup.style.display = 'none';
  }

  function broadcastOK(text, buttonText, buttonAction) {
    //EXAMPLE broadcastOK("This is a test.", "Okay", closeBroadcast)
  
    const popup = document.getElementById('broadcastPopup');
    const popupText = document.getElementById('broadcastText');
    const button1 = document.getElementById('broadcastButton1');
    const button2 = document.getElementById('broadcastButton2');
  
    popup.style.display = 'block';
    // Set the text and actions for the popup
    popupText.innerText = text;
    button1.innerText = buttonText;
    button2.innerText = "";
    button1.onclick = buttonAction;
    button2.onclick = buttonAction;
  
    if(button2.innerText.length == 0) {
      button2.style.visibility = "hidden"
      button2.style.display = "none"
    } else {
      button2.style.visibility = "visible"
      button2.style.display = "inline-block"
    }

    // Add event listener for the enter key
    document.addEventListener('keydown', enterKeyListener);

    function enterKeyListener(event) {
        if (event.key === 'Enter') {
            buttonAction();
            document.removeEventListener('keydown', enterKeyListener); // Remove the listener after handling the event
        }
    }
  }

//////INIT//////

console.log('Hi! The app is initialized!');

//////////
//SERVER//
//////////

async function getVocabSets() {
    try {
        const response = await fetch(serverURL + 'get-vocabsets/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({}),
        });

        const data = await response.json();

        if (response.ok) {
            console.log(data);

            const vocabSetsContainer = document.getElementById('vocabSetsContainer');
            vocabSetsContainer.innerHTML = '';

            data.directories.forEach(directory => {
                const vocabSetElement = document.createElement('div');
                vocabSetElement.innerText = directory;
                vocabSetElement.style.cursor = 'pointer';

                vocabSetElement.onclick = function () {
                    getFilesInDirectory(directory);
                    console.log('Clicked on directory:', directory);
                };

                vocabSetsContainer.appendChild(vocabSetElement);
            });

            data.files.forEach(file => {
                const vocabSetElement = document.createElement('div');
                vocabSetElement.innerText = file;
                vocabSetElement.style.cursor = 'pointer';

                vocabSetElement.onclick = function () {
                    closeBCNModal();
                    loadBCNSet(file);
                };

                vocabSetsContainer.appendChild(vocabSetElement);
            });
        } else {
            console.error('Error:', data.error);
        }
    } catch (error) {
        console.error('Error fetching data:', error.message);
    }
}

async function getFilesInDirectory(directory) {
    try {
        const response = await fetch(serverURL + 'get-files-in-directory/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ directory }),
        });

        const data = await response.json();

        if (response.ok) {
            console.log(data.files);
            const vocabSetsContainer = document.getElementById('vocabSetsContainer');
            vocabSetsContainer.innerHTML = '';

            data.files.forEach(file => {
                const vocabSetElement = document.createElement('div');
                vocabSetElement.innerText = file;
                vocabSetElement.style.cursor = 'pointer';

                vocabSetElement.onclick = function () {
                    closeBCNModal();
                    loadBCNSetWithDir(directory, file);
                };

                vocabSetsContainer.appendChild(vocabSetElement);
            });
            
        } else {
            console.error('Error:', data.error);
        }
    } catch (error) {
        console.error('Error fetching data:', error.message);
    }
}


/////////////
//BCN-STUFF//
/////////////

  function toggleGridDropdown() {
    const grid_dropdown = document.getElementById('grid-dropdown');
    grid_dropdown.classList.toggle('hidden');
    if(grid_dropdown.style.display == "flex") {
        grid_dropdown.style.display = "none";
    } else {
        grid_dropdown.style.display = "flex";
    }
}

//////////////
//FLASHCARDS//
//////////////

let flashcards = [];
let currentCardIndex = 0;

function importVocab() {
    const vocabInput = document.getElementById('vocabInput').value;

    if (vocabInput) {
        processInput(vocabInput);
    } else {
        const fileInput = document.getElementById('importFileBtn');
        if (fileInput.files.length > 0 && fileInput.files[0].name.endsWith('.wvocab')) {
            readFile(fileInput.files[0]);
        } else if (fileInput.files.length > 0 && fileInput.files[0].name.endsWith('.txt')) {
            readFile(fileInput.files[0]);
        } else {
                //alert('Please select a valid .wvocab file or provide a URL.');
                console.log("Filename: " + fileInput.files[0].name);
                broadcast("Please select a valid .wvocab file or provide a URL.", "Okay", "", closeBroadcast, closeBroadcast)
        }
    }
}

function addFromInternet() {
    const urlInput = prompt('Enter the URL of the .wvocab file:');
            if (urlInput) {
                fetch(urlInput)
                    .then(response => response.text())
                    .then(content => processInput(content))
                    .catch(error => {
                        console.error('Error fetching vocab file from URL:', error);
                        //alert('Error fetching vocab file from URL. Please make sure the URL is correct.');
                        broadcast("Error fetching vocab file from URL. Please make sure the URL is correct.", "Okay", "", closeBroadcast, closeBroadcast)
                    });
            } else {
                //alert('Please select a valid .wvocab file or provide a URL.');
                broadcast("Please select a valid .wvocab file or provide a URL.", "Okay", "", closeBroadcast, closeBroadcast)
            }
}

function loadBCNSet(setname) {
                fetch("https://bcn.thebeaconcrafter.club/study/vocabsets/" + setname)
                    .then(response => response.text())
                    .then(content => processInput(content))
                    .catch(error => {
                        console.error('Error fetching vocab file from URL:', error);
                        //alert('Error fetching vocab file from URL. Please make sure the URL is correct.');
                        broadcast("Error fetching vocab file from server. Please make sure to use our official domain.", "Okay", "", closeBroadcast, closeBroadcast)
                    });
}

function loadBCNSetWithDir(directory, setname) {
    fetch("https://bcn.thebeaconcrafter.club/study/vocabsets/" + directory + "/" + setname)
                    .then(response => response.text())
                    .then(content => processInput(content))
                    .catch(error => {
                        console.error('Error fetching vocab file from URL:', error);
                        //alert('Error fetching vocab file from URL. Please make sure the URL is correct.');
                        broadcast("Error fetching vocab file from server. Please make sure to use our official domain.", "Okay", "", closeBroadcast, closeBroadcast)
                    });
}


function processInput(input) {
    const pairs = input.split(';');
    flashcards = pairs.map(pair => {
        const [rawVocab, rawTranslation] = pair.split('#').map(str => str.trim());
        console.log('[DEBUG] rawVocab:', rawVocab, 'rawTranslation:', rawTranslation);
        return { vocab: rawVocab, translation: rawTranslation };
    });

    flashcards = shuffle(flashcards);

    closePopup();
    startQuiz();
}

function readFile(file) {
    const reader = new FileReader();

    reader.onload = function (event) {
        const content = event.target.result;
        processInput(content);
    };

    reader.readAsText(file);
}

function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
}

let multipleChoiceMode = true;
let questioningDirection = 'AB';

function startQuiz() {
    document.querySelector('.homepage').style.display = 'none';
    document.querySelector('.quiz').style.display = 'block';
    console.log('[DEBUG] Starting the quiz!');

    // Find the shortest vocab
    let shortestVocab = flashcards[0].vocab;
  
    flashcards.forEach(card => {
        if (card.vocab.length < shortestVocab.length) {
            shortestVocab = card.vocab;
        }
    });

    // Find the translation corresponding to the shortest vocab
    const shortestTranslation = flashcards.find(card => card.vocab === shortestVocab).translation;

    console.log("A -> B: " + shortestVocab + " -> " + shortestTranslation + " | B -> A: " + shortestTranslation + " -> " + shortestVocab);

    broadcast("In which direction would you like to be quizzed?", shortestVocab + " -> " + shortestTranslation, shortestTranslation + " -> " + shortestVocab, directionAB, directionBA);
}


function directionAB() {
    closeBroadcast();
    questioningDirection = 'AB';
    broadcast("In which mode do you want to practice?", "Text-Mode", "Multiple Choice", chooseTextMode, chooseMultipleChoice)
}

function directionBA() {
    closeBroadcast();
    questioningDirection = 'BA';
    broadcast("In which mode do you want to practice?", "Text-Mode", "Multiple Choice", chooseTextMode, chooseMultipleChoice)
}

function chooseTextMode() {
    multipleChoiceMode = false;
    showNextCard();
    closeBroadcast();
}

function chooseMultipleChoice() {
    multipleChoiceMode = true;
    setupMultipleChoice();
    closeBroadcast();
}

function setupMultipleChoice() {
    if(flashcards.length < 4) {
        console.log("Error while shuffling array. Need more words!");
        alert("Error while shuffling your cards! You need at least 4 words for multiple choice");
        broadcast("Error while shuffling your cards! You need at least 4 words for multiple choice", "Okay", "", closeBroadcast, closeBroadcast);
        document.location.href = '';
    } else {
        const currentCard = flashcards[currentCardIndex];
        const options = createRandomOptions(currentCard);
    
        // Check the questioning direction and set up the correct question text
        const questionText = (questioningDirection === 'AB') ? currentCard.vocab : currentCard.translation;
    
        // Display question and options
        document.getElementById('question').innerText = questionText;
        document.getElementById('answerInput').value = ''; // Clear the answer input
        document.getElementById('answerInput').style.display = 'none';
        document.getElementById('submitbtn').style.display = 'none';
        // Display multiple choice options
        for (let i = 1; i <= 4; i++) {
            document.getElementById(`option${i}`).innerText = options[i - 1];
        }
    
        document.getElementById('options').style.display = 'block';
    
        updateProgressIndicator();
    
        console.log('[DEBUG] Showing next card in Multiple Choice mode!');
    }
}

function createRandomOptions(currentCard) {
    // Create an array with the correct answer and three random incorrect answers
    const options = [getOtherLanguage(currentCard)];

    while (options.length < 4) {
        const randomCard = getRandomFlashcard();
        const randomOption = getOtherLanguage(randomCard);

        if (!options.includes(randomOption)) {
            options.push(randomOption);
        }
    }

    // Shuffle the options array
    shuffle(options);

    return options;
}

function getOtherLanguage(card) {
    // Get the vocab or translation of the card depending on the questioning direction
    return (questioningDirection === 'AB') ? card.translation : card.vocab;
}

function getRandomFlashcard() {
    // Get a random flashcard that is not the current one
    let randomCard;

    do {
        randomCard = flashcards[Math.floor(Math.random() * flashcards.length)];
    } while (randomCard === flashcards[currentCardIndex]);

    return randomCard;
}

let totalQuestions = 0;
let correctAnswers = 0;

function checkAnswerMultipleChoice(optionNumber) {
    const selectedOption = document.getElementById(`option${optionNumber}`).innerText;
    const currentCard = flashcards[currentCardIndex];

    // Check the questioning direction and set up the correct answer accordingly
    const correctAnswer = (questioningDirection === 'AB') ? currentCard.translation : currentCard.vocab;

    if (selectedOption === correctAnswer) {
        console.log('[DEBUG] Multiple Choice - Correct Answer!');
        alert(`Correct: ${correctAnswer}!`);
        correctAnswers++;
    } else {
        console.log('[DEBUG] Multiple Choice - Incorrect Answer!');
        alert(`Incorrect. The correct answer is: ${correctAnswer}`);
    }

    totalQuestions++;

    currentCardIndex++;
    if (currentCardIndex < flashcards.length) {
        setupMultipleChoice();
    } else {
        endQuiz();
        console.log('[DEBUG] Ended the quiz!');
    }
}

function showNextCard() {
    if (currentCardIndex < flashcards.length) {
        const currentCard = flashcards[currentCardIndex];

        // Check the questioning direction and set up the question accordingly
        if (questioningDirection === 'AB') {
            document.getElementById('question').innerText = currentCard.vocab;
        } else {
            document.getElementById('question').innerText = currentCard.translation;
        }

        const correctAnswerOriginalCase = (questioningDirection === 'AB') ? currentCard.translation : currentCard.vocab;

        document.getElementById('answerInput').value = '';
        console.log('[DEBUG] Showing next card!');
        console.log('[DEBUG] currentCardIndex:', currentCardIndex + " / flashcards.length: " + flashcards.length);

        updateProgressIndicator();
    } else {
        endQuiz();
        console.log('[DEBUG] Ended the quiz!');
    }
}


function updateProgressIndicator() {
    const progressBar = document.getElementById('progressBar');
    const progressIndicator = document.getElementById('progressIndicator');

    const progressValue = (currentCardIndex / flashcards.length) * 100;
    progressBar.value = progressValue;
    progressIndicator.innerText = `${currentCardIndex} / ${flashcards.length}`;
}

flashcards.forEach(card => {
  card.score = 0;
  card.attempted = false;
});

let totalScore = 0;
let totalQuestionsText = 0;
let correctAnswersText = 0;
let partiallyCorrectAnswers = 0;

function checkAnswer() {
    const userAnswer = document.getElementById('answerInput').value.trim().toLowerCase();
    const currentCard = flashcards[currentCardIndex];

    // Check the questioning direction and set up the correct answer accordingly
    const correctAnswer = (questioningDirection === 'AB') ? currentCard.translation.toLowerCase() : currentCard.vocab.toLowerCase();
    const correctAnswerOriginalCase = (questioningDirection === 'AB') ? currentCard.translation : currentCard.vocab;

    const minLength = Math.min(userAnswer.length, correctAnswer.length);
    let correctLettersCount = 0;

    for (let i = 0; i < minLength; i++) {
        if (userAnswer[i] === correctAnswer[i]) {
            correctLettersCount++;
        }
    }

    const accuracy = correctLettersCount / Math.max(userAnswer.length, correctAnswer.length);
    const deviation = Math.abs(userAnswer.length - correctAnswer.length);
    const symbolsMissing = !userAnswer.includes('/') || !userAnswer.includes(',') || !userAnswer.includes('(') || !userAnswer.includes(')') || !userAnswer.includes('*');
    
    const wordWithMissingSymbols = correctAnswer.replace(/[\/\(\)\*.,]/g, '');
    const userAnswerWithMissingSymbols = userAnswer.replace(/[\/\(\)\*.,]/g, '');

    // Calculate the score based on adjusted accuracy
    let score;
    if (accuracy >= 1) {
        score = 1;
    } else if (accuracy >= accuracyThreshold && allowPartialCredit || deviation <= 1 && allowPartialCredit && userAnswer.length >= 4) { // Modified this line
        score = 0.5;
    } else {
        score = 0;
    }

    // Store the score in the flashcard
    flashcards[currentCardIndex].score = score;
    flashcards[currentCardIndex].attempted = true;

    // Add the score to the total
    totalScore += score;

    if (accuracy >= 1 || userAnswerWithMissingSymbols.toLowerCase() === wordWithMissingSymbols.toLowerCase()) {
        console.log("[DEBUG] Answer is correct!");
        console.log("Accuracy: " + accuracy + " | Deviation: " + deviation + " | Symbols Missing: " + symbolsMissing + " | Answer: " + userAnswer + " | Missing Symbols Answer: " + wordWithMissingSymbols + " | UserA wo symbols" + userAnswerWithMissingSymbols + " | Correct Answer: " + correctAnswer);
        alert(`Correct: ${correctAnswerOriginalCase}!`);
        correctAnswers++;
    } else if (score === 0.5) {
        console.log('[DEBUG] Answer is partially correct!');
        alert(`Partially Correct: ${correctAnswerOriginalCase}`);
        console.log("Accuracy: " + accuracy + " | Deviation: " + deviation + " | Symbols Missing: " + symbolsMissing + " | Answer: " + userAnswer + " | Missing Symbols Answer: " + wordWithMissingSymbols + " | UserA wo symbols" + userAnswerWithMissingSymbols + " | Correct Answer: " + correctAnswer);
        partiallyCorrectAnswers++;
    } else {
        console.log('[DEBUG] Answer is incorrect!');
        console.log("Accuracy: " + accuracy + " | Deviation: " + deviation + " | Symbols Missing: " + symbolsMissing + " | Answer: " + userAnswer + " | Missing Symbols Answer: " + wordWithMissingSymbols + " | UserA wo symbols" + userAnswerWithMissingSymbols + " | Correct Answer: " + correctAnswer);
        alert(`Incorrect. The correct answer is: ${correctAnswerOriginalCase}`);
    }

    totalQuestions++;

    currentCardIndex++;
    showNextCard();
}

const answerInput = document.getElementById('answerInput');

// Add an event listener for the 'keydown' event on the answer input
answerInput.addEventListener('keydown', function (event) {
    // Check if the key pressed is the Enter key (key code 13)
    if (event.keyCode === 13) {
        // Prevent the default behavior of the Enter key (e.g., form submission)
        event.preventDefault();
        // Call the checkAnswer function when Enter key is pressed
        checkAnswer();
    }
});

function returnAnswer() {
    const currentCard = flashcards[currentCardIndex];
    const correctAnswerOriginalCase = (questioningDirection === 'AB') ? currentCard.translation : currentCard.vocab;
    console.log(correctAnswerOriginalCase)
}


////////////
//END QUIZ//
////////////

function endQuiz() {
    const totalCards = flashcards.length;
    const percentageCorrect = (correctAnswers / totalQuestions) * 100;
    const totalNormalPoints = correctAnswers;
    const totalPartiallyCorrectPoints = partiallyCorrectAnswers / 2;
    const totalPoints = totalNormalPoints + totalPartiallyCorrectPoints;

    let message = '<b>Well done!</b>';

    if (percentageCorrect >= 95) {
        message = '<b>Exceptional work, bro!</b>';
    } else if (percentageCorrect >= 80) {
        message = '<b>Good job, keep it up!</b>';
    } else if (percentageCorrect >= 70) {
        message = '<b>Not (too) bad!</b>';
    } else if (percentageCorrect >= 60) {
        message = '<b>You can do better!</b>';
    } else if (percentageCorrect >= 50) {
        message = '<b>Man, please study!</b>';
    } else if (percentageCorrect >= 40) {
        message = '<b>You should definetly be studying more!</b>';
    } else if (percentageCorrect >= 30) {
        message = '<b>Damn, please study!</b>';
    } else {
        message = "<b>At this point I don't even know what to say</b>"
    }

    const quizElement = document.getElementById('quiz');
    quizElement.innerHTML = `
        <h2>Quiz Completed!</h2>
        <p>${message}</p>
        <p>Total Correct Answers: ${correctAnswers}</p>
        <p>Total Partially Correct Answers: ${partiallyCorrectAnswers}</p>
        <p>Total Questions: ${totalQuestions}</p>
        <p>Percentage Correct: ${percentageCorrect.toFixed(2)}%</p>
        <p>Total Points: ${totalPoints}</p>
        <div class="diagramCanvas-container">
            <canvas class="diagramCanvas" id="diagramCanvas" width="200" height="200"></canvas>
        </div>
        <button onclick="document.location.href = ''">End</button>
    `;

    // Get the context of the canvas element
    const ctx = document.getElementById('diagramCanvas').getContext('2d');

    // Create a pie chart
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Correct', 'Incorrect', 'Partially Correct'],
            datasets: [{
                data: [correctAnswers, (totalQuestions - partiallyCorrectAnswers) - correctAnswers, partiallyCorrectAnswers],
                backgroundColor: ['green', 'red', 'orange'],
            }],
        },
        options: {
            responsive: false, // Set to false to fix canvas size
        },
    });
}

function exportStudySet() {
  const formattedStudySet = flashcards.map(card => `${card.vocab}#${card.translation}`).join(';');
  const blob = new Blob([formattedStudySet], { type: 'text/plain' });
  const link = document.createElement('a');

  link.href = URL.createObjectURL(blob);
  link.download = 'studySet.wvocab';
  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);
}

function resetQuiz() {
    currentCardIndex = 0;
    startQuiz();
}
