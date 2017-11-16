const moment = require('moment');

var createdAt = 1234
var date = moment(createdAt);
var someTimestamp = moment().valueOf();
var someRawTimestamp = new Date().getTime();

console.log(someTimestamp);
console.log(someRawTimestamp);

console.log(date.format('DD-MM-YYYY HH:mm:ss'));
console.log(date.format('MMM Do YYYY hh:mm:ss A'));
