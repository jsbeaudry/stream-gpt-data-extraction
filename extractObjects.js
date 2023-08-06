function extractObjects(arrayString) {
  const objectPattern = /{[^{}]*}/g;
  const objects = arrayString.match(objectPattern);

  if (objects) {
    const parsedObjects = objects.map((objString) => {
      try {
        return JSON.parse(objString);
      } catch (error) {
        console.error("Error parsing object:", error);
        return null;
      }
    });

    const validObjects = parsedObjects.filter((obj) => obj !== null);
    return validObjects;
  }

  return [];
}

module.exports = extractObjects;
