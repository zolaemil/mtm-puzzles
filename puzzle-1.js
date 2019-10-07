
function smallestMultiplier(n) {
  if (n < 1) throw new Error("n must be positive");
  if (n <= 2) {
    return n;
  }
  let prod = 1;
  for (let k = 2; k < n; k += 1) {
    if (prod % k > 0) {
      prod *= k
    }
  }

  return prod;
}

module.exports = smallestMultiplier;