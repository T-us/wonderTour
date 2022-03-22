'use strict';

import slide from "./slider.js";
import blogPost from "./blogPost.js";
import gallery from "./gallery.js";

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const app = (() => {
    const header = $('.header');
    const headerInfo = $('.header__info');
    const headerNavbar = $('.header__navbar');
    const navbarAppList = $('.header__navbar-app-list');
    const navbarAppItems = $$('.header__navbar-app-item');
    const locationItem = $$('.new-locations__choose-title');
    const locationItemActive = $('.new-locations__choose--active');
    const locationLine = $('.new-locations__choose-line');
    const locationContent = $$('.new-locations__pane');
    const discountForm = $('.discount__form');
    const discountFormControl = $('.discount__form-control');
    const discountFormMessage = $('.discount__form-message');
    const galleryWrap = $('.gallery__content-wrap');
    const galleryContent = $('.gallery__content');
    const galleryItemWrap = $$('.gallery__item-wrap');
    const galleryItem = $$('.gallery__item');
    const galleryPagination = $('.gallery__pagination');
    const galleryDots = $$('.gallery__pagination-bullet');
    const galleryPrev = $('.gallery__item-prev');
    const galleryNext = $('.gallery__item-next');

    var galleryIndex;

    return{
        render(){
        },

        handleEvent(){
            const _this = this;

            window.onresize = function(){
                if (window.innerWidth >= 1024){
                    header.style.height = `140px`;
                    headerInfo.style.height = `80px`;
                    headerInfo.style.opacity = '1';
                    headerInfo.style.visibility = 'visible';
                }
                else if (window.innerWidth >= 740){
                    header.style.height = `60px`;
                    headerInfo.style.height = `60px`;
                    headerInfo.style.opacity = '1';
                    headerInfo.style.visibility = 'visible';
                }
                else {
                    header.style.height = `54px`;
                    headerInfo.style.height = `54px`;
                    headerInfo.style.opacity = '1';
                    headerInfo.style.visibility = 'visible';
                }
            }

            // Xử lí phần header khi lăn chuột xuống
            const headerNavbarHeight = headerNavbar.offsetHeight;
            const headerHeight = header.offsetHeight;
            
            document.onscroll = function(){
                if (window.innerWidth >= 1024){
                    const scrollTop = window.scrollY || document.documentElement.scrollTop;
                    const newHeader = headerHeight - scrollTop;

                    if (newHeader < headerNavbarHeight){
                        header.style.height = '60px';
                        headerInfo.style.height = '0';
                        headerInfo.style.opacity = '0';
                        headerInfo.style.visibility = 'hidden';
                    }
                    else{
                        header.style.height = `${headerHeight}`;
                        headerInfo.style.height = `${headerHeight - headerNavbarHeight}px`;
                        headerInfo.style.opacity = '1';
                        headerInfo.style.visibility = 'visible';
                    }
                }
                else if (window.innerWidth >= 740){
                    header.style.height = `60px`;
                    headerInfo.style.height = `60px`;
                    headerInfo.style.opacity = '1';
                    headerInfo.style.visibility = 'visible';
                }
                else {
                    header.style.height = `54px`;
                    headerInfo.style.height = `54px`;
                    headerInfo.style.opacity = '1';
                    headerInfo.style.visibility = 'visible';
                }
            }
            
            // Xử lí khi click vào navbar item
            navbarAppList.onclick = function(e){
                let length = navbarAppItems.length;
                const currentItem = e.target.closest('.header__navbar-app-item');

                if (currentItem){
                    for(let i = 0; i < length; i++){
                        navbarAppItems[i].classList.remove('header__navbar--active');
                    }
                    currentItem.classList.add('header__navbar--active');
                }
            }

            discountForm.onsubmit = function(e){
                e.preventDefault();

                const messageError = _this.checkEmailInput(discountFormControl.value);
                if (messageError){
                    discountFormMessage.innerText = messageError;
                    discountFormControl.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
                }
            }

            discountFormControl.onblur = function(){
                const messageError = _this.checkEmailInput(discountFormControl.value);
                if (messageError){
                    discountFormMessage.innerText = messageError;
                    discountFormControl.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
                }
            }

            discountFormControl.oninput = function(){
                discountFormMessage.innerText = '';
                discountFormControl.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
                const messageError = _this.checkEmailInput(discountFormControl.value);
                if (!messageError){
                    discountFormControl.style.backgroundColor = 'var(--primary-color)';
                }
            }

            // Xử lí gallery
            // galleryNext.onclick = function(){
            //     const length = galleryItemWrap.length;
            //     const itemWidth = galleryItemWrap[0].offsetWidth;

            //     galleryIndex++;
            //     if (galleryIndex == length) {
            //         galleryNext.classList.remove('gallery__item-active');
            //     }
            //     if (galleryIndex <= length) {
            //         let pos = (galleryIndex - galleryMax) * itemWidth;
            //         galleryContent.style.transform = `translateX(-${pos}px)`;

            //         galleryPrev.classList.add('gallery__item-active');
            //     }
            //     else{
            //         galleryIndex = length;
            //         return;
            //     }
            // }

            // galleryPrev.onclick = function(){
            //     const length = galleryItemWrap.length;
            //     const itemWidth = galleryItemWrap[0].offsetWidth;

            //     galleryIndex--;
            //     if (galleryIndex == galleryMax) {
            //         galleryPrev.classList.remove('gallery__item-active');
            //     }
            //     if (galleryIndex >= galleryMax) {
            //         let pos = (galleryIndex - galleryMax) * itemWidth;
            //         galleryContent.style.transform = `translateX(-${pos}px)`;
            //         galleryNext.classList.add('gallery__item-active');
            //     }
            //     else{
            //         galleryIndex = galleryMax;
            //         return;
            //     }
            // }
        },

        // Xử lí phần new location
        handleLocationChoose: function (){
            locationLine.style.left = locationItemActive.offsetLeft + 'px';
            locationLine.style.width = locationItemActive.offsetWidth + 'px';

            locationItem.forEach(function (item, index) {
                item.onclick = function (){
                    $('.new-locations__choose--active').classList.remove('new-locations__choose--active');
                    $('.new-locations__content--active').classList.remove('new-locations__content--active');

                    locationItem[index].classList.add('new-locations__choose--active');
                    locationContent[index].classList.add('new-locations__content--active');

                    locationLine.style.left = locationItem[index].offsetLeft + 'px';
                    locationLine.style.width = locationItem[index].offsetWidth + 'px';
                }
            });
        },

        checkEmailInput(value){
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined : 'The text field is required.';
        },

        init(){
            // Xử lí sự kiện người dùng
            this.handleEvent();

            // Xử lí slide
            slide.init();

            // Xử lí new location
            this.handleLocationChoose();

            // Xử lí blog post
            blogPost.init();

            // Xử lí gallery
            gallery.init();

            // Render ra giao diện
            this.render();
        }
    };
})();

app.init();