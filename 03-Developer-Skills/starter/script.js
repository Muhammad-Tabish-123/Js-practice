// Remember, we're gonna use strict mode in all scripts now!
'use strict';

/*
let x = 23;
if (x === 23) console.log(23);

const calAge = birthYear => 2037 - birthYear;

console.log(calAge(2037));

console.log('isLve');
*/

/*
// PROBLEM 1:
// We work for a company building a smart home thermometer. Our most recent task is this: "Given an array of temperatures of one day, calculate the temperature amplitude. Keep in mind that sometimes there might be a sensor error."

//Difference between max and min temp
//cal max
//cal mn
//if error assume 0 or ignored;
const temperatures = ['error', 3, -2, -6, -1, 'error', 9, 13, 17, 15, 14, 9, 5];
const arr2 = [55, 100, -100];

const calAmplitude = (temperatures, arr2) => {
  temperatures = temperatures.concat(arr2);
  // console.log(temperatures);
  let max, min;
  max = min = 0;
  //   max = min = temperatures[0];
  for (let i = 0; i < temperatures.length; i++) {
    if (typeof temperatures[i] === 'number') {
      if (temperatures[i] > max) max = temperatures[i];
      else if (temperatures[i] < min) min = temperatures[i];
    }
  }
  // console.log(max, min);
  return max - min;
};

console.log(calAmplitude(temperatures, arr2));
// console.log(typeof 2);

// temperatures.push(arr2);
// console.log(temperatures);
*/

/*
const measureKelvin = function () {
  const measurement = {
    type: 'temperature',
    unit: 'kelvin',
    // value: Number(prompt('Degrees Celsius:')),
    value: 10,
  };
  console.log(measurement, measurement.value);
  console.table(measurement);
  //console.log(typeof Number(measurement.value), Number(measurement.value));
  const kelvin = measurement.value + 273;
  return kelvin;
};
// measureKelvin();
console.log(measureKelvin());
*/

/*
// PROBLEM 1:
// We work for a company building a smart home thermometer. Our most recent task is this: "Given an array of temperatures of one day, calculate the temperature amplitude. Keep in mind that sometimes there might be a sensor error."

//Difference between max and min temp
//cal max
//cal mn
//if error assume 0 or ignored;
console.log('break pont');
const temperatures = ['error', 3, -2, -6, -1, 'error', 9, 13, 17, 15, 14, 9, 5];
const arr2 = [55, 100, -100];

const calcTempAmplitudeBug = (t1, t2) => {
  const temps = t1.concat(t2);
  console.log(temps);
  let max, min;
  max = min = 0;
  //   max = min = temps[0];
  // console.log(temps.length);
  for (let i = 0; i < temps.length; i++) {
    if (typeof temps[i] === 'number') {
      // debugger;
      if (temps[i] > max) max = temps[i];
      else if (temps[i] < min) min = temps[i];
    }
  }
  console.log(max, min);
  return max - min;
};

// const amplitudeNew = calcTempAmplitudeBug(temperatures, arr2);
const amplitudeBug = calcTempAmplitudeBug([3, 5, 1], [9, 4, 5]);
console.log(amplitudeBug);
*/

///////////////////////////////////////
// Coding Challenge #1

/*
Given an array of forecasted maximum temperatures, the thermometer displays a string with these temperatures.

Example: [17, 21, 23] will print "... 17ºC in 1 days ... 21ºC in 2 days ... 23ºC in 3 days ..."

Create a function 'printForecast' which takes in an array 'arr' and logs a string like the above to the console.

Use the problem-solving framework: Understand the problem and break it up into sub-problems!

TEST DATA 1: [17, 21, 23]
TEST DATA 2: [12, 5, -5, 0, 4]
*/

function printForecast(temps) {
  // console.log(temps, temps.length);
  // const t = temps;
  // console.log(t, t.length);
  let tempsStr = '';
  for (let i = 0; i < temps.length; i++) {
    tempsStr += `...${temps[i]} in ${i + 1} days`;
  }
  console.log(tempsStr);
}

printForecast([17, 21, 23]);
printForecast([12, 5, -5, 0, 4]);
