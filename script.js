// Navigation scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    header.classList.toggle('scrolled', window.scrollY > 50);
});

// Burger menu functionality
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links li');

burger.addEventListener('click', () => {
    // Toggle nav
    navLinks.classList.toggle('active');
    
    // Burger animation
    burger.classList.toggle('toggle');
    
    // Disable scroll when menu is open
    document.body.classList.toggle('no-scroll');
});

// Close menu when clicking on a link
navLinksItems.forEach(item => {
    item.addEventListener('click', () => {
        navLinks.classList.remove('active');
        burger.classList.remove('toggle');
        document.body.classList.remove('no-scroll');
    });
});

// Smooth scrolling for all links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Search functionality
const searchForm = document.querySelector('.search-container');
if (searchForm) {
    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const searchInput = this.querySelector('input');
        const searchTerm = searchInput.value.trim();
        
        if (searchTerm) {
            // Store search term in sessionStorage to display on results page
            sessionStorage.setItem('searchTerm', searchTerm);
            // Redirect to search results page (you would need a search.html page)
            window.location.href = 'search.html';
        }
    });
}

// Display search term on search results page
if (document.querySelector('.search-results')) {
    const searchTerm = sessionStorage.getItem('searchTerm');
    if (searchTerm) {
        document.querySelector('.search-results h2').textContent = `Résultats pour : "${searchTerm}"`;
        
        // Here you would normally fetch actual search results from a server
        // For demo purposes, we'll simulate some results
        const resultsContainer = document.querySelector('.search-results');
        
        // Simulated search results
        const pages = [
            {
                title: 'Nos Services Équestres',
                url: 'services.html',
                excerpt: 'Découvrez nos services complets pour les chevaux et les cavaliers de tous niveaux.'
            },
            {
                title: 'Galerie Photos',
                url: 'gallery.html',
                excerpt: 'Admirez nos magnifiques chevaux dans notre galerie photo exclusive.'
            },
            {
                title: 'À propos de DouaaHorse',
                url: 'about.html',
                excerpt: 'Apprenez-en plus sur notre passion pour les chevaux et notre histoire.'
            }
        ];
        
        // Filter simulated results based on search term
        const filteredResults = pages.filter(page => 
            page.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
            page.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
        );
        
        // Display results
        if (filteredResults.length > 0) {
            filteredResults.forEach(result => {
                const resultItem = document.createElement('div');
                resultItem.className = 'result-item';
                resultItem.innerHTML = `
                    <h3><a href="${result.url}">${result.title}</a></h3>
                    <p>${result.excerpt}</p>
                    <a href="${result.url}" class="result-link">Voir la page</a>
                `;
                resultsContainer.appendChild(resultItem);
            });
        } else {
            resultsContainer.innerHTML += `
                <div class="no-results">
                    <p>Aucun résultat trouvé pour "${searchTerm}". Essayez avec d'autres termes.</p>
                </div>
            `;
        }
    }
}

// Set active link in navigation based on current page
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (currentPage === linkPage) {
            link.classList.add('active');
        }
    });
});
