import render from './render.js';
import calc from './calculate.js'
import vertical_keys from './vertical_keys.js'
import horizontal_keys from "./horizontal_keys.js";

// render(elem, [classList], [child], parent = null, ...attributes)

export default class Calculator {

    innerValue = []
    outerValue = []

    checkPowA(arr, powPos) {
        let a
        let b = powPos - 1
        let i = b
        let counterEnd = 0
        let counterBegin = 0
        let arg = []
        do {
            if (/\)/.test(arr[i])) counterEnd++
            if (/\(/.test(arr[i])) counterBegin++
            a = i--
        } while (counterEnd > counterBegin)
        for (let i = a; i <= b; i++) {
            arg.push(arr[i])
        }

        return [arg, a]
    }

    checkPowB(arr, powPos) {
        let a = powPos + 1
        let b
        let i = a
        let counterBegin = 0
        let counterEnd = 0
        let arg = []
        do {
            if (/\(/.test(arr[i])) counterBegin++
            if (/\)/.test(arr[i])) counterEnd++
            b = i++
        } while (counterBegin > counterEnd)

        for (let i = a + 1; i <= b - 1; i++) {
            arg.push(arr[i])
        }

        return [arg, b]
    }

    build() {
        this.container = render('div', ['container'], null, document.body);
        this.textarea = render('div', ['textarea'], null, this.container);
        this.buttonContiner = render('div', ['button-container'], null, this.container)
        this.textarea.innerHTML = ''
        vertical_keys.forEach((item) => {
            item.forEach((item) => {
                let newKey = render('div', ['button'], null, this.buttonContiner)
                if (item['title'] === '=') newKey.classList.add('equal')
                newKey.innerHTML = item['title']
                newKey.addEventListener('click', () => {
                    try {
                        if (item['key'] && item['func']) {
                            this.outerValue.push(item['key'])
                            this.innerValue.push(item['func'])
                        }
                        if (item['title'] === '=') {
                            if (!this.innerValue.length) return
                            while (this.innerValue.indexOf('^') !== -1) {
                                let powPos = this.innerValue.indexOf('^')
                                let arr = [...this.innerValue]
                                let a = this.checkPowA(arr, powPos)
                                let b = this.checkPowB(arr, powPos)
                                this.innerValue.splice(a[1], b[1] - a[1], 'Math.pow(', ...a[0], ',', ...b[0])
                            }

                            this.innerValue = eval(this.innerValue.join('')).toFixed(10).split('')
                            this.outerValue = [...this.innerValue]
                        } else if (item['title'] === 'C') {
                            this.outerValue = []
                            this.innerValue = []
                        } else if (item['title'] === '←') {
                            this.outerValue.pop()
                            this.innerValue.pop()
                        } else if (item['title'] === '^') {

                        }
                        this.textarea.innerHTML = [...this.outerValue].join('')
                        let fontSize = 42 - Math.floor(this.outerValue.toString().length / 12) * 6
                        if (fontSize < 24) fontSize = 24
                        this.textarea.style.fontSize = `${fontSize}px`
                        console.log(this.innerValue)
                    } catch (err) {
                        this.textarea.style.fontSize = `24px`
                        this.outerValue = []
                        this.innerValue = []
                        this.textarea.innerHTML = 'Некорректное выражение'
                    }
                })
            })
        })

    }
}

