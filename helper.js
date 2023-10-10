

function stringToJSON(inputString) {
  // Remove the "Processed Message: " prefix
  const jsonString = inputString.replace("Processed Message: ", "");

  try {
    // Parse the JSON string into a JavaScript object
    const jsonObject = JSON.parse(jsonString);
    return jsonObject;
  } catch (error) {
    // Handle any parsing errors, e.g., invalid JSON
    console.error("Error parsing JSON:", error);
    return null; // Return null in case of an error
  }
}


function parseFIXMessageToJSONObject(fixMessage) {
  try {
    console.log("welcome");
  } catch (error) {}
}

module.exports = {
  stringToJSON,
  parseFIXMessageToJSONObject,
  ConnctingToDatabase,
};
