// Админ панель для управления карточками JETI
class AdminPanel {
    constructor() {
        this.currentTab = 'city';
        this.editingCard = null;
        this.hasChanges = false;
        this.addingCategoryToPage = null;
        this.cardsData = {
            city: {},
            nature: {},
            kids: {}
        };
        this.init();
    }

    init() {
        this.loadCardsFromFiles();
        this.setupEventListeners();
    }

    setupEventListeners() {
        document.getElementById('editForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveCardEdit();
        });

        document.getElementById('addCategoryForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addNewCategory();
        });
    }

    // Загрузка карточек из HTML файлов
    async loadCardsFromFiles() {
        try {
            await this.loadCardsFromPage('city');
            await this.loadCardsFromPage('nature');
            await this.loadCardsFromPage('kids');
            this.renderCards(this.currentTab);
        } catch (error) {
            this.showNotification('Ошибка загрузки данных: ' + error.message, 'error');
        }
    }

    async loadCardsFromPage(page) {
        try {
            const response = await fetch(`${page}.html`);
            const html = await response.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            
            // Получаем все секции с карточками
            const sections = doc.querySelectorAll('section.mb-16');
            this.cardsData[page] = {};
            
            sections.forEach(section => {
                const sectionHeader = section.querySelector('.section-header h2');
                if (sectionHeader) {
                    const categoryName = sectionHeader.textContent.trim();
                    const cards = section.querySelectorAll('.place-card');
                    
                    this.cardsData[page][categoryName] = [];
                    
                    cards.forEach((card, index) => {
                        const imageDiv = card.querySelector('.place-image');
                        const title = card.querySelector('.place-title');
                        const description = card.querySelector('.place-description');
                        const address = card.querySelector('.place-actions span');
                        const mapLink = card.querySelector('.btn-map-location');
                        
                        if (title && description) {
                            this.cardsData[page][categoryName].push({
                                id: `${page}_${categoryName}_${index}`,
                                title: title.textContent.trim(),
                                description: description.textContent.trim(),
                                image: this.extractImageUrl(imageDiv?.style.backgroundImage || ''),
                                address: address?.textContent.trim() || '',
                                mapLink: mapLink?.href || '#',
                                categoryName: categoryName,
                                originalIndex: index
                            });
                        }
                    });
                }
            });
        } catch (error) {
            console.error(`Ошибка загрузки страницы ${page}:`, error);
        }
    }

    extractImageUrl(backgroundImage) {
        const match = backgroundImage.match(/url\(['"]?(.*?)['"]?\)/);
        return match ? match[1] : '';
    }

    // Переключение вкладок
    switchTab(tab) {
        // Обновляем кнопки
        document.querySelectorAll('.tab-button').forEach(btn => {
            btn.classList.remove('active');
        });
        event.target.classList.add('active');

        // Скрываем все вкладки
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.add('hidden');
        });

        // Показываем нужную вкладку
        document.getElementById(`${tab}-tab`).classList.remove('hidden');
        
        this.currentTab = tab;
        this.renderCards(tab);
    }

    // Отрисовка карточек
    renderCards(page) {
        const container = document.getElementById(`${page}-cards`);
        container.innerHTML = '';

        const categories = this.cardsData[page];
        
        Object.keys(categories).forEach(categoryName => {
            // Создаем заголовок категории
            const categoryHeader = document.createElement('div');
            categoryHeader.className = 'col-span-full mb-4';
            categoryHeader.innerHTML = `
                <div class="flex justify-between items-center">
                    <h3 class="text-xl font-bold text-jeti-brown">${categoryName}</h3>
                    <div class="space-x-2">
                        <button class="btn-primary text-sm" onclick="adminPanel.addNewCard('${page}', '${categoryName}')">+ Добавить в эту категорию</button>
                        <button class="btn-danger text-sm" onclick="adminPanel.deleteCategory('${page}', '${categoryName}')" title="Удалить категорию">🗑️</button>
                    </div>
                </div>
            `;
            container.appendChild(categoryHeader);

            // Создаем карточки для этой категории
            const categoryContainer = document.createElement('div');
            categoryContainer.className = 'col-span-full grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8';
            
            categories[categoryName].forEach((card, index) => {
                const cardElement = this.createCardElement(card, page, categoryName, index);
                categoryContainer.appendChild(cardElement);
            });
            
            container.appendChild(categoryContainer);
        });
    }

    createCardElement(card, page, categoryName, index) {
        const div = document.createElement('div');
        div.className = 'admin-card p-4';
        div.innerHTML = `
            <div class="card-preview" style="background-image: url('${card.image}')"></div>
            <h3 class="font-bold text-lg mb-2">${card.title}</h3>
            <p class="text-gray-600 text-sm mb-2 line-clamp-3">${card.description}</p>
            <p class="text-gray-500 text-xs mb-3">${card.address}</p>
            <div class="flex space-x-2">
                <button class="btn-primary text-sm" onclick="adminPanel.editCard('${page}', '${categoryName}', ${index})">Редактировать</button>
                <button class="btn-secondary text-sm" onclick="adminPanel.deleteCard('${page}', '${categoryName}', ${index})">Удалить</button>
            </div>
        `;
        return div;
    }

    // Редактирование карточки
    editCard(page, categoryName, index) {
        const card = this.cardsData[page][categoryName][index];
        this.editingCard = { page, categoryName, index };

        document.getElementById('editTitle').value = card.title;
        document.getElementById('editDescription').value = card.description;
        document.getElementById('editImage').value = card.image;
        document.getElementById('editAddress').value = card.address;
        document.getElementById('editMapLink').value = card.mapLink || '';

        document.getElementById('editModal').classList.remove('hidden');
    }

    // Сохранение изменений карточки
    saveCardEdit() {
        if (!this.editingCard) return;

        const { page, categoryName, index } = this.editingCard;
        const card = this.cardsData[page][categoryName][index];

        card.title = document.getElementById('editTitle').value;
        card.description = document.getElementById('editDescription').value;
        card.image = document.getElementById('editImage').value;
        card.address = document.getElementById('editAddress').value;
        card.mapLink = document.getElementById('editMapLink').value;

        this.hasChanges = true;
        this.updateSaveButton();
        this.renderCards(page);
        this.closeModal();
        this.showNotification('Карточка обновлена! Не забудьте сохранить изменения.', 'success');
    }

    // Удаление карточки
    deleteCard(page, categoryName, index) {
        if (confirm('Вы уверены, что хотите удалить эту карточку?')) {
            this.cardsData[page][categoryName].splice(index, 1);
            this.hasChanges = true;
            this.updateSaveButton();
            this.renderCards(page);
            this.showNotification('Карточка удалена! Не забудьте сохранить изменения.', 'success');
        }
    }

    // Добавление новой карточки
    addNewCard(page, categoryName) {
        const newCard = {
            id: `${page}_${categoryName}_${Date.now()}`,
            title: 'Новое место',
            description: 'Описание нового места',
            image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
            address: 'Адрес',
            mapLink: '#',
            categoryName: categoryName,
            originalIndex: this.cardsData[page][categoryName].length
        };

        this.cardsData[page][categoryName].push(newCard);
        this.hasChanges = true;
        this.updateSaveButton();
        this.renderCards(page);
        this.showNotification('Новая карточка добавлена! Отредактируйте её и сохраните изменения.', 'success');
    }

    // Закрытие модального окна
    closeModal() {
        document.getElementById('editModal').classList.add('hidden');
        this.editingCard = null;
    }

    // Открытие модального окна для добавления категории
    openAddCategoryModal(page) {
        this.addingCategoryToPage = page;
        document.getElementById('categoryName').value = '';
        document.getElementById('categoryDescription').value = '';
        document.getElementById('addCategoryModal').classList.remove('hidden');
    }

    // Закрытие модального окна для добавления категории
    closeAddCategoryModal() {
        document.getElementById('addCategoryModal').classList.add('hidden');
        this.addingCategoryToPage = null;
    }

    // Добавление новой категории
    addNewCategory() {
        if (!this.addingCategoryToPage) return;

        const categoryName = document.getElementById('categoryName').value.trim();
        const categoryDescription = document.getElementById('categoryDescription').value.trim();

        if (!categoryName) {
            this.showNotification('Введите название категории!', 'error');
            return;
        }

        const page = this.addingCategoryToPage;

        // Проверяем, что категория не существует
        if (this.cardsData[page][categoryName]) {
            this.showNotification('Категория с таким названием уже существует!', 'error');
            return;
        }

        // Добавляем новую категорию
        this.cardsData[page][categoryName] = [];

        this.hasChanges = true;
        this.updateSaveButton();
        this.renderCards(page);
        this.closeAddCategoryModal();

        this.showNotification(`Категория "${categoryName}" добавлена! Не забудьте сохранить изменения.`, 'success');
    }

    // Удаление категории
    deleteCategory(page, categoryName) {
        const cardsCount = this.cardsData[page][categoryName]?.length || 0;
        
        if (cardsCount > 0) {
            const confirmed = confirm(`В категории "${categoryName}" есть ${cardsCount} карточек. Вы уверены, что хотите удалить всю категорию?`);
            if (!confirmed) return;
        } else {
            const confirmed = confirm(`Удалить категорию "${categoryName}"?`);
            if (!confirmed) return;
        }

        // Удаляем категорию
        delete this.cardsData[page][categoryName];

        this.hasChanges = true;
        this.updateSaveButton();
        this.renderCards(page);

        this.showNotification(`Категория "${categoryName}" удалена! Не забудьте сохранить изменения.`, 'success');
    }

    // Обновление кнопки сохранения
    updateSaveButton() {
        const saveControls = document.getElementById('saveControls');
        const saveBtn = document.getElementById('saveBtn');
        const pageSelect = document.getElementById('pageSelect');
        
        if (this.hasChanges) {
            saveControls.style.display = 'flex';
            // Активируем кнопку сохранения только если выбрана страница
            saveBtn.disabled = !pageSelect.value;
        } else {
            saveControls.style.display = 'none';
        }
    }

    // Сохранение всех изменений в файлы
    async saveAllChanges() {
        try {
            await this.savePageChanges('city');
            await this.savePageChanges('nature');
            await this.savePageChanges('kids');
            
            this.hasChanges = false;
            this.updateSaveButton();
            this.showNotification('Все изменения сохранены успешно!', 'success');
        } catch (error) {
            this.showNotification('Ошибка сохранения: ' + error.message, 'error');
        }
    }

    async savePageChanges(page) {
        try {
            // Загружаем текущий HTML файл
            const response = await fetch(`${page}.html`);
            let html = await response.text();
            
            // Генерируем новые секции
            const categories = this.cardsData[page];
            let newSectionsHtml = '';
            
            Object.keys(categories).forEach(categoryName => {
                const categoryCards = categories[categoryName];
                newSectionsHtml += this.generateSectionHtml(categoryName, categoryCards);
            });
            
            // Заменяем содержимое main
            html = this.replaceCardsInHtml(html, newSectionsHtml, page);
            
            // Пытаемся сохранить через File System Access API или скачать
            if (window.showSaveFilePicker) {
                await this.saveFileDirectly(`${page}.html`, html);
            } else {
                this.downloadUpdatedFile(`${page}.html`, html);
            }
            
        } catch (error) {
            console.error(`Ошибка сохранения ${page}:`, error);
            // Fallback к скачиванию
            const response = await fetch(`${page}.html`);
            let html = await response.text();
            
            const categories = this.cardsData[page];
            let newSectionsHtml = '';
            
            Object.keys(categories).forEach(categoryName => {
                const categoryCards = categories[categoryName];
                newSectionsHtml += this.generateSectionHtml(categoryName, categoryCards);
            });
            
            html = this.replaceCardsInHtml(html, newSectionsHtml, page);
            this.downloadUpdatedFile(`${page}.html`, html);
        }
    }

    async saveFileDirectly(filename, content) {
        try {
            const fileHandle = await window.showSaveFilePicker({
                suggestedName: filename,
                types: [{
                    description: 'HTML files',
                    accept: { 'text/html': ['.html'] }
                }]
            });
            
            const writable = await fileHandle.createWritable();
            await writable.write(content);
            await writable.close();
            
            this.showNotification(`Файл ${filename} сохранен успешно!`, 'success');
        } catch (error) {
            if (error.name !== 'AbortError') {
                throw error;
            }
        }
    }

    generateSectionHtml(categoryName, cards) {
        const cardsHtml = cards.map(card => `
                <div class="place-card">
                    <div class="place-image" style="background-image: url('${card.image}');"></div>
                    <div class="place-content">
                        <h3 class="place-title">${card.title}</h3>
                        <p class="place-description">${card.description}</p>
                        <div class="place-actions">
                            <span class="text-sm text-gray-500">${card.address}</span>
                            <a href="${card.mapLink || '#'}" class="btn-map-location" ${card.mapLink && card.mapLink !== '#' ? 'target="_blank"' : ''}>
                                <div class="map-icon"></div>
                                Посмотреть на карте
                            </a>
                        </div>
                    </div>
                </div>`).join('\n                ');

        // Определяем подходящую сетку в зависимости от количества карточек
        let gridClass = 'grid md:grid-cols-2 lg:grid-cols-3 gap-6';
        if (cards.length <= 2) {
            gridClass = 'grid md:grid-cols-2 gap-6';
        } else if (cards.length >= 4) {
            gridClass = 'grid md:grid-cols-2 xl:grid-cols-3 gap-6';
        }

        return `
        <!-- ${categoryName.replace(/[🏖️🍽️👧🎯⛰️🔥🏊‍♀️]/g, '').trim()} -->
        <section class="mb-16">
            <div class="section-header">
                <h2 class="text-3xl font-bold text-jeti-brown">${categoryName}</h2>
            </div>
            <div class="${gridClass}">
                ${cardsHtml}
            </div>
        </section>`;
    }

    replaceCardsInHtml(html, newSectionsHtml, page) {
        // Находим все секции с карточками и заменяем их
        const mainPattern = /<main[^>]*>([\s\S]*?)<\/main>/;
        const mainMatch = html.match(mainPattern);
        
        if (!mainMatch) {
            throw new Error(`Не найден main контейнер для страницы ${page}`);
        }
        
        // Заменяем содержимое main
        const beforeMain = html.substring(0, html.indexOf(mainMatch[0]));
        const afterMain = html.substring(html.indexOf(mainMatch[0]) + mainMatch[0].length);
        
        const newMainContent = `<main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        ${newSectionsHtml}
    </main>`;
        
        return beforeMain + newMainContent + afterMain;
    }

    downloadUpdatedFile(filename, content) {
        // Создаем ссылку для скачивания
        const blob = new Blob([content], { type: 'text/html' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
        window.URL.revokeObjectURL(url);
        
        this.showNotification(`Файл ${filename} готов к скачиванию. Замените оригинальный файл.`, 'success');
    }

    // Показ уведомлений
    showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 5000);
    }

    // Тестирование генерации HTML
    testGeneration() {
        try {
            const page = this.currentTab;
            const categories = this.cardsData[page];
            let newSectionsHtml = '';
            
            Object.keys(categories).forEach(categoryName => {
                const categoryCards = categories[categoryName];
                newSectionsHtml += this.generateSectionHtml(categoryName, categoryCards);
            });

            console.log('Сгенерированный HTML:');
            console.log(newSectionsHtml);
            
            // Создаем тестовое окно с результатом
            const testWindow = window.open('', '_blank', 'width=800,height=600');
            testWindow.document.write(`
                <html>
                <head><title>Тест генерации HTML - ${page}</title></head>
                <body style="font-family: monospace; white-space: pre-wrap; padding: 20px;">
                    ${newSectionsHtml.replace(/</g, '&lt;').replace(/>/g, '&gt;')}
                </body>
                </html>
            `);
            
            this.showNotification('Тест генерации завершен! Проверьте новое окно.', 'success');
        } catch (error) {
            console.error('Ошибка тестирования:', error);
            this.showNotification('Ошибка тестирования: ' + error.message, 'error');
        }
    }
}

// Глобальные функции для доступа из HTML
window.adminPanel = new AdminPanel();

// Обработчик изменения выбора страницы
document.addEventListener('DOMContentLoaded', function() {
    const pageSelect = document.getElementById('pageSelect');
    const saveBtn = document.getElementById('saveBtn');
    
    if (pageSelect) {
        pageSelect.addEventListener('change', function() {
            saveBtn.disabled = !this.value;
        });
    }
});

// Функция для выборочного сохранения
async function saveSelectedPage() {
    const pageSelect = document.getElementById('pageSelect');
    const selectedPage = pageSelect.value;
    
    if (!selectedPage) {
        adminPanel.showNotification('Выберите страницу для сохранения!', 'error');
        return;
    }
    
    try {
        if (selectedPage === 'all') {
            await adminPanel.saveAllChanges();
        } else {
            await adminPanel.savePageChanges(selectedPage);
        }
        
        adminPanel.hasChanges = false;
        adminPanel.updateSaveButton();
        pageSelect.value = '';
    } catch (error) {
        console.error('Ошибка сохранения:', error);
        adminPanel.showNotification('Ошибка сохранения: ' + error.message, 'error');
    }
}

// Старая функция для обратной совместимости
async function saveAllChanges() {
    await adminPanel.saveAllChanges();
}

window.switchTab = function(tab) {
    adminPanel.switchTab(tab);
};

window.closeModal = function() {
    adminPanel.closeModal();
};

window.saveAllChanges = function() {
    adminPanel.saveAllChanges();
};