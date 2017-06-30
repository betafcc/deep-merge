const {expect} = require('chai');
const {number, string} = require('@betafcc/is');


const deepMerge = require('../src/index.js');


const newDeepMerge = deepMerge.addCase(
  [Array.isArray, Array.isArray],
  (a, b) => a.concat(b)
);

const newerDeepMerge = newDeepMerge.addCases(
  [[number, number], (a, b) => a + b],
  [[string, string], (a, b) => b.concat(a)]
);

const A = {
  a: 1,
  b: {
    ba: [1, 2, 3],
    bb: [4, 5, 6],
    bc: {
      bca: 'a0',
      bcb: 'b0'
    }
  },
  c: 2
};

const B = {
  a: 3,
  b: {
    bb: [7, 8, 9],
    bc: {
      bcb: 'b1',
      bcc: 'c1'
    }
  },
  c: 4
};

const examples = [
  [
    deepMerge(A, B),
    {
      a: 3,
      b: {
        ba: [1, 2, 3],
        bb: [7, 8, 9],
        bc: {
          bca: 'a0',
          bcb: 'b1',
          bcc: 'c1'
        }
      },
      c: 4
    }
  ],
  [
    newDeepMerge(A, B),
    {
      a: 3,
      b: {
        ba: [1, 2, 3],
        bb: [4, 5, 6, 7, 8, 9],
        bc: {
          bca: 'a0',
          bcb: 'b1',
          bcc: 'c1'
        }
      },
      c: 4
    }
  ],
  [
    newerDeepMerge(A, B),
    {
      a: 4,
      b: {
        ba: [1, 2, 3],
        bb: [4, 5, 6, 7, 8, 9],
        bc: {
          bca: 'a0',
          bcb: 'b1b0',
          bcc: 'c1'
        }
      },
      c: 6
    }
  ]
]


describe('Readme examples', () => {

  it('Should equal hand-mades', () => {
    for (const [result, expected] of examples) {
      expect(expected).to.deep.equal(result);
    }
  });

});

