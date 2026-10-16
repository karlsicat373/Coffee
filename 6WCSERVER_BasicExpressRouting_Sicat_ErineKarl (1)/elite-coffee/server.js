// Name: Sicat, Erine Karl Gabriel D.
// Course: WCSERVER - WD-303 - Basic Express Routing (Elite Coffee)

const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;
const PUBLIC_DIR = path.join(__dirname, 'public');

// Sample data used by the JSON routes (route params + query strings)
const menu = [
  { id: 1, name: 'Espresso', category: 'hot', image: '/images/espresso.jpg',
    description: 'A rich and bold coffee shot, perfect for a quick, intense boost.' },
  { id: 2, name: 'Cappuccino', category: 'hot', image: '/images/cappuccino.jpg',
    description: 'A classic Italian coffee drink with equal parts espresso, steamed milk, and foam.' },
  { id: 3, name: 'Latte', category: 'hot', image: '/images/latte.jpg',
    description: 'A smooth and creamy coffee made with espresso and steamed milk, topped with light foam.' },
  { id: 4, name: 'Iced Latte', category: 'cold', image: '/images/iced-latte.jpg',
    description: 'Chilled espresso poured over cold milk and ice for a refreshing finish.' }
];

// Serve static files (CSS, client-side JS, images). index:false so that "/" is
// handled by our own route below and gets logged.
app.use(express.static(PUBLIC_DIR, { index: false }));

// Helper: log the page being visited, then send the HTML file
function renderPage(file) {
  return (req, res) => {
    console.log(`Rendering ${file}`);
    res.sendFile(path.join(PUBLIC_DIR, 'html', file));
  };
}

// Page routes
app.get('/', renderPage('index.html'));
app.get('/menu', renderPage('menu.html'));
app.get('/about', renderPage('about.html'));
app.get('/contact', renderPage('contact.html'));

// JSON routes: all items (optional ?category=hot|cold), and one item by :id
app.get('/api/menu', (req, res) => {
  const { category } = req.query;
  const items = category ? menu.filter((m) => m.category === category) : menu;
  res.json(items);
});

app.get('/api/menu/:id', (req, res) => {
  const item = menu.find((m) => m.id === Number(req.params.id));
  if (!item) return res.status(404).json({ error: 'Menu item not found' });
  res.json(item);
});

// 404 handler for everything else
app.use((req, res) => {
  console.log(`404 Not Found: ${req.originalUrl}`);
  res.status(404).sendFile(path.join(PUBLIC_DIR, 'html', '404.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
