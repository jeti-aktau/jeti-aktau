class MusicPlayer {
    constructor() {
        this.isPlaying = false;
        this.isLoading = false;
        this.audio = null;
        this.musicUrl = 'https://raw.githubusercontent.com/jeti-aktau/jeti-aktau/671a4de3067fce8ec6af65632d5fcea8d28ac639/Nurzhan-Tazhikenov-Adai-agugai.kz_%20(mp3cut.net).mp3';
        
        // Добавляем crossOrigin атрибут для попытки обхода CORS
        this.audioCrossOrigin = 'anonymous';
        this.trackName = 'Adai - Нуржан Тажикенов';
        
        // iOS специфичные флаги
        this.isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
        this.userHasInteracted = false;
        this.audioContextResumed = false;
        
        this.init();
    }

    init() {
        this.createPlayer();
        this.setupAudio();
        this.attachEvents();
        
        // Для iOS добавляем обработчик первого взаимодействия
        if (this.isIOS) {
            this.setupIOSInteraction();
        }
    }

    setupIOSInteraction() {
        // Слушаем первое касание/клик для разблокировки аудио на iOS
        const unlockAudio = () => {
            if (!this.userHasInteracted) {
                this.userHasInteracted = true;
                
                // Создаем короткий беззвучный звук для разблокировки
                if (this.audio) {
                    const currentTime = this.audio.currentTime;
                    this.audio.volume = 0;
                    this.audio.play().then(() => {
                        this.audio.pause();
                        this.audio.currentTime = currentTime;
                        this.audio.volume = 0.4;
                        console.log('iOS аудио разблокировано');
                    }).catch(e => {
                        console.warn('Не удалось разблокировать аудио на iOS:', e);
                    });
                }
                
                // Разблокируем AudioContext для iOS
                if (this.audioContext && this.audioContext.state === 'suspended') {
                    this.audioContext.resume().then(() => {
                        this.audioContextResumed = true;
                        console.log('iOS AudioContext разблокирован');
                    });
                }
                
                // Убираем обработчики после первого взаимодействия
                document.removeEventListener('touchstart', unlockAudio);
                document.removeEventListener('touchend', unlockAudio);
                document.removeEventListener('click', unlockAudio);
            }
        };

        // Добавляем обработчики для различных событий
        document.addEventListener('touchstart', unlockAudio, { passive: true });
        document.addEventListener('touchend', unlockAudio, { passive: true });
        document.addEventListener('click', unlockAudio, { passive: true });
    }

    createPlayer() {
        // Создаем HTML структуру плеера
        const playerHTML = `
            <div class="music-player" id="musicPlayer">
                <div class="music-tooltip">${this.trackName}</div>
                
                <!-- Аудио визуализатор -->
                <div class="audio-visualizer" id="audioVisualizer">
                    ${this.createVisualizerBars()}
                </div>
                
                <div class="music-icon" id="musicIcon">
                    ${this.getPlayIcon()}
                </div>
                <div class="music-equalizer">
                    <div class="eq-bar"></div>
                    <div class="eq-bar"></div>
                    <div class="eq-bar"></div>
                    <div class="eq-bar"></div>
                </div>
                <audio id="musicAudio" preload="metadata" crossorigin="anonymous" playsinline>
                    <source src="${this.musicUrl}" type="audio/mpeg">
                    Ваш браузер не поддерживает воспроизведение аудио.
                </audio>
            </div>
        `;

        // Добавляем плеер в body
        document.body.insertAdjacentHTML('beforeend', playerHTML);
        
        // Получаем ссылки на элементы
        this.playerElement = document.getElementById('musicPlayer');
        this.iconElement = document.getElementById('musicIcon');
        this.audio = document.getElementById('musicAudio');
        this.visualizerElement = document.getElementById('audioVisualizer');
    }

    // Создание полосок визуализатора
    createVisualizerBars() {
        let bars = '';
        for (let i = 1; i <= 12; i++) {
            bars += `<div class="visualizer-bar"></div>`;
        }
        return bars;
    }

    // SVG иконки
    getPlayIcon() {
        return `
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 5.14v13.72L19 12L8 5.14z" fill="currentColor" stroke="currentColor" stroke-width="1" stroke-linejoin="round"/>
            </svg>
        `;
    }

    getPauseIcon() {
        return `
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="6" y="4" width="4" height="16" fill="currentColor" rx="1"/>
                <rect x="14" y="4" width="4" height="16" fill="currentColor" rx="1"/>
            </svg>
        `;
    }

    getLoadingIcon() {
        return `
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
        `;
    }

    getErrorIcon() {
        return `
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
                <path d="M15 9l-6 6m0-6l6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
        `;
    }

    setupAudio() {
        // Настройка аудио элемента
        this.audio.loop = true;
        this.audio.volume = 0.4; // 60% громкости по умолчанию
        
        // iOS специфичные настройки
        if (this.isIOS) {
            this.audio.muted = false;
            this.audio.autoplay = false;
        }

        // Инициализация Web Audio API для анализа
        this.setupAudioAnalyzer();

        // События аудио
        this.audio.addEventListener('loadstart', () => {
            this.setLoading(true);
        });

        this.audio.addEventListener('canplay', () => {
            this.setLoading(false);
        });

        this.audio.addEventListener('play', () => {
            this.updateUI(true);
            this.startVisualizer();
        });

        this.audio.addEventListener('pause', () => {
            this.updateUI(false);
            this.stopVisualizer();
        });

        this.audio.addEventListener('ended', () => {
            this.updateUI(false);
            this.stopVisualizer();
        });

        this.audio.addEventListener('error', (e) => {
            console.error('Ошибка загрузки аудио:', e);
            this.setLoading(false);
            this.showError();
        });
    }

    setupAudioAnalyzer() {
        try {
            // Создаем аудио контекст
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            this.analyser = this.audioContext.createAnalyser();
            
            // Настройки анализатора
            this.analyser.fftSize = 64; // Размер для анализа частот
            this.bufferLength = this.analyser.frequencyBinCount;
            this.dataArray = new Uint8Array(this.bufferLength);
            
            this.visualizerActive = false;
            this.audioAnalyzerAvailable = true;
            
            // Отложенное подключение источника - после первого воспроизведения
            this.audioSourceConnected = false;
        } catch (error) {
            console.warn('Web Audio API недоступен, используем базовую анимацию:', error);
            this.audioAnalyzerAvailable = false;
        }
    }

    connectAudioSource() {
        if (!this.audioSourceConnected && this.audioContext && this.analyser) {
            try {
                // Пытаемся создать источник только при воспроизведении
                this.source = this.audioContext.createMediaElementSource(this.audio);
                this.source.connect(this.analyser);
                this.analyser.connect(this.audioContext.destination);
                this.audioSourceConnected = true;
                console.log('Audio source подключен успешно');
            } catch (error) {
                console.warn('CORS ошибка с аудио источником, используем базовую анимацию:', error);
                this.audioAnalyzerAvailable = false;
            }
        }
    }

    startVisualizer() {
        // Пытаемся подключить аудио источник при первом воспроизведении
        this.connectAudioSource();
        
        if (!this.visualizerActive) {
            this.visualizerActive = true;
            this.animateVisualizer();
        }
        
        // Возобновляем аудио контекст если был приостановлен
        if (this.audioContext && this.audioContext.state === 'suspended') {
            this.audioContext.resume();
        }
    }

    stopVisualizer() {
        this.visualizerActive = false;
    }

    animateVisualizer() {
        if (!this.visualizerActive) return;

        // Получаем данные анализа частот
        if (this.analyser && this.dataArray && this.audioAnalyzerAvailable && this.audioSourceConnected) {
            try {
                this.analyser.getByteFrequencyData(this.dataArray);
                
                // Обновляем полоски визуализатора
                const bars = this.visualizerElement.querySelectorAll('.visualizer-bar');
                bars.forEach((bar, index) => {
                    // Используем разные диапазоны частот для каждой полоски
                    const dataIndex = Math.floor((index * this.bufferLength) / bars.length);
                    const value = this.dataArray[dataIndex] || 0;
                    
                    // Конвертируем значение в высоту (8-25px)
                    const height = Math.max(8, (value / 255) * 25);
                    const opacity = Math.max(0.6, value / 255);
                    
                    // Применяем стили
                    bar.style.setProperty('--dynamic-height', `${height}px`);
                    bar.style.opacity = opacity;
                    
                    // Добавляем случайность для более живого эффекта
                    const randomFactor = 0.8 + Math.random() * 0.4;
                    bar.style.transform = `scaleY(${randomFactor})`;
                });
            } catch (error) {
                console.warn('Ошибка анализа аудио, переход на базовую анимацию:', error);
                this.audioAnalyzerAvailable = false;
                this.animateVisualizerBasic();
            }
        } else {
            // Базовая анимация без Web Audio API
            this.animateVisualizerBasic();
        }

        // Продолжаем анимацию
        requestAnimationFrame(() => this.animateVisualizer());
    }

    animateVisualizerBasic() {
        // Базовая анимация для случаев, когда Web Audio API недоступен
        const bars = this.visualizerElement.querySelectorAll('.visualizer-bar');
        bars.forEach((bar, index) => {
            const randomHeight = 8 + Math.random() * 17; // 8-25px
            const randomOpacity = 0.6 + Math.random() * 0.4;
            const randomScale = 0.7 + Math.random() * 0.6;
            
            bar.style.setProperty('--dynamic-height', `${randomHeight}px`);
            bar.style.opacity = randomOpacity;
            bar.style.transform = `scaleY(${randomScale})`;
        });
    }

    attachEvents() {
        // Клик по плееру
        this.playerElement.addEventListener('click', (e) => {
            e.preventDefault();
            this.toggle();
            this.createRippleEffect(e);
        });

        // Для iOS добавляем поддержку touch событий
        if (this.isIOS) {
            this.playerElement.addEventListener('touchend', (e) => {
                e.preventDefault();
                this.toggle();
                this.createRippleEffect(e);
            }, { passive: false });
        }

        // Управление с клавиатуры
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space' && e.ctrlKey) {
                e.preventDefault();
                this.toggle();
            }
        });

        // Обработка видимости страницы
        document.addEventListener('visibilitychange', () => {
            if (document.hidden && this.isPlaying) {
                // Можно приостановить при скрытии вкладки если нужно
                // this.pause();
            }
        });
    }

    toggle() {
        if (this.isLoading) return;

        if (this.isPlaying) {
            this.pause();
        } else {
            this.play();
        }
    }

    async play() {
        try {
            this.setLoading(true);
            
            // Для iOS убеждаемся что пользователь взаимодействовал
            if (this.isIOS && !this.userHasInteracted) {
                console.warn('iOS требует взаимодействия пользователя для воспроизведения');
                this.setLoading(false);
                return;
            }
            
            // Проверяем готовность аудио
            if (this.audio.readyState < 2) {
                console.log('Ожидаем загрузки аудио...');
                await new Promise((resolve, reject) => {
                    const timeout = setTimeout(() => {
                        reject(new Error('Таймаут загрузки аудио'));
                    }, 10000);
                    
                    this.audio.addEventListener('canplay', () => {
                        clearTimeout(timeout);
                        resolve();
                    }, { once: true });
                });
            }
            
            // Возобновляем AudioContext для iOS
            if (this.audioContext && this.audioContext.state === 'suspended') {
                await this.audioContext.resume();
            }
            
            await this.audio.play();
            this.isPlaying = true;
            this.setLoading(false);
            console.log('Воспроизведение началось успешно');
        } catch (error) {
            console.error('Ошибка воспроизведения:', error);
            this.setLoading(false);
            this.showError();
        }
    }

    pause() {
        this.audio.pause();
        this.isPlaying = false;
    }

    setLoading(loading) {
        this.isLoading = loading;
        if (loading) {
            this.playerElement.classList.add('loading');
            this.iconElement.innerHTML = this.getLoadingIcon();
        } else {
            this.playerElement.classList.remove('loading');
            this.updateIcon();
        }
    }

    updateUI(playing) {
        this.isPlaying = playing;
        
        if (playing) {
            this.playerElement.classList.add('playing');
        } else {
            this.playerElement.classList.remove('playing');
        }
        
        this.updateIcon();
    }

    updateIcon() {
        if (this.isLoading) {
            this.iconElement.innerHTML = this.getLoadingIcon();
        } else if (this.isPlaying) {
            this.iconElement.innerHTML = this.getPauseIcon();
        } else {
            this.iconElement.innerHTML = this.getPlayIcon();
        }
    }

    createRippleEffect(event) {
        const ripple = document.createElement('div');
        ripple.classList.add('ripple');
        this.playerElement.appendChild(ripple);

        // Удаляем эффект после анимации
        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.parentNode.removeChild(ripple);
            }
        }, 600);
    }

    showError() {
        this.iconElement.innerHTML = this.getErrorIcon();
        this.playerElement.style.background = 'linear-gradient(135deg, #dc2626 0%, #ef4444 50%, #dc2626 100%)';
        
        // Показываем ошибку в консоли
        console.error('Не удалось загрузить аудио файл');
        
        // Возвращаем нормальный вид через 3 секунды
        setTimeout(() => {
            this.iconElement.innerHTML = this.getPlayIcon();
            this.playerElement.style.background = '';
        }, 3000);
    }

    // Методы управления громкостью
    setVolume(volume) {
        if (this.audio) {
            this.audio.volume = Math.max(0, Math.min(1, volume));
        }
    }

    getVolume() {
        return this.audio ? this.audio.volume : 0;
    }

    // Информация о треке
    getCurrentTime() {
        return this.audio ? this.audio.currentTime : 0;
    }

    getDuration() {
        return this.audio ? this.audio.duration : 0;
    }

    // Уничтожение плеера
    destroy() {
        // Останавливаем визуализатор
        this.stopVisualizer();
        
        // Очищаем аудио контекст
        if (this.audioContext) {
            this.audioContext.close();
        }
        
        if (this.audio) {
            this.audio.pause();
            this.audio.src = '';
        }
        
        if (this.playerElement) {
            this.playerElement.remove();
        }
    }
}

// Инициализация плеера после загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
    // Небольшая задержка для полной загрузки страницы
    setTimeout(() => {
        window.musicPlayer = new MusicPlayer();
        
        // Дополнительный лог для отладки на мобильных
        console.log('MusicPlayer инициализирован:', {
            userAgent: navigator.userAgent,
            isIOS: /iPad|iPhone|iPod/.test(navigator.userAgent),
            audioSupport: !!window.Audio,
            webAudioSupport: !!(window.AudioContext || window.webkitAudioContext)
        });
    }, 1000);
});

// Экспорт для использования в других местах
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MusicPlayer;
}

