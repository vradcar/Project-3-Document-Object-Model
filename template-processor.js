"use strict";

//import * as assert from "assert";

function TemplateProcessor(template) {
    this.template = template; // Store the template string
}

// Add the fillIn method to the TemplateProcessor prototype
TemplateProcessor.prototype.fillIn = function (dictionary) {
    // Replace all occurrences of {{property}} with the corresponding value from the dictionary
    return this.template.replace(/{{\s*([a-zA-Z0-9_]+)\s*}}/g, function (match, property) {
        // If the property exists in the dictionary, replace with its value
        // Otherwise, replace with an empty string
        return dictionary[property] !== undefined ? dictionary[property] : '';
    });
};


//const assert = require('assert');

// const template = 'My favorite month is {{month}} but not the day {{day}} or the year {{year}}';
// const dateTemplate = new TemplateProcessor(template);

// const dictionary = {month: 'July', day: '1', year: '2016'};
// let str = dateTemplate.fillIn(dictionary);
// //console.log(str);
//  assert(str === 'My favorite month is July but not the day 1 or the year 2016');

// //Case: property doesn't exist in dictionary
// const dictionary2 = {day: '1', year: '2016'};
// str = dateTemplate.fillIn(dictionary2);
// //console.log(str);

//  assert(str === 'My favorite month is  but not the day 1 or the year 2016');