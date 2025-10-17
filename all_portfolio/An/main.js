// Hiệu ứng cuộn mượt khi click vào link có href="#..."
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Hiệu ứng gõ chữ "I'm a Data Analyst"
document.addEventListener("DOMContentLoaded", function() {
  const text = "I'm a Data Analyst";
  const typing = document.getElementById("typing");
  let i = 0;

  function type() {
    if (i < text.length) {
      typing.textContent += text.charAt(i);
      i++;
      setTimeout(type, 100); // tốc độ gõ
    }
  }

  type();
});

// Hiệu ứng xuất hiện khi section vào khung nhìn
document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section[id]");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        } else {
          // Khi rời khỏi viewport → reset để vào lại có hiệu ứng
          entry.target.classList.remove("visible");
        }
      });
    },
    { threshold: 0.25 }
  );

  sections.forEach((sec) => observer.observe(sec));
});


