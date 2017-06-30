const {expect} = require('chai');
const {deepObjConcat, keyUnion} = require('../src/util.js');


const keyUnion_examples = [
  [
    [{a: 1}, {b: 2}, {c: 3}, {d: 4}, {e: 5}],
    new Set(['a', 'b', 'c', 'd', 'e'])
  ]
];


describe('util', () => {

  describe('keyUnion', () => {

    it('Should create a set from object keys', () => {

      for (const [args, expected] of keyUnion_examples) {
        const result = keyUnion(...args);

        expect(result).to.deep.equal(expected);
      }

    })

  });

});
