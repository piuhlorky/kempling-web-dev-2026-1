// dishes - наш массив блюд из dishes.js
// sort - готовый метод массива, меняет порядок его элементов
// firstDish и secondDish - наши параметры, два блюда для сравнения
dishes.sort(function (firstDish, secondDish) {
    // name - название из объекта блюда
    // localeCompare - готовый метод для сравнения текстов
    // "ru" указывает, что сравниваем по правилам русского языка
    // return передаёт результат сравнения обратно методу sort
    return firstDish.name.localeCompare(secondDish.name, "ru");
});

// forEach - готовый метод массива, выполняет действия для каждого блюда
// dish - наш параметр, получает один объект блюда при каждом повторении
dishes.forEach(function (dish) {
    // grid - наша переменная с найденным блоком для карточек
    // getElementById - готовый метод браузера, ищет блок по id
    // к категории блюда добавляем "-grid" и получаем нужный id
    const grid = document.getElementById(dish.category + "-grid");

    // card - наша переменная с новым блоком div для карточки
    // createElement - готовый метод браузера, создаёт указанный тег
    const card = document.createElement("div");

    // className - готовое свойство для задания класса
    // стили класса dish-card уже есть в menu.css
    card.className = "dish-card";

    // dataset.dish задаёт атрибут data-dish у карточки
    // dish.keyword берём из данных текущего блюда
    // по этой отметке позже будем определять выбранное блюдо
    card.dataset.dish = dish.keyword;

    // image - наша переменная с созданной картинкой img
    const image = document.createElement("img");

    // src - путь к фото, берём его из данных блюда
    image.src = dish.image;

    // alt - текстовое описание картинки, используем название блюда
    image.alt = dish.name;

    // price - наша переменная с абзацем p для цены
    const price = document.createElement("p");

    // задаём класс для оформления цены через menu.css
    price.className = "dish-price";

    // textContent - готовое свойство для текста внутри абзаца
    // dish.price - число из данных блюда, добавляем к нему знак рубля
    price.textContent = dish.price + " ₽";

    // dishName - наша переменная с абзацем p для названия
    const dishName = document.createElement("p");
    dishName.className = "dish-name";

    // берём название из текущего объекта блюда
    dishName.textContent = dish.name;

    // weight - наша переменная с абзацем p для порции
    const weight = document.createElement("p");
    weight.className = "dish-weight";

    // dish.count - вес или объём из данных блюда
    weight.textContent = dish.count;

    // button - наша переменная с созданной кнопкой
    const button = document.createElement("button");

    // задаём тип обычной кнопки и надпись на ней
    button.type = "button";
    button.textContent = "Добавить";

    // append - готовый метод, добавляет элементы внутрь в конец
    // собираем части карточки в том порядке, в котором они перечислены
    card.append(image, price, dishName, weight, button);

    // добавляем готовую карточку в сетку её категории
    grid.append(card);
});