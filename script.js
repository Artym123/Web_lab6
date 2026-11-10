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

    /**
     * Базовая цена каждого типа услуги.
     */
    const basePrices = {
        "1": 1000,
        "2": 1500,
        "3": 2000
    };

    /**
     * Возвращает выбранный тип услуги (1, 2 или 3).
     * @returns {string}
     */
    function getSelectedService() {
        const checked = document.querySelector("input[name='service']:checked");
        return checked ? checked.value : "1";
    }

    /**
     * Показывает/скрывает блоки опций и свойств в зависимости от типа.
     * @param {string} serviceType
     */
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

        let quantity = Number(quantityInput.value);
        if (!Number.isFinite(quantity) || quantity < 1) {
            quantity = 1;
        }

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

    // Запрет отправки формы по Enter (страница не перезагружается)
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        recalculate();
    });

    // Первичный расчёт при загрузке
    recalculate();

});
