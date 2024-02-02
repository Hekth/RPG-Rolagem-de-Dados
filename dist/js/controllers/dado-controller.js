import { AlteraModificadorDado } from "../models/alteraModificadorDado.js";
import { AlteraQtdDados } from "../models/alteraQtdDado.js";
import { Historico } from "../models/historico.js";
export class DadoController {
    numeroDoDado;
    spanQtdDados;
    resultadoTotalSpan;
    resultadosIndividuaisSpan;
    resultadoDadoDialog;
    alteraDados = new AlteraQtdDados(".qtdDados");
    alteraModificadorDado = new AlteraModificadorDado(".modificadorValor");
    historico = new Historico();
    constructor() {
        this.spanQtdDados = document.querySelector(".qtdDadosAviso");
        this.resultadoTotalSpan = document.querySelector(".resultadoTotal");
        this.resultadosIndividuaisSpan = document.querySelector(".resultadosIndividuais");
        this.resultadoDadoDialog = document.querySelector(".resultado-dados");
    }
    rolarDado(numero) {
        this.numeroDoDado = parseInt(numero);
        this.mostraNumeroAleatorio();
    }
    mostraNumeroAleatorio() {
        this.adicionaResultadoAosSpans();
        this.resultadoDadoDialog.showModal();
    }
    adicionaResultadoAosSpans() {
        const numerosAleatorios = this.gerarVariosNumerosAleatorios();
        const qtdDadosMaisModificadorMsg = `${this.capturaQtdDados(false)}d${this.numeroDoDado} + ${this.capturaQtdDados(true)}`;
        const resultadoTotal = (this.somaNumeros(numerosAleatorios) + this.capturaQtdDados(true)).toString();
        const resultadosIndividuais = numerosAleatorios.join(', ');
        this.historico.adicionaRolagem({
            qtdDadosMaisModificadorMsg,
            resultadoTotal,
            resultadosIndividuais,
            horario: new Date().toLocaleTimeString("pt-BR")
        });
        this.spanQtdDados.innerHTML = qtdDadosMaisModificadorMsg;
        this.resultadoTotalSpan.innerHTML = resultadoTotal;
        this.resultadosIndividuaisSpan.innerHTML = resultadosIndividuais;
    }
    gerarNumeroAleatorio() {
        const numAleatorio = Math.floor(Math.random() * this.numeroDoDado + 1);
        return numAleatorio;
    }
    capturaQtdDados(numeroAtributo) {
        if (numeroAtributo) {
            return this.alteraModificadorDado.qtdDadoAtual;
        }
        return this.alteraDados.qtdDadoAtual;
    }
    gerarVariosNumerosAleatorios() {
        const numerosAleatorios = [];
        const numeroMax = this.capturaQtdDados(false);
        for (let i = 0; i < numeroMax; i++) {
            numerosAleatorios.push(this.gerarNumeroAleatorio());
        }
        return numerosAleatorios;
    }
    somaNumeros(numerosAleatorios) {
        return numerosAleatorios.reduce((acc, curr) => acc + curr);
    }
    apagarHistorico() {
        this.historico.apagarHistorico();
    }
}
