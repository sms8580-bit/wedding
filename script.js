document.addEventListener('DOMContentLoaded', () => {

    /* ==================================================
       1. 스티키 내비게이션: 스크롤 시 상단 고정 효과
       ================================================== */
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    /* ==================================================
       2. 모바일 메뉴: 토글 버튼 및 사이드바 제어
       ================================================== */
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

    /* ==================================================
       3. 부드러운 스크롤: 내부 링크 클릭 시 헤더 높이를 고려한 이동
       ================================================== */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetContent = document.querySelector(targetId);

            if (targetContent) {
                const headerOffset = 80; // 스티키 헤더의 높이만큼 여백 확보
                const elementPosition = targetContent.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    /* ==================================================
       4. 등장 애니메이션: Intersection Observer를 이용한 스크롤 트리거
       ================================================== */
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

    /* ==================================================
       5. 상세 소개 슬라이더 (Detail Slider)
       ================================================== */
    const aboutTrack = document.querySelector('.about-track');
    const aboutSlides = document.querySelectorAll('.about-slide');
    const dotsContainer = document.querySelector('.slider-dots');

    // 섹션 헤더 요소 선택
    const sectionTitle = document.querySelector('#about .section-header h2');
    const sectionSubTitle = document.querySelector('#about .section-header .sub-title');

    // 슬라이드별 타이틀 데이터
    const slideTitles = [
        { main: "사회자 소개", sub: "About MC" },
        { main: "축가 / 뮤지컬웨딩", sub: "Congratulatory Song" },
        { main: "웨딩연주", sub: "Performance" },
        { main: "본식영상제작", sub: "Cinematic Video" },
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
            });
            dotsContainer.appendChild(dot);
        });

        const dots = document.querySelectorAll('.dot');

        /**
         * 슬라이더 하단 네비게이션 도트의 활성 상태를 업데이트합니다.
         */
        function updateDots() {
            dots.forEach((dot, index) => {
                if (index === currentSlide) dot.classList.add('active');
                else dot.classList.remove('active');
            });
        }

        /**
         * 슬라이드 전환 시 해당 슬라이드에 맞는 섹션 타이틀과 서브타이틀을 업데이트합니다.
         * @param {number} index - 현재 슬라이드 인덱스
         */
        function updateTitle(index) {
            if (sectionTitle && sectionSubTitle && slideTitles[index]) {
                // 페이드 효과를 위해 클래스 잠시 제거 후 다시 추가 (옵션)
                // 여기서는 텍스트만 변경
                sectionTitle.textContent = slideTitles[index].main;
                sectionSubTitle.textContent = slideTitles[index].sub;
            }
        }

        /**
         * 특정 인덱스의 슬라이드로 이동합니다.
         * @param {number} index - 이동할 슬라이드 인덱스
         */
        function goToSlide(index) {
            if (index < 0) index = slideCount - 1;
            if (index >= slideCount) index = 0;

            currentSlide = index;
            aboutTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
            updateDots();
            updateTitle(currentSlide);
        }

        // Auto Play removed

    }

    /* ==================================================
       6. 텍스트 리뷰 슬라이더 (Reviews Slider)
       ================================================== */
    const reviewsTrack = document.querySelector('.reviews-track');
    const reviewsSlides = document.querySelectorAll('.reviews-slide');
    const reviewsDotsContainer = document.querySelector('.reviews-dots');

    if (reviewsTrack && reviewsSlides.length > 0) {
        let currentReviewSlide = 0;
        const reviewSlideCount = reviewsSlides.length;

        // Initialize dots
        reviewsSlides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => {
                goToReviewSlide(index);
                resetReviewAutoPlay();
            });
            reviewsDotsContainer.appendChild(dot);
        });

        const dots = reviewsDotsContainer.querySelectorAll('.dot');

        /**
         * 리뷰 슬라이더 도트의 활성 상태를 업데이트합니다.
         */
        function updateReviewDots() {
            dots.forEach((dot, index) => {
                if (index === currentReviewSlide) dot.classList.add('active');
                else dot.classList.remove('active');
            });
        }

        /**
         * 특정 인덱스의 리뷰 슬라이드로 이동합니다.
         * @param {number} index - 이동할 슬라이드 인덱스
         */
        function goToReviewSlide(index) {
            if (index < 0) index = reviewSlideCount - 1;
            if (index >= reviewSlideCount) index = 0;

            currentReviewSlide = index;
            reviewsTrack.style.transform = `translateX(-${currentReviewSlide * 100}%)`;
            updateReviewDots();
        }

        // Auto Play
        let reviewInterval;

        function startReviewAutoPlay() {
            reviewInterval = setInterval(() => {
                goToReviewSlide(currentReviewSlide + 1);
            }, 5000);
        }

        function resetReviewAutoPlay() {
            clearInterval(reviewInterval);
            startReviewAutoPlay();
        }

        startReviewAutoPlay();
    }

    /* ==================================================
       9. 사회자 갤러리 슬라이더 (수동 컨트롤 + 자동 재생)
       ================================================== */
    const mcSlider = document.querySelector('.mc-slider');
    const mcTrack = document.querySelector('.mc-track');
    const mcPrevBtn = document.querySelector('.mc-btn.prev');
    const mcNextBtn = document.querySelector('.mc-btn.next');

    // 카드 너비(350) + gap(40) = 390
    // 반응형 대응을 위해 실제 계산 필요
    function getCardWidth() {
        const firstCard = document.querySelector('.mc-card');
        if (!firstCard) return 390;
        const style = window.getComputedStyle(mcTrack);
        const gap = parseFloat(style.gap) || 40; // Default gap 2.5rem
        return firstCard.offsetWidth + gap;
    }

    if (mcSlider && mcTrack && mcPrevBtn && mcNextBtn) {

        // 자동 재생 관련 변수
        let autoPlayInterval;
        const autoPlayDelay = 3000; // 3초마다 이동
        let isPaused = false;

        function startAutoPlay() {
            clearInterval(autoPlayInterval);
            autoPlayInterval = setInterval(() => {
                if (!isPaused) {
                    const cardWidth = getCardWidth();
                    // 끝에 도달했는지 확인 (약간의 오차 허용)
                    if (mcSlider.scrollLeft + mcSlider.clientWidth >= mcSlider.scrollWidth - 10) {
                        mcSlider.scrollTo({ left: 0, behavior: 'smooth' });
                    } else {
                        mcSlider.scrollBy({ left: cardWidth, behavior: 'smooth' });
                    }
                }
            }, autoPlayDelay);
        }

        function resetAutoPlay() {
            clearInterval(autoPlayInterval);
            startAutoPlay();
        }

        // 버튼 이벤트
        mcNextBtn.addEventListener('click', () => {
            const cardWidth = getCardWidth();
            // 맨 끝인지 확인 (약간의 오차 허용)
            if (mcSlider.scrollLeft + mcSlider.clientWidth >= mcSlider.scrollWidth - 10) {
                mcSlider.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                mcSlider.scrollBy({ left: cardWidth, behavior: 'smooth' });
            }
            resetAutoPlay();
        });

        mcPrevBtn.addEventListener('click', () => {
            const cardWidth = getCardWidth();
            // 맨 처음인지 확인
            if (mcSlider.scrollLeft <= 10) {
                mcSlider.scrollTo({ left: mcSlider.scrollWidth, behavior: 'smooth' });
            } else {
                mcSlider.scrollBy({ left: -cardWidth, behavior: 'smooth' });
            }
            resetAutoPlay();
        });

        // 마우스 호버 시 일시 정지
        mcSlider.addEventListener('mouseenter', () => {
            isPaused = true;
        });

        mcSlider.addEventListener('mouseleave', () => {
            isPaused = false;
        });

        // 드래그 스크롤 기능 추가
        let isDown = false;
        let startX;
        let scrollLeft;

        mcSlider.addEventListener('mousedown', (e) => {
            isDown = true;
            isPaused = true; // 드래그 중 정지
            mcSlider.classList.add('active');
            startX = e.pageX - mcSlider.offsetLeft;
            scrollLeft = mcSlider.scrollLeft;
        });

        mcSlider.addEventListener('mouseleave', () => {
            isDown = false;
            isPaused = false; // 드래그 종료 후 재개
            mcSlider.classList.remove('active');
        });

        mcSlider.addEventListener('mouseup', () => {
            isDown = false;
            isPaused = false; // 드래그 종료 후 재개
            mcSlider.classList.remove('active');
        });

        mcSlider.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - mcSlider.offsetLeft;
            const walk = (x - startX) * 2; // 스크롤 속도
            mcSlider.scrollLeft = scrollLeft - walk;
        });

        // 초기 시작
        startAutoPlay();
    }

    /* ==================================================
       10. 비디오 모달 로직: 갤러리 카드 클릭 시 영상 재생
       ================================================== */
    const videoModal = document.getElementById('videoModal');
    const modalVideo = document.getElementById('modalVideo');
    const mcCards = document.querySelectorAll('.mc-card');
    const closeModal = document.querySelector('.close-modal');

    if (videoModal && mcCards.length > 0) {
        mcCards.forEach(card => {
            card.addEventListener('click', () => {
                const videoSrc = card.getAttribute('data-video');
                if (videoSrc) {
                    modalVideo.querySelector('source').src = videoSrc;
                    modalVideo.load();
                    videoModal.style.display = 'flex';
                    modalVideo.play();
                }
            });
        });

        const closeFunc = () => {
            videoModal.style.display = 'none';
            modalVideo.pause();
            modalVideo.currentTime = 0;
            modalVideo.querySelector('source').src = ""; // Clear source to stop loading
        };

        if (closeModal) {
            closeModal.addEventListener('click', closeFunc);
        }

        // Close when clicking outside the content
        videoModal.addEventListener('click', (e) => {
            if (e.target === videoModal) {
                closeFunc();
            }
        });

        // Close on Escape key
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && videoModal.style.display === 'flex') {
                closeFunc();
            }
        });
    }

    /* ==================================================
       11. 동영상 보호: 모든 비디오 요소에 대해 우클릭 방지
       ================================================== */
    document.querySelectorAll('video').forEach(video => {
        video.addEventListener('contextmenu', (e) => {
            e.preventDefault();
        });
    });

    /* ==================================================
       12. 벚꽃 마우스 트레일 효과
       ================================================== */
    let lastTime = 0;
    const petalInterval = 50; //ms

    document.addEventListener('mousemove', (e) => {
        const currentTime = Date.now();
        if (currentTime - lastTime < petalInterval) return;
        lastTime = currentTime;

        const petal = document.createElement('div');
        petal.classList.add('petal');

        // 마우스 위치 설정
        const x = e.clientX;
        const y = e.clientY;
        petal.style.left = `${x}px`;
        petal.style.top = `${y}px`;

        // 랜덤 움직임 변수 설정
        const randomX = (Math.random() - 0.5) * 100; // -50 to 50
        const randomY = Math.random() * 100 + 50; // 50 to 150 (downwards)
        const randomRotate = Math.random() * 360;

        petal.style.setProperty('--translate-x', `${randomX}px`);
        petal.style.setProperty('--translate-y', `${randomY}px`);
        petal.style.setProperty('--rotate', `${randomRotate}deg`);

        // 랜덤 크기
        const size = Math.random() * 10 + 5; // 5px to 15px
        petal.style.width = `${size}px`;
        petal.style.height = `${size}px`;

        document.body.appendChild(petal);

        // 애니메이션 종료 후 제거
        setTimeout(() => {
            petal.remove();
        }, 1000); // Animation duration
    });
});
