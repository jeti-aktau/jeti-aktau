// Полноэкранный просмотр меню внутри сайта без раскрытия прямой ссылки
(function(){
  const MENU_URL = 'https://drive.google.com/file/d/1trO0-qArSyhjIvJLvdDF-_kGbp1W_2Y5/preview';

  function ensureOverlay(){
    if (document.getElementById('menuOverlay')) return;
    const overlay = document.createElement('div');
    overlay.id = 'menuOverlay';
    overlay.style.position = 'fixed';
    overlay.style.inset = '0';
    overlay.style.background = 'rgba(0,0,0,0.85)';
    overlay.style.backdropFilter = 'blur(4px)';
    overlay.style.zIndex = '10070';
    overlay.style.display = 'none';

    const frame = document.createElement('iframe');
    frame.id = 'menuFrame';
    frame.style.width = '100%';
    frame.style.height = '100%';
    frame.style.border = '0';
    frame.allow = 'fullscreen';
    frame.referrerPolicy = 'no-referrer';
    frame.sandbox = 'allow-scripts allow-same-origin allow-forms allow-pointer-lock';

    const closeBtn = document.createElement('button');
    closeBtn.textContent = '×';
    closeBtn.setAttribute('aria-label','Закрыть меню');
    closeBtn.style.position = 'absolute';
    closeBtn.style.top = '14px';
    closeBtn.style.right = '18px';
    closeBtn.style.width = '44px';
    closeBtn.style.height = '44px';
    closeBtn.style.borderRadius = '50%';
    closeBtn.style.background = 'rgba(245, 241, 232, 0.9)';
    closeBtn.style.color = '#7A4E1D';
    closeBtn.style.fontSize = '28px';
    closeBtn.style.fontWeight = '700';
    closeBtn.style.border = '1px solid rgba(230,215,195,0.6)';
    closeBtn.style.boxShadow = '0 10px 24px rgba(0,0,0,0.25)';
    closeBtn.style.cursor = 'pointer';
    closeBtn.style.zIndex = '10071';

    closeBtn.addEventListener('click', hideOverlay);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) hideOverlay(); });

    overlay.appendChild(frame);
    overlay.appendChild(closeBtn);
    document.body.appendChild(overlay);
  }

  function showOverlay(){
    ensureOverlay();
    const overlay = document.getElementById('menuOverlay');
    const frame = document.getElementById('menuFrame');
    frame.src = MENU_URL; // Google Drive preview встраиваемый URL
    overlay.style.display = 'block';
    overlay.style.opacity = '0';
    overlay.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 250, fill: 'forwards' });
  }

  function hideOverlay(){
    const overlay = document.getElementById('menuOverlay');
    if (!overlay) return;
    overlay.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 220, fill: 'forwards' }).onfinish = () => {
      overlay.style.display = 'none';
      const frame = document.getElementById('menuFrame');
      if (frame) frame.src = 'about:blank';
    };
  }

  function init(){
    const btn = document.getElementById('open-menu-btn');
    if (btn){ btn.addEventListener('click', showOverlay); }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Экспорт на всякий случай
  window.JETI_MenuOverlay = { show: showOverlay, hide: hideOverlay };
})();


