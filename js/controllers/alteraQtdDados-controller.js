export class AlteraQtdDadosController {
    qtdDado;
    constructor(seletor) {
        this.qtdDado = document.querySelector(seletor);
    }
    alteraValor(decrementa = false) {
        let soma = decrementa ? this.converteValor() - 1 : this.converteValor() + 1;
        if (soma > 0 && soma <= 100) {
            this.qtdDado.innerHTML = `${soma}d`;
        }
    }
    converteValor() {
        const numsStr = parseInt(this.qtdDado.innerText.replace(/[^0-9]/g, ''));
        return numsStr;
    }
    get qtdDadoAtual() {
        return this.qtdDado.innerText;
    }
}
