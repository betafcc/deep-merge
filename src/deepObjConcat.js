const is = require('@betafcc/is');
const {buckets, keyUnion} = require('./util.js');


const deepObjConcat = concat => (...objs) => {
  const keys = [...keyUnion(...objs)];

  const acc = {};
  for (const key of keys) {
    // TODO: should I filter undefineds?
    const currents = objs.map(obj => obj[key]);

    const     [   dicts, nonDicts    ] =
      buckets ( is.dict, is.not.dict ) (currents);

    if (dicts.length > 1) {
      acc[key] = deepObjConcat(concat)(...dicts);
      // TODO
    }
    else
      acc[key] = concat(...currents);
  }

  return acc;
};


module.exports = deepObjConcat;
