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

function handleJsonString(originContent, shouldCompress) {
    if (shouldCompress) {
        return compressJson(originContent);
    } else {
        return formatJson(originContent);
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
