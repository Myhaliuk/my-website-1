// Додаємо обробник події для кнопки
document.getElementById('fetchButton').addEventListener('click', () => {
    // Завантажуємо JSON-файл
    fetch('js/siple.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json(); // Перетворюємо відповідь у JSON
        })
        .then(data => {
            const outputDiv = document.getElementById('output');
            outputDiv.innerHTML = ''; // Очищаємо попередній вміст

            // Групуємо автомобілі за брендом, маркою та роком
            const groupedData = {};
            Object.entries(data).forEach(([key, imageUrl]) => {
                const [brand, model, year] = key.split('/'); // Отримуємо бренд, марку та рік

                if (!groupedData[brand]) {
                    groupedData[brand] = {};
                }
                if (!groupedData[brand][model]) {
                    groupedData[brand][model] = {};
                }
                if (!groupedData[brand][model][year]) {
                    groupedData[brand][model][year] = [];
                }
                groupedData[brand][model][year].push({ imageUrl });
            });

            // Створюємо кнопки для кожного бренду
            Object.entries(groupedData).forEach(([brand, models]) => {
                // Створюємо кнопку для бренду
                const brandButton = document.createElement('button');
                brandButton.textContent = brand;
                brandButton.style.margin = '10px';
                brandButton.addEventListener('click', () => {
                    // Очищаємо попередній вміст для цього бренду
                    const modelButtonsDiv = document.getElementById(`models-${brand}`);
                    if (modelButtonsDiv) {
                        modelButtonsDiv.remove();
                    }

                    // Створюємо контейнер для кнопок моделей
                    const modelsDiv = document.createElement('div');
                    modelsDiv.id = `models-${brand}`;
                    modelsDiv.style.marginLeft = '20px';

                    // Додаємо кнопки для кожної моделі
                    Object.entries(models).forEach(([model, years]) => {
                        const modelButton = document.createElement('button');
                        modelButton.textContent = model;
                        modelButton.style.margin = '5px';
                        modelButton.addEventListener('click', () => {
                            // Очищаємо попередній вміст для цієї моделі
                            const yearButtonsDiv = document.getElementById(`years-${brand}-${model}`);
                            if (yearButtonsDiv) {
                                yearButtonsDiv.remove();
                            }

                            // Створюємо контейнер для кнопок років
                            const yearsDiv = document.createElement('div');
                            yearsDiv.id = `years-${brand}-${model}`;
                            yearsDiv.style.marginLeft = '40px';

                            // Додаємо кнопки для кожного року
                            Object.entries(years).forEach(([year, cars]) => {
                                const yearButton = document.createElement('button');
                                yearButton.textContent = `Рік: ${year}`;
                                yearButton.style.margin = '5px';
                                yearButton.addEventListener('click', () => {
                                    // Виводимо автомобілі для вибраного року
                                    const carsDiv = document.getElementById(`cars-${brand}-${model}-${year}`);
                                    if (carsDiv) {
                                        carsDiv.remove();
                                    }

                                    const carsContainer = document.createElement('div');
                                    carsContainer.id = `cars-${brand}-${model}-${year}`;
                                    carsContainer.style.marginLeft = '60px';

                                    cars.forEach(({ imageUrl }) => {
                                        const carDiv = document.createElement('div');
                                        carDiv.style.marginBottom = '10px';

                                        const img = document.createElement('img');
                                        img.src = imageUrl;
                                        img.alt = `${brand} ${model} ${year}`;
                                        img.style.width = '150px';
                                        img.style.height = 'auto';
                                        img.style.marginRight = '10px';

                                        carDiv.appendChild(img);
                                        carsContainer.appendChild(carDiv);
                                    });

                                    yearsDiv.appendChild(carsContainer);
                                });

                                yearsDiv.appendChild(yearButton);
                            });

                            modelsDiv.appendChild(yearsDiv);
                        });

                        modelsDiv.appendChild(modelButton);
                    });

                    outputDiv.appendChild(modelsDiv);
                });

                outputDiv.appendChild(brandButton);
            });
        })
        .catch(error => {
            console.error('Error fetching JSON:', error);
        });
});