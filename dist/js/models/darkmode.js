export class DarkMode {
    darkMode = "false";
    logo;
    constructor() {
        this.logo = document.getElementById("logo");
        const storage = localStorage.getItem("darkmode");
        if (storage) {
            if (storage === "true") {
                this.ativarDarkMode();
            }
            else {
                this.desativarDarkMode();
            }
            this.darkMode = storage;
        }
        else {
            localStorage.setItem("darkmode", "false");
        }
    }
    ativarDarkMode() {
        document.documentElement.style.setProperty("--marrom", "#F5F5F5");
        document.documentElement.style.setProperty("--branco", "#3F2305");
        this.logo.src = "darkmode/logo-dado.png";
        this.darkMode = "true";
        localStorage.setItem("darkmode", "true");
    }
    desativarDarkMode() {
        document.documentElement.style.setProperty("--marrom", "#3F2305");
        document.documentElement.style.setProperty("--branco", "#F5F5F5");
        this.logo.src = "imagens/logo-dado.png";
        this.darkMode = "false";
        localStorage.setItem("darkmode", "false");
    }
    alteraCorDasImagens(dados) {
        if (this.darkMode === "true") {
            const arrayDados = dados.map((dado) => {
                if (dado.img.includes("imagens")) {
                    dado.img = dado.img.replace("imagens", "darkmode");
                }
                return dado;
            });
            return arrayDados;
        }
        const arrayDados = dados.map((dado) => {
            if (dado.img.includes("darkmode")) {
                dado.img = dado.img.replace("darkmode", "imagens");
            }
            return dado;
        });
        return arrayDados;
    }
}
