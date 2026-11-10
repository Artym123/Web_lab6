/*jslint browser, devel */
/*global window, document, Number */

"use strict";

window.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("calc-form");
    const quantityInput = document.getElementById("quantity");
    const serviceRadios = document.querySelectorAll("input[name='service']");
    const optionBlock = document.getElementById("option-block");
    const optionSelect = document.getElementById("option");
    const propertyBlock = document.getElementById("property-block");
    const propertyCheckbox = document.getElementById("property");
    const resultBlock = document.getElementById("result");
    const errorBlock = document.getElementById("error"); // НОВОЕ

    const basePrices = {
        "1": 1000,
        "2": 1500,
        "3": 2000
    };

    function getSelectedService() {
        const checked = document.querySelector("input[name='service']:checked");
        return checked ? checked.value : "1";
    }

    function toggleBlocks(serviceType) {
        optionBlock.hidden = serviceType !== "2";
        propertyBlock.hidden = serviceType !== "3";
    }

    /**
     * Пересчитывает и выводит стоимость.
     */
    function recalculate() {
        const serviceType = getSelectedService();
        toggleBlocks(serviceType);

        // 1. Очищаем прошлые ошибки
        errorBlock.textContent = "";

        // 2. Получаем значение и проверяем регуляркой (как в 5 задании)
        const rawQuantity = quantityInput.value.trim();
        const regex = /^\d+$/; // Только целые положительные числа (и 0)

        if (!regex.test(rawQuantity)) {
            // Если введены буквы, минус или пустота
            errorBlock.textContent = "Ошибка: введите целое положительное число.";
            return; // Прерываем функцию, цена не пересчитывается
        }

        const quantity = Number(rawQuantity);

        if (quantity === 0) {
            errorBlock.textContent = "Ошибка: количество должно быть больше нуля.";
            return;
        }

        // 3. Считаем цену
        let unitPrice = basePrices[serviceType];

        if (serviceType === "2") {
            unitPrice += Number(optionSelect.value);
        }

        if (serviceType === "3" && propertyCheckbox.checked) {
            unitPrice += 300;
        }

        const total = unitPrice * quantity;
        resultBlock.textContent = "Стоимость: " + total + " ₽";
    }

    // ---- Навешиваем обработчики ----
    quantityInput.addEventListener("input", recalculate);

    serviceRadios.forEach(function (radio) {
        radio.addEventListener("change", recalculate);
    });

    optionSelect.addEventListener("change", recalculate);
    propertyCheckbox.addEventListener("change", recalculate);

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        recalculate();
    });

    // Первичный расчёт
    recalculate();
});
