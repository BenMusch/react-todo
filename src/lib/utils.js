export const partial = (f, ...args) => f.bind(null, ...args)

const _pipe = (f, g) => (...args) => g(f(...args))

export const pipe = (...funcs) => funcs.reduce(_pipe)
