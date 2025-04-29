function displayText() {
    const inputField = document.getElementById('textInput');
    const displayArea = document.getElementById('displayText');
    displayArea.textContent = inputField.value;
}