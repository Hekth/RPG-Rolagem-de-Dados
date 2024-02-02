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
    decrementaUmDado: () => alteraDado.alteraValor(true),
    incrementaUmDado: () => alteraDado.alteraValor(false),
    decrementaModificador: () => alteraModificadorDado.alteraValor(true),
    incrementaModificador: () => alteraModificadorDado.alteraValor(false)
};
botoesModificadores.forEach((botao) => {
    botao.addEventListener("click", () => {
        const classe = botao.className;
        funcoesBotoes[classe]();
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
