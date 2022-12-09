import render from './render.js';
import calc from './calculate.js'

// render(elem, [classList], [child], parent = null, ...attributes)

export default class Calculator {
    verticalKeys = [
        ['1', '2', '3', '/', 'sin'],
        ['4', '5', '6', '*', 'cos'],
        ['7', '8', '9', '+', 'ln'],
        ['.', '0', '^', '-', '!'],
        ['←', '(', ')', '=']
    ];

    horizontalKeys = [
        ['1', '2', '3', '/', 'sin', '←'],
        ['4', '5', '6', '*', 'cos', '('],
        ['7', '8', '9', '+', 'ln', ')'],
        ['.', '0', '^', '-', '!', '='],
    ]

    innerValue = ''

    checkFunc(symbol) {
        const func = ['+', '-', '/', '*', 'sin', 'cos', 'ln', '!','^','(',')']
        return func.some((item) => {
            return item === symbol
        })
    }

    build() {
        this.container = render('div', ['container'], null, document.body);
        this.textarea = render('div', ['textarea'], null, this.container);
        this.buttonContiner = render('div', ['button-container'], null, this.container)
        this.textarea.innerHTML = ''
        this.verticalKeys.forEach((item) => {
            item.forEach((item) => {
                let newKey = render('div', ['button'], null, this.buttonContiner)
                if (item === '=') newKey.classList.add('equal')
                newKey.innerHTML = item
                newKey.addEventListener('click', () => {
                    if (item === 'sin') {
                        if (this.checkFunc(this.textarea.innerHTML.split('')[this.textarea.innerHTML.split('').length-1])) {
                            this.innerValue = this.textarea.innerHTML
                            this.textarea.innerHTML += 'sin('
                        }
                    } else if (item === 'cos') {
                        if (this.checkFunc(this.textarea.innerHTML.split('')[this.textarea.innerHTML.split('').length-1])) {
                            this.innerValue = this.textarea.innerHTML
                            this.textarea.innerHTML += 'cos('
                        }
                    } else if (item === '←') {
                        let temp = this.textarea.innerHTML.split('')
                        temp.pop()
                        this.textarea.innerHTML = temp.join('')
                    } else if (item === '=') {
                        this.textarea.innerHTML = calc(this.textarea.innerHTML)
                    } else if (this.checkFunc(item)) {
                        let temp = this.textarea.innerHTML.split('')
                        if (this.checkFunc(temp[temp.length - 1])) this.textarea.innerHTML = temp.join('')
                        else this.textarea.innerHTML += item
                    } else this.textarea.innerHTML += item
                })
            })
        })

    }
}

