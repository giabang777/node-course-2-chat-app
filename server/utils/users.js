const _ = require('lodash');

class Users {
  constructor(){
    this.users = [];
  }
  addUser(id,name,room){
    var user = {id,name,room};
    this.users.push(user);
    return user;
  }
  removeUser(id){
     return _.remove(this.users, (user) => user.id===id)[0];
  }
  getUser(id){
    var i = _.findIndex(this.users,(u) => u.id===id)
    return this.users[i]
  }
  getUserList(room){
    // var users = this.users.filter((user) => user.room===room) //true will keep user in array, false will remove it
    // var namesArray = users.map((user) => user.name);
    // return namesArray;

    var users = _.filter(this.users, (user) => user.room===room);
    var namesArray = _.map(users, (user) => user.name);
    return namesArray;
  }
}

module.exports = {Users};
