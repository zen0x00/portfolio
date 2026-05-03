const projects = [
    {
        title: "Obstacle Course",
        description: "A Unity-based obstacle course game with various challenging levels and mechanics. Features progressive difficulty and responsive controls.",
        image: "https://raw.githubusercontent.com/amankumarmatta/Obstacle-Course/main/preview.png",
        githubUrl: "https://github.com/amankumarmatta/Obstacle-Course",
        playUrl: "/Builds/Obstacle-Course",
        hasPlay: true
    },
    {
        title: "Flappy Bird",
        description: "A Flappy Bird clone built in Unity with smooth gameplay, a scoring system, and procedural obstacle generation.",
        image: "https://raw.githubusercontent.com/amankumarmatta/Flappy-Bird/main/preview.png",
        githubUrl: "https://github.com/amankumarmatta/Flappy-Bird",
        playUrl: "/Builds/Flappy-Bird",
        hasPlay: true
    },
    {
        title: "Daadi",
        description: "A 2D traditional board game built in Unity with Photon PUN2 for real-time multiplayer. 2-player turn-based strategy.",
        image: "https://raw.githubusercontent.com/amankumarmatta/Daadi/main/preview.png",
        githubUrl: "https://github.com/amankumarmatta/Daadi",
        playUrl: null,
        hasPlay: false
    },
    {
        title: "Hero Hurdles",
        description: "A 2D platformer in Unity. Navigate challenging levels, jump over obstacles, and avoid traps to guide the hero to victory.",
        image: "https://raw.githubusercontent.com/amankumarmatta/Hero-Hurdles/main/preview.png",
        githubUrl: "https://github.com/amankumarmatta/Hero-Hurdles",
        playUrl: "/Builds/Hero-Hurdles",
        hasPlay: true
    },
    {
        title: "Traffic Escape",
        description: "A 2D tap-based puzzle game in Unity. Tap cars by their direction arrows to clear the traffic jam — tests timing and quick thinking.",
        image: "https://raw.githubusercontent.com/amankumarmatta/Traffic-Escape/main/preview.png",
        githubUrl: "https://github.com/amankumarmatta/Traffic-Escape",
        playUrl: "/Builds/Traffic-Escape",
        hasPlay: true
    }
];

function makeLinks(project, container) {
    const ghBtn = document.createElement('a');
    ghBtn.href = project.githubUrl;
    ghBtn.target = '_blank';
    ghBtn.rel = 'noopener noreferrer';
    ghBtn.className = 'project-btn';
    ghBtn.textContent = 'GitHub ↗';
    container.appendChild(ghBtn);

    if (project.hasPlay && project.playUrl) {
        const playBtn = document.createElement('a');
        playBtn.href = project.playUrl;
        playBtn.className = 'project-btn';
        playBtn.textContent = 'Play ↗';
        playBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.open(project.playUrl, '_blank');
        });
        container.appendChild(playBtn);
    }
}

function makeFeatured(project) {
    const card = document.createElement('div');
    card.className = 'project-featured';

    const imgWrap = document.createElement('div');
    imgWrap.className = 'project-img';
    const img = document.createElement('img');
    img.src = project.image;
    img.alt = project.title;
    img.onerror = function() { this.src = 'https://placehold.co/800x600/0d0d0d/2a2a2a?text=No+Preview'; };
    imgWrap.appendChild(img);

    const info = document.createElement('div');
    info.className = 'project-info';

    const tag = document.createElement('span');
    tag.className = 'project-tag';
    tag.textContent = 'Featured Project';

    const title = document.createElement('h3');
    title.textContent = project.title;

    const desc = document.createElement('p');
    desc.textContent = project.description;

    const links = document.createElement('div');
    links.className = 'project-links';
    makeLinks(project, links);

    info.appendChild(tag);
    info.appendChild(title);
    info.appendChild(desc);
    info.appendChild(links);

    card.appendChild(imgWrap);
    card.appendChild(info);
    return card;
}

function makeCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card';

    const imgWrap = document.createElement('div');
    imgWrap.className = 'project-img';
    const img = document.createElement('img');
    img.src = project.image;
    img.alt = project.title;
    img.onerror = function() { this.src = 'https://placehold.co/600x400/0d0d0d/2a2a2a?text=No+Preview'; };
    imgWrap.appendChild(img);

    const info = document.createElement('div');
    info.className = 'project-info';

    const title = document.createElement('h3');
    title.textContent = project.title;

    const desc = document.createElement('p');
    desc.textContent = project.description;

    const links = document.createElement('div');
    links.className = 'project-links';
    makeLinks(project, links);

    info.appendChild(title);
    info.appendChild(desc);
    info.appendChild(links);

    card.appendChild(imgWrap);
    card.appendChild(info);
    return card;
}

function displayProjects() {
    const container = document.getElementById('projects-container');
    if (!container) return;

    container.appendChild(makeFeatured(projects[0]));

    const grid = document.createElement('div');
    grid.className = 'project-grid';
    projects.slice(1).forEach(p => grid.appendChild(makeCard(p)));
    container.appendChild(grid);
}

document.addEventListener('DOMContentLoaded', () => {
    displayProjects();

    const navbar    = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navLinks  = document.getElementById('nav-links');
    const navAnchors = document.querySelectorAll('.nav-link');

    // Navbar border on scroll
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 10);
    }, { passive: true });

    // Hamburger
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('open');
        navLinks.classList.toggle('open');
    });

    navAnchors.forEach(a => {
        a.addEventListener('click', () => {
            hamburger.classList.remove('open');
            navLinks.classList.remove('open');
        });
    });

    // Smooth scroll for all internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const href = anchor.getAttribute('href');
            if (href === '#') return;
            const target = document.querySelector(href);
            if (!target) return;
            e.preventDefault();
            const offset = target.getBoundingClientRect().top + window.scrollY - 64;
            window.scrollTo({ top: offset, behavior: 'smooth' });
        });
    });

    // Active nav link on scroll
    function updateNav() {
        const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 8;
        const scrollY  = window.scrollY + 100;
        const sections = document.querySelectorAll('main section[id]');

        let current = '';
        if (atBottom) {
            current = sections[sections.length - 1].id;
        } else {
            sections.forEach(sec => {
                if (scrollY >= sec.offsetTop) current = sec.id;
            });
        }

        navAnchors.forEach(a => {
            const href = a.getAttribute('href').slice(1);
            a.classList.toggle('active', href === current);
        });
    }

    window.addEventListener('scroll', updateNav, { passive: true });
    updateNav();
});
