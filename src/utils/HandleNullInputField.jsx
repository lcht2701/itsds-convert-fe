export function handleNullInputField(data) {
  return Object.keys(data).reduce((acc, key) => {
    if (data[key] !== null && data[key] !== "") {
      acc[key] = data[key];
    }
    return acc;
  }, {});
}
