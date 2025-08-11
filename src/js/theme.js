// Menu da landing page: abre no clique do botão e fecha ao selecionar item, rolar a página ou clicar fora
(function () {
  const menuButton = document.getElementById('btn-menu');
  const menuPanel = document.getElementById('menu-panel');
  const menuClose = document.getElementById('btn-menu-close');
  if (!menuButton || !menuPanel) return;

  let isOpen = false;

  function openMenu() {
    menuPanel.classList.add('is-open');
    menuPanel.setAttribute('aria-hidden', 'false');
    menuButton.setAttribute('aria-expanded', 'true');
    isOpen = true;
  }

  function closeMenu() {
    menuPanel.classList.remove('is-open');
    menuPanel.setAttribute('aria-hidden', 'true');
    menuButton.setAttribute('aria-expanded', 'false');
    isOpen = false;
  }

  function toggleMenu() {
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  // Clique do botão abre/fecha
  menuButton.addEventListener('click', function (e) {
    e.stopPropagation();
    toggleMenu();
  });

  // Botão de fechar
  if (menuClose) {
    menuClose.addEventListener('click', function (e) {
      e.stopPropagation();
      closeMenu();
    });
  }

  // Fechar ao clicar fora
  document.addEventListener('click', function (e) {
    if (!isOpen) return;
    if (menuPanel.contains(e.target) || menuButton.contains(e.target)) return;
    closeMenu();
  });

  // Fechar ao rolar
  window.addEventListener('scroll', function () {
    if (isOpen) closeMenu();
  }, { passive: true });

  // Fechar ao escolher um item e fazer scroll até a âncora suavemente
  menuPanel.addEventListener('click', function (e) {
    const link = e.target.closest('a.menu-item');
    if (!link) return;
    // deixar o comportamento de âncora padrão e fechar o menu
    closeMenu();
  });
})();



// Header sticky quando o #hero sair da tela (usando classes do Tailwind)
(function () {
  const header = document.getElementById('header');
  const hero = document.getElementById('hero');
  if (!header || !hero) return;

  // Suaviza a transição de cor ao fixar/soltar
  header.classList.add('transition-colors', 'duration-200');

  const observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      // Hero visível: header volta a ser absoluto e remove fundo
      header.classList.add('absolute', 'py-6', 'top-0');
      header.classList.remove('fixed', 'py-4', 'bg-black/20', 'backdrop-blur-lg', 'top-0');
    } else {
      // Hero saiu da tela: header fica fixo e com fundo azul principal
      header.classList.add('fixed', 'py-4', 'bg-black/20', 'backdrop-blur-lg', 'top-0');
      header.classList.remove('absolute', 'py-6', 'top-0');
    }
  }, { threshold: 0 });

  observer.observe(hero);
})();


// Rolagem com offset do header para links âncora
(function () {
  const header = document.getElementById('header');
  const menuPanel = document.getElementById('menu-panel');
  const menuButton = document.getElementById('btn-menu');

  function closeOverlayMenuIfOpen() {
    if (!menuPanel) return;
    if (menuPanel.classList.contains('is-open')) {
      menuPanel.classList.remove('is-open');
      menuPanel.setAttribute('aria-hidden', 'true');
      if (menuButton) menuButton.setAttribute('aria-expanded', 'false');
    }
  }

  function scrollToWithHeaderOffset(targetEl) {
    if (!targetEl) return;
    const headerHeight = header ? header.getBoundingClientRect().height : 0;
    const targetY = targetEl.getBoundingClientRect().top + window.pageYOffset - headerHeight - 8; // 8px de respiro
    window.scrollTo({ top: Math.max(0, targetY), behavior: 'smooth' });
  }

  document.addEventListener('click', function (e) {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;
    const hash = link.getAttribute('href');
    if (!hash || hash === '#' || hash.length < 2) return;
    const target = document.querySelector(hash);
    if (!target) return;

    e.preventDefault();
    closeOverlayMenuIfOpen();
    scrollToWithHeaderOffset(target);
    // Atualiza a URL sem pular bruscamente
    history.pushState(null, '', hash);
  }, { passive: false });

  // Ajusta também quando a página carrega com hash na URL
  window.addEventListener('load', function () {
    if (!location.hash) return;
    const target = document.querySelector(location.hash);
    if (!target) return;
    // pequeno atraso para garantir layout estável
    setTimeout(() => scrollToWithHeaderOffset(target), 0);
  });
})();
