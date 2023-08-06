// extractObjects.test.js

// import extractObjects from "../extractObjects";
const extractObjects = require("../extractObjects");
describe("extractObjects", () => {
  it("should extract valid objects from the input string", () => {
    const inputString = '[{"name": "John"}, {"name": "Jane"}]';

    const result = extractObjects(inputString);

    expect(result).toEqual([{ name: "John" }, { name: "Jane" }]);
  });

  it("should handle invalid objects and return only valid ones", () => {
    const inputString = '[{"name": "John"}, invalidObj, {"name": "Jane"}]';

    const result = extractObjects(inputString);

    expect(result).toEqual([{ name: "John" }, { name: "Jane" }]);
  });

  it("should return an empty array for an invalid input string", () => {
    const inputString = "This is not a valid object string";

    const result = extractObjects(inputString);

    expect(result).toEqual([]);
  });
});
