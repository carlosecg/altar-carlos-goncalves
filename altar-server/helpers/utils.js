
/* Added maxNumber params to make the function reusable somewhere else if needed */
function findLowestInteger(currentInteger, maxNumber = 9) {
  let divisor = 1;
  while (
    currentInteger / divisor > maxNumber ||
    !Number.isInteger(currentInteger / divisor)
  ) {
    divisor++;
  }

  return currentInteger / divisor;
}

module.exports = { findLowestInteger }