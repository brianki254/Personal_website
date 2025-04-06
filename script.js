document.addEventListener('DOMContentLoaded', () => {
    //greeting
    const greetingEl = document.getElementById('greeting');
    const hour = new Date().getHours();
    let greeting = 'Hello';

    if (hour < 12) {
        greeting = 'Good Morning';
    } else if (hour < 18) {
        greeting = 'Good Afternoon';
    } else {
        greeting = 'Good Evening';
    }
    greetingEl.textContent = `${greeting}, I'm Irungu Brian Kariuki`;

    //time
    const clockEl = document.querySelector('.clock-container');
    function updateClock() {
        const now = new Date();
        clockEl.textContent = now.toLocaleTimeString();
    }
    setInterval(updateClock, 1000);
    updateClock();

    //theme switch
    const themeSwitch = document.getElementById('theme-switch');
    const root = document.documentElement;

    // Load saved theme
    if (localStorage.getItem('theme') === 'dark') {
        root.classList.add('dark-theme');
        themeSwitch.checked = true;
    }

    themeSwitch.addEventListener('change', () => {
        root.classList.toggle('dark-theme');
        const theme = root.classList.contains('dark-theme') ? 'dark' : 'light';
        localStorage.setItem('theme', theme);
    });

    //validation
    const form = document.querySelector('form'); // Assuming you have one form
    if (form) {
        form.addEventListener('submit', e => {
            const inputs = form.querySelectorAll('input[required], textarea[required]');
            let valid = true;

            inputs.forEach(input => {
                if (!input.value.trim()) {
                    valid = false;
                    input.style.border = '2px solid var(--error-color)';
                } else {
                    input.style.border = '';
                }

                if (input.type === 'email') {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(input.value)) {
                        valid = false;
                        input.style.border = '2px solid var(--error-color)';
                    }
                }
            });

            if (!valid) {
                e.preventDefault(); // Stop form from submitting
                alert('Please fill in all fields correctly.');
            }
        });
    }

    //project filter
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projects = document.querySelectorAll('.project-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const category = btn.dataset.category;
            projects.forEach(project => {
                if (category === 'all' || project.classList.contains(category)) {
                    project.style.display = 'block';
                } else {
                    project.style.display = 'none';
                }
            });
        });
    });

    //blog management
    const blogPosts = [
        {
            title: "My First Blog Post",
            date: "2024-04-01",
            category: "tech",
            image: "images/blog1.jpg",
            content: "This is a post about my first portfolio site."
        },
        {
            title: "Learning JavaScript",
            date: "2024-04-03",
            category: "education",
            image: "images/blog2.jpg",
            content: "Here’s how I started with JS."
        }
    ];

    const blogContainer = document.querySelector('.blog-container');
    const blogSearch = document.getElementById('blog-search');
    const blogFilter = document.getElementById('blog-filter');

    function renderBlogs(posts) {
        blogContainer.innerHTML = '';
        posts.forEach(post => {
            const card = document.createElement('div');
            card.className = 'blog-card';
            card.innerHTML = `
                <div class="blog-image"><img src="${post.image}" alt=""></div>
                <div class="blog-content">
                    <div class="blog-date">${post.date}</div>
                    <h3>${post.title}</h3>
                    <p>${post.content}</p>
                    <div class="blog-category">${post.category}</div>
                </div>
            `;
            blogContainer.appendChild(card);
        });
    }

    if (blogContainer) {
        renderBlogs(blogPosts);

        blogSearch?.addEventListener('input', e => {
            const searchText = e.target.value.toLowerCase();
            const filtered = blogPosts.filter(post =>
                post.title.toLowerCase().includes(searchText) || post.content.toLowerCase().includes(searchText)
            );
            renderBlogs(filtered);
        });

        blogFilter?.addEventListener('change', e => {
            const selected = e.target.value;
            const filtered = selected === 'all'
                ? blogPosts
                : blogPosts.filter(post => post.category === selected);
            renderBlogs(filtered);
        });
    }

    //project modal group
    const modal = document.querySelector('.modal');
    const closeModal = document.querySelector('.close-modal');
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            modal.style.display = 'block';
            const modalImg = modal.querySelector('img');
            const img = card.querySelector('img');
            if (modalImg && img) modalImg.src = img.src;
        });
    });

    closeModal?.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) modal.style.display = 'none';
    });

    //scroll spy
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    //progress bars
    const skillFills = document.querySelectorAll('.progress-fill');

    function animateSkills() {
        const triggerBottom = window.innerHeight;
        skillFills.forEach(fill => {
            const skillTop = fill.getBoundingClientRect().top;
            const percentage = fill.dataset.percent;
            if (skillTop < triggerBottom) {
                fill.style.width = percentage + '%';
            }
        });
    }

    window.addEventListener('scroll', animateSkills);
});