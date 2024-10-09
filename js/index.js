document.addEventListener('DOMContentLoaded', () => {


    /*--------------------------------햄버거 메뉴 시작*/
    const menuBtn = document.getElementById('openMenu');
    const mMenu = document.getElementById('mMenu');
    /*--------------------------------햄버거 메뉴 클릭 이벤트*/
    menuBtn.addEventListener('click', () => {
        const method = !menuBtn.classList.contains('close') ? 'add' : 'remove';
        menuBtn.classList[method]('close');
        mMenu.classList[method]('show');
        document.body.classList[method]('menuOpen');
        document.documentElement.classList[method]('menuOpen');
    });
    /*--------------------------------햄버거 메뉴 클릭 이벤트 끝*/
    /*--------------------------------햄버거 메뉴 끝*/

    // gnb에서 메뉴 클릭시 모달창이 닫히고 그 곳으로 이동
    const menuLinks = document.querySelectorAll('.gnb li a');

    menuLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); // 기본 이동 방지
            const targetId = link.getAttribute('href').substring(1); // # 제거한 id 추출
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                // 메뉴 닫기
                menuBtn.classList.remove('close');
                mMenu.classList.remove('show');
                document.body.classList.remove('menuOpen');
                document.documentElement.classList.remove('menuOpen');

                // 해당 섹션으로 부드럽게 이동 + 여백
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });


    //
    //
    //
    //

    /*--------------------------------gsap 시작*/
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    const secColor1Sections = gsap.utils.toArray('.sec-color1');

    // 메뉴 색상 변경 설정
    secColor1Sections.forEach(sectionColor => {
        ScrollTrigger.create({
            trigger: sectionColor,
            start: 'top bottom',
            end: 'bottom bottom',
            scrub: true,
            toggleClass: {
                targets: '#header',
                className: 'bg-active'
            }
        });
    });

    /*--------------------------------gsap 관련 끝*/

    //
    //
    //
    //

    /* 페이지 로드 및 스크롤 시 header 클래스 업데이트, 최상단일 때 scrollTrigger와 중복 충돌 나는 것을 방지*/
    /* -------------------------------- 최상단 header 클래스 업데이트 */
    const header = document.getElementById('header');
    const firstSection = document.getElementById('mainVisual');
    const lastSection = document.getElementById('contactMe');

    const updateHeaderClass = () => {
        const scrollY = window.scrollY;
        const lastSectionTop = lastSection.offsetTop - 50;
        const firstSectionBottom = firstSection.offsetTop + firstSection.offsetHeight;
        if (scrollY < firstSectionBottom) {
            header.classList.add('first-active');
            header.classList.add('active');
            menuBtn.classList.remove('header-active');
        } else if (scrollY >= lastSectionTop) {
            header.classList.remove('first-active');
            header.classList.add('active');
            menuBtn.classList.remove('header-active');
        } else {
            header.classList.remove('first-active');
            header.classList.remove('active');
            menuBtn.classList.add('header-active');
        }

    };


    //이벤트 리스너
    updateHeaderClass(); //로드
    window.addEventListener('scroll', updateHeaderClass);
    window.addEventListener('resize', updateHeaderClass);
    /* -------------------------------- 최상단 header 클래스 업데이트 끝*/


    //프로젝트 work 소개하는 슬라이드 스크롤
    let mm = gsap.matchMedia();
    const tracks = document.querySelectorAll('.sticky-element');

    tracks.forEach((track, i) => {
        let trackWrapper = track.querySelectorAll('.track');
        let allImgs = track.querySelectorAll('.pj-txt');
        let firstTxt = track.querySelectorAll('.first-box .txt-box')

        let trackWrapperWidth = () => {
            let width = 0;
            trackWrapper.forEach((el) => (width += el.offsetWidth));
            return width;
        };

        gsap.defaults({
            ease: 'none'
        });

        //스크롤 트윈을 사용하여 2가지 이미지 교차 패럴럭스
        let scrollTween = gsap.to(trackWrapper, {
            x: () => -trackWrapperWidth(i) + window.innerWidth,
            scrollTrigger: {
                trigger: track,
                pin: true,
                scrub: 1,
                anticipatePin: 1,
                start: 'top top',
                end: () => "+=" + (track.scrollWidth - window.innerWidth),
                invalidateOnRefresh: true
            }
        });

        allImgs.forEach((img, i) => {
            gsap.fromTo(img, {
                x: '-20vw'
            }, {
                x: '20vw',
                scrollTrigger: {
                    trigger: img.parentNode,
                    containerAnimation: scrollTween,
                    start: 'left right',
                    end: 'right left',
                    scrub: true,
                    invalidateOnRefresh: true
                }
            });
        });

        //work 트랙의 첫번째 섹션 텍스트만 단독으로 있는 부분
        mm.add('(min-width: 769px)', () => {
            firstTxt.forEach((txt, i) => {
                gsap.fromTo(txt, {
                    x: '3vw',
                }, {
                    x: '20vw',
                    scrollTrigger: {
                        trigger: txt.parentNode,
                        containerAnimation: scrollTween,
                        start: 'left left',
                        end: 'right left',
                        scrub: true,
                        invalidateOnRefresh: true
                    }
                });
            });
        });
        mm.add('(max-width: 768px)', () => {
            firstTxt.forEach((txt, i) => {
                gsap.fromTo(txt, {
                    x: '2rem',
                }, {
                    x: '20vw',
                    scrollTrigger: {
                        trigger: txt.parentNode,
                        containerAnimation: scrollTween,
                        start: 'left left',
                        end: 'right left',
                        scrub: true,
                        invalidateOnRefresh: true
                    }
                });
            });
        });


    });


    //Goal & Contact 섹션의 텍스트 스크롤 애니메이션
    Splitting();

    const fx1Titles = [...document.querySelectorAll('.content__title[data-splitting][data-effect1]')];
    // const fx2Titles = [...document.querySelectorAll('.content__title[data-splitting][data-effect2]')];
    const fx3Titles = [...document.querySelectorAll('.content__title[data-splitting][data-effect3]')];
    const fx4Titles = [...document.querySelectorAll('.email-h2[data-splitting][data-effect4]')];
    const fx5Titles = document.querySelectorAll('.thanks-to');

    fx1Titles.forEach(title => {
        const chars = title.querySelectorAll('.char');
        gsap.fromTo(chars, {
                'will-change': 'opacity, transform',
                opacity: 0,
                scale: 0.6,
                rotationZ: () => gsap.utils.random(-20, 20)
            },
            {
                ease: 'power4',
                opacity: 1,
                scale: 1,
                rotation: 0,
                stagger: 0.4,
                scrollTrigger: {
                    trigger: title,
                    start: 'center+=20% bottom',
                    end: '+=50%',
                    scrub: true
                },
            });
    });

    // fx2Titles.forEach(title => {
    //     const chars = title.querySelectorAll('.char');
    //     gsap.fromTo(chars, {
    //             'will-change': 'opacity, transform',
    //             opacity: 0,
    //             yPercent: 120,
    //             scaleY: 2.3,
    //             scaleX: 0.7,
    //             transformOrigin: '50% 0%'
    //         },
    //         {
    //             duration: 1,
    //             ease: 'back.inOut(2)',
    //             opacity: 1,
    //             yPercent: 0,
    //             scaleY: 1,
    //             scaleX: 1,
    //             stagger: 0.03,
    //             scrollTrigger: {
    //                 trigger: title,
    //                 start: 'center bottom+=50%',
    //                 end: 'bottom top+=40%',
    //                 scrub: true
    //             }
    //         });
    //
    // });

    fx3Titles.forEach(title => {
        const words = title.querySelectorAll('.word');
        for (const word of words) {
            const chars = word.querySelectorAll('.char');
            chars.forEach(char => gsap.set(char.parentNode, {perspective: 2000}));
            gsap.fromTo(chars, {
                    'will-change': 'opacity, transform',
                    opacity: 0,
                    rotationX: -90,
                    yPercent: 50
                },
                {
                    ease: 'power1.inOut',
                    opacity: 1,
                    rotationX: 0,
                    yPercent: 0,
                    stagger: {
                        each: 0.03,
                        from: 0
                    },
                    scrollTrigger: {
                        trigger: word,
                        start: 'center bottom+=40%',
                        end: 'bottom center-=30%',
                        scrub: 0.9
                    }
                });

        }

    });

    fx4Titles.forEach(title => {
        const chars = title.querySelectorAll('.char');
        gsap.fromTo(chars, {
                'will-change': 'opacity, transform',
                opacity: 0,
                xPercent: () => gsap.utils.random(-200, 200),
                yPercent: () => gsap.utils.random(-150, 150)
            },
            {
                ease: 'power1.inOut',
                opacity: 1,
                xPercent: 0,
                yPercent: 0,
                stagger: {each: 0.05, grid: 'auto', from: 'random'},
                scrollTrigger: {
                    trigger: title,
                    start: 'top bottom+=10%',
                    end: 'center center',
                    scrub: 0.9
                }
            });

    });

    fx5Titles.forEach(title => {

        // gsap.fromTo(title, {
        //     transformOrigin: '0% 50%',
        //     rotate: 3
        // }, {
        //     ease: 'none',
        //     rotate: 0,
        //     scrollTrigger: {
        //         trigger: title,
        //         start: 'top center',
        //         end: 'top top',
        //         scrub: true,
        //     }
        // });

        gsap.fromTo(title, {
                'will-change': 'opacity',
                opacity: 0.1
            },
            {
                ease: 'none',
                opacity: 1,
                stagger: 0.05,
                scrollTrigger: {
                    trigger: title,
                    start: 'bottom top+=30%',
                    end: 'bottom top+=30%',
                    scrub: true,
                }
            });

    });

    const overlayPath = document.querySelector('.overlay__path');
    const paths = {
        step1: {
            unfilled: 'M 0 100 V 100 Q 50 100 100 100 V 100 z',
            inBetween: {
                curve1: 'M 0 100 V 50 Q 50 0 100 50 V 100 z',
                curve2: 'M 0 100 V 50 Q 50 100 100 50 V 100 z'
            },
            filled: 'M 0 100 V 0 Q 50 0 100 0 V 100 z',
        },
        step2: {
            filled: 'M 0 0 V 100 Q 50 100 100 100 V 0 z',
            inBetween: {
                curve1: 'M 0 0 V 50 Q 50 0 100 50 V 0 z',
                curve2: 'M 0 0 V 50 Q 50 100 100 50 V 0 z'
            },
            unfilled: 'M 0 0 V 0 Q 50 0 100 0 V 0 z',
        }
    };
    const modalBtn = document.querySelectorAll('.pj-box:not(.first-box)');
    const modalView = document.querySelectorAll('.view-2');
    const backCtrls = document.querySelectorAll('.modal-cls');

    let isAnimating = false;
    let currentPageIndex = -1;  // 현재 열려 있는 페이지의 인덱스

    const reveal = (index) => {
        if (isAnimating || currentPageIndex === index) return;
        isAnimating = true;
        currentPageIndex = index;

        gsap.timeline({
            onComplete: () => isAnimating = false
        })
            .set(overlayPath, {
                attr: {d: paths.step1.unfilled}
            })
            .to(overlayPath, {
                duration: 0.8,
                ease: 'power4.in',
                attr: {d: paths.step1.inBetween.curve1}
            }, 0)
            .to(overlayPath, {
                duration: 0.2,
                ease: 'power1',
                attr: {d: paths.step1.filled},
                onComplete: () => switchPages(index)
            })
            .set(overlayPath, {
                attr: {d: paths.step2.filled}
            })
            .to(overlayPath, {
                duration: 0.2,
                ease: 'sine.in',
                attr: {d: paths.step2.inBetween.curve1}
            })
            .to(overlayPath, {
                duration: 1,
                ease: 'power4',
                attr: {d: paths.step2.unfilled}
            });
    }

    const switchPages = (index) => {
        modalView.forEach(view => view.classList.remove('show')); // 모든 view에서 show 제거
        if (index !== -1) {
            modalView[index].classList.add('show'); // 선택한 view에만 show 추가
            document.body.classList.add('menuOpen');
            document.documentElement.classList.add('menuOpen');
        } else {
            document.body.classList.remove('menuOpen');
            document.documentElement.classList.remove('menuOpen');
        }
    }

// back to first content view
    const unReveal = (index) => {
        if (isAnimating || currentPageIndex === -1) return;
        isAnimating = true;

        gsap.timeline({
            onComplete: () => {
                isAnimating = false;
                currentPageIndex = -1;
            }
        })
            .set(overlayPath, {
                attr: {d: paths.step2.unfilled}
            })
            .to(overlayPath, {
                duration: 0.8,
                ease: 'power4.in',
                attr: {d: paths.step2.inBetween.curve2}
            }, 0)
            .to(overlayPath, {
                duration: 0.2,
                ease: 'power1',
                attr: {d: paths.step2.filled},
                onComplete: () => switchPages(-1)
            })
            .set(overlayPath, {
                attr: {d: paths.step1.filled}
            })
            .to(overlayPath, {
                duration: 0.2,
                ease: 'sine.in',
                attr: {d: paths.step1.inBetween.curve2}
            })
            .to(overlayPath, {
                duration: 1,
                ease: 'power4',
                attr: {d: paths.step1.unfilled}
            });
    }

// 각 프레임에 이벤트 리스너 추가
    modalBtn.forEach((frame, index) => {
        frame.addEventListener('click', () => reveal(index));
    });

// 뒤로 가기 버튼에 이벤트 리스너 추가 (해당 부모의 show 제거)
    backCtrls.forEach((ctrl) => {
        ctrl.addEventListener('click', () => unReveal());
    });


    //about
    const contentElements = [...document.querySelectorAll('.content--sticky')];
    const totalContentElements = contentElements.length;

    contentElements.forEach((el, position) => {
        const isLast = position === totalContentElements - 1;
        gsap.timeline({
            scrollTrigger: {
                trigger: el,
                start: isLast ? 'top top' : 'bottom top',
                end: '+=100%',
                scrub: true,
            }
        }).to(el, {
            ease: 'none',
            yPercent: -100
        }, 0);
    });

    const aboutTxt = [...document.querySelectorAll('.about-txt')];


    aboutTxt.forEach(aTxt => {
        gsap.fromTo(aTxt, {
                'will-change': 'opacity, transform',
                opacity: 0,
                yPercent: 50
            },
            {
                ease: 'power1.inOut',
                opacity: 1,
                yPercent: 0,
                scrollTrigger: {
                    trigger: aTxt.parentNode,
                    start: 'top bottom',
                    end: 'top top',
                    scrub: 0.9,
                }
            });
    });




    imagesLoaded(document.getElementById('wrap'), (instance) => {
        // console.log('이미지 로드완료');
        document.body.classList.remove('loading');
    });

    const heartPath = document.getElementById('heartPath');

    const pathLength = heartPath.getTotalLength();
    heartPath.style.strokeDasharray = pathLength;
    heartPath.style.strokeDashoffset = pathLength;

    gsap.to(heartPath, {
        strokeDashoffset: 0,
        duration: 2,
        ease: 'power2.inOut'
    });
});



