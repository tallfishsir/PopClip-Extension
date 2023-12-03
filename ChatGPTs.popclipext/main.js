"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.actions = exports.getErrorInfo = void 0;

const axios = require("axios");

function createApi(options) {
    const axiosConfig = {
        baseURL: options.url,
        headers: {
            'Content-Type': 'application/json'
        }
    };
    if (options.model === "ChatGPT OpenAI") {
        axiosConfig.headers['Authorization'] = `Bearer ${options.apikey}`;
    } else if (options.model === "Azure OpenAI") {
        axiosConfig.headers['api-key'] = options.apikey;
    }
    return axios.create(axiosConfig);
}

function requestInfo(options, requestApi, messages) {
    if (options.model === "ChatGPT OpenAI") {
        return requestApi.post("", {
            model: "gpt-3.5-turbo-16k",
            messages,
        });
    } else if (options.model === "Azure OpenAI") {
        return requestApi.post("", {
            messages,
        });
    } else {
        throw new Error("Unsupported model");
    }
}

function makeMessage(input, options, index) {
    const messages = [];
    const originContent = input.text;
    let systemContent = "";
    if (index == 1) {
        systemContent = options.action1;
    } else if (index == 2) {
        systemContent = options.action2;
    } else if (index == 3) {
        systemContent = options.action3;
    }
    const userContent = `Ignore all previous commands, ${systemContent} : ${originContent}`
    messages.push({ role: "user", content: userContent });
    return messages
}

async function doAction(popclip, input, options, index) {
    const requestApi = createApi(options);
    const messages = makeMessage(input, options, index);
    try {
        const { data } = await requestInfo(options, requestApi, messages);
        const originContent = input.text;
        const result = data.choices[0].message.content.trim();
        if (options.afterAction === "replace") {
            popclip.pasteText(result);
        } else if (options.afterAction === "append") {
            popclip.pasteText(originContent.trim() + '\n' + result);
        } else {
            popclip.copyText(result);
        }
    } catch (e) {
        popclip.showText(getErrorInfo(e));
    }
}

function getErrorInfo(error) {
    if (typeof error === "object" && error !== null && "response" in error) {
        const response = error.response;
        return `Message from OpenAI (code ${response.status}): ${response.data.error.message}`;
    } else {
        return String(error);
    }
}
exports.getErrorInfo = getErrorInfo;
exports.actions = [
    {
        icon: "symbol:1.square",
        requirements: ["text", "option-enableAction1=1"],
        code: async (input, options) => doAction(popclip, input, options, 1),
    },
    {
        icon: "symbol:2.square",
        requirements: ["text", "option-enableAction2=1"],
        code: async (input, options) => doAction(popclip, input, options, 2),
    },
    {
        icon: "symbol:3.square",
        requirements: ["text", "option-enableAction3=1"],
        code: async (input, options) => doAction(popclip, input, options, 3),
    }
]