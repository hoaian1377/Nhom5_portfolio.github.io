// Typing animation for hero section
// Hàm khởi tạo animation gõ chữ cho phần hero section (phần giới thiệu chính trên trang)
function initTypingAnimation() {
  const typingElement = document.querySelector('.typing-text');
  if (!typingElement) return;
  
  const texts = ['Full Stack Developer', 'React Developer', 'Node.js Developer', 'Web Developer'];
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 100;
  
  // Hàm đệ quy thực hiện việc gõ/xóa văn bản
  function typeText() {
    const currentText = texts[textIndex];
    
    if (isDeleting) {
      // Cắt văn bản từ đầu đến charIndex - 1 (xóa ký tự cuối)
      typingElement.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 50; // Tốc độ xóa nhanh hơn
    } else {
      // Cắt văn bản từ đầu đến charIndex + 1 (thêm ký tự mới)
      typingElement.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 100; // Tốc độ gõ chuẩn
    }
    
    // Kiểm tra nếu đã gõ hết văn bản
    if (!isDeleting && charIndex === currentText.length) {
      typeSpeed = 2000; // Delay trước khi bắt đầu xóa
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      // Chuyển sang văn bản tiếp theo, quay vòng nếu hết mảng
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
      typeSpeed = 500; // Delay ngắn trước khi gõ văn bản mới
    }
    
    // Lập lịch gọi lại hàm typeText sau khoảng thời gian typeSpeed
    setTimeout(typeText, typeSpeed);
  }
  
  typeText();
}

// Intersection Observer for animations
// Hàm khởi tạo Intersection Observer để kích hoạt animation khi element vào viewport (khi scroll đến)
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px' // Dịch chuyển vùng quan sát lên 50px để kích hoạt sớm hơn
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Thêm class 'animate-in' để kích hoạt CSS animation
        entry.target.classList.add('animate-in');
      }
    });
  }, observerOptions);
  
  // Chọn tất cả các element cần animate
  const animateElements = document.querySelectorAll('.skill-card-modern, .project-card, .contact-info-card, .stat, .timeline-item');
  animateElements.forEach(el => observer.observe(el));
}

// Progress bar animation
// Hàm khởi tạo animation cho progress bars (thanh tiến độ kỹ năng)
function initProgressBars() {
  const progressBars = document.querySelectorAll('.skill-progress');
  
  const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const progressBar = entry.target;
        const width = progressBar.style.width;
        progressBar.style.width = '0%';
        
        // Delay 200ms rồi animate về width gốc (tạo hiệu ứng fill dần)
        setTimeout(() => {
          progressBar.style.width = width;
        }, 200);
      }
    });
  }, { threshold: 0.5 });
  
  progressBars.forEach(bar => progressObserver.observe(bar));
}

// Smooth scroll for anchor links
// Event listener cho toàn bộ document để xử lý click vào anchor links (#id)
document.addEventListener('click', function(e) {
  const a = e.target.closest('a[href^="#"]');
  if (!a) return;
  
  const id = a.getAttribute('href');
  if (id.length > 1) {
    const el = document.querySelector(id);
    if (el) {
      e.preventDefault();
      
      // Tính toán vị trí scroll với offset header
      const header = document.querySelector('.site-header');
      const headerH = header ? header.offsetHeight : 0;
      const top = el.getBoundingClientRect().top + window.pageYOffset - headerH - 8;
      
      window.scrollTo({ top, behavior: 'smooth' });
      
      // Đóng mobile menu nếu đang mở
      closeMobileMenu();
    }
  }
});

// Hàm đóng mobile menu
function closeMobileMenu() {
  const navMenu = document.querySelector('.nav-menu');
  const hamburger = document.querySelector('.hamburger');
  
  if (navMenu && hamburger) {
    navMenu.classList.remove('active');
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
}

// Header scroll effect
// Lấy header element
const header = document.querySelector('.site-header');

// Hàm xử lý scroll để thay đổi style header
function onScroll() {
  if (!header) return;
  
  if (window.scrollY > 6) {
    header.classList.add('is-scrolled');
  } else {
    header.classList.remove('is-scrolled');
  }
}

// Thêm event listener scroll, passive: true để tối ưu performance
window.addEventListener('scroll', onScroll, { passive: true });
onScroll(); // Gọi ngay lập tức để set initial state

// Mobile menu functionality
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelector('.nav-links');

// Hàm toggle mobile menu
function toggleMobileMenu() {
  const isActive = navMenu.classList.toggle('active');
  hamburger.classList.toggle('active');
  hamburger.setAttribute('aria-expanded', isActive);
  document.body.style.overflow = isActive ? 'hidden' : '';
}

// Khởi tạo mobile menu nếu các element tồn tại
if (hamburger && navMenu) {
  // Event listener cho click hamburger để toggle menu
  hamburger.addEventListener('click', toggleMobileMenu);
  
  // Đóng menu khi click nav links
  if (navLinks) {
    const navLinkItems = navLinks.querySelectorAll('.nav-link');
    navLinkItems.forEach(link => {
      link.addEventListener('click', closeMobileMenu);
    });
  }
  
  // Đóng menu khi click outside
  document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
      closeMobileMenu();
    }
  });
}

// Active nav highlight
const sections = document.querySelectorAll('section[id], main[id]');
const navItems = document.querySelectorAll('.nav-link');

// Hàm cập nhật nav item active dựa trên vị trí scroll
function updateActiveNav() {
  const scrollY = window.scrollY;
  const headerH = header ? header.offsetHeight : 0;
  
  // Xử lý trường hợp ở đầu trang (scrollY < 100), active #home
  if (scrollY < 100) {
    setActiveNavItem('#home');
    return;
  }
  
  // Duyệt qua từng section
  sections.forEach(section => {
    const sectionTop = section.offsetTop - headerH - 100;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    
    // Nếu scrollY nằm trong vùng của section
    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      setActiveNavItem(`#${sectionId}`);
    }
  });
}

// Hàm set active nav item
function setActiveNavItem(targetHref) {
    navItems.forEach(item => {
      item.classList.remove('active');
    if (item.getAttribute('href') === targetHref) {
        item.classList.add('active');
      }
    });
}

// Thêm event listener scroll cho updateActiveNav
window.addEventListener('scroll', updateActiveNav, { passive: true });
updateActiveNav(); // Gọi ngay để set initial active

// Initialize all animations when DOM is loaded
// Event listener khi DOM loaded hoàn tất
document.addEventListener('DOMContentLoaded', function() {
  // Khởi tạo tất cả các animation functions
  initTypingAnimation();
  initScrollAnimations();
  initProgressBars();
  initCareerAnimations();
  initHeaderAnimations();
  initCertificatesAnimations();
  initAboutAnimations();
});

// Logo click handlers with double-click detection
let clickTimeout = null;
let clickCount = 0;

// Hàm xử lý click logo (single: scroll home, double: show modal)
function handleLogoClick(event) {
  event.preventDefault();
  const logo = event.currentTarget;
  clickCount++;
  
  if (clickCount === 1) {
    clickTimeout = setTimeout(() => {
      addClickEffect(logo);
      scrollToHome();
      clickCount = 0;
    }, 300);
  } else if (clickCount === 2) {
    clearTimeout(clickTimeout);
    addClickEffect(logo);
    showLogoModal();
    clickCount = 0;
  }
}

// Hàm thêm hiệu ứng click cho logo
function addClickEffect(logo) {
  logo.classList.add('clicked');
  setTimeout(() => logo.classList.remove('clicked'), 300);
}

// Hàm scroll mượt đến home section
function scrollToHome() {
  const homeSection = document.querySelector('#home');
  if (homeSection) {
    homeSection.scrollIntoView({ behavior: 'smooth' });
  }
}

// Logo Modal functions
// Hàm hiển thị modal logo
function showLogoModal() {
  const modal = document.getElementById('logoModal');
  if (modal) {
    modal.style.display = 'flex';
    setTimeout(() => modal.classList.add('show'), 10);
    document.body.style.overflow = 'hidden';
  }
}

// Hàm đóng modal logo
function closeLogoModal() {
  const modal = document.getElementById('logoModal');
  if (modal) {
    modal.classList.remove('show');
    setTimeout(() => {
      modal.style.display = 'none';
      document.body.style.overflow = '';
    }, 300);
  }
}

// Career animations
// Hàm khởi tạo animations cho phần career/timeline
function initCareerAnimations() {
  const careerCards = document.querySelectorAll('.career-card');
  const timelineDots = document.querySelectorAll('.timeline-dot');
  
  // Tạo Observer cho career cards
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Delay stagger animation dựa trên index (200ms mỗi card)
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, index * 200);
        
        // Cập nhật timeline dots: active các dot trước card hiện tại
        const cardIndex = Array.from(careerCards).indexOf(entry.target);
        timelineDots.forEach((dot, dotIndex) => {
          dot.classList.toggle('active', dotIndex <= cardIndex);
        });
      }
    });
  }, {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
  });
  
  // Set initial styles cho cards
  careerCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s var(--ease-out)';
    observer.observe(card);
  });
  
  // Animate progress bars trong career section
  initCareerProgressBars();
}

// Hàm khởi tạo progress bars cho career section
function initCareerProgressBars() {
  const progressBars = document.querySelectorAll('.progress-fill');
  
  const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const progressBar = entry.target;
        const width = progressBar.style.width;
        progressBar.style.width = '0%';
        
        setTimeout(() => {
          progressBar.style.width = width;
        }, 300);
      }
    });
  }, { threshold: 0.5 });
  
  progressBars.forEach(bar => progressObserver.observe(bar));
}

// Header animations
// Hàm khởi tạo animations cho header và navigation
function initHeaderAnimations() {
  const header = document.querySelector('.site-header');
  
  // Header scroll effect (thay đổi style khi scroll)
  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });
  
  // Nav link hover effects
  initNavHoverEffects();
}

// Hàm khởi tạo hover effects cho nav links
function initNavHoverEffects() {
  const navItems = document.querySelectorAll('.nav-item');
  
  navItems.forEach(item => {
    const link = item.querySelector('.nav-link');
    const indicator = item.querySelector('.nav-indicator');
    
    if (link && indicator) {
      link.addEventListener('mouseenter', () => {
        indicator.style.width = '80%';
      });
      
      link.addEventListener('mouseleave', () => {
        if (!link.classList.contains('active')) {
          indicator.style.width = '0%';
        }
      });
    }
  });
}

// Certificates animations
// Hàm khởi tạo animations cho phần certificates (chứng chỉ)
function initCertificatesAnimations() {
  const noCertificates = document.querySelector('.no-certificates');
  const actionItems = document.querySelectorAll('.action-item');
  const progressBar = document.querySelector('.no-certificates .progress-fill');
  
  // Tạo Observer cho noCertificates container
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Animate container: fade-in slide-up
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        
        // Stagger animation cho action items
        animateActionItems(actionItems);
        
        // Animate progress bar sau 800ms
        if (progressBar) {
          setTimeout(() => {
            progressBar.style.width = '60%';
          }, 800);
        }
      }
    });
  }, {
    threshold: 0.3,
    rootMargin: '0px 0px -50px 0px'
  });
  
  // Nếu có noCertificates, set initial styles và observe
  if (noCertificates) {
    noCertificates.style.opacity = '0';
    noCertificates.style.transform = 'translateY(30px)';
    noCertificates.style.transition = 'all 0.8s var(--ease-out)';
    observer.observe(noCertificates);
  }
  
  // Set initial styles cho action items
  actionItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = 'all 0.6s var(--ease-out)';
  });
  
  // Animate timeline progress riêng
  initTimelineProgress();
}

// Hàm animate action items với stagger effect
function animateActionItems(actionItems) {
  actionItems.forEach((item, index) => {
    setTimeout(() => {
      item.style.opacity = '1';
      item.style.transform = 'translateY(0)';
    }, 300 + (index * 150));
  });
}

// Hàm khởi tạo timeline progress animation
function initTimelineProgress() {
  const timelineProgress = document.querySelector('.timeline-progress .progress-fill');
  if (timelineProgress) {
    const timelineObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          timelineProgress.style.width = '60%';
        }
      });
    }, { threshold: 0.5 });
    
    timelineObserver.observe(timelineProgress);
  }
}

// Image Zoom functionality
let imageZoomModal = null;
let currentZoomImage = null;
let isZoomed = false;

// Hàm khởi tạo image zoom cho tất cả images
function initImageZoom() {
  if (!document.getElementById('imageZoomModal')) {
    createImageZoomModal();
  }
  
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    // Bỏ qua logo images vì chúng có functionality riêng
    if (img.closest('.brand-mark') || img.closest('.footer-mark')) {
      return;
    }
    
    img.classList.add('clickable-image');
    img.addEventListener('dblclick', handleImageDoubleClick);
    img.addEventListener('click', handleImageClick);
  });
}

// Hàm tạo HTML cho zoom modal
function createImageZoomModal() {
  const modalHTML = `
    <div id="imageZoomModal" class="image-zoom-modal">
      <div class="zoom-backdrop" onclick="closeImageZoom()"></div>
      <div class="zoom-content">
        <img class="zoom-image" src="" alt="Zoomed Image" />
        <div class="zoom-controls">
          <button class="zoom-btn" onclick="toggleZoom()" title="Zoom In/Out">🔍</button>
          <button class="zoom-btn" onclick="resetZoom()" title="Reset Zoom">↻</button>
        </div>
        <button class="zoom-close" onclick="closeImageZoom()" title="Close">×</button>
        <div class="zoom-info">Double-click to zoom in/out • Click outside to close</div>
      </div>
    </div>
  `;
  
  document.body.insertAdjacentHTML('beforeend', modalHTML);
  imageZoomModal = document.getElementById('imageZoomModal');
  currentZoomImage = imageZoomModal.querySelector('.zoom-image');
}

// Prevent single click propagation
function handleImageClick(event) {
  event.preventDefault();
}

// Xử lý double-click để mở zoom
function handleImageDoubleClick(event) {
  event.preventDefault();
  event.stopPropagation();
  
  const img = event.target;
  const src = img.src;
  const alt = img.alt || 'Image';
  
  // Bỏ qua logo images
  if (img.closest('.brand-mark') || img.closest('.footer-mark')) {
    return;
  }
  
  showImageZoom(src, alt);
}

// Hiển thị modal zoom
function showImageZoom(src, alt) {
  if (!imageZoomModal) {
    createImageZoomModal();
  }
  
  currentZoomImage.src = src;
  currentZoomImage.alt = alt;
  isZoomed = false;
  currentZoomImage.classList.remove('zoomed');
  
  imageZoomModal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
  
  setTimeout(() => {
    imageZoomModal.classList.add('show');
  }, 10);
}

// Đóng modal zoom
function closeImageZoom() {
  if (!imageZoomModal) return;
  
  imageZoomModal.classList.remove('show');
  document.body.style.overflow = '';
  
  setTimeout(() => {
    imageZoomModal.style.display = 'none';
    isZoomed = false;
    currentZoomImage.classList.remove('zoomed');
  }, 300);
}

// Toggle zoom in/out
function toggleZoom() {
  if (!currentZoomImage) return;
  
  isZoomed = !isZoomed;
  currentZoomImage.classList.toggle('zoomed', isZoomed);
}

// Reset zoom về normal
function resetZoom() {
  if (!currentZoomImage) return;
  
  isZoomed = false;
  currentZoomImage.classList.remove('zoomed');
}

// Keyboard support for zoom modal
document.addEventListener('keydown', function(e) {
  if (!imageZoomModal || imageZoomModal.style.display === 'none') return;
  
  switch(e.key) {
    case 'Escape':
      closeImageZoom();
      break;
    case ' ':
      e.preventDefault();
      toggleZoom();
      break;
    case 'r':
    case 'R':
      resetZoom();
      break;
  }
});

// Form submission handler
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.querySelector('.contact-form-modern');
  if (contactForm) {
    contactForm.addEventListener('submit', handleFormSubmit);
  }
  
  initImageZoom();
});

// Hàm xử lý submit form
function handleFormSubmit(e) {
  e.preventDefault();
  
  const formData = new FormData(e.target);
  const name = formData.get('name');
  const email = formData.get('email');
  const message = formData.get('message');
  
  // Validation cơ bản
  if (!name || !email || !message) {
    alert('Vui lòng điền đầy đủ thông tin!');
    return;
  }
  
  // Email regex validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert('Vui lòng nhập email hợp lệ!');
    return;
  }
  
  // Simulate submission
  const submitBtn = e.target.querySelector('.btn-submit');
  const originalText = submitBtn.innerHTML;
  
  submitBtn.innerHTML = '<svg class="animate-spin" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/></svg> Đang gửi...';
  submitBtn.disabled = true;
  
  setTimeout(() => {
    alert('Cảm ơn bạn đã liên hệ! Tôi sẽ phản hồi sớm nhất có thể.');
    e.target.reset();
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;
  }, 2000);
}