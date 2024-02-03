import { DadoController } from "./controllers/dado-controller.js";
import { AlteraModificadorDado } from "./models/alteraModificadorDado.js";
import { AlteraQtdDados } from "./models/alteraQtdDado.js";
import { CriarDado } from "./models/criarDado.js";
import { DarkMode } from "./models/darkmode.js";
const darkMode = new DarkMode();
const dadoController = new DadoController();
const alteraDado = new AlteraQtdDados(".qtdDados");
const alteraModificadorDado = new AlteraModificadorDado(".modificadorValor");
const criarDado = new CriarDado(dadoController, darkMode);
const criarDezNovosDados = document.getElementById("criarDezNovosDados");
const excluirTodosOsDados = document.getElementById("excluirTodosOsDados");
const resetarDadosBtn = document.getElementById("resetarDadosBtn");
const darkmodeInput = document.getElementById("darkMode");
const criarNovoDadoBtn = document.getElementById("criarNovoDadoBtn");
const campocriarDado = document.getElementById("numeroLados");
const configuracoesDialog = document.getElementById("configuracoesDialog");
const configuracoesMenu = document.getElementById("configuracoes");
const apagarHistoricoBtn = document.getElementById("apagar-historico-btn");
const menuHistorico = document.getElementById("menu-historico");
const dialogHistorico = document.getElementById("historico");
const botoesModificadores = document.querySelectorAll('.modificaDados__botoes button');
const fecharDialog = document.querySelectorAll(".fechar-dialog");
const funcoesBotoes = {
    decrementaUmDado: (quantidade) => alteraDado.alteraValor(true, quantidade),
    incrementaUmDado: (quantidade) => alteraDado.alteraValor(false, quantidade),
    decrementaModificador: (quantidade) => alteraModificadorDado.alteraValor(true, quantidade),
    incrementaModificador: (quantidade) => alteraModificadorDado.alteraValor(false, quantidade)
};
let myInterval = null;
botoesModificadores.forEach((botao) => {
    const milissegundos = 100;
    const classe = botao.className;
    botao.addEventListener("mousedown", (e) => {
        funcoesBotoes[classe](1);
        myInterval = setInterval(() => {
            funcoesBotoes[classe](2);
        }, milissegundos);
    });
    botao.addEventListener("mouseup", () => {
        clearInterval(myInterval);
        myInterval = null;
    });
    botao.addEventListener("mouseleave", () => {
        clearInterval(myInterval);
        myInterval = null;
    });
});
fecharDialog.forEach((element) => {
    element.addEventListener("click", () => {
        const dialog = element.parentElement;
        dialog.close();
    });
});
menuHistorico.addEventListener("click", () => {
    dialogHistorico.showModal();
});
apagarHistoricoBtn.addEventListener("click", () => {
    dadoController.apagarHistorico();
});
configuracoesMenu.addEventListener("click", () => {
    configuracoesDialog.showModal();
});
criarNovoDadoBtn.addEventListener("click", () => {
    criarDado.criarDado(campocriarDado.value);
});
if (darkMode.darkMode === "true")
    darkmodeInput.checked = true;
darkmodeInput.addEventListener("change", (e) => {
    const target = e.target;
    if (target.checked) {
        darkMode.ativarDarkMode();
        criarDado.atualizar();
    }
    else {
        darkMode.desativarDarkMode();
        criarDado.atualizar();
    }
});
resetarDadosBtn.addEventListener("click", () => {
    criarDado.resetarDados();
});
excluirTodosOsDados.addEventListener("click", () => {
    criarDado.excluirTodosOsDados();
});
