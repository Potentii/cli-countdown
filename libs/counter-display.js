'use strict';

// *Requiring the needed modules:
const readline = require('readline');

// *Defining the time formatting function:
const formatTimeString = (h, m, s) => `${h<10?'0'+h:h}h ${m<10?'0'+m:m}m ${s<10?'0'+s:s}s`;



/**
 * Pads a number below 10
 * @param  {number} val The value to pad
 * @return {string}     The padded string
 */
function pad10(val){
   // *Padding the value:
   return val < 10 ? '0'+val : ''+val;
}



/**
 * Retrieves the formatted time string
 * @param  {number} ms The time in milliseconds to be formatted
 * @return {string}    The string formatted as HHh:MMm:SSs
 */
function getTimeString(ms){
   // *Calculating the time in seconds:
   let s = ms/1000;

   // *Calculating each time component:
   let hours = Math.floor(s/3600);
   let minutes = Math.floor(s/60);
   let seconds = s%60;

   // *Returning the string:
   return formatTimeString(hours, minutes, seconds);
}



/**
 * Updates the current line on the console with a new content
 * @param {*} content The new content of the line
 */
function updateLine(content){
   // *Cleaning the current line:
   readline.clearLine(process.stdout, 0);
   // *Moving the cursor to the begining of the line:
   readline.cursorTo(process.stdout, 0);
   // *Writing down the new content:
   process.stdout.write(`${content}`);
}



/**
 * Updates the time counter
 * @param {number} new_time_ms The new time (in milliseconds)
 */
function updateTime(new_time_ms){
   updateLine(getTimeString(new_time_ms));
}



// *Exporting this module:
module.exports = {
   updateTime,
   updateLine
};
