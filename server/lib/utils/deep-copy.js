const OBJECT_STRING = Object.toString()

/**
 * Deeply copies passed target depending on it's type
 *
 * @param   {*}  target  The target to copy
 * @return  {*}          The copy of the target
 */
module.exports = function copy(target) {
  if (! target || typeof target !== 'object') {
    return target
  }
  else if (Array.isArray(target)) {
    return target.map(copy)
  }
  else if (typeof target === 'object' && target.constructor.toString() === OBJECT_STRING) {
    return Object.getOwnPropertyNames(target)
      .reduce((result, name) => {
        result[name] = copy(target[name])
        return result
      }, {})
  }
  else {
    return target
  }
}
