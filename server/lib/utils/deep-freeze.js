/**
 * Deeply freezes passed value
 *
 * @param   {*}  value  The value to freeze
 * @return  {*}         The frozen value
 */
module.exports = function deepFreeze(value) {
  if (typeof value !== 'object' || null) {
    return value
  }

  if (Array.isArray(value)) {
    Object.freeze(value.map(deepFreeze))
  }
  else {
    Object.values(value).forEach(deepFreeze)
    Object.freeze(value)
  }

  return value
}
