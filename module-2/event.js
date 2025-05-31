const EventEmitter = require('node:events');

class SchoolBell extends EventEmitter {}

const schoolBell = new SchoolBell();
schoolBell.on('ring', () => {
  console.log('Yahoo! Class Sesh!');
});
schoolBell.on('ring', () => {
  console.log('Dhet! Arekta class ache!');
});
schoolBell.on('broken', () => {
  console.log('oh no! class ki ar sesh hobena!');
});
// schoolBell.emit('broken');
schoolBell.emit('ring');
schoolBell.emit('broken');