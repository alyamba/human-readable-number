const NUMBERS_WORDS = {
    0: "zero",
    1: "one",
    2: "two",
    3: "three",
    4: "four",
    5: "five",
    6: "six",
    7: "seven",
    8: "eight",
    9: "nine",
    10: "ten",
    11: "eleven",
    12: "twelve",
    13: "thirteen",
    14: "fourteen",
    15: "fifteen",
    16: "sixteen",
    17: "seventeen",
    18: "eighteen",
    19: "nineteen",
    20: "twenty",
    30: "thirty",
    40: "forty",
    50: "fifty",
    60: "sixty",
    70: "seventy",
    80: "eighty",
    90: "ninety",
};

const HUNDRED_WORD = "hundred";
const THOUSAND_WORD = "thousand";
const MILLION_WORD = "million";
const BILLION_WORD = "billion";

module.exports = function toReadable(number) {
    let numberWordsString = "";
    let wholePart = 0;

    if (Math.trunc(number / 1000000000) > 0) {
        wholePart = Math.trunc(number / 1000000000);
        numberWordsString =
            numberWordsString + hundreds(wholePart) + " " + BILLION_WORD;
        if (Math.trunc(number / 1000000) > 0) {
            wholePart = Math.trunc(number / 1000000);
            numberWordsString =
                numberWordsString +
                " " +
                hundreds(wholePart) +
                " " +
                MILLION_WORD;
            number = number % 1000000;
            if (Math.trunc(number / 1000) > 0) {
                wholePart = Math.trunc(number / 1000);
                numberWordsString =
                    numberWordsString +
                    " " +
                    hundreds(wholePart) +
                    " " +
                    THOUSAND_WORD;
                number = number % 1000;
                if (number > 0) {
                    wholePart = number;
                    numberWordsString =
                        numberWordsString + " " + hundreds(wholePart);
                }
            }
        }
    } else if (Math.trunc(number / 1000000) > 0) {
        wholePart = Math.trunc(number / 1000000);
        numberWordsString =
            numberWordsString + hundreds(wholePart) + " " + MILLION_WORD;
        number = number % 1000000;
        if (Math.trunc(number / 1000) > 0) {
            wholePart = Math.trunc(number / 1000);
            numberWordsString =
                numberWordsString +
                " " +
                hundreds(wholePart) +
                " " +
                THOUSAND_WORD;
            number = number % 1000;
            if (number > 0) {
                wholePart = number;
                numberWordsString =
                    numberWordsString + " " + hundreds(wholePart);
            }
        }
    } else if (Math.trunc(number / 1000) > 0) {
        wholePart = Math.trunc(number / 1000);
        numberWordsString =
            numberWordsString + hundreds(wholePart) + " " + THOUSAND_WORD;
        number = number % 1000;
        if (number > 0) {
            wholePart = number;
            numberWordsString = numberWordsString + " " + hundreds(wholePart);
        }
    } else if (number > 0) {
        wholePart = number;
        numberWordsString = numberWordsString + hundreds(wholePart);
    } else if (number === 0) {
        numberWordsString = NUMBERS_WORDS[number];
    }
    return numberWordsString;
};

function hundreds(wholePart) {
    let hundred = 0;
    let ten = 0;
    let numberWordsStringHundred = "";
    if (Math.trunc(wholePart / 100) > 0) {
        hundred = Math.trunc(wholePart / 100);
        numberWordsStringHundred =
            numberWordsStringHundred + NUMBERS_WORDS[hundred];
        numberWordsStringHundred =
            numberWordsStringHundred + " " + HUNDRED_WORD;
        wholePart = wholePart % 100;
        if (wholePart < 100 && wholePart > 20) {
            ten = Math.trunc(wholePart / 10);
            numberWordsStringHundred =
                numberWordsStringHundred + " " + NUMBERS_WORDS[ten * 10];
            wholePart = wholePart % 10;
            if (wholePart > 0) {
                numberWordsStringHundred =
                    numberWordsStringHundred + " " + NUMBERS_WORDS[wholePart];
            }
        } else if (wholePart > 0) {
            numberWordsStringHundred =
                numberWordsStringHundred + " " + NUMBERS_WORDS[wholePart];
        }
    } else if (wholePart < 100 && wholePart > 20) {
        ten = Math.trunc(wholePart / 10);
        numberWordsStringHundred =
            numberWordsStringHundred + NUMBERS_WORDS[ten * 10];
        wholePart = wholePart % 10;
        if (wholePart > 0) {
            numberWordsStringHundred =
                numberWordsStringHundred + " " + NUMBERS_WORDS[wholePart];
        }
    } else if (wholePart > 0) {
        numberWordsStringHundred =
            numberWordsStringHundred + NUMBERS_WORDS[wholePart];
    }
    return numberWordsStringHundred;
}
