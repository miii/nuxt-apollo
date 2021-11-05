import { resolve } from 'path'
import { createNuxtConfig } from '../utils/config'

export default createNuxtConfig(__dirname, {}, () => ({
  plugins: [
    resolve(__dirname, '../utils/plugin')
  ]
}))