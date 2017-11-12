const expect = require('expect');

var {generateMessage} = require('./message')

describe('generateMessage',() => {
  it('should generate correct message object',() => {
    var input = {
      from:"Duy Anh",
      text:"Thử nghiệm đầu tiên!"
    }
    var result = generateMessage(input.from,input.text);
    expect(result).toMatchObject(input);
    expect(typeof(result.createAt)).toBe('number');
  });
});
