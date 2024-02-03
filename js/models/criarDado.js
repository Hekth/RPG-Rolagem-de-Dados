import { EditaDado } from "./editaDado.js";
export class CriarDado {
    dadoController;
    darkMode;
    dadosCriados;
    dadosContainer;
    editaDado = new EditaDado();
    formularioEditarDado;
    constructor(dadoController, darkMode) {
        this.dadoController = dadoController;
        this.darkMode = darkMode;
        this.formularioEditarDado = document.getElementById("formEditarDado");
        this.dadosContainer = document.getElementById("dados-container");
        const dadosStorage = localStorage.getItem('dados');
        if (dadosStorage) {
            this.dadosCriados = JSON.parse(dadosStorage);
            this.criarElemento();
            this.atualizar();
        }
        else {
            this.dadosCriados = this.retornarDadosPadrao();
            this.criarElemento();
            this.atualizar();
        }
    }
    criarDado(numeroDeLados) {
        if (this.dadosCriados.some((dado) => dado.numeroDeLados === numeroDeLados)) {
            alert("Já existe um dado com este número de lados!");
        }
        else if (parseInt(numeroDeLados) < 2) {
            alert("O dado deve ter no mínimo 2 lados!");
        }
        else {
            this.dadosCriados.push({ numeroDeLados, img: "imagens/dadoGenerico.png" });
            this.criarElemento();
            this.atualizar();
            alert("Dado(s) criado(s) com sucesso!");
        }
    }
    criarElemento() {
        this.dadosContainer.innerHTML = '';
        return this.darkMode.alteraCorDasImagens(this.dadosCriados).map((dado) => {
            const containerPai = document.createElement("div");
            containerPai.classList.add("containerPaiDosDados");
            const containerButton = document.createElement("button");
            containerButton.classList.add("containerButton");
            containerButton.id = dado.numeroDeLados;
            containerButton.type = "button";
            containerButton.innerHTML = `
                <img src=${dado.img} alt="Imagem de um dado" width="60px" />
                <span> 
                    Rolar d${dado.numeroDeLados}
                </span>
            `;
            containerPai.append(this.criaEdicaoDado(dado.numeroDeLados, dado.img));
            containerButton.addEventListener("click", (e) => {
                const target = e.target;
                if (target.localName === "button") {
                    this.dadoController.rolarDado(target.id);
                }
                else {
                    const elementoPai = target.parentElement;
                    this.dadoController.rolarDado(elementoPai.id);
                }
            });
            containerPai.append(containerButton);
            return containerPai;
        });
    }
    criaEdicaoDado(id, img) {
        const divEditarExcluir = document.createElement("div");
        divEditarExcluir.classList.add("editarExcluir");
        const iconeExcluir = document.createElement("img");
        const iconeEditar = document.createElement("img");
        const imagem = this.darkMode.darkMode === "true" ? "darkmode" : "imagens";
        iconeExcluir.src = `${imagem}/excluir.png`;
        iconeEditar.src = `${imagem}/editar.png`;
        iconeExcluir.addEventListener("click", () => {
            this.dadosCriados = this.dadosCriados.filter((dado) => dado.numeroDeLados !== id);
            this.criarElemento();
            this.atualizar();
        });
        iconeEditar.addEventListener("click", () => {
            this.editaDado.abreEditarDado();
            this.editaDado.mantemNumeroDeLadosEImg(id, img);
            this.formularioEditarDado.onsubmit = (e) => {
                e.preventDefault();
                const dadoEditado = this.editaDado.editarDado(id, this.dadosCriados);
                if (dadoEditado) {
                    const containerButton = divEditarExcluir.nextElementSibling;
                    this.editaDado.resetarCampos();
                    containerButton.id = id;
                    this.dadosCriados = dadoEditado;
                    this.criarElemento();
                    this.atualizar();
                    this.editaDado.fechaEditarDado();
                }
            };
        });
        divEditarExcluir.append(iconeEditar, iconeExcluir);
        return divEditarExcluir;
    }
    atualizar() {
        this.criarElemento().forEach((dado) => this.dadosContainer.append(dado));
        this.adicionaDadoNoLocalStorage();
    }
    adicionaDadoNoLocalStorage() {
        localStorage.setItem("dados", JSON.stringify(this.dadosCriados));
    }
    resetarDados() {
        this.dadosCriados = this.retornarDadosPadrao();
        this.atualizar();
    }
    retornarDadosPadrao() {
        const dadosPadrao = [
            { numeroDeLados: "4", img: "imagens/d4.png" },
            { numeroDeLados: "6", img: "imagens/d6.png" },
            { numeroDeLados: "8", img: "imagens/d8.png" },
            { numeroDeLados: "10", img: "imagens/d10.png" },
            { numeroDeLados: "12", img: "imagens/d12.png" },
            { numeroDeLados: "14", img: "imagens/d14.png" },
            { numeroDeLados: "16", img: "imagens/d16.png" },
            { numeroDeLados: "18", img: "imagens/d18.png" },
            { numeroDeLados: "20", img: "imagens/d20.png" },
            { numeroDeLados: "100", img: "imagens/d100.png" }
        ];
        return dadosPadrao;
    }
    excluirTodosOsDados() {
        this.dadosCriados = [];
        this.atualizar();
    }
    get getDados() {
        const dadosCriados = this.dadosCriados;
        return dadosCriados;
    }
}
