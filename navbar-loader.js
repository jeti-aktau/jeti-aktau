// Navbar Loader - Загружает навигацию из navbar.html
function loadNavbar() {
    fetch('navbar.html')
        .then(response => response.text())
        .then(data => {
            // Создаем контейнер для навигации если его нет
            let navContainer = document.getElementById('navbar-container');
            if (!navContainer) {
                navContainer = document.createElement('div');
                navContainer.id = 'navbar-container';
                document.body.insertBefore(navContainer, document.body.firstChild);
            }
            
            // Вставляем навигацию
            navContainer.innerHTML = data;
            
            // Выполняем скрипты из загруженной навигации после небольшой задержки
            const scripts = navContainer.querySelectorAll('script');
            scripts.forEach(script => {
                const newScript = document.createElement('script');
                newScript.textContent = script.textContent;
                document.head.appendChild(newScript);
                script.remove();
            });
            
            // Дополнительно инициализируем мобильное меню
            setTimeout(() => {
                initMobileMenu();
            }, 100);
            
            // Добавляем стили
            const styles = navContainer.querySelectorAll('style');
            styles.forEach(style => {
                document.head.appendChild(style);
            });
        })
        .catch(error => {
            console.error('Ошибка загрузки навигации:', error);
        });
}

// Функция инициализации мобильного меню
function initMobileMenu() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        // Удаляем предыдущие обработчики
        mobileMenuButton.replaceWith(mobileMenuButton.cloneNode(true));
        const newButton = document.getElementById('mobile-menu-button');
        
        newButton.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Mobile menu button clicked!'); // Для отладки
            mobileMenu.classList.toggle('hidden');
        });
        
        console.log('Mobile menu initialized!'); // Для отладки
    } else {
        console.log('Mobile menu elements not found!'); // Для отладки
    }
}

// Автоматически загружаем навигацию при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    loadNavbar();
});