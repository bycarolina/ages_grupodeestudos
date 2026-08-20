const display = document.querySelector(".operation");
const result = document.querySelector(".result");
let buttons = document.querySelectorAll(".button");

let isFirstInput = true;

const lastCharacter = display.textContent.slice(-1);
const operators = ["+", "−", "×", "÷"];

// Percorre cada botão da calculadora
buttons.forEach((button) => {

    // Executa uma ação quando o botão é clicado
    button.addEventListener("click", () => {

        // Armazena o conteúdo do botão clicado
        const value = button.textContent;

        // Limpa o display se for o primeiro valor digitado
        if (isFirstInput) {
            display.textContent = "";
            isFirstInput = false;
        }

        // Remove o último caractere do display se o botão "CE" for clicado
        if (value === "CE") {
            display.textContent = display.textContent.slice(0, -1);
            if (display.textContent === "") {
                display.textContent = "0";
                isFirstInput = true;
            }
            return;
        }

        // Limpa o display e o resultado se o botão "C" for clicado
        if (value === "C") {
            display.textContent = "0";
            result.textContent = "0";
            isFirstInput = true;
            return;
        }

        // Alterna o sinal do número exibido no display se o botão "±" for clicado
        if (value === "±") {
            if (display.textContent !== "0") {
                if (display.textContent.startsWith("-")) {
                    display.textContent = display.textContent.slice(1);
                } else {
                    display.textContent = "-" + display.textContent;
                }
            }
            return;
        }

        // Converte o valor exibido no display para porcentagem se o botão "%" for clicado
        if (value === "%") {
            result.textContent = display.textContent / 100;
            return;
        }

        // Avalia a expressão matemática digitada e exibe o resultado
        if (value === "=") {
            try {
                // Substitui os símbolos de multiplicação e divisão pelos operadores correspondentes do JavaScript
                let expression = display.textContent;
                expression = expression.replace("×", "*");
                expression = expression.replace("÷", "/");
                expression = expression.replaceAll(",", ".");
                // Avalia a expressão matemática digitada e exibe o resultado
                const resultValue = eval(expression);
                const roundedResult = parseFloat(resultValue.toFixed(8));
                result.textContent = String(roundedResult).replace(".", ",");
            } catch (error) {
                result.textContent = "Error";
            }
            return;
        }

        // Exibe no display o valor do botão clicado
        display.textContent += value;

    });

});