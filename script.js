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

// --- QABULGA YOZILISH TIZIMI (REAL ISHLAYDIGAN QISM) ---

// Arizalarni xotiraga saqlash funksiyasi
function saveAppointment(name, phone, department, message = "Izoh yo'q") {
    // Avval xotirada bor arizalarni olamiz
    let appointments = JSON.parse(localStorage.getItem('appointments')) || [];
    
    // Yangi ariza obyektini yaratamiz
    const newAppointment = {
        id: Date.now(),
        name: name,
        phone: phone,
        department: department,
        message: message,
        date: new Date().toLocaleString()
    };
    
    // Ro'yxatga qo'shamiz va xotiraga qayta yozamiz
    appointments.push(newAppointment);
    localStorage.setItem('appointments', JSON.stringify(appointments));
    
    // Konsolda tekshirish uchun chiqarish
    console.log("Muvaffaqiyatli saqlandi:", newAppointment);
}

// 1. Sahifadagi asosiy katta forma (contact.html ichidagi)
const mainForm = document.getElementById('mainForm');
if(mainForm) {
    mainForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Formadagi qiymatlarni olish (tartib bo'yicha inputlarni tanlaydi)
        const name = this.querySelector('input[type="text"]').value;
        const phone = this.querySelector('input[type="tel"]').value;
        const department = this.querySelector('select').value;
        const message = this.querySelector('textarea') ? this.querySelector('textarea').value : "Izoh yo'q";
        
        // Xotiraga saqlash funksiyasini chaqiramiz
        saveAppointment(name, phone, department, message);
        
        // Foydalanuvchiga chiroyli xabar
        alert(`Rahmat, ${name}! Arizangiz muvaffaqiyatli qabul qilindi.\nYo'nalish: ${department.toUpperCase()}\nTez orada aloqaga chiqamiz.`);
        
        this.reset(); // Formani tozalash
    });
}

// 2. Yuqoridagi tugma bosilganda ochiladigan Modal ichidagi tezkor forma
const modalForm = document.getElementById('modalForm');
if(modalForm) {
    modalForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Modal ichidagi qiymatlarni olish
        const name = this.querySelectorAll('input')[0].value;
        const phone = this.querySelectorAll('input')[1].value;
        const department = "Tezkor ariza (Umumiy)";
        
        saveAppointment(name, phone, department, "Modal oyna orqali yuborildi");
        
        alert(`Tezkor arizangiz qabul qilindi, ${name}! Operatorlarimiz sizga qo'ng'iroq qilishadi.`);
        
        closeModal(); // Modalni yopish
        this.reset(); // Formani tozalash
    });
}


// --- ANIMATSIYALAR QISMI ---

// SCROLL REVEAL ANIMATSIYASI
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
revealOnScroll();

// RAQAMLAR ANIMATSIYASI
const stats = document.querySelectorAll('.stat-box h2');
let started = false;

const startCount = () => {
    stats.forEach(stat => {
        const target = parseInt(stat.innerText.replace(/[^0-9]/g, ''));
        const suffix = stat.innerText.replace(/[0-9]/g, '');
        let count = 0;
        const speed = target / 50;
        
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