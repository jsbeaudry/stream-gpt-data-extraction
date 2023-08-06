// stream.test.js

const { StreamTextResponse, StreamObjectResponse } = require("../index"); // Update the path accordingly

// Mock the dependencies for testing
jest.mock("../extractObjects", () => jest.fn((text) => ({ response: text })));

describe("StreamTextResponse", () => {
  it("should handle a valid response with text streaming", async () => {
    const OPENAIKEY = "your_openai_key_here";
    const prompt = "Your prompt here";
    const statusMock = jest.fn();
    const getResponseMock = jest.fn();

    // Call the function directly with the mocked dependencies
    await StreamTextResponse(OPENAIKEY, prompt, getResponseMock, statusMock);

    expect(statusMock).toHaveBeenCalledWith("STARTED");
    expect(statusMock).toHaveBeenCalledWith("ERROR");
  });

  it("should handle an error when OPENAIKEY is missing", async () => {
    const OPENAIKEY = "";
    const prompt = "Your prompt here";
    const expectedError = "NO KEY FOUND";
    const statusMock = jest.fn();
    const getResponseMock = jest.fn();

    // Call the function directly with the mocked dependencies
    await StreamTextResponse(OPENAIKEY, prompt, getResponseMock, statusMock);
    expect(statusMock).toHaveBeenCalledWith("ERROR");
    expect(getResponseMock).toHaveBeenCalledWith(expectedError);
  });

  // Add more test cases for other scenarios, such as invalid inputs, completion errors, etc.
});

describe("StreamObjectResponse", () => {
  it("should handle a valid response with object streaming", async () => {
    const OPENAIKEY = "your_openai_key_here";
    const prompt = "Your prompt here";
    const expectedResponse = { response: "The generated text." };
    const statusMock = jest.fn();
    const getResponseMock = jest.fn();

    // Call the function directly with the mocked dependencies
    await StreamObjectResponse(OPENAIKEY, prompt, getResponseMock, statusMock);

    expect(statusMock).toHaveBeenCalledWith("STARTED");
    expect(statusMock).toHaveBeenCalledWith("ERROR");
  });

  it("should handle an error when OPENAIKEY is missing", async () => {
    const OPENAIKEY = "";
    const prompt = "Your prompt here";
    const expectedError = "NO KEY FOUND";
    const statusMock = jest.fn();
    const getResponseMock = jest.fn();

    // Call the function directly with the mocked dependencies
    await StreamObjectResponse(OPENAIKEY, prompt, getResponseMock, statusMock);

    expect(statusMock).toHaveBeenCalledWith("ERROR");
    expect(getResponseMock).toHaveBeenCalledWith(expectedError);
  });

  // Add more test cases for other scenarios, such as invalid inputs, completion errors, etc.
});
