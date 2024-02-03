import { AlteraQtd } from "../controllers/alteraQtd-controller.js";
export class AlteraQtdDados extends AlteraQtd {
    alteraValor(decrementa = false, quantidade = 1) {
        let soma = decrementa ? this.converteValor() - quantidade : this.converteValor() + quantidade;
        if (soma > 0 && soma <= 100) {
            this.qtdDado.innerHTML = `${soma}d`;
        }
    }
}
