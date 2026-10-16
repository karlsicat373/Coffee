// Fetches menu data from the Express JSON route and renders it without reloading the page.
const cardsEl = document.getElementById('cards');
const buttons = document.querySelectorAll('.filters button');

async function loadMenu(category) {
  const url = category ? `/api/menu?category=${encodeURIComponent(category)}` : '/api/menu';
  try {
    const res = await fetch(url);
    const items = await res.json();
    cardsEl.innerHTML = items
      .map(
        (item) => `
        <div class="card">
          <img src="${item.image}" alt="${item.name}">
          <div class="caption">
            <h3>${item.name}</h3>
            <p>${item.description}</p>
          </div>
        </div>`
      )
      .join('');
  } catch (err) {
    cardsEl.innerHTML = '<p>Could not load the menu. Please try again.</p>';
  }
}

buttons.forEach((btn) => {
  btn.addEventListener('click', () => {
    buttons.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    loadMenu(btn.dataset.category);
  });
});

loadMenu();
