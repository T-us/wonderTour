'use strict';

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const gallery = (() => {
    const galleryContentWrap = $('.gallery__content-wrap');
    const galleryContent = $('.gallery__content');
    const galleryItemWrap = $$('.gallery__item-wrap');
    const galleryItem = $$('.gallery__item');
    const galleryPagination = $('.gallery__pagination');
    var dots = null;

    var currentIndex = 0;
    var currentDot = 0;

    return {
        render(){
            var html = '';
            for (let i = 0; i < galleryItem.length / 5; i++) {
                html += `<span class="gallery__pagination-bullet">
                            <span class="gallery__pagination-before"></span>
                            <span class="gallery__pagination-after"></span>
                        </span>`;
            }
            galleryPagination.innerHTML = html;

            dots = $$('.gallery__pagination-bullet');
        },

        handleEvent(){
            const _this = this;

            [...dots].forEach(function(item, index){
                var indexPlus = index + 1;
                var indexMinus = index - 1;
                
                item.addEventListener('click', function(){
                    currentDot = index;
                    currentIndex = index*5;

                    if (galleryItemWrap.length < indexPlus*5) {
                        currentIndex = indexMinus*5 + (indexPlus*5 - galleryItemWrap.length - 1);
                    }
                    galleryContent.style.transition = 'transform 0.3s ease';
                    _this.showGallery();
                    _this.showGalleryDot();
                });
            });
        },

        showGallery(){
            const galleryWidth = galleryItemWrap[0].offsetWidth;
            galleryContent.style.transform = 'translateX(' + (-galleryWidth * currentIndex) + 'px)';
        },

        showGalleryDot(){
            let length = dots.length;
    
            for (let i = 0; i < length; i++){
                // Xử lí nút chuyển slide
                Object.assign(dots[i].firstElementChild.style, {
                    transform: 'translateY(0)',
                    opacity: '1',
                    visibility: 'visible',
                });
                
                Object.assign(dots[i].lastElementChild.style, {
                    transform: 'translateY(-200%)',
                    opacity: '0',
                    visibility: 'hidden',
                });
            }

            // Xử lí nút chuyển slide
            Object.assign(dots[currentDot].firstElementChild.style, {
                transform: 'translateY(200%)',
                opacity: '0',
                visibility: 'hidden',
            });

            Object.assign(dots[currentDot].lastElementChild.style, {
                transform: 'translateY(0)',
                opacity: '1',
                visibility: 'visible',
            });
        },

        init(){
            this.render();

            this.handleEvent();
        }
    };
})();

export default gallery;