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
document.addEventListener("DOMContentLoaded", () => {
    // Находим все формулы на странице (и inline, и block)
    document.querySelectorAll('math').forEach(math => {
        const semantics = math.querySelector('semantics');
        if (!semantics) return;

        const mainMrow = semantics.querySelector('mrow');
        if (!mainMrow) return;

        const children = Array.from(mainMrow.children);
        mainMrow.innerHTML = ''; // Очищаем старую монолитную структуру

        let currentGroup = document.createElement('mrow');

        children.forEach(child => {
            currentGroup.appendChild(child);

            // Как только встречаем знак ∨ или + , закрываем группу для переноса
            if (child.tagName === 'mo' && (child.textContent.trim() === '∨' || child.textContent.trim() === '+')) {
                mainMrow.appendChild(currentGroup);
                currentGroup = document.createElement('mrow'); // Новая группа для следующей скобки
            }
        });

        // Добавляем хвостик формулы
        if (currentGroup.children.length > 0) {
            mainMrow.appendChild(currentGroup);
        }
    });
});
