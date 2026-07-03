// Mobil menyuni ochish va yopish
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

if(menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// Dark/Light Mode Tizimi
const themeToggleBtn = document.getElementById('themeToggleBtn');
const htmlElement = document.documentElement;

const savedTheme = localStorage.getItem('theme') || 'light';
htmlElement.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

if(themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        let newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
}

function updateThemeIcon(theme) {
    if(themeToggleBtn) {
        themeToggleBtn.innerHTML = theme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    }
}

// Qabulga yozilish modal oynasi
const modal = document.getElementById('appointmentModal');

function openModal() {
    if(modal) {
        modal.style.display = "block";
        document.body.style.overflow = "hidden";
    }
}

function closeModal() {
    if(modal) {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
    }
}

window.onclick = function(event) {
    if (event.target == modal) {
        closeModal();
    }
}

// Shakllarni tekshirish va yuborish simulyatsiyasi
const mainForm = document.getElementById('mainForm');
if(mainForm) {
    mainForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Rahmat! Arizangiz muvaffaqiyatli qabul qilindi. 15 daqiqa ichida operatorlarimiz bog\'lanishadi.');
        this.reset();
    });
}

const modalForm = document.getElementById('modalForm');
if(modalForm) {
    modalForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Tezkor navbat arizangiz muvaffaqiyatli yuborildi. Salomat bo\'ling!');
        closeModal();
        this.reset();
    });
}

// SCROLL REVEAL ANIMATSIYASI (Sahifa o'tganda silliq chiqish)
const sections = document.querySelectorAll('section, .info-section, .services-grid, .doctors-grid, .appointment-section');

sections.forEach(sec => {
    sec.classList.add('scroll-reveal');
});

const revealOnScroll = () => {
    const triggerBottom = window.innerHeight / 5 * 4;
    
    sections.forEach(sec => {
        const secTop = sec.getBoundingClientRect().top;
        if(secTop < triggerBottom) {
            sec.classList.add('active');
        }
    });
};

window.addEventListener('scroll', revealOnScroll);
revealOnScroll(); // Dastlabki yuklanganda tekshirish

// RAQAMLAR ANIMATSIYASI (0 dan kerakli raqamgacha sanash)
const stats = document.querySelectorAll('.stat-box h2');
let started = false; // Faqat bir marta ishlashi uchun

const startCount = () => {
    stats.forEach(stat => {
        const target = parseInt(stat.innerText.replace(/[^0-9]/g, ''));
        const suffix = stat.innerText.replace(/[0-9]/g, ''); // '+' belgisini saqlab qolish
        let count = 0;
        const speed = target / 50; // Tezlikni sozlash
        
        const updateCount = () => {
            if(count < target) {
                count += Math.ceil(speed);
                if(count > target) count = target;
                stat.innerText = count.toLocaleString() + suffix;
                setTimeout(updateCount, 30);
            }
        };
        updateCount();
    });
};

// Scroll orqali statistika bo'limiga yetganda ishga tushirish
const statsSection = document.querySelector('.stats-section');
if(statsSection) {
    window.addEventListener('scroll', () => {
        const rect = statsSection.getBoundingClientRect();
        if(rect.top < window.innerHeight && !started) {
            startCount();
            started = true;
        }
    });
}