'use strict';

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const slider = (() => {
    const slider = $('.slider');
    const sliderWrap = $('.slider-wrap');
    const slideContents = $$('.slider-content-wrap');
    const slidePagination = $('.swiper-pagination');
    const slideDots = $$('.swiper-pagination-bullet');

    var currentIndex = 1;
    var currentDot = 0;
    var isAutoSlide = true;

    return {
        handleEvent(){
            const _this = this;

            sliderWrap.addEventListener('transitionend', function(){
                _this.checkCurrentIndex();
                _this.slideShowContent();
            });

            [...slideDots].forEach(function(item, index){
                item.addEventListener('click', function(){
                    currentDot = index;
                    currentIndex = index + 1;
                    sliderWrap.style.transition = 'transform 0.4s ease';
                    _this.showSlide();
                    _this.showSlideDot();
                    isAutoSlide = false;
                });
            });

            window.addEventListener('resize', function(){
                const newSlideHeight = slider.offsetHeight;
                sliderWrap.style.transform = 'translateY(calc(' + (-newSlideHeight * currentIndex) + 'px - 0.8px))';
            });
        },

        checkCurrentIndex(){
            if(slideContents[currentIndex].id === 'slider-last-clone'){
                sliderWrap.style.transition = 'none';
                currentIndex = slideContents.length - 2;
                this.showSlide();
            }
            if (slideContents[currentIndex].id === 'slider-first-clone'){
                sliderWrap.style.transition = 'none';
                currentIndex = slideContents.length - currentIndex;
                this.showSlide();
            }
        },

        autoSlideShow(){
            const _this = this;

            var autoShow = setInterval(function(){
                if (isAutoSlide){
                    _this.checkCurrentIndex();
                    currentIndex++;

                    currentDot = currentIndex - 1;
                    if (currentDot === slideContents.length - 2){
                        currentDot = 0;
                    }

                    sliderWrap.style.transition = 'transform 0.4s linear';
                    _this.showSlide();
                    _this.showSlideDot();
                }
                else{
                    clearInterval(autoShow);
                }
            }, 5000);
        },

        showSlide(){
            const slideHeight = slider.offsetHeight;
            let length = slideContents.length;
            const contentH2 = $$('.slider-content h2');
            const contentH6 = $$('.slider-content h6');
            const contentBtn = $$('.slider-content-btn');

            for (let i = 0; i < length; i++){
                // Xử lí slide content
                Object.assign(contentH2[i].style, {
                    transform: 'translateY(60px)',
                    opacity: '0',
                    transition: 'none'
                });

                Object.assign(contentH6[i].style, {
                    transform: 'translateX(60px)',
                    opacity: '0',
                    transition: 'none'
                });

                Object.assign(contentBtn[i].style, {
                    transform: 'translateX(-60px)',
                    opacity: '0',
                    transition: 'none'
                });
            }

            sliderWrap.style.transform = 'translateY(calc(' + (-slideHeight * currentIndex) + 'px - 0.8px))';
        },

        showSlideDot(){
            let length = slideDots.length;
    
            for (let i = 0; i < length; i++){
                // Xử lí nút chuyển slide
                Object.assign(slideDots[i].firstElementChild.style, {
                    transform: 'translateX(0)',
                    opacity: '1',
                    visibility: 'visible',
                });
                
                Object.assign(slideDots[i].lastElementChild.style, {
                    transform: 'translateX(-200%)',
                    opacity: '0',
                    visibility: 'hidden',
                });
            }

            // Xử lí nút chuyển slide
            Object.assign(slideDots[currentDot].firstElementChild.style, {
                transform: 'translateX(200%)',
                opacity: '0',
                visibility: 'hidden',
            });

            Object.assign(slideDots[currentDot].lastElementChild.style, {
                transform: 'translateX(0)',
                opacity: '1',
                visibility: 'visible',
            });
        },

        slideShowContent: function(){
            const contentH2 = $$('.slider-content h2');
            const contentH6 = $$('.slider-content h6');
            const contentBtn = $$('.slider-content-btn');

            // Xử lí slide content
            Object.assign(contentH2[currentIndex].style, {
                transform: 'translateY(0)',
                opacity: '1',
                transition: 'all 0.4s linear 0.4s'
            });

            Object.assign(contentH6[currentIndex].style, {
                transform: 'translateX(0)',
                opacity: '1',
                transition: 'all 0.4s linear 0.4s'
            });

            Object.assign(contentBtn[currentIndex].style, {
                transform: 'translateX(0)',
                opacity: '1',
                transition: 'all 0.4s linear 0.4s'
            });
        },

        init(){
            this.showSlide();
            
            this.slideShowContent();

            this.autoSlideShow();

            this.handleEvent();
        }
    };
})();

export default slider;