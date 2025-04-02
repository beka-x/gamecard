let flippedCards = [];
let matchedCards = new Set();
let moves = 0;

document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".card");
    const movesDisplay = document.getElementById("moves");
    const gameMessage = document.getElementById("game-message");

    // Обработчик кликов на карты
    cards.forEach((card) => {
        card.addEventListener("click", () => flipCard(card));
    });

    // Функция для переворота карты
    function flipCard(card) {
        // Проверяем, если уже перевернуты 2 карты
        if (flippedCards.length >= 2 || card.classList.contains("flipped") || matchedCards.has(card)) {
            return;
        }

        card.classList.add("flipped");
        card.textContent = card.getAttribute("data-symbol");
        flippedCards.push({ card, symbol: card.getAttribute("data-symbol") });

        if (flippedCards.length === 2) {
            checkForMatch();
        }
    }

    // Функция для проверки совпадений
    function checkForMatch() {
        const [first, second] = flippedCards;

        // Увеличиваем количество ходов
        moves++;
        movesDisplay.textContent = moves;

        // Если карты совпали
        if (first.symbol === second.symbol) {
            first.card.classList.add("matched");
            second.card.classList.add("matched");
            matchedCards.add(first.card);
            matchedCards.add(second.card);

            // Проверка на победу
            if (matchedCards.size === cards.length) {
                gameMessage.textContent = "Поздравляем! Вы выиграли!";
            }

            flippedCards = [];
        } else {
            // Если карты не совпали, скрываем их через секунду
            setTimeout(() => {
                first.card.classList.remove("flipped");
                second.card.classList.remove("flipped");
                first.card.textContent = "?";
                second.card.textContent = "?";
                flippedCards = [];
            }, 1000);
        }
    }
});
