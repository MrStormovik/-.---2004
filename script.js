       // 1. Переключение тем (применяем класс к document.documentElement, т.е. к <html>)
    function setTheme(theme) {
      document.documentElement.className = theme;
      localStorage.setItem('bookTheme', theme);
    }

    // 2. Изменение размера шрифта
    let currentFontSize = 1.0;
    function changeFont(delta) {
      currentFontSize += delta;
      if (currentFontSize < 0.7) currentFontSize = 0.7;
      if (currentFontSize > 2.5) currentFontSize = 2.5;
      
      document.documentElement.style.setProperty('--base-font-size', currentFontSize + 'em');
      localStorage.setItem('bookFontSize', currentFontSize);
    }
	//3.1 Функция получения уникального ключа для ТЕКУЩЕЙ страницы
	function getPageScrollKey() {
		return 'scrollPos_' + window.location.pathname;
	}

	// 3.2 Запоминание места чтения
	window.addEventListener('scroll', () => {
		window.requestAnimationFrame(() => {
			// Сохраняем скролл с ключом, уникальным для этого файла
		localStorage.setItem(getPageScrollKey(), window.scrollY);
		});
	});
	   // Загрузка позиции скролла
      const pos = localStorage.getItem(getPageScrollKey());
	  if (pos) {
		  window.scrollTo(0, parseInt(pos));
		  }

// Если формула не помещается в строку, разрешаем ей переноситься (вместо ползунка)
function fitFormulas() {
  // Многострочные формулы (системы, выкладки) на узком экране уменьшаем, чтобы влезли
  document.querySelectorAll('math:has(mtable)').forEach(m => {
    m.style.fontSize = '';
    const w = m.scrollWidth, box = m.parentElement.clientWidth;
    if (w > box + 2) m.style.fontSize = Math.max(0.55, 1.05 * box / w * 0.97) + 'em';
  });
  document.querySelectorAll('math.wrap').forEach(m => m.classList.remove('wrap'));
  document.querySelectorAll('p, li').forEach(el => {
    if (el.scrollWidth > el.clientWidth + 2) {
      el.querySelectorAll('math:not(:has(mtable))').forEach(m => {
        if (m.getBoundingClientRect().width > el.clientWidth * 0.5) m.classList.add('wrap');
      });
    }
  });
}
window.addEventListener('load', fitFormulas);
window.addEventListener('resize', fitFormulas);
