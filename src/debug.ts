/**
 * Create logger function
 * @param {string} namespace 
 * @returns {debug.Debugger}
 */
export const createDebugger = (namespace: string) => {
  try {
    const debug = require('debug')
    return debug(`nuxt-apollo:${namespace}`)
  } catch (e) {
    return () => void 0
  }
}