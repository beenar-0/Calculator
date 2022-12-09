export default function render(elem, classList, child, parent) {
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