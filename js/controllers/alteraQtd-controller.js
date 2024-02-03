export class AlteraQtd {
    qtdDado;
    constructor(seletor) {
        this.qtdDado = document.querySelector(seletor);
    }
    converteValor() {
        const numsStr = parseInt(this.qtdDado.innerText.replace(/[d+]/g, ''));
        return numsStr;
    }
    get qtdDadoAtual() {
        return this.converteValor();
    }
}
