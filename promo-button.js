// Плавающая кнопка подарка → скроллит к промо-блоку ресторана
(function(){
  function createGiftButton(){
    if (document.getElementById('promoGiftBtn')) return;
    const btn = document.createElement('button');
    btn.id = 'promoGiftBtn';
    btn.className = 'promo-gift-btn';
    btn.setAttribute('aria-label','Скидка 10% — показать промо');
    btn.innerHTML = `
      <span class="promo-gift-pulse"></span>
      <span class="promo-gift-ring"></span>
      <span class="promo-gift-icon">${giftSvg()}</span>
      <span class="promo-gift-tooltip">Скидка 10% по буклету</span>
    `;
    document.body.appendChild(btn);
    btn.addEventListener('click', () => {
      const target = document.querySelector('#featured-restaurant');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        // запасной якорь
        window.location.href = 'index.html#featured-restaurant';
      }
    });
  }

  function giftSvg(){
    return `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 12v7a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3v-7" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <path d="M2 8h20v4H2z" fill="currentColor" opacity=".15"/>
      <path d="M12 22V8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <path d="M7.5 8C5 8 4 5 6 4c2-.9 3.8 1.4 4.5 4H7.5z" fill="currentColor"/>
      <path d="M16.5 8c2.5 0 3.5-3 1.5-4-2-.9-3.8 1.4-4.5 4h3z" fill="currentColor"/>
      <rect x="2" y="8" width="20" height="4" rx="1.5" stroke="currentColor" stroke-width="2"/>
    </svg>`;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createGiftButton);
  } else {
    createGiftButton();
  }
})();


