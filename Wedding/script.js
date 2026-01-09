document.addEventListener('DOMContentLoaded', () => {

    // --------------------------------------------------
    // 스티키 내비게이션 (스크롤 시 상단 고정)
    // --------------------------------------------------
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --------------------------------------------------
    // 모바일 메뉴 토글
    // --------------------------------------------------
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('nav-active');

            // 아이콘 애니메이션 전환 (간단한 로직)
            const icon = menuToggle.querySelector('ion-icon');
            if (navLinks.classList.contains('nav-active')) {
                icon.setAttribute('name', 'close-outline');
            } else {
                icon.setAttribute('name', 'menu-outline');
            }
        });
    }

    // 링크 클릭 시 모바일 메뉴 닫기
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('nav-active');
            const icon = menuToggle.querySelector('ion-icon');
            icon.setAttribute('name', 'menu-outline');
        });
    });

    // --------------------------------------------------
    // 앵커 링크 부드러운 스크롤 (헤더 높이 고려)
    // --------------------------------------------------
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetContent = document.querySelector(targetId);

            if (targetContent) {
                const headerOffset = 80;
                const elementPosition = targetContent.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // --------------------------------------------------
    // 스크롤 애니메이션 (Intersection Observer 사용)
    // --------------------------------------------------
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // 한 번만 애니메이션 실행
            }
        });
    }, {
        root: null,
        threshold: 0.15, // 15% 보일 때 작동
        rootMargin: "0px"
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // --------------------------------------------------
    // 문의 폼 처리 (시각적 기능만)
    // --------------------------------------------------
    const form = document.getElementById('inquiryForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;

            // 성공 메시지 알림 (실제 전송은 안됨)
            alert(`${name}님, 문의가 접수되었습니다. 빠른 시일 내에 연락드리겠습니다.`);
            form.reset();
        });
    }

    // --------------------------------------------------
    // About Slider
    // --------------------------------------------------
    const aboutTrack = document.querySelector('.about-track');
    const aboutSlides = document.querySelectorAll('.about-slide');
    const dotsContainer = document.querySelector('.slider-dots');

    // 섹션 헤더 요소 선택
    const sectionTitle = document.querySelector('#about .section-header h2');
    const sectionSubTitle = document.querySelector('#about .section-header .sub-title');

    // 슬라이드별 타이틀 데이터
    const slideTitles = [
        { main: "사회자 소개", sub: "About MC" },
        { main: "예식 스타일", sub: "Wedding Style" },
        { main: "웨딩 이벤트", sub: "Wedding Event" },
        { main: "결혼식 영상 제작", sub: "Wedding Video" },
        { main: "피로연 애프터 파티", sub: "After Party" }
    ];

    if (aboutTrack && aboutSlides.length > 0) {
        let currentSlide = 0;
        const slideCount = aboutSlides.length;

        // Initialize dots
        aboutSlides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => {
                goToSlide(index);
                resetAutoPlay();
            });
            dotsContainer.appendChild(dot);
        });

        const dots = document.querySelectorAll('.dot');

        function updateDots() {
            dots.forEach((dot, index) => {
                if (index === currentSlide) dot.classList.add('active');
                else dot.classList.remove('active');
            });
        }

        function updateTitle(index) {
            if (sectionTitle && sectionSubTitle && slideTitles[index]) {
                // 페이드 효과를 위해 클래스 잠시 제거 후 다시 추가 (옵션)
                // 여기서는 텍스트만 변경
                sectionTitle.textContent = slideTitles[index].main;
                sectionSubTitle.textContent = slideTitles[index].sub;
            }
        }

        function goToSlide(index) {
            if (index < 0) index = slideCount - 1;
            if (index >= slideCount) index = 0;

            currentSlide = index;
            aboutTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
            updateDots();
            updateTitle(currentSlide);
        }

        // Auto Play
        let slideInterval;

        function startAutoPlay() {
            slideInterval = setInterval(() => {
                goToSlide(currentSlide + 1);
            }, 6000);
        }

        function resetAutoPlay() {
            clearInterval(slideInterval);
            startAutoPlay();
        }

        startAutoPlay();
    }

});
