const overload = require('@betafcc/overload');


const _deepMerge = concat => {
  const deepMerge = (A, B) => {

  };


  deepMerge.addCase  = (...args) => _deepMerge(concat.addCase(...args));
  deepMerge.addCases = (...args) => _deepMerge(concat.addCases(...args));

  return deepMerge;
};


module.exports = _deepMerge(defaultConcat);
