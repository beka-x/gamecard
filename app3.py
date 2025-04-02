from flask import Flask, render_template
import random

app = Flask(__name__)

# Массив символов для карточек
symbols = ['♥️', '♦️', '♣️', '♠️', '★', '☆', '■', '□']

# Функция для перемешивания и создания карточек
def generate_cards():
    # Дублируем символы для создания пар
    cards = symbols + symbols
    random.shuffle(cards)  # Перемешиваем карточки
    return cards

@app.route('/')
def index():
    # Генерируем и передаем карточки в шаблон
    cards = generate_cards()
    return render_template('index.html', cards=cards)

if __name__ == "__main__":
    app.run(debug=True)
