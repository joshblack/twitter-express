const expect = require('expect');

describe('LearningObjects', () => {
  it('can be made with object literals', () => {
    const object = {};

    expect(object).toEqual({});
  });

  it('can have value(s) set when being created with an object literal', () => {
    const object = { foo: 'bar' };
    expect(object).toEqual({ foo: 'bar' });
  });

  it('can have multiple values set when created with an object literal', () => {
    const object = {
      name: 'Abbey',
      email: 'abbey@abbeyiscool.com',
    };

    expect(object).toEqual({
      name: 'Abbey',
      email: 'abbey@abbeyiscool.com',
    });
  });

  it('can have a value set on it after being created', () => {
    const object = {};
    expect(object).toEqual({});

    // Write something here
    object.foo = 'bar';
    object['name'] = 'Jenny';

    expect(object).toEqual({ foo: 'bar', name: 'Jenny' });
  });
});
