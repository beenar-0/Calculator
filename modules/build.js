import render from './render.js';
import vertical_keys from './vertical_keys.js'
import horizontal_keys from "./horizontal_keys.js";

export default class Calculator {
    isOrientVertical = true

    innerValue = []
    outerValue = []

    fact(n) {
        console.log(n)
        if (Number.isInteger(eval(n)) && eval(n) >= 0) {
            n = eval(n)
            return n ? n * this.fact(n - 1) : 1;
        } else {
            this.innerValue = ['wrongFact']
        }
    }

    checkFactA(arr, factPos) {
        let a
        let b = factPos - 1
        let i = b
        let counterEnd = 0
        let counterBegin = 0
        let arg = []
        if (!/\)/.test(arr[b])) {
            while (/[\d.]/.test(arr[i])) {
                (/\d+\.*\d*/.test(arr[i - 1])) ? a = i-- : a = i--
            }
        } else {
            do {
                if (/\)/.test(arr[i])) counterEnd++
                if (/\(/.test(arr[i])) counterBegin++
                a = i--
            } while (counterEnd > counterBegin)
        }
        for (let i = a; i <= b; i++) {
            arg.push(arr[i])
        }
        return [arg, a]
    }

    checkPowA(arr, powPos) {
        let a
        let b = powPos - 1
        let i = b
        let counterEnd = 0
        let counterBegin = 0
        let arg = []
        if (!/\)/.test(arr[b])) {
            while (/[\d.]+/.test(arr[i])) {
                (/[\d.]+/.test(arr[i - 1])) ? a = i-- : a = i--
                console.log(arr[i])
            }
        } else {
            do {
                if (/\)/.test(arr[i])) counterEnd++
                if (/\(/.test(arr[i])) counterBegin++
                a = i--
            } while (counterEnd > counterBegin)
        }
        for (let i = a; i <= b; i++) {
            arg.push(arr[i])
        }
        console.log(arg)
        return [arg, a]
    }

    checkPowB(arr, powPos) {
        let a = powPos + 1
        let b
        let i = a
        let counterBegin = 0
        let counterEnd = 0
        let arg = []
        if (!/\(/.test(arr[a])) {
            console.log('un')
            while (/[\d.]+/.test(arr[i])) {
                (/[\d.]+/.test(arr[i + 1])) ? b = i++ : b = i++
            }
        } else {
            console.log('dos')
            do {
                if (/\(/.test(arr[i])) counterBegin++
                if (/\)/.test(arr[i])) counterEnd++
                b = i++
            } while (counterBegin > counterEnd)
        }

        for (let i = a; i <= b; i++) {
            arg.push(arr[i])
        }
        console.log(arg, 'b')
        return [arg, b]
    }

    build(arrayOfKeys) {
        this.container = render('div', ['container'], null, document.body);
        this.textarea = render('div', ['textarea'], null, this.container);
        this.buttonContiner = render('div', ['button-container'], null, this.container)
        this.rotateIcon = render('div', ['rotate-icon'], null, this.container)
        this.textarea.innerHTML = this.outerValue.join('')
        this.rotateIcon.addEventListener('click', () => {
            this.isOrientVertical = !this.isOrientVertical
            document.body.innerHTML = ''
            if (this.isOrientVertical) {
                this.build(vertical_keys)
            } else {
                this.build(horizontal_keys)
                this.container.classList.toggle('horizontal')
                this.textarea.classList.toggle('horizontal')
                this.buttonContiner.classList.toggle('horizontal')
                document.querySelector('.equal').classList.toggle('horizontal')
            }
        })
        arrayOfKeys.forEach((item) => {
            item.forEach((item) => {
                let newKey = render('div', ['button'], null, this.buttonContiner)
                if (item['title'] === '=') newKey.classList.add('equal')
                newKey.innerHTML = item['title']
                newKey.addEventListener('click', () => {
                    try {
                        if (this.outerValue[0] === 'Некорректный факториал') this.outerValue = []
                        if (item['key'] && item['func']) {
                            this.outerValue.push(item['key'])
                            this.innerValue.push(item['func'])
                        }
                        if (item['title'] === '=') {
                            if (!this.innerValue.length) return
                            while (this.innerValue.indexOf('^(') !== -1) {
                                console.log('^')
                                console.log(this.innerValue)
                                let powPos = this.innerValue.indexOf('^(')
                                let arr = [...this.innerValue]
                                let a = this.checkPowA(arr, powPos)
                                let b = this.checkPowB(arr, powPos)
                                this.innerValue.splice(a[1], b[1] - a[1] + 1, 'Math.pow(', ...a[0], ',', ...b[0])
                            }
                            while (this.innerValue.indexOf('!') !== -1) {
                                let factPos = this.innerValue.indexOf('!')
                                let arr = [...this.innerValue]
                                let a = this.checkFactA(arr, factPos)
                                this.innerValue.splice(a[1], factPos - a[1] + 1, this.fact(a[0].join('')))
                            }
                            if (this.innerValue[0] === 'wrongFact') {
                                this.innerValue = []
                                this.outerValue = ['Некорректный факториал']
                            }
                            else {
                                this.innerValue = eval(this.innerValue.join('')).toFixed(5).split('')
                                this.outerValue = [...this.innerValue]
                            }
                        } else if (item['title'] === 'C') {
                            this.outerValue = []
                            this.innerValue = []
                        } else if (item['title'] === '←') {
                            this.outerValue.pop()
                            this.innerValue.pop()
                        }
                        this.textarea.innerHTML = [...this.outerValue].join('')
                        let fontSize = 42 - Math.floor(this.outerValue.toString().length / 10) * 6
                        if (fontSize < 24) fontSize = 24
                        this.textarea.style.fontSize = `${fontSize}px`
                        console.log(this.innerValue)
                    } catch (err) {
                        console.log(err)
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

