import { AlteraQtd } from "../controllers/alteraQtd-controller.js";
export class AlteraModificadorDado extends AlteraQtd {
    alteraValor(decrementa = false) {
        let soma = decrementa ? this.converteValor() - 1 : this.converteValor() + 1;
        if (soma > 0) {
            this.qtdDado.innerHTML = `+${soma}`;
            return;
        }
        this.qtdDado.innerHTML = soma.toString();
    }
    ;
}
