const test = require('ava');
const smallesetMultiplier = require('./puzzle-1');

test('smallest common multiplier of whole numbers between 1 and 19', t => {
  const result = smallesetMultiplier(19);

  for (let k = 2; k < 19; k += 1) {
    t.is(result % k, 0);
  }
});

test('smallest common multiplier of whole numbers between 1 and N for all Ns until 50', t => {
  for (let N = 3; N <= 30; N += 1) {
    const result = smallesetMultiplier(N);

    for (let k = 2; k < N; k += 1) {
      t.is(result % k, 0);
    }

    console.log(`smallest common multipler for all numbers between 1 and ${N}:`, result);
  }
});
