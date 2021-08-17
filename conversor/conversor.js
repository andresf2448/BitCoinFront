export const conversor = (coin, value) => {
  let str = value.toString();
  let array = str.split(".");

  var thousands = Intl.NumberFormat().format(Number(array[0]));

  if (coin === "btc") {
    var decimals = array[1].slice(0, 8);
  }

  if (coin === "usd") {
    var decimals = array[1].slice(0, 2);
  }

  let result = thousands + "," + decimals;

  return result;
};
