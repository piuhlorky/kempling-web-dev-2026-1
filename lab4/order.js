// selectedDishes - наш объект с выбранными блюдами по категориям
// null означает, что в этой категории пока ничего не выбрали
const selectedDishes = {
    soup: null,
    main: null,
    drink: null
};

// inputIds - наш объект с id скрытых полей из menu.html
// через эти поля выбранные keyword отправятся вместе с формой
const inputIds = {
    soup: "soup",
    main: "main-dish",
    drink: "drink"
};

// updateOrder - наша функция, обновляет надписи, сумму и рамки карточек
function updateOrder() {
    // total - наша переменная для суммы, начинаем считать с нуля
    // let позволяет менять значение переменной во время подсчёта
    let total = 0;
    let hasSelection = false;

    // Object.keys даёт список ключей объекта: soup, main и drink
    // category - наш параметр, получает по очереди одно из этих имён
    Object.keys(selectedDishes).forEach(function (category) {
        // dish - выбранный объект блюда или null, если выбора ещё нет
        const dish = selectedDishes[category];

        // находим абзац для показа блюда и скрытое поле для отправки
        const text = document.getElementById("selected-" + category);
        const input = document.getElementById(inputIds[category]);

        // if проверяет, выбрали ли блюдо в этой категории
        if (dish) {
            text.textContent = dish.name + " " + dish.price + " ₽";
            input.value = dish.keyword;
            total = total + dish.price;
            hasSelection = true;
        } else {
            // else выполняется, если в этой категории пока нет блюда
            text.textContent = "Блюдо не выбрано";
            if (category === "drink") {
                text.textContent = "Напиток не выбран";
            }
            input.value = "";
        }
    });

    // hidden - готовое свойство, true скрывает блок, false показывает
    // знак ! меняет true на false и наоборот
    document.getElementById("empty-order").hidden = hasSelection;
    document.getElementById("selected-dishes").hidden = !hasSelection;
    document.getElementById("order-total").hidden = !hasSelection;
    document.getElementById("total-price").textContent = total + " ₽";

    // querySelectorAll находит все карточки, card - одна из них
    document.querySelectorAll(".dish-card").forEach(function (card) {
        // find ищет блюдо в массиве по отметке data-dish на карточке
        const dish = dishes.find(function (item) {
            return item.keyword === card.dataset.dish;
        });

        // selected - наше значение true или false: выбрана ли эта карточка
        const selected = selectedDishes[dish.category] === dish;

        // toggle добавляет класс selected при true и убирает при false
        card.classList.toggle("selected", selected);
    });
}

// находим карточки, которые уже создал render-menu.js
// для каждой кнопки задаём действия при нажатии
document.querySelectorAll(".dish-card").forEach(function (card) {
    const button = card.querySelector("button");

    // addEventListener - готовый метод, задаёт реакцию на событие
    // click - нажатие, function содержит действия после него
    button.addEventListener("click", function () {
        // item - очередной объект из массива dishes
        // === сравнивает keyword из данных с data-dish карточки
        const dish = dishes.find(function (item) {
            return item.keyword === card.dataset.dish;
        });

        // сохраняем выбранное блюдо в его категории
        // новый суп заменит предыдущий суп, а напиток останется выбранным
        selectedDishes[dish.category] = dish;
        updateOrder();
    });
});

// form - наша переменная с формой заказа
const form = document.querySelector(".order-section form");

// reset - событие кнопки «Сбросить», очищаем выбранные блюда
form.addEventListener("reset", function () {
    Object.keys(selectedDishes).forEach(function (category) {
        selectedDishes[category] = null;
    });
    updateOrder();
});

// вызываем нашу функцию при открытии страницы, чтобы показать пустой заказ
updateOrder();
