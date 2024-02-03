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
//  Source code was last modified on 2024-02-02

//  THIS IS THE CODE FOR THE VOCAB BUILDER APP
//  THIS CODE IS NOT FOR THE FLASHCARD APP

////////////////
//DEPENDENCIES//
////////////////

var isDragDropEnabled = true;

//////////
//POPUPS//
//////////

function openPopup() {
    document.getElementById('popup').style.display = 'block';
}

function closePopup() {
    document.getElementById('popup').style.display = 'none';
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

console.log('TurboTerms Vocab Builder initialized.');

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

/////////////
//STUDYSETS//
/////////////

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

/////////////////
//VOCAB-BUILDER//
/////////////////

let vocabTable = document.getElementById('vocabTable');

function addRow() {
    const newRow = vocabTable.insertRow(-1);
    const cell1 = newRow.insertCell(0);
    const cell2 = newRow.insertCell(1);
    const cell3 = newRow.insertCell(2);

    newRow.className = 'vocab-row';
    newRow.draggable = true;
    newRow.ondragstart = handleDragStart;

    const inputVocab = document.createElement('input');
    inputVocab.type = 'text';
    inputVocab.className = 'vocab-input';
    inputVocab.placeholder = 'Enter Vocab';
    inputVocab.addEventListener('keydown', handleEnterKey);
    cell1.appendChild(inputVocab);

    const inputTranslation = document.createElement('input');
    inputTranslation.type = 'text';
    inputTranslation.className = 'translation-input';
    inputTranslation.placeholder = 'Enter Translation';
    inputTranslation.addEventListener('keydown', handleEnterKey);
    cell2.appendChild(inputTranslation);

    const deleteButton = document.createElement('button');
    deleteButton.innerText = '🗑️';
    deleteButton.onclick = function () {
        deleteRow(this);
    };
    cell3.className = 'action-cell';
    cell3.appendChild(deleteButton);

    // Automatically focus on the first input field of the new row
    inputVocab.focus();
}

function handleEnterKey(event) {
    if (event.key === 'Enter') {
        // If Enter key is pressed, add a new row
        addRow();
    }
}




function deleteRow(row) {
  const rowIndex = row.parentNode.parentNode.rowIndex;
  vocabTable.deleteRow(rowIndex);
}

function importVocabQuestion() {
    broadcast("Do you want to import a vocab set? Your current set will be overwritten.", "Yes", "No", importVocabModal, closeBroadcast);
}

function exportVocabQuestion() {
    broadcast("Do you want to export the vocab set?", "Yes", "No", exportVocabModal, closeBroadcast);
}

function exportVocabModal(){
    exportVocab();
    closeBroadcast();
}

function importVocabModal(){
    importVocab();
    closeBroadcast();
}

function exportVocab() {
  let vocabArray = [];
  for (let i = 1; i < vocabTable.rows.length; i++) {
    let vocab = vocabTable.rows[i].cells[0].querySelector('.vocab-input').value;
    let translation = vocabTable.rows[i].cells[1].querySelector('.translation-input').value;
    if (vocab !== '' && translation !== '') {
      vocabArray.push(`${vocab}#${translation}`);
    }
  }
  const formattedVocab = vocabArray.join(';');
  const blob = new Blob([formattedVocab], { type: 'text/plain' });
  const link = document.createElement('a');

  link.href = URL.createObjectURL(blob);
  link.download = 'vocabSet.wvocab';
  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);
}

function importVocab() {
  const importFileBtn = document.getElementById('importFileBtn');
  importFileBtn.click();

  importFileBtn.addEventListener('change', function () {
    const file = importFileBtn.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = function (e) {
        const importedVocab = e.target.result;
        populateTable(importedVocab);
      };

      reader.readAsText(file);
    }
  });
}

function populateTable(importedVocab) {
  // Clear existing rows
  while (vocabTable.rows.length > 1) {
    vocabTable.deleteRow(1);
  }

  // Split and populate the new rows
  const vocabPairs = importedVocab.split(';');
  for (const pair of vocabPairs) {
    const [vocab, translation] = pair.split('#');
    addRow();
    const lastRow = vocabTable.rows[vocabTable.rows.length - 1];
    lastRow.cells[0].querySelector('.vocab-input').value = vocab;
    lastRow.cells[1].querySelector('.translation-input').value = translation;
  }
}

////////////////
//DRAG 'N DROP//
////////////////

let draggedItem = null;

function handleDragStart(e) {
    draggedItem = e.target.closest('.vocab-row');
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', draggedItem);
 }
 

function handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    const dropTarget = e.target.closest('.vocab-row');
    if (dropTarget) {
        dropTarget.classList.add('drag-over');
    }
}

function handleDragLeave(e) {
    const dropTarget = e.target.closest('.vocab-row');
    if (dropTarget) {
        dropTarget.classList.remove('drag-over');
    }
}

function handleDragEnd() {
    const draggables = document.querySelectorAll('.vocab-row');
    draggables.forEach((draggable) => {
        draggable.classList.remove('drag-over');
    });
}


function handleDrop(e) {
    if (e.stopPropagation) {
       e.stopPropagation(); // stops the browser from redirecting.
    }
 
    if (draggedItem !== e.target) {
       // Swap the positions of the dragged item and the drop target
       const dropTarget = e.target.closest('.vocab-row');
       const draggedIndex = Array.from(dropTarget.parentNode.children).indexOf(draggedItem);
       const dropIndex = Array.from(dropTarget.parentNode.children).indexOf(dropTarget);
 
       // Swap the rows
       document.getElementById('draggableBody').insertBefore(draggedItem, dropTarget.nextSibling);
 
       // Clear the dragged item
       draggedItem = null;
    }
 
    return false;
 }


// Add event listeners to the drop target
document.getElementById('draggableBody').addEventListener('dragover', handleDragOver);
document.getElementById('draggableBody').addEventListener('drop', handleDrop);
document.getElementById('draggableBody').addEventListener('dragleave', handleDragLeave);
document.getElementById('draggableBody').addEventListener('dragend', handleDragEnd);
document.getElementById('draggableBody').addEventListener('dragstart', handleDragStart);

addRow();