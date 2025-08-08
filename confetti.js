// Конфетти на весь экран (5-6 секунд), легкая анимация на Canvas
// Вызов: window.launchConfetti(6000)
(function(){
  function rand(min, max){ return Math.random() * (max - min) + min; }

  function createCanvas(){
    const canvas = document.createElement('canvas');
    canvas.id = 'confettiCanvas';
    canvas.style.position = 'fixed';
    canvas.style.inset = '0';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '10060';
    document.body.appendChild(canvas);
    return canvas;
  }

  function resize(canvas, ctx){
    const dpr = Math.max(1, window.devicePixelRatio || 1);
    canvas.width = Math.floor(window.innerWidth * dpr);
    canvas.height = Math.floor(window.innerHeight * dpr);
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function launchConfetti(durationMs = 6000){
    let canvas = document.getElementById('confettiCanvas');
    let newlyCreated = false;
    if (!canvas){ canvas = createCanvas(); newlyCreated = true; }
    const ctx = canvas.getContext('2d');
    resize(canvas, ctx);
    const onResize = () => resize(canvas, ctx);
    window.addEventListener('resize', onResize);

    // палитра сайта + яркие акценты
    const colors = ['#7A4E1D', '#A67C52', '#E6D7C3', '#F59E0B', '#EF4444', '#10B981', '#3B82F6'];
    const shapes = ['rect', 'circle', 'triangle'];

    const particles = [];
    const startTime = performance.now();
    const emitFor = Math.min(900, durationMs * 0.25); // активный выброс в начале
    const baseCount = Math.round((canvas.width / window.devicePixelRatio) / 6) + 120; // адаптивно

    function spawn(batch){
      for (let i = 0; i < batch; i++){
        particles.push({
          x: rand(0, window.innerWidth),
          y: -20,
          vx: rand(-2, 2),
          vy: rand(2, 5),
          g: rand(0.05, 0.12),
          drag: rand(0.985, 0.995),
          angle: rand(0, Math.PI * 2),
          spin: rand(-0.2, 0.2),
          size: rand(6, 14),
          color: colors[(Math.random() * colors.length) | 0],
          shape: shapes[(Math.random() * shapes.length) | 0],
          life: rand(0.8, 1.2),
          opacity: 1
        });
      }
    }

    function drawParticle(p){
      ctx.save();
      ctx.globalAlpha = Math.max(0, p.opacity);
      ctx.translate(p.x, p.y);
      ctx.rotate(p.angle);
      ctx.fillStyle = p.color;
      switch(p.shape){
        case 'circle':
          ctx.beginPath(); ctx.arc(0, 0, p.size * 0.6, 0, Math.PI * 2); ctx.fill(); break;
        case 'triangle':
          ctx.beginPath();
          const s = p.size; ctx.moveTo(-s/2, s/2); ctx.lineTo(0, -s/2); ctx.lineTo(s/2, s/2); ctx.closePath(); ctx.fill();
          break;
        default:
          ctx.fillRect(-p.size/2, -p.size/2, p.size, p.size * 0.7);
      }
      ctx.restore();
    }

    let rafId;
    function frame(now){
      const t = now - startTime;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (t < emitFor){
        // плавная подача конфетти в первые ~25% времени
        spawn(12);
      }

      // поддерживающий выпуск при длинной длительности
      if (Math.random() < 0.08) spawn(2);

      // обновляем частицы
      for (let i = particles.length - 1; i >= 0; i--){
        const p = particles[i];
        p.vx *= p.drag; p.vy = p.vy * p.drag + p.g; p.x += p.vx; p.y += p.vy; p.angle += p.spin; 
        // затухание к концу
        p.opacity = Math.min(1, p.opacity); 
        if (t > durationMs * p.life) p.opacity -= 0.02;
        drawParticle(p);
        if (p.y > window.innerHeight + 40 || p.opacity <= 0) particles.splice(i, 1);
      }

      if (t < durationMs || particles.length) {
        rafId = requestAnimationFrame(frame);
      } else {
        cleanup();
      }
    }

    function cleanup(){
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', onResize);
      if (newlyCreated && canvas.parentNode){ canvas.parentNode.removeChild(canvas); }
    }

    // старт
    spawn(baseCount);
    rafId = requestAnimationFrame(frame);
    // возвращаем функцию преждевременной остановки по желанию
    return cleanup;
  }

  window.launchConfetti = launchConfetti;
})();


