# Stream Gpt Data Extraction

### Overview

The Stream GPT Data Extraction NPM package is a powerful tool that allows users to interact with OpenAI's GPT-4 language model and stream text in real-time. With this package, you can send partial prompts to the GPT-4 model, receive intermediate responses, and extract objects from the generated text before the complete response is received. This flexibility empowers developers to build dynamic applications that make the most out of GPT-4's capabilities.

### Installation

To install the package, you can use npm or yarn. Open your terminal or command prompt and run the following command:

```bash
npm install stream-gpt-data-extraction sse.js
OR
yarn add stream-gpt-data-extraction sse.js
```

### Usage

##### Initializing GPT-4 Text Streaming

To start using GPT-4 Text Streaming, you need to provide your OpenAI API key and the prompt. If you don't have one, sign up at the [OpenAI website](https://openai.com) to obtain your API key.

```bash
 StreamTextResponse(
      OPENAI_KEY,
      "Hello",
      (response) => console.log("RESPONSE", response),
      (status)   => console.log("STATUS", status)
 );
```

##### Initializing GPT-4 objects Streaming

To start using GPT-4 Object Streaming, you need to provide your OpenAI API key and the prompt.

```bash
 StreamObjectResponse(
      OPENAI_KEY,
      "Two Chuck Norris Jokes to make you laugh",
      (response) => console.log("RESPONSE", response),
      (status)   => console.log("STATUS", status)
 );
```

![Alt text](https://res.cloudinary.com/dfzp7vpre/image/upload/v1691122968/video/Screen_Shot_2023-08-04_at_12.22.04_AM.png)

Check out [VIDEO](https://res.cloudinary.com/dfzp7vpre/video/upload/v1691122365/video/stream-gpt-demo.mp4)

### License

This package is released under the MIT License. Feel free to use it in your projects.

### Acknowledgements

This package is built on top of OpenAI's GPT-4 language model. Special thanks to the team at OpenAI for their amazing work.

# imancity

Check out our [npm-ai.com](npm-ai.com) to know more.
