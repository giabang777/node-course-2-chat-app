const expect = require('expect');

const {Users} = require('./users');

describe('Users',() => {
  var users;

  beforeEach(() => {
    users=new Users();
    users.users = [
      {
        id: 1,
        name: 'super man',
        room: '1'
      },
      {
        id: 2,
        name: 'wonder woman',
        room: '2'
      },
      {
        id: 3,
        name: 'the flash',
        room: '1'
      },
    ]
  })

  it('Should add new user',() => {
    var users = new Users();
    var user = {
      id:'123',
      name:'Mike jackson',
      room:'1'
    }
    var resUser = users.addUser(user.id,user.name,user.room);
    expect(resUser).toEqual(user);
    expect(users.users).toEqual([user]);
  });

  it('Should remove the user',() => {
    var removedUser = users.removeUser(2);
    expect(removedUser[0].id).toBe(2);
    expect(users.users.length).toBe(2);
  })

  it('Should not remove the user',() => {
    users.removeUser(4);
    expect(users.users.length).toBe(3);
  })

  it('Should find user',() => {
    var user = users.getUser(1);
    expect(user).toBe(users.users[0]);
  })

  it('Should not find user',() => {
    var user = users.getUser(4);
    expect(user).toBe(undefined);
    expect(user).toBeFalsy();
  })

  it('Should get all name of users in room',() => {
    var names = users.getUserList('1');
    expect(names).toEqual([users.users[0].name,users.users[2].name]);
  })
})
