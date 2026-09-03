     // Загрузка сохраненной темы
      const savedTheme = localStorage.getItem('bookTheme');
      if (savedTheme) {
        document.documentElement.className = savedTheme;
		}
	// Загрузка сохраненного размера шрифта
      const savedFont = localStorage.getItem('bookFontSize');
      if (savedFont) {
        document.documentElement.style.setProperty('--base-font-size', parseFloat(savedFont) + 'em');
		}