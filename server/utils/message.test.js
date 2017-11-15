const expect = require('expect');

var {generateMessage,generateLocationMessage} = require('./message')

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    var input = {
      from: "Duy Anh",
      text: "Thử nghiệm đầu tiên!"
    }
    var result = generateMessage(input.from, input.text);
    expect(result).toMatchObject(input);
    expect(typeof(result.createdAt)).toBe('number');
  });
});

describe('generateLocationMessage', () => {
  it('Should generate correct lotion object', () => {
    var input = {
      from: "Admin",
      lat: 1,
      long: 1
    };
    var result = generateLocationMessage(input.from,input.lat,input.long);
    expect(result).toMatchObject({
      from:input.from,
      url:`https://www.google.com/maps?q=${input.lat},${input.long}`
    });
    expect(typeof(result.createdAt)).toBe('number');
  });
})
