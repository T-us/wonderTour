'use strict';

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const blogPost = (() => {
    const blogContent = $('.blog-posts__content');
    const blogContentWrap = $('.blog-posts__content-box');
    const blogPostItem = $$('.blog-posts__item-wrap');
    const dots = $$('.blog-posts__pagination-bullet');

    var currentDot = 0;
    var currentBlogPost = 1;

    return{
        handleEvent(){
            const _this = this;

            [...dots].forEach(function(item, index){
                item.addEventListener('click', function(){
                    currentDot = index;
                    currentBlogPost = index*2 + 1;
                    blogContentWrap.style.transition = 'transform 0.3s ease';
                    _this.showBlogPost();
                    _this.showBlogPostDot();
                });
            });

            blogContentWrap.addEventListener('transitionend', function(){
                console.log(currentBlogPost)
            });

            window.addEventListener('resize', function(){
                const blogPostWidth = blogPostItem[0].offsetWidth;
                blogContentWrap.style.transition = 'none';
                blogContentWrap.style.transform = 'translateX(' + (-blogPostWidth * currentBlogPost) + 'px)';
            });
        },

        showBlogPost(){
            const blogPostWidth = blogPostItem[0].offsetWidth;
            blogContentWrap.style.transform = 'translateX(' + (-blogPostWidth * currentBlogPost) + 'px)';
        },

        showBlogPostDot(){
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
            this.showBlogPost();

            this.handleEvent();
        }
    }
})();

export default blogPost;