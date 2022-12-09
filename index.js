import Calculator from './modules/build.js'
import render from './modules/render.js';

const calculator = new Calculator()
calculator.build()

console.log(calculator.checkFunc('1'))