"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

function formatJson(jsonString) {
    const jsonData = JSON.parse(jsonString);
    return JSON.stringify(jsonData, null, 4);
}

function compressJson(jsonString) {
    const jsonData = JSON.parse(jsonString);
    return JSON.stringify(jsonData);
}

function decodeUnicode(str) {
    return str.replace(/\\u[\dA-F]{4}/gi, function (match) {
        return String.fromCharCode(parseInt(match.replace(/\\u/g, ''), 16));
    });
}

function handleJsonString(originContent, shouldCompress) {
    const decodeUnicodeContent = decodeUnicode(originContent);
    if (shouldCompress) {
        return compressJson(decodeUnicodeContent);
    } else {
        return formatJson(decodeUnicodeContent);
    }
}

function shouldCompress(options) {
    if (options.compressWith === "command") {
        return popclip.modifiers.command;
    } else if (options.compressWith === "control") {
        return popclip.modifiers.control;
    } else if (options.compressWith === "option") {
        return popclip.modifiers.option;
    }
    return false;
}

const chat = (input, options) => {
    try {
        const originContent = input.text;
        const result = handleJsonString(originContent, shouldCompress(options));

        if (options.afterAction === "replace") {
            popclip.pasteText(result);
        } else if (options.afterAction === "append") {
            popclip.pasteText(originContent.trim() + '\n' + result);
        } else {
            popclip.copyText(result);
        }
    } catch (e) {
        popclip.showText("json format error");
    }
};

exports.actions = [{
    code: chat,
}];
