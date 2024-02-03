const historicoContainer = document.getElementById("historico-container");
export class Historico {
    rolagens = [];
    constructor() {
        this.atualizaHistorico();
    }
    adicionaRolagem(rolagem) {
        this.rolagens.push(rolagem);
        this.atualizaHistorico();
    }
    listarRolagens() {
        return this.rolagens;
    }
    atualizaHistorico() {
        historicoContainer.innerHTML = this.template();
    }
    template() {
        if (this.rolagens.length > 0) {
            return this.rolagens.map(({ horario, qtdDadosMaisModificadorMsg, resultadoTotal, resultadosIndividuais }) => {
                return `
                    <div class="historico-container__rolagem">
                        <small class="horario"> ${horario} </small>
                        <span> Quantidade de dados + modificador: <strong> ${qtdDadosMaisModificadorMsg} </strong> </span>
                        <span> 
                            Resultado total: <strong> ${resultadoTotal} </strong> 
                        </span>
                        <span> 
                            Resultados individuais: <strong> ${resultadosIndividuais} </strong> 
                        </span>
                    </div>
                `;
            }).join('');
        }
        else {
            return `<div> Seu histórico está vazio :( </div>`;
        }
    }
    apagarHistorico() {
        this.rolagens = [];
        this.atualizaHistorico();
    }
}
