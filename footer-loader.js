// Footer Loader - Загружает футер из footer.html
function loadFooter() {
    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            // Создаем контейнер для футера если его нет
            let footerContainer = document.getElementById('footer-container');
            if (!footerContainer) {
                footerContainer = document.createElement('div');
                footerContainer.id = 'footer-container';
                document.body.appendChild(footerContainer);
            }
            
            // Вставляем футер
            footerContainer.innerHTML = data;
        })
        .catch(error => {
            console.error('Ошибка загрузки футера:', error);
        });
}

// Автоматически загружаем футер при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    loadFooter();
});