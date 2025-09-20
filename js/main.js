// 页面交互、动画、滚动、暗夜模式、模态框逻辑
document.addEventListener('DOMContentLoaded', function() {
    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
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

    // FAQ 折叠功能
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const icon = question.querySelector('i');
            answer.classList.toggle('active');
            icon.style.transform = answer.classList.contains('active') ? 'rotate(180deg)' : 'rotate(0)';
        });
    });

    // 导航栏滚动效果
    // window.addEventListener('scroll', () => {
    //     const header = document.querySelector('header');
    //     if (window.scrollY > 50) {
    //         header.style.padding = '15px 0';
    //         header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    //     } else {
    //         header.style.padding = '20px 0';
    //         header.style.boxShadow = 'var(--shadow)';
    //     }
    // });

    // 元素进入视口时的动画
    const fadeElements = document.querySelectorAll('.card, .section-title, .section-subtitle');
    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                fadeInObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    fadeElements.forEach(element => {
        fadeInObserver.observe(element);
    });

    // 微信二维码显示逻辑
    const wechatBtn = document.getElementById('wechatBtn');
    const wxQrcode = document.getElementById('wxQrcode');
    const wxText = document.getElementById('wxText');
    wechatBtn.addEventListener('mouseenter', () => {
        wxQrcode.style.display = 'block';
        wxText.style.display = 'block';
    });
    wechatBtn.addEventListener('mouseleave', () => {
        wxQrcode.style.display = 'none';
        wxText.style.display = 'none';
    });
    wxQrcode.addEventListener('mouseleave', () => {
        wxQrcode.style.display = 'none';
        wxText.style.display = 'none';
    });
    wxText.addEventListener('mouseleave', () => {
        wxQrcode.style.display = 'none';
        wxText.style.display = 'none';
    });
    wechatBtn.addEventListener('click', () => {
        const visible = wxQrcode.style.display === 'block';
        wxQrcode.style.display = visible ? 'none' : 'block';
        wxText.style.display = visible ? 'none' : 'block';
    });

    // 更新时间函数
    function updateBeijingTime() {
        const now = new Date();
        const beijingTime = new Date(now.getTime() + 8 * 60 * 60 * 1000);
        const hours = beijingTime.getUTCHours();
        const minutes = beijingTime.getUTCMinutes();
        const seconds = beijingTime.getUTCSeconds();
        const period = hours >= 12 ? 'PM' : 'AM';
        const hours12 = hours % 12 || 12;
        const formattedHours = hours12.toString().padStart(2, '0');
        const formattedMinutes = minutes.toString().padStart(2, '0');
        const formattedSeconds = seconds.toString().padStart(2, '0');
        const timeString = `北京时间: ${formattedHours}:${formattedMinutes}:${formattedSeconds} ${period}`;
        document.getElementById('beijing-time').textContent = timeString;
    }
    updateBeijingTime();
    setInterval(updateBeijingTime, 1000);

    // 置顶功能
    const scrollTopBtn = document.getElementById('scrollTop');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollTopBtn.style.display = 'flex';
        } else {
            scrollTopBtn.style.display = 'none';
        }
    });
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // 暗夜模式切换
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('i');
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        if (document.body.classList.contains('dark-mode')) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            localStorage.setItem('darkMode', 'true');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
            localStorage.setItem('darkMode', 'false');
        }
    });

    // 公司简介模态框功能
    const modal = document.getElementById('aboutModal');
    const modalBtn = document.getElementById('aboutBtn');
    const closeBtn = document.getElementById('closeModal');
    function openModal() {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }
    modalBtn.addEventListener('click', openModal);
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'flex') closeModal();
    });

    // 联系我们模态框逻辑
    const contactBtn = document.querySelector('.nav-cta .btn-secondary');
    const contactModal = document.getElementById('contactModal');
    const closeContactModal = document.getElementById('closeContactModal');
    function openContactModal() {
        contactModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
    function closeContactModalFn() {
        contactModal.style.display = 'none';
        document.body.style.overflow = '';
    }
    contactBtn.addEventListener('click', function(e) {
        e.preventDefault();
        openContactModal();
    });
    closeContactModal.addEventListener('click', closeContactModalFn);
    contactModal.addEventListener('click', function(e) {
        if (e.target === contactModal) closeContactModalFn();
    });
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && contactModal.style.display === 'flex') closeContactModalFn();
    });

    // 移动端菜单抽屉逻辑
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenuDrawer = document.getElementById('mobileMenuDrawer');
    const mobileMenuClose = document.getElementById('mobileMenuClose');
    if (mobileMenuBtn && mobileMenuDrawer && mobileMenuClose) {
        mobileMenuBtn.addEventListener('click', function(e) {
            e.stopPropagation(); // 防止冒泡到document
            mobileMenuDrawer.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
        mobileMenuClose.addEventListener('click', function() {
            mobileMenuDrawer.classList.remove('active');
            document.body.style.overflow = '';
        });
        // 修正：点击屏幕其他区域关闭菜单，但排除菜单按钮本身
        document.addEventListener('click', function(e) {
            if (mobileMenuDrawer.classList.contains('active')) {
                if (
                    !mobileMenuDrawer.contains(e.target) &&
                    e.target !== mobileMenuBtn &&
                    !mobileMenuBtn.contains(e.target)
                ) {
                    mobileMenuDrawer.classList.remove('active');
                    document.body.style.overflow = '';
                }
            }
        });
        document.querySelectorAll('.mobile-menu-link').forEach(function(link) {
            link.addEventListener('click', function() {
                mobileMenuDrawer.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }
});