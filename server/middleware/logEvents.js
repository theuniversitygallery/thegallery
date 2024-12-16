/**
 *  creating a log file whice will log if event goes wrong
 *  1. we will be using the date-fns format to track the date it happened
 *  2. uuid to replace the user id, since we have not created user yet
 *  3. file system needed we will be using useer local system to store user logs
 *  4 use the path module to make the path dynamic
 */

const {format} = require("date-fns");
const {v4: uuid} = require("uuid") //  replace it with user ID for tracing

// all log files should be stored on user computer
const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

// this statemwent or method Create file and store log if the file doesnt exist
const logEvent = async (message,fileName) => {
    // date will let you save the log with date + uuid
    const dateTime = format(new Date(), "yyyy-MM-dd\t HH:mm:ss");
    const logItems = `${dateTime}\t${uuid()}\t ${message}\n`;
    
    // write it in a file
    try {
        if (!fs.existsSync(path.join(__dirname, '..',"logs"))) {
            await fsPromises.mkdir(path.join(__dirname, '..',"logs"));
        }
        // await fsPromises.appendFile(path.join(__dirname, 'logs','eventLog.txt'), logItems);
        await fsPromises.appendFile(path.join(__dirname, '..','logs',fileName), logItems);
    } catch (error) {
        console.error(error);
    }
}
const logger = (req,res,next) =>{
    logEvent(`${req.method}\t${req.headers.origin}`,'reqLog.txt');
    next();
}
module.exports = {logger,logEvent};