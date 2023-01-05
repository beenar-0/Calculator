function render(elem, classList, child, parent) {
    const element = document.createElement(elem);
    classList.forEach((item) => {
        element.classList.add(item);
    });
    if (typeof child === 'object' && child !== null) {
        child.forEach((item) => {
            element.appendChild(item);
        });
    } else {
        element.innerHTML = child;
    }
    if (parent) parent.appendChild(element);
    return element;
}

let vertical_keys = [
    [
        {
            title: '1',
            key: '1',
            func: '1'
        },
        {
            title: '2',
            key: '2',
            func: '2'
        },
        {
            title: '3',
            key: '3',
            func: '3'
        },
        {
            title: '/',
            key: '/',
            func: '/'
        },
        {
            title: 'sin',
            key: 'sin(',
            func: 'Math.sin('
        }
    ],
    [
        {
            title: '4',
            key: '4',
            func: '4'
        },
        {
            title: '5',
            key: '5',
            func: '5'
        },
        {
            title: '6',
            key: '6',
            func: '6'
        },
        {
            title: '*',
            key: '*',
            func: '*'
        },
        {
            title: 'cos',
            key: 'cos(',
            func: 'Math.cos('
        }
    ],
    [
        {
            title: '7',
            key: '7',
            func: '7'
        },
        {
            title: '8',
            key: '8',
            func: '8'
        },
        {
            title: '9',
            key: '9',
            func: '9'
        },
        {
            title: '+',
            key: '+',
            func: '+'
        },
        {
            title: 'ln',
            key: 'ln(',
            func: 'Math.log('
        }
    ],
    [
        {
            title: '.',
            key: '.',
            func: '.'
        },
        {
            title: '0',
            key: '0',
            func: '0'
        },
        {
            title: '^',
            key: '^(',
            func: '^('
        },
        {
            title: '-',
            key: '-',
            func: '-'
        },
        {
            title: '!',
            key: '!',
            func: '!'
        },
    ],
    [
        {
            title: '(',
            key: '(',
            func: '('
        },
        {
            title: ')',
            key: ')',
            func: ')'
        },
        {
            title: '𝝿',
            key: '𝝿',
            func: 'Math.PI'
        },
        {
            title: '√ ',
            key: '√(',
            func: 'Math.sqrt('
        },
        {
            title: 'e',
            key: 'e',
            func: 'Math.exp(1)'
        }
    ],
    [
        {
            title: '←',
            key: '',
            func: ''
        },
        {
            title: 'C',
            key: '',
            func: ''
        },
        {
            title: '=',
            key: '',
            func: ''
        }
    ]
]
let horizontal_keys = [
    [
        {
            title: '1',
            key: '1',
            func: '1'
        },
        {
            title: '2',
            key: '2',
            func: '2'
        },
        {
            title: '3',
            key: '3',
            func: '3'
        },
        {
            title: '/',
            key: '/',
            func: '/'
        },
        {
            title: 'sin',
            key: 'sin(',
            func: 'Math.sin('
        },
        {
            title: '(',
            key: '(',
            func: '('
        },
        {
            title: ')',
            key: ')',
            func: ')'
        }
    ],
    [
        {
            title: '4',
            key: '4',
            func: '4'
        },
        {
            title: '5',
            key: '5',
            func: '5'
        },
        {
            title: '6',
            key: '6',
            func: '6'
        },
        {
            title: '*',
            key: '*',
            func: '*'
        },
        {
            title: 'cos',
            key: 'cos(',
            func: 'Math.cos('
        },
        {
            title: '𝝿',
            key: '𝝿',
            func: 'Math.PI'
        },
        {
            title: '√ ',
            key: '√(',
            func: 'Math.sqrt('
        }
    ],
    [
        {
            title: '7',
            key: '7',
            func: '7'
        },
        {
            title: '8',
            key: '8',
            func: '8'
        },
        {
            title: '9',
            key: '9',
            func: '9'
        },
        {
            title: '+',
            key: '+',
            func: '+'
        },
        {
            title: 'ln',
            key: 'ln(',
            func: 'Math.log('
        },
        {
            title: 'e',
            key: 'e',
            func: 'Math.exp(1)'
        },
        {
            title: '←',
            key: '',
            func: ''
        }
    ],
    [
        {
            title: '.',
            key: '.',
            func: '.'
        },
        {
            title: '0',
            key: '0',
            func: '0'
        },
        {
            title: '^',
            key: '^(',
            func: '^('
        },
        {
            title: '-',
            key: '-',
            func: '-'
        },
        {
            title: '!',
            key: '!',
            func: '!'
        },
        {
            title: 'C',
            key: '',
            func: ''
        },
        {
            title: '=',
            key: '',
            func: ''
        }
    ]
]

class Calculator {
    isOrientVertical = true

    innerValue = []
    outerValue = []

    fact(n) {
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
            while (/[\d.!]+/.test(arr[i])) {
                (/[\d.!]+/.test(arr[i - 1])) ? a = i-- : a = i--
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

    checkPowB(arr, powPos) {
        let a = powPos + 1
        let b
        let i = a
        let counterBegin = 0
        let counterEnd = 0
        let arg = []
        if (!/\(/.test(arr[a])) {
            while (/[\d.]+/.test(arr[i])) {
                (/[\d.]+/.test(arr[i + 1])) ? b = i++ : b = i++
            }
        } else {
            do {
                if (/\(/.test(arr[i])) counterBegin++
                if (/\)/.test(arr[i])) counterEnd++
                b = i++
            } while (counterBegin > counterEnd)
        }

        for (let i = a; i <= b; i++) {
            arg.push(arr[i])
        }
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
                            while (this.innerValue.indexOf('!') !== -1) {
                                let factPos = this.innerValue.indexOf('!')
                                let arr = [...this.innerValue]
                                let a = this.checkFactA(arr, factPos)
                                this.innerValue.splice(a[1], factPos - a[1] + 1, this.fact(a[0].join('')))
                            }
                            while (this.innerValue.indexOf('^(') !== -1) {
                                let powPos = this.innerValue.indexOf('^(')
                                let arr = [...this.innerValue]
                                let a = this.checkPowA(arr, powPos)
                                let b = this.checkPowB(arr, powPos)
                                this.innerValue.splice(a[1], b[1] - a[1] + 1, 'Math.pow(', ...a[0], ',', ...b[0])
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




const calculator = new Calculator()
calculator.build(vertical_keys)
