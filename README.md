# deep-merge

Micro util for personalized deep-merging of objects

Install
-------

    npm install @betafcc/deep-merge


Basic Usage
-----------

```js
const deepMerge = require('@betafcc/deep-merge');


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

deepMerge(A, B);
/*
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
*/

// But I wanted the arrays to concat also:


const newDeepMerge = deepMerge.addCase(
    [Array.isArray, Array.isArray],
    (a, b) => a.concat(b)
);

newDeepMerge(A, B)
/*
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
*/

// Maybe the numbers could sum up and the strings inverse-concat:

const {number, string} = require('@betafcc/deep-merge').is;

const newerDeepMerge = newDeepMerge.addCases(
    [[number, number], (a, b) => a + b],
    [[string, string], (a, b) => b.concat(a)]
);

newerDeepMerge(A, B)
/*
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
*/

```


Full Api:
----------------

```js
deepMerge(A, B)
    .addCase([...tests], handler)
    .addCases(...[ [...tests], handler ] ])
    .concat(...args) // the function used for concatenation of non-objects
```

TODO
----

- [x] Basic
- [ ] Better Testing
- [ ] Generalize to any Map-Like
- [ ] Make dist build
    - [ ] Port to ES7+ or TypeScript ?
