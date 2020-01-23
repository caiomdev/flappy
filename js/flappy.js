const screen = document.querySelector('[wm-flappy]')

function criarElem(tagName, className) {
    const elem = document.createElement(tagName)
    elem.classList.add(className)
    return elem
}

function Barreira(reverse = false) {
    this.elem = criarElem('div', 'barreira')

    const borda = criarElem('div', 'borda')
    const corpo = criarElem('div', 'corpo')

    this.elem.appendChild(reverse ? corpo : borda)
    this.elem.appendChild(reverse ? borda : corpo)

    this.setAltura = altura => corpo.style.height = `${altura}px`
}

// const b = new Barreira(true)
// b.setAltura(150)

// screen.appendChild(b.elem)

function ParBarreiras(altura, abertura, x) {
    this.elem = criarElem('div', 'dupla-barreira')

    this.superior = new Barreira(true)
    this.inferior = new Barreira(false)

    this.elem.appendChild(this.superior.elem)
    this.elem.appendChild(this.inferior.elem)

    this.sortearAbertura = () => {
        const alturaSuperior = Math.random() * (altura - abertura)
        const alturaInferior = altura - abertura - alturaSuperior
        this.superior.setAltura(alturaSuperior)
        this.inferior.setAltura(alturaInferior)
    }

    this.getX = () => parseInt(this.elem.style.left.split('px')[0])
    this.setX = x => this.elem.style.left = `${x}px`
    this.getLargura = () => this.elem.clientWidth

    this.sortearAbertura()
    this.setX(x)
}

const b = new ParBarreiras(500, 200, 600)
screen.appendChild(b.elem)