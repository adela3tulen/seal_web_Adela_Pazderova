document.addEventListener('DOMContentLoaded', () => {
    // ---- 1. LOGIKA PRO PŘEPÍNÁNÍ SVĚTLÉHO / TMAVÉHO REŽIMU ----
    const themeBtn = document.getElementById('themeBtn');
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    // Nastavení výchozího režimu při načtení stránky
    if (currentTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeBtn.textContent = '🌙 Tmavý režim';
    } else {
        themeBtn.textContent = '☀️ Světlý režim';
    }

    // Funkce po kliknutí na tlačítko režimu
    themeBtn.addEventListener('click', () => {
        let theme = document.documentElement.getAttribute('data-theme');
        
        if (theme === 'dark') {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            themeBtn.textContent = '☀️ Světlý režim';
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            themeBtn.textContent = '🌙 Tmavý režim';
        }
    });

    // ---- 2. LOGIKA PRO FUNKČNÍ FILTROVÁNÍ DRUHŮ V ATLASU ----
    const filterButtons = document.querySelectorAll('.filter-btn');
    const groups = document.querySelectorAll('.atlas-group');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Resetování aktivního stavu u všech tlačítek (včetně ARIA přístupnosti)
            filterButtons.forEach(b => {
                b.classList.remove('active');
                b.setAttribute('aria-pressed', 'false');
            });
            
            // Aktivace kliknutého tlačítka
            btn.classList.add('active');
            btn.setAttribute('aria-pressed', 'true');

            // Získání hodnoty filtru (all / north / south / warm)
            const filterValue = btn.getAttribute('data-filter');

            // Zobrazení nebo skrytí celých skupin tuleňů podle vybrané kategorie
            groups.forEach(group => {
                if (filterValue === 'all' || group.getAttribute('data-category') === filterValue) {
                    group.style.display = 'block';
                } else {
                    group.style.display = 'none';
                }
            });
        });
    });
});