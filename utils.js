export function iterateObj(obj, step) {
  const newObj = {};
  Object.entries(obj).reduce((acc, curr, i, arr) => {
    if (i + 1 <= step) {
      acc[curr[0]] = curr[1];
    }
    return acc;
  }, newObj);
  if (newObj.date) {
    newObj.time = obj.time;
  }

  return newObj;
}
