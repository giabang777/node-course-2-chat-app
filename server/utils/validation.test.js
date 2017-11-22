const expect = require('expect');

const {isRealString} = require('./validation');

describe("Validation isRealString",() => {
  it("Should reject non-string value",() => {
    expect(isRealString(1)).toBe(false);
  })
  it("Should reject string with only spac",() => {
    expect(isRealString('     ')).toBe(false);
  })
  it("Should allow string with non-space characters",() => {
    expect(isRealString("  f  a    ")).toBe(true);
  })
})
