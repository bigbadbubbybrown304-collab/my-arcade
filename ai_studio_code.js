let gamesData = [];

// 1. Fetch games from JSON
fetch('games.json')
    .then(response => response.json())
    .then(data => {
        gamesData = data;
        displayGames(gamesData);
    })
    .catch(err => console.error('Error loading games:', err));

// 2. Function to create cards
function displayGames(games) {
    const grid = document.getElementById('gameGrid');
    grid.innerHTML = ''; // Clear current grid

    games.forEach(game => {
        const card = document.createElement('div');
        card.className = 'card';
        card.onclick = () => openGame(game.url);
        
        card.innerHTML = `
            <img src="${game.thumbnail}" alt="${game.title}">
            <h3>${game.title}</h3>
        `;
        grid.appendChild(card);
    });
}

// 3. Search functionality
function filterGames() {
    const query = document.getElementById('searchBar').value.toLowerCase();
    const filtered = gamesData.filter(game => 
        game.title.toLowerCase().includes(query)
    );
    displayGames(filtered);
}

// 4. Game Player Logic
function openGame(url) {
    const overlay = document.getElementById('gameOverlay');
    const frame = document.getElementById('gameFrame');
    frame.src = url;
    overlay.classList.remove('hidden');
    document.body.style.overflow = 'hidden'; // Stop background scrolling
}

function closeGame() {
    const overlay = document.getElementById('gameOverlay');
    const frame = document.getElementById('gameFrame');
    frame.src = ''; // Clear iframe to stop audio/game
    overlay.classList.add('hidden');
    document.body.style.overflow = 'auto';
}

function toggleFullscreen() {
    const frame = document.getElementById('gameFrame');
    if (frame.requestFullscreen) frame.requestFullscreen();
    else if (frame.webkitRequestFullscreen) frame.webkitRequestFullscreen();
}