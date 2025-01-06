const numDict = {
  zero: 0,
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
  ten: 10,
  eleven: 11,
  twelve: 12,
  thirteen: 13,
  fourteen: 14,
  fifteen: 15,
  sixteen: 16,
  seventeen: 17,
  eighteen: 18,
  nineteen: 19,
  twenty: 20,
  thirty: 30,
  forty: 40,
  fifty: 50,
  sixty: 60,
  seventy: 70,
  eighty: 80,
  ninety: 90,
};
// 0 - 99
function parseTen(expr) {
  if (Object.keys(numDict).includes(expr)) {
    return numDict[expr];
  }

  if (expr == "") return 0;

  let digit = expr.split(/[\s-]+/);

  return numDict[digit[0]] + numDict[digit[1]];
  // should I make the code more tolerant? more understanding?
  // maybe later...
}
// 100 - 999
function parseHundred(expr) {
  let match = /\s*hundred\s*(and)?\s*/.exec(expr);

  match = expr.split(match[0]);

  return numDict[match[0]] * 100 + parseTen(match[1]);
}
// 1000 - 999999 (one hundred thousand to nine hundred and ninety-nine thousand)
function parseThousand(expr) {
  let match = expr.split(/\s*thousand/);
  if (match[0].includes("hundred")) {
    return parseHundred(match[0]) * 1000;
  } else {
    return parseTen(match[0]) * 1000;
  }
}
// 1 million -> 999 mil
function parseMillion(expr) {
  let match = expr.split(/\s*million/);
  if (match[0].includes("hundred")) {
    return parseHundred(match[0]) * 1000000;
  } else {
    return parseTen(match[0]) * 1000000;
  }
}

function parseInt(expr) {
  expr = expr.toLowerCase(); // converting everything to lower case
  let search = ["million", "thousand", "hundred"];

  let res = [];

  for (let s of search) {
    expr = expr.trim(); // removing trailing white spaces
    let first = expr.search(s);
    // i didn't check for cases where the search fails
    if (first != -1) {
      res.push(expr.slice(0, first + s.length));
      expr = expr.slice(first + s.length);
    }
  }
  // tens if present
  if (expr.trim().length > 0) {
    // checking for unnecessary "and"
    let first = expr.search("and");

    if (first != -1) {
      let valid = expr.slice(first + 3).trim();
      res.push(valid);
    } else {
      res.push(expr.trim());
    }
  }

  let int = 0;

  for (let r of res) {
    if (r.includes("million")) {
      int += parseMillion(r);
    } else if (r.includes("thousand")) {
      int += parseThousand(r);
    } else if (r.includes("hundred")) {
      int += parseHundred(r);
    } else {
      int += parseTen(r);
    }
  }
  return int;
}

module.exports = {
    parseInt
}
