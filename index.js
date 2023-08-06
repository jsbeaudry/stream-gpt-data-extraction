const { SSE } = require("sse.js");

let source;
const extractObjects = require("./extractObjects.js");

async function StreamTextResponse(OPENAIKEY, prompt, getResponse, status) {
  try {
    if (!OPENAIKEY) {
      getResponse("NO KEY FOUND");
      status("ERROR");
    }

    if (!prompt || !getResponse || !status) {
      getResponse("prompt & getResponse & status can't be null");
      status("ERROR");
    }

    status("STARTED");
    let url = "https://api.openai.com/v1/chat/completions";
    let data = {
      // model: "gpt-3.5-turbo",
      model: "gpt-4",

      messages: [
        {
          role: "system",
          content: ``,
        },
        {
          role: "user",
          content: `${prompt}`,
        },
      ],
      temperature: 0.7,
      top_p: 1,
      // max_tokens: 5000,
      stream: true,
    };
    //
    source = new SSE(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAIKEY}`,
      },
      method: "POST",
      payload: JSON.stringify(data),
    });

    let textTmp = "";
    source.addEventListener("message", (e) => {
      if (e.data !== "[DONE]") {
        status("STREAMING");
        let payload = JSON.parse(e.data);
        let text = payload.choices[0].delta.content;

        if (text && text !== "\n" && text !== undefined) {
          textTmp = textTmp + text;
          getResponse(textTmp);
        } else {
        }
      } else {
        status("COMPLETED");
        source.close();
      }
    });

    source.addEventListener("readystatechange", (e) => {
      if (e.readyState >= 2) {
        status("FINISHED");
      }
    });

    source.stream();
  } catch (error) {
    getResponse(error.toString());
    status("ERROR");
  }
}

async function StreamObjectResponse(OPENAIKEY, prompt, getResponse, status) {
  try {
    if (!OPENAIKEY) {
      getResponse("NO KEY FOUND");
      status("ERROR");
    }

    if (!prompt || !getResponse || !status) {
      getResponse("prompt & getResponse & status can't be null");
      status("ERROR");
    }

    status("STARTED");
    let url = "https://api.openai.com/v1/chat/completions";
    let data = {
      // model: "gpt-3.5-turbo",
      model: "gpt-4",

      messages: [
        {
          role: "system",
          content: "All response must be provide in JSON format",
        },
        {
          role: "user",
          content: `${prompt}`,
        },
      ],
      temperature: 0.7,
      top_p: 1,
      // max_tokens: 5000,
      stream: true,
    };
    //
    source = new SSE(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAIKEY}`,
      },
      method: "POST",
      payload: JSON.stringify(data),
    });

    let textTmp = "";
    source.addEventListener("message", (e) => {
      if (e.data !== "[DONE]") {
        status("STREAMING");
        let payload = JSON.parse(e.data);
        let text = payload.choices[0].delta.content;

        if (text && text !== "\n" && text !== undefined) {
          textTmp = textTmp + text;
          getResponse(extractObjects(textTmp));
        } else {
        }
      } else {
        status("FINISHED");
        source.close();
      }
    });

    source.addEventListener("readystatechange", (e) => {
      if (e.readyState >= 2) {
        status("FINISHED");
      }
    });

    source.stream();
  } catch (error) {
    getResponse(error.toString());
    status("ERROR");
  }
}

module.exports = { StreamTextResponse, StreamObjectResponse, extractObjects };
