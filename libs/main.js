'use strict';

// *Defining the clock tick (in milliseconds):
const TICK = 1000;

// *Retrieving the system locale and formatting it as 'en-US' for example:
const locale = require('os-locale')
   .sync()
   .replace(/^(\w+?)_(\w+?)$/i, '$1-$2');

// *Parsing the '.env' configurations file:
const parsing = require('dotenv').config();

// *Throwing any error occured while trying to parse the configurations:
if(parsing.error) throw parsing.error;

// *Starting the app:
start();



/**
 * Maintains the app's lifecycle by repeatedly asking the user for new inputs
 * @return {Promise} The main promise chain
 */
function start(){
   // *Requesting the user input:
   return requestInput()
      // *Starting the countdown:
      .then(startCountdown)
      .catch(err => {
         // *If something went wrong:
         // *Logging ou the error message:
         console.error('Error: ' + err.message + '\n');
      })
      // *Restarting the app:
      .then(start);
};



/**
 * Asks the user for the time input
 * @return {Promise} The input promise, that will resolve with the given time input in milliseconds, or reject if the input was not valid
 */
function requestInput(){
   // *Requiring the needed modules:
   const readline = require('readline');

   // *Returning a new promise:
   return new Promise((resolve, reject) => {

      // *Establishing the app's stream interface:
      const rl = readline.createInterface({
         input: process.stdin,
         output: process.stdout
      });

      // *Requesting the user input:
      rl.question('> ', start_time_str => {
         // *Closing the stream interface:
         rl.close();

         // *Defining the time mask regex:
         let time_mask_regex = /((\d{1,2})h){0,1}((\d{1,2})m){0,1}((\d{1,2})s){0,1}/i;

         // *Mathing the mask against the user input:
         let matches = time_mask_regex.exec(start_time_str);

         // *Checking if the mask didn't match anything, and if it don't, rejecting the promise:
         if(matches[0] === '') return reject(new Error('Invalid time, it must be formatted as ##h##m##s'));

         // *Getting all the time components from the mask:
         let hours = Number(matches[2] || 0);
         let minutes = Number(matches[4] || 0);
         let seconds = Number(matches[6] || 0);

         // *Calculating the time in milliseconds:
         let start_ms = seconds * 1000 + minutes * 60000 + hours * 3600000;

         // *Resolving the promise:
         resolve(start_ms);
      });

   });
}



/**
 * Starts the countdown
 * @param  {number} time_ms The ammount of milliseconds to be counted
 * @return {Promise}        The countdown promise that will resolve as soon as the countdown has finished
 */
function startCountdown(time_ms){
   // *Requiring the needed modules:
   const notifications = require('./notifications');
   const counter_display = require('./counter-display');

   // *Returning the countdown promise:
   return new Promise((resolve, reject) => {
      // *Displaying the first counting:
      counter_display.updateTime(time_ms);

      // *Starting the timer:
      let timer = setInterval(() => {
         // *Decreasing the counter:
         time_ms -= TICK;

         // *Checking if the counter have reached the end:
         if(time_ms <= 0){
            // *If it does:
            // *Stopping the timer:
            clearInterval(timer);

            // *Displaying the last counting:
            counter_display.updateLine('Finished at ' + new Date().toLocaleTimeString(locale) + '\n');

            // *Raising a system notification:
            notifications.show('CLI Countdown', 'The countdown has just finished', process.env.ICON_FILE);

            // *Resolving the promise:
            resolve();
         } else{
            // *Displaying the counting:
            counter_display.updateTime(time_ms);
         }
      }, TICK);
   });
}
