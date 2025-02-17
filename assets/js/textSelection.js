document.addEventListener('mouseup', function(e) {
    let selection = window.getSelection();
    if (selection.toString().length > 0) {
        let range = selection.getRangeAt(0);
        let rect = range.getBoundingClientRect();
        showSaveButton(rect.right + window.scrollX, rect.top + window.scrollY, selection.toString());
    } else {
        hideSaveButton();
    }
});

function showSaveButton(x, y, selectedText) {
    var saveButton = document.getElementById("saveButton");
    saveButton.style.left = `${x}px`;
    saveButton.style.top = `${y}px`;
    saveButton.style.display = "block";

    saveButton.onclick = function() {
        saveTextAndComment(selectedText);
    };
}

function hideSaveButton() {
    var saveButton = document.getElementById("saveButton");
    if (saveButton) {
        saveButton.style.display = "none";
    }
}

function saveTextAndComment(selectedText) {
    var comment = prompt("Please enter your comment:", "");
    var url = window.location.href; // Gets the current page's URL
    var title = document.title; // Gets the current page's title

    if (comment !== null) {
        saveToLocalStorage(selectedText, comment, url, title);
    }
}

function saveToLocalStorage(text, comment, url, title) {
    var savedItems = JSON.parse(localStorage.getItem('savedText')) || [];
    savedItems.push({ text: text, comment: comment, url: url, title: title });
    localStorage.setItem('savedText', JSON.stringify(savedItems));
}

// The delete functionality should be handled where the saved items are displayed
// For instance, in a script tag in your saved-items.html

// Function to delete an item from local storage
function deleteSavedItem(index) {
    var savedItems = JSON.parse(localStorage.getItem("savedText")) || [];
    savedItems.splice(index, 1);
    localStorage.setItem("savedText", JSON.stringify(savedItems));
    // Optionally, refresh the displayed items
}
