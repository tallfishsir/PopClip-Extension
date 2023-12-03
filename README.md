# PopClip-Extension

NOTE: Installing this extension will trigger a warning as it is not an officially [signed extension](https://github.com/pilotmoon/PopClip-Extensions#extension-signing) from Pilotmoon Software. If you have any doubts, please take the time to review the source code.

## FormatJson

This extension is used to quickly format selected JSON data. When the modifiers key is pressed, the formatted JSON data can be compressed into a single line.

The Modifier key can be selected from the following three options:

- Command (⌘)
- Control (⌃)
- Option (⌥)

After completing the operation, you can choose from the following three actions to modify the original data:

- Replace original text
- Append with newline
- Save to Clipboard

## TransWriter

This extension uses OpenAI's capabilities to translate the selected content into your target language. Currently, it supports API calls for both OpenAI and Azure OpenAI.

After completing the operation, you can choose from the following three actions to modify the original data:

- Replace original text
- Append with newline
- Save to Clipboard

## ChatGPTs

This extension allows users to set their own custom prompt to achieve more flexible functionality.Currently, it supports API calls for both OpenAI and Azure OpenAI.

After completing the operation, you can choose from the following three actions to modify the original data:

- Replace original text
- Append with newline
- Save to Clipboard

## Features

- Chat with ChatGPT using any text you have selected.
    - Per application chat histories (the chat histories are only kept for contextual use and are currently hidden).
    - The histories will expire automatically if there is no interaction with the application for 20 minutes. Click while holding the shift (⇧) key to force clear the history.
- Opinioned actions:
    - Revising texts with reasons.
    - Polishing texts and correcting the grammar.
    - Translating texts.
    - Summarizing texts.
    - The above functions will use the primary language by default, click while holding the shift (⇧) key to use the secondary languages.
- Any API that is compatible with [the OpenAI chat completions API](https://platform.openai.com/docs/api-reference/chat/create) is supported.
    - Special support for [the Microsoft Azure OpenAI service](https://learn.microsoft.com/en-us/azure/ai-services/openai/reference#chat-completions).
        - Base URL format: `https://{resource-name}.openai.azure.com/openai/deployments/{deployment-id}`

This extension will attempt to paste(append) the result directly into the active application if the paste command is available. If not, it will copy the result and provide a preview(with possible truncation due to the current limitations of PopClip).


## Thanks

These extensions are inspired by  [ChatGPTx](https://github.com/damnever/ChatGPTx.popclipext) and [ChatGPT.popclipext](https://github.com/pilotmoon/PopClip-Extensions/tree/master/source/ChatGPT.popclipext).