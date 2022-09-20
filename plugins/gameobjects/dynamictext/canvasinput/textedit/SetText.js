import { diffChars as DiffChars } from 'diff';

var SetText = function (textObject, newText) {
    var text = textObject.text;
    if (newText === text) {
        return;
    }

    // textObject.setText(newText);

    var results = DiffChars(text, newText);
    var charIndex = 0;
    for (var i = 0, cnt = results.length; i < cnt; i++) {
        var result = results[i];
        if (result.removed) {
            // Remove character at charIndex
            textObject.removeText(charIndex, result.count);
        } else if (result.added) {
            textObject.insertText(charIndex, result.value);
            charIndex += result.count;
        } else {
            charIndex += result.count;
        }
    }

    textObject.runWordWrap();
}

export default SetText;