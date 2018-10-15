const Error3 = rootRequire('lib/error3')

/**
 * Error3 based internal errors
 */
class AccessError extends Error3 {}
class BadParamsError extends Error3 {}

exports.AccessError = AccessError
exports.BadParamsError = BadParamsError
