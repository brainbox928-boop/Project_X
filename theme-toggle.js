// Theme Toggle - Light/Dark Mode with Advanced Features
(function initTheme() {
  const html = document.documentElement;
  const storageKey = 'brainboxX-theme';
  const lastToggleKey = 'brainboxX-theme-last-toggle';
  
  // Detect system preference
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  // Smart theme selection with time-based fallback
  function getDefaultTheme() {
    const stored = localStorage.getItem(storageKey);
    if (stored) return stored;
    
    // Time-based auto-switching (optional feature)
    const hour = new Date().getHours();
    const shouldBeDarkByTime = hour >= 20 || hour < 6; // 8 PM to 6 AM
    
    // Prioritize system preference, then fall back to time
    return systemPrefersDark || shouldBeDarkByTime ? 'dark' : 'light';
  }
  
  const currentTheme = getDefaultTheme();
  
  // Apply theme without flash
  if (currentTheme === 'dark') {
    html.classList.add('dark');
  } else {
    html.classList.remove('dark');
  }
  
  // Listen for system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addListener((e) => {
    if (!localStorage.getItem(storageKey)) {
      const newTheme = e.matches ? 'dark' : 'light';
      html.classList.toggle('dark', e.matches);
      document.documentElement.style.colorScheme = newTheme;
    }
  });
  
  // Create and inject enhanced toggle button
  function createToggleButton() {
    const nav = document.querySelector('.nav');
    if (!nav) return;
    
    const toggle = document.createElement('button');
    toggle.className = 'theme-toggle';
    toggle.setAttribute('aria-label', 'Toggle dark mode');
    toggle.setAttribute('type', 'button');
    toggle.setAttribute('title', 'Switch between light and dark mode (Keyboard: Shift+D)');
    
    // SVG for sun icon (light mode)
    const sunSVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="5"></circle>
      <line x1="12" y1="1" x2="12" y2="3"></line>
      <line x1="12" y1="21" x2="12" y2="23"></line>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
      <line x1="1" y1="12" x2="3" y2="12"></line>
      <line x1="21" y1="12" x2="23" y2="12"></line>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
    </svg>`;
    
    // SVG for moon icon (dark mode)
    const moonSVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
    </svg>`;
    
    toggle.innerHTML = currentTheme === 'dark' ? sunSVG : moonSVG;
    
    // Theme toggle with smooth animation
    function switchTheme() {
      const isDark = html.classList.toggle('dark');
      const newTheme = isDark ? 'dark' : 'light';
      localStorage.setItem(storageKey, newTheme);
      localStorage.setItem(lastToggleKey, Date.now());
      
      // Update icon with animation
      toggle.style.animation = 'none';
      setTimeout(() => {
        toggle.style.animation = 'themeToggleSpin 0.5s ease-in-out';
        toggle.innerHTML = isDark ? sunSVG : moonSVG;
      }, 10);
      
      // Dispatch custom event for other components
      window.dispatchEvent(new CustomEvent('themeChanged', { 
        detail: { theme: newTheme } 
      }));
    }
    
    toggle.addEventListener('click', switchTheme);
    
    // Keyboard shortcut: Shift+D to toggle theme
    document.addEventListener('keydown', (e) => {
      if (e.shiftKey && e.key === 'D') {
        e.preventDefault();
        switchTheme();
      }
    });
    
    nav.appendChild(toggle);
  }
  
  // Add theme toggle animation keyframes
  function injectAnimationStyles() {
    if (document.querySelector('style[data-theme-animations]')) return;
    
    const style = document.createElement('style');
    style.setAttribute('data-theme-animations', '');
    style.textContent = `
      @keyframes themeToggleSpin {
        0% { transform: rotate(0deg) scale(1); }
        50% { transform: rotate(180deg) scale(1.1); }
        100% { transform: rotate(360deg) scale(1); }
      }
      
      .theme-toggle {
        animation: themeToggleSpin 0.5s ease-in-out;
      }
      
      @media (prefers-reduced-motion: reduce) {
        .theme-toggle {
          animation: none;
        }
      }
    `;
    document.head.appendChild(style);
  }
  
  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      injectAnimationStyles();
      createToggleButton();
    });
  } else {
    injectAnimationStyles();
    createToggleButton();
  }
})();
