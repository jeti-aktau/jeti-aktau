// Система прелоадера и плавных переходов между страницами
class PreloaderManager {
    constructor() {
        this.isTransitioning = false;
        this.minLoadTime = 1500; // Минимальное время показа прелоадера
        this.init();
    }

    init() {
        this.createPreloader();
        this.setupPageLoadPreloader();
        this.setupPageTransitions();
        this.bindEvents();
    }

    // Создание HTML структуры прелоадера
    createPreloader() {
        if (document.getElementById('pagePreloader')) return;

        const preloaderHTML = `
            <div id="pagePreloader" class="page-preloader">
                <div class="preloader-decoration">
                    <div class="decoration-particle"></div>
                    <div class="decoration-particle"></div>
                    <div class="decoration-particle"></div>
                    <div class="decoration-particle"></div>
                </div>
                
                <img src="IMG_9458.PNG" alt="JETI" class="preloader-logo">
                
                <div class="preloader-spinner">
                    <div class="spinner-ring"></div>
                    <div class="spinner-ring"></div>
                    <div class="spinner-ring"></div>
                </div>
                
                <div class="preloader-text">ЗАГРУЗКА...</div>
                
                <div class="preloader-progress">
                    <div class="progress-bar" id="progressBar"></div>
                </div>
            </div>

            <div id="pageTransition" class="page-transition"></div>
        `;

        document.body.insertAdjacentHTML('afterbegin', preloaderHTML);
    }

    // Настройка прелоадера при загрузке страницы
    setupPageLoadPreloader() {
        const startTime = Date.now();
        let progress = 0;
        const progressBar = document.getElementById('progressBar');
        
        // Симуляция прогресса загрузки
        const progressInterval = setInterval(() => {
            progress += Math.random() * 15;
            if (progress >= 100) {
                progress = 100;
                clearInterval(progressInterval);
            }
            
            if (progressBar) {
                progressBar.style.width = progress + '%';
            }
        }, 100);

        // Ждем полной загрузки страницы
        window.addEventListener('load', () => {
            const loadTime = Date.now() - startTime;
            const remainingTime = Math.max(0, this.minLoadTime - loadTime);
            
            setTimeout(() => {
                this.hidePreloader();
            }, remainingTime);
        });

        // Если страница уже загружена
        if (document.readyState === 'complete') {
            setTimeout(() => {
                this.hidePreloader();
            }, this.minLoadTime);
        }
    }

    // Скрытие прелоадера
    hidePreloader() {
        const preloader = document.getElementById('pagePreloader');
        if (preloader) {
            preloader.classList.add('fade-out');
            
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 800);
        }
    }

    // Показ прелоадера
    showPreloader() {
        const preloader = document.getElementById('pagePreloader');
        if (preloader) {
            preloader.style.display = 'flex';
            preloader.classList.remove('fade-out');
            
            // Сброс прогресса
            const progressBar = document.getElementById('progressBar');
            if (progressBar) {
                progressBar.style.width = '0%';
            }
        }
    }

    // Настройка переходов между страницами
    setupPageTransitions() {
        const links = document.querySelectorAll('a[href]');
        
        links.forEach(link => {
            const href = link.getAttribute('href');
            
            // Проверяем, что это внутренняя ссылка на страницу
            if (this.isInternalPageLink(href)) {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.navigateToPage(href);
                });
            }
        });
    }

    // Проверка, является ли ссылка внутренней страницей
    isInternalPageLink(href) {
        if (!href || href === '#' || href.startsWith('tel:') || href.startsWith('mailto:') || href.startsWith('http')) {
            return false;
        }
        
        const pageFiles = ['index.html', 'city.html', 'nature.html', 'kids.html', 'admin.html'];
        return pageFiles.some(page => href.includes(page)) || href === '/' || href === './';
    }

    // Навигация к странице с переходом
    navigateToPage(url) {
        if (this.isTransitioning) return;
        
        this.isTransitioning = true;
        const transition = document.getElementById('pageTransition');
        
        if (transition) {
            // Показываем переход
            transition.classList.add('active');
            
            setTimeout(() => {
                // Переходим на новую страницу
                if (url === '/' || url === './') {
                    window.location.href = 'index.html';
                } else {
                    window.location.href = url;
                }
            }, 300);
        } else {
            // Если переход недоступен, просто переходим
            window.location.href = url;
        }
    }

    // Привязка дополнительных событий
    bindEvents() {
        // Обработка кнопки "назад" браузера
        window.addEventListener('pageshow', (e) => {
            if (e.persisted) {
                this.hidePreloader();
            }
        });

        // Обработка ошибок загрузки изображений
        window.addEventListener('error', (e) => {
            if (e.target.tagName === 'IMG') {
                console.warn('Ошибка загрузки изображения:', e.target.src);
            }
        }, true);

        // Ripple эффект при клике (опционально)
        document.addEventListener('click', (e) => {
            if (e.target.closest('.page-preloader')) {
                this.createRippleEffect(e);
            }
        });
    }

    // Создание ripple эффекта
    createRippleEffect(e) {
        const ripple = document.createElement('div');
        ripple.classList.add('ripple-effect');
        
        const rect = e.currentTarget.getBoundingClientRect();
        const size = 100;
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        e.currentTarget.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    // Программное показывание прелоадера для AJAX запросов
    showLoadingForOperation(operation, minTime = 1000) {
        this.showPreloader();
        const startTime = Date.now();
        
        return Promise.resolve(operation).then(result => {
            const elapsed = Date.now() - startTime;
            const remaining = Math.max(0, minTime - elapsed);
            
            return new Promise(resolve => {
                setTimeout(() => {
                    this.hidePreloader();
                    resolve(result);
                }, remaining);
            });
        }).catch(error => {
            const elapsed = Date.now() - startTime;
            const remaining = Math.max(0, minTime - elapsed);
            
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    this.hidePreloader();
                    reject(error);
                }, remaining);
            });
        });
    }

    // Обновление ссылок (для динамически добавленного контента)
    refreshLinks() {
        this.setupPageTransitions();
    }
}

// Инициализация прелоадера
let preloaderManager;

// Инициализируем сразу, не дожидаясь DOMContentLoaded
(function() {
    // Добавляем CSS если его еще нет
    if (!document.getElementById('preloader-styles')) {
        const link = document.createElement('link');
        link.id = 'preloader-styles';
        link.rel = 'stylesheet';
        link.href = 'preloader.css';
        document.head.appendChild(link);
    }

    // Инициализируем менеджер
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            preloaderManager = new PreloaderManager();
        });
    } else {
        preloaderManager = new PreloaderManager();
    }
})();

// Экспорт для использования в других скриптах
window.PreloaderManager = PreloaderManager;
window.preloaderManager = preloaderManager;
