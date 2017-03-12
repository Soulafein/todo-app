export const partial = (fn, ...args) => {
  return fn.bind(null, ...args)
}

export const pipe = (...fns) => fns.reduce((f, g) => (...args) => g(f(...args)))
