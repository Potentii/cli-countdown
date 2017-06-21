'use strict';

// *Requiring the needed modules:
const path = require('path');
const { WindowsToaster } = require('node-notifier');



/**
 * Displays a new notification
 * @param  {string} title     The title of the notification
 * @param  {string} message   The content of the notification
 * @param  {string} icon_file The icon image path (Relative to the working directory)
 */
function show(title, message, icon_file){
   // *Creating a new toaster controller:
   const notifier = new WindowsToaster({withFallback: false});

   // *Displaying the notification:
   notifier.notify({
      title: title || '',
      message: message || '',
      icon: icon_file ? path.join(process.cwd(), icon_file) : undefined,
      sound: true,
      wait: true
   }, (err, response) => {});

   // *When the user clicks on the notification:
   notifier.on('click', (notifierObject, options) => {});

   // *When the user does not interact with the notification and it timeouts:
   notifier.on('timeout', (notifierObject, options) => {});
}



// *Exporting this module:
module.exports = { show };
