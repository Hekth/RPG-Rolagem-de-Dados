import { AlteraQtd } from "../controllers/alteraQtd-controller.js";
export class AlteraQtdDados extends AlteraQtd {
    alteraValor(decrementa = false) {
        let soma = decrementa ? this.converteValor() - 1 : this.converteValor() + 1;
        if (soma > 0 && soma <= 100) {
            this.qtdDado.innerHTML = `${soma}d`;
        }
    }
}
