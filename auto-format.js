export default function autoFormat(textarea) {
    if (!(textarea instanceof HTMLTextAreaElement)) {
        throw new Error("auto format requires a textarea element")
    }

    textarea.addEventListener("keydown",function(e) {

        const pairs = {
            "{":"}",
            "[":"]",
            '"':'"'
        }

        const revPairs = {
            "}":"{",
            "]":"[",
            '"':'"'
        }

        let initialPos = textArea.selectionStart
        let finalPos = textArea.selectionEnd
        let beforeText = textArea.value.substring(0,initialPos)
        let afterText = textArea.value.substring(finalPos)
        let offsetLen = 0
        let borderOffset = ""
        let insertText = ""


        if (pairs[e.key]) {
            if (finalPos !== initialPos) {
                e.preventDefault()
                console.log(textArea.value.substring(initialPos,finalPos))
                insertText = e.key + textArea.value.substring(initialPos,finalPos) + pairs[e.key]
                offsetLen = finalPos - initialPos + 3
            } else {
                e.preventDefault()
                insertText = e.key + pairs[e.key]
                offsetLen = 1
            }

        }

        if (revPairs[e.key] && afterText[0] === e.key) {
            e.preventDefault()
            offsetLen = 1
        }

        if (e.key === "Backspace") {
            beforeKey = beforeText.at(-1)
            afterKey = afterText[0]
            if (pairs[beforeKey] === beforeKey + afterKey) {
                e.preventDefault()
                offsetLen = -1
                beforeText = beforeText.slice(0,-1)
                afterText = afterText.slice(1)
            }
        }

        if (e.key === "Enter") {
            e.preventDefault()
            currentLine = beforeText.split("\n").at(-1)
            borderOffset = currentLine.includes('"') ? currentLine.split('"')[0] : ""
            if ((afterText[0] === "]") || (afterText[0] === "}")) {
                offsetLen = borderOffset.length + 3
                insertText = "\n" + " ".repeat(offsetLen) + "\n" + borderOffset
            } else if (beforeText.at(-1) === ",") {
                offsetLen = borderOffset.length + 1
                insertText = "\n" + " ".repeat(offsetLen)
            }
        }

        if (offsetLen !== 0) {
            textArea.value = beforeText + insertText + afterText
            textArea.selectionStart = initialPos + offsetLen
            textArea.selectionEnd = initialPos + offsetLen
        }

    })


}