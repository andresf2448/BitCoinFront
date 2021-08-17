export const conversorQuanti = (value) => {
  value = value.replace(/\./g, "");
  var array = value.split(",");
  var thousands = array[0];

  if (array[1] !== undefined) {
    return Number(thousands + "." + array[1]);
  }

  return Number(thousands);
};
