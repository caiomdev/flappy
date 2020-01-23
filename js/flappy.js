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

// const b = new ParBarreiras(500, 200, 600)
// screen.appendChild(b.elem)

function Barreiras(altura, largura, abertura, espaco, notificarPonto) {
    this.pares = [
        new ParBarreiras(altura, abertura, largura),
        new ParBarreiras(altura, abertura, largura + espaco),
        new ParBarreiras(altura, abertura, largura + espaco * 2),
        new ParBarreiras(altura, abertura, largura + espaco * 3)
    ]

    const deslocamento = 3

    this.animar = () => {
        this.pares.forEach(par => {
            par.setX(par.getX() - deslocamento)

            if (par.getX() < -par.getLargura()) {
                par.setX(par.getX() + espaco * this.pares.length)
                par.sortearAbertura()
            }

            const meio = largura / 2
            const cruzouMeio = par.getX() + deslocamento >= meio 
                && par.getX() < meio
            cruzouMeio && notificarPonto()
        })
    }
}

function Passaro(alturaJogo) {
    let voando = false

    this.elem = criarElem('img', 'passaro')
    this.elem.src = 'imgs/passaro.png'

    this.getY = () => parseInt(this.elem.style.bottom.split('px')[0])
    this.setY = y => this.elem.style.bottom = `${y}px`

    window.onkeydown = event => voando = true
    window.onkeyup = event => voando = false

    this.animar = () => {
        const novoY = this.getY() + (voando ? 8 : -5)
        const alturaMax = alturaJogo - this.elem.clientHeight

        if (novoY <= 0) {
            this.setY(0)
        } else if (novoY >= alturaMax) {
            this.setY(alturaMax)
        } else {
            this.setY(novoY)
        }
    }

    this.setY(alturaJogo / 2)
}

const barreiras = new Barreiras(500, 800, 250, 400)
const passaro = new Passaro(700)

screen.appendChild(passaro.elem)
barreiras.pares.forEach(par => screen.appendChild(par.elem))

setInterval(() => {
    barreiras.animar()
    passaro.animar()
}, 20)