export default function calculate(str) {
    let rez = eval(str)
    return +rez.toFixed(10)
}