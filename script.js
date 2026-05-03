const projects = [
    {
        name: "Obstacle-Course",
        title: "Obstacle Course",
        description: "Unity-based obstacle course game with various challenging levels and mechanics.",
        image: "https://raw.githubusercontent.com/amankumarmatta/Obstacle-Course/main/preview.png",
        githubUrl: "https://github.com/amankumarmatta/Obstacle-Course",
        playUrl: "/Builds/Obstacle-Course",
        hasPlay: true
    },
    {
        name: "Flappy-Bird",
        title: "Flappy Bird",
        description: "Flappy Bird clone built in Unity. Features smooth gameplay, scoring system, and obstacle generation.",
        image: "https://raw.githubusercontent.com/amankumarmatta/Flappy-Bird/main/preview.png",
        githubUrl: "https://github.com/amankumarmatta/Flappy-Bird",
        playUrl: "/Builds/Flappy-Bird",
        hasPlay: true
    },
    {
        name: "Daadi",
        title: "Daadi",
        description: "2D traditional board game in Unity with Photon PUN2 for real-time multiplayer. 2-player turn-based strategy.",
        image: "https://raw.githubusercontent.com/amankumarmatta/Daadi/main/preview.png",
        githubUrl: "https://github.com/amankumarmatta/Daadi",
        playUrl: null,
        hasPlay: false
    },
    {
        name: "Hero-Hurdles",
        title: "Hero Hurdles",
        description: "2D platformer game in Unity. Navigate challenging levels, jump over obstacles, and avoid traps.",
        image: "https://raw.githubusercontent.com/amankumarmatta/Hero-Hurdles/main/preview.png",
        githubUrl: "https://github.com/amankumarmatta/Hero-Hurdles",
        playUrl: "/Builds/Hero-Hurdles",
        hasPlay: true
    },
    {
        name: "Traffic-Escape",
        title: "Traffic Escape",
        description: "2D tap-based puzzle game in Unity. Tap cars by direction arrows to guide them and clear the jam.",
        image: "https://raw.githubusercontent.com/amankumarmatta/Traffic-Escape/main/preview.png",
        githubUrl: "https://github.com/amankumarmatta/Traffic-Escape",
        playUrl: "/Builds/Traffic-Escape",
        hasPlay: true
    }
];

function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card';

    const imgWrap = document.createElement('div');
    imgWrap.className = 'project-image';
    const img = document.createElement('img');
    img.src = project.image;
    img.alt = project.title;
    img.onerror = function() {
        this.src = 'https://via.placeholder.com/400x300/0a0a0a/272727?text=no+preview';
    };
    imgWrap.appendChild(img);

    const info = document.createElement('div');
    info.className = 'project-info';

    const title = document.createElement('h3');
    title.textContent = project.title;

    const desc = document.createElement('p');
    desc.textContent = project.description;

    const links = document.createElement('div');
    links.className = 'project-links';

    const ghBtn = document.createElement('a');
    ghBtn.href = project.githubUrl;
    ghBtn.target = '_blank';
    ghBtn.rel = 'noopener noreferrer';
    ghBtn.className = 'project-button github';
    ghBtn.textContent = './github';

    links.appendChild(ghBtn);

    if (project.hasPlay && project.playUrl) {
        const playBtn = document.createElement('a');
        playBtn.href = project.playUrl;
        playBtn.className = 'project-button play';
        playBtn.textContent = './play';
        playBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.open(project.playUrl, '_blank');
        });
        links.appendChild(playBtn);
    }

    info.appendChild(title);
    info.appendChild(desc);
    info.appendChild(links);

    card.appendChild(imgWrap);
    card.appendChild(info);

    return card;
}

function displayProjects() {
    const container = document.querySelector('#projects-container');
    if (!container) return;
    container.textContent = '';
    projects.forEach(p => container.appendChild(createProjectCard(p)));
}

document.addEventListener('DOMContentLoaded', () => {
    displayProjects();

    const content    = null; // scroll is now on window
    const sidebar    = document.getElementById('sidebar');
    const mobBtn     = document.getElementById('mob-btn');
    const mobOverlay = document.getElementById('mob-overlay');
    const sbSection  = document.getElementById('sb-section');
    const navItems   = document.querySelectorAll('.snav-item');

    function closeSidebar() {
        sidebar.classList.remove('open');
        mobBtn.classList.remove('open');
        mobOverlay.classList.remove('visible');
    }

    mobBtn.addEventListener('click', () => {
        const isOpen = sidebar.classList.contains('open');
        if (isOpen) {
            closeSidebar();
        } else {
            sidebar.classList.add('open');
            mobBtn.classList.add('open');
            mobOverlay.classList.add('visible');
        }
    });

    mobOverlay.addEventListener('click', closeSidebar);

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = item.getAttribute('href').slice(1);
            const target = document.getElementById(targetId);
            if (target) {
                const topOffset = target.getBoundingClientRect().top + window.scrollY - 36;
                window.scrollTo({ top: topOffset, behavior: 'smooth' });
            }
            closeSidebar();
        });
    });

    function updateActive() {
        const scrollY = window.scrollY;
        const sections = document.querySelectorAll('.section');
        let current = 'home';

        sections.forEach(section => {
            if (scrollY >= section.offsetTop - 80) {
                current = section.id;
            }
        });

        navItems.forEach(item => {
            const active = item.getAttribute('data-section') === current;
            item.classList.toggle('active', active);
            item.querySelector('.snav-ind').textContent = active ? '▶' : ' ';
        });

        if (sbSection) sbSection.textContent = '~/' + current;
    }

    window.addEventListener('scroll', updateActive, { passive: true });
    updateActive();
});
