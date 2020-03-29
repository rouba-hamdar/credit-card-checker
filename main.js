// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8];
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9];
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6];
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5];
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6];

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5];
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3];
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4];
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5];
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4];

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4];
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9];
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3];
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3];
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3];

// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5];


// Add your functions below:

// Check if a credit card number is valid or invalid
const validateCred = numArr => {
  let sum = 0;
  for (let i = numArr.length - 1; i >= 0; i--) {
    if ((numArr.length - 1 - i) % 2 === 1) {
      digit = numArr[i] * 2;
      if (digit > 9) {
        digit -= 9;
      }
    } else {
      digit = numArr[i];
    }
    sum += digit;
  }
  return (sum % 10 === 0);
}

// Test function:
console.log(validateCred(valid1)); // Should print true
console.log(validateCred(invalid1)); // Should print false

// Return invalid numbers in the batch
const findInvalidCards = batch => {
  const invalidCards = [];
  for (let i = 0; i < batch.length; i++) {
    if (!validateCred(batch[i])) {
      invalidCards.push(batch[i]);
    }
  }
  return invalidCards;
}

// Test function:
console.log(findInvalidCards([valid1, valid2, valid3, valid4, valid5]));// Shouldn't print anything
console.log(findInvalidCards([invalid1, invalid2, invalid3, invalid4, invalid5])); // Should print all of the numbers
console.log(findInvalidCards(batch)); // Test what the mystery numbers are

// Identify the companies which issued invalid credit card numbers
const idInvalidCardCompanies = invalidBatch => {
  const companies = [];
  for (let i = 0; i < invalidBatch.length; i++) {
    if (invalidBatch[i][0] === 3) {
      if (companies.indexOf('Amex') === -1) {
        companies.push('Amex');
      }
    } else if (invalidBatch[i][0] === 4) {
      if (companies.indexOf('Visa') === -1) {
        companies.push('Visa');
     }
    } else if (invalidBatch[i][0] === 5) {
      if (companies.indexOf('MasterCard') === -1) {
        companies.push('MasterCard');
      }
    } else if (invalidBatch[i][0] === 6) {
      if (companies.indexOf('Discover') === -1) {
        companies.push('Discover');
      }
    } else {
      companies.push('Company not found');
    }
  }
  return companies;
}

// Test function:
console.log(idInvalidCardCompanies([invalid1])); // Should print['visa']
console.log(idInvalidCardCompanies([invalid2])); // Should print ['mastercard']
console.log(idInvalidCardCompanies(batch)); // Find out which companies have mailed out invalid cards

// Function that accepts a string and converts it into an array of numbers
const convertStringToArray = str => {
  const numArr = Array.from(str).map(str => parseInt(str));
  return numArr;
}

// Test function:
console.log(convertStringToArray('4539677908016808')); // Should print[ 4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8 ]

// Function that accepts a string and check if a credit card number is valid or invalid
const validateStrCred = str => {
  const numArr = convertStringToArray(str);
  return (validateCred(numArr));
}

// Test function:
console.log(validateStrCred('4539677908016808')); // Should print true
console.log(validateStrCred('4539677908016805')); // Should print false

// Function that converts invalid numbers into valid numbers 
const convertInvalidNumbers = str => {
  const numArr = convertStringToArray(str);
  let sum = 0;
  for (let i = numArr.length - 1; i >= 0; i--) {
    if ((numArr.length - 1 - i) % 2 === 1) {
      digit = numArr[i] * 2;
      if (digit > 9) {
        digit -= 9;
      }
    } else {
      digit = numArr[i];
    }
    sum += digit;
  }
  sum = sum - numArr[numArr.length - 1];
  checkDigit = (sum * 9) % 10;
  numArr[numArr.length - 1] = checkDigit;
  return numArr.join('');
}

// Test function:
console.log(convertInvalidNumbers('4539677908016806')); // Should print[ 4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8 ]