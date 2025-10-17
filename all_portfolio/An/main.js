document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});


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
