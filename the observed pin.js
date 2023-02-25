const pad = [
   ["1", "2", "3"],
  ["4", "5", "6"],
  ["7", "8", "9"],
  ["", "0", ""],
];

function getPINs(observed) {
  var pins = [];
  get_all_variations(observed).forEach((v) => {
    pins.push(...get_all_variations(v));
  });
    pins = [...new Set(pins)];

  return pins;
}

function neighbours(i, j) {
  const result = [pad[i][j]];

  if (i > 0 && pad[i - 1][j] !== "") result.push(pad[i - 1][j]);
  if (i < 3 && pad[i + 1][j] !== "") result.push(pad[i + 1][j]);
  if (j > 0 && pad[i][j - 1] !== "") result.push(pad[i][j - 1]);
  if (j < 2 && pad[i][j + 1] !== "") result.push(pad[i][j + 1]);

  return result;
}

function variations(observed, index) {
  //   console.log("variations de ", ~~observed, " a partir de ", ~~observed[index]);
  if (index === observed.length) return [];

  const i = Math.floor(pad.flat().indexOf(observed[index]) / 3);
  const j = pad.flat().indexOf(observed[index]) % 3;
  const result = [];
  neighbours(i, j).forEach((n) => {
    let splitted = observed.split("");
    splitted[index] = n;
    result.push(splitted.join(""));
  });

  return result;
}

function get_all_variations(observed) {
  let result = [];
  for (let i = 0; i < observed.length; i++) {
    result = result.concat(variations(observed, i));
  }
  // retirer les doublons
  const set = new Set(result);
  return [...set];
}

console.log(getPINs("11"));
