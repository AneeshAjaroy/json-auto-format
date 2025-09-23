export default function autoFormat(textarea) {
    if (!(textarea instanceof HTMLtextareaElement)) {
        throw new Error("auto format requires a textarea element")
    }

    textarea.addEventListener("keydown",function(e) {

        const pairs = {
            "{":"}",
            "[":"]",
            '"':'"'
        }

        const pairsComplete = {
            "{":"{}",
            "[":"[]",
            '"':'""'
        }

        const revPairs = {
            "}":"{",
            "]":"[",
            '"':'"'
        }

        let initialPos = textarea.selectionStart
        let finalPos = textarea.selectionEnd
        let beforeText = textarea.value.substring(0,initialPos)
        let afterText = textarea.value.substring(finalPos)
        let offsetLen = 0
        let borderOffset = ""
        let insertText = ""


        if (pairs[e.key]) {
            if (finalPos !== initialPos) {
                e.preventDefault()
                console.log(textarea.value.substring(initialPos,finalPos))
                insertText = e.key + textarea.value.substring(initialPos,finalPos) + pairs[e.key]
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
            if (pairsComplete[beforeKey] === beforeKey + afterKey) {
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
            textarea.value = beforeText + insertText + afterText
            textarea.selectionStart = initialPos + offsetLen
            textarea.selectionEnd = initialPos + offsetLen
        }

    })


}