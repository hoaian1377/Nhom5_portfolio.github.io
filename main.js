const observer = new IntersectionObserver((entries) => {
entries.forEach(entry => {
    if (entry.isIntersecting) {
    entry.target.classList.add('visible');
    } else {
    entry.target.classList.remove('visible');
    }
});
}, { threshold: 0.2 });

// Quan sát tất cả các phần cần hiệu ứng
document.querySelectorAll('.intro, .member, footer').forEach(el => observer.observe(el));