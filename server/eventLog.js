const logEvent = require('./middleware/logEvents');
const EventEmitter = require("events");

const emitter = new EventEmitter();

emitter.on("log", (message, fileName) => logEvent(message));

emitter.emit("log","this is a normal message from the emuiter", "errorLog");

/**
 * This to log 
 * 1. Application error (error logs)
 * 2. input and output validtion Failure
 * 3. Authentication successes and failures
 * 4. authorization failures
 * 5. session management failures
 * 6. privilege elevation successes and failure
 * 7. data import and export failure
 * 8. logging initialization 
 * 9. terms of service 
 */
