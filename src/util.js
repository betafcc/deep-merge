const keyUnion = (...objs) =>
  new Set(
    objs
    .map(obj => Object.keys(obj))
    .reduce((acc, n) => acc.concat(n), []) // flatten
  );


const buckets = (...tests) => it => {
  const n_buckets = tests.length;
  const _buckets  = Array(n_buckets).fill().map(_ => []);

  for (const el of it)
    for (let i = 0; i < n_buckets; i+=1)
      if (tests[i](el))
        _buckets[i].push(el);

  return _buckets;
};


module.exports = {
  keyUnion,
  buckets,
};
