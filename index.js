import Calculator from './modules/build.js'
import horizontal_keys from "./modules/horizontal_keys.js";
import vertical_keys from "./modules/vertical_keys.js";
import render from './modules/render.js';

const calculator = new Calculator()
calculator.build(vertical_keys)
