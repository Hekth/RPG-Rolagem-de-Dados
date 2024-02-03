import { AlteraQtd } from "../controllers/alteraQtd-controller.js";
export class AlteraModificadorDado extends AlteraQtd {
    alteraValor(decrementa = false, quantidade = 1) {
        let soma = decrementa ? this.converteValor() - quantidade : this.converteValor() + quantidade;
        if (soma > 0) {
            this.qtdDado.innerHTML = `+${soma}`;
            return;
        }
        this.qtdDado.innerHTML = soma.toString();
    }
    ;
}
