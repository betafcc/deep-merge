const is = require('@betafcc/is');
const overload = require('@betafcc/overload');

const deepObjConcat = require('./deepObjConcat.js');


const last   = (...args) => args.slice(-1)[0];
const first  = (...args) => args[0];

const prepend = [
  [[    is.undefined, is.not.undefined],      last],
  [[is.not.undefined, is.undefined    ],     first]
];

const append = [
  [[is.not.undefined, is.not.undefined],     last]
];

const defaultConcat = overload(
  ...prepend,
  ...append
);


const _deepMerge = concat => {
  const deepMerge = deepObjConcat(concat);

  deepMerge.concat = concat;

  deepMerge.addCases = (...args) => _deepMerge(
    overload( ...concat.cases.slice(0, -(append.length) ), ...args, ...append )
  );

  deepMerge.addCase  = (signature, f) =>
    deepMerge.addCases([signature, f]);

  return deepMerge;
};


const api = _deepMerge(defaultConcat)

api.is = is; // Expose the isJS module for convenience

module.exports = api;
