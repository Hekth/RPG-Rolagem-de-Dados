export class EditaDado {
    editarDadoDialog;
    campoAlterarImagem;
    campoAlterarNumeroLados;
    constructor() {
        this.editarDadoDialog = document.getElementById("editarDadoDialog");
        this.campoAlterarImagem = document.getElementById("alterarImagem");
        this.campoAlterarNumeroLados = document.getElementById("alterarNumeroDeLados");
    }
    abreEditarDado() {
        this.editarDadoDialog.showModal();
    }
    fechaEditarDado() {
        this.editarDadoDialog.close();
    }
    editarDado(id, arrayDados) {
        if (id !== this.campoAlterarNumeroLados.value) {
            if (arrayDados.some((dado) => dado.numeroDeLados === this.campoAlterarNumeroLados.value)) {
                alert("Já existe um dado com este número de lados!");
                return;
            }
        }
        if (this.campoAlterarImagem.value.length > 0) {
            return arrayDados.map((dado) => {
                if (dado.numeroDeLados === id) {
                    dado.numeroDeLados = this.campoAlterarNumeroLados.value;
                    dado.img = this.campoAlterarImagem.value;
                }
                return dado;
            });
        }
        else {
            return arrayDados.map((dado) => {
                if (dado.numeroDeLados === id) {
                    dado.numeroDeLados = this.campoAlterarNumeroLados.value;
                    dado.img = "imagens/dadoGenerico.png";
                }
                return dado;
            });
        }
    }
    resetarCampos() {
        this.campoAlterarImagem.value = "";
    }
    mantemNumeroDeLadosEImg(numeroDeLados, img) {
        this.campoAlterarNumeroLados.value = numeroDeLados;
        this.campoAlterarImagem.value = img;
    }
}
