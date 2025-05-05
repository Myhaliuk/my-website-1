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
                    const existingModelsDiv = document.getElementById('models-container');
                    if (existingModelsDiv) {
                        existingModelsDiv.remove();
                    }

                    const modelsDiv = document.createElement('div');
                    modelsDiv.id = 'models-container';
                    modelsDiv.style.marginLeft = '20px';

                    // Додаємо кнопки для кожної моделі
                    Object.entries(models).forEach(([model, years]) => {
                        const modelButton = document.createElement('button');
                        modelButton.textContent = model;
                        modelButton.style.margin = '5px';
                        modelButton.addEventListener('click', () => {
                            // Очищаємо попередній вміст для цієї моделі
                            const existingYearsDiv = document.getElementById('years-container');
                            if (existingYearsDiv) {
                                existingYearsDiv.remove();
                            }

                            const yearsDiv = document.createElement('div');
                            yearsDiv.id = 'years-container';
                            yearsDiv.style.marginLeft = '40px';

                            // Додаємо кнопки для кожного року
                            Object.entries(years).forEach(([year, cars]) => {
                                const yearButton = document.createElement('button');
                                yearButton.textContent = `Рік: ${year}`;
                                yearButton.style.margin = '5px';
                                yearButton.addEventListener('click', () => {
                                    // Очищаємо попередній вміст для фотографій
                                    const existingCarsDiv = document.getElementById('cars-container');
                                    if (existingCarsDiv) {
                                        existingCarsDiv.remove();
                                    }

                                    const carsContainer = document.createElement('div');
                                    carsContainer.id = 'cars-container';
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