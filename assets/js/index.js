document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".navigation-dropdown .navigation-link").forEach((el) => {
        el.addEventListener("click",function () {
            this.parentElement.classList.toggle("expanding");
        },false);
    });
});

window.addEventListener("load", function () {
    document.querySelector(".sidebar-toggler").addEventListener("click", function () {
        this.classList.toggle("opening");
        document.querySelector(".navigation-widget-left").classList.toggle("opening");
        document.body.classList.toggle("opening-sidebar");
    },false);

    document.querySelector(".sidebar-toggler-desktop").addEventListener("click", function () {
        document.querySelectorAll(".navigation-dropdown.expanding").forEach((el) => {
            el.classList.remove("expanding");
        });
        this.classList.toggle("opening");
        document.querySelector(".navigation-widget-left").classList.toggle("minifying");
        document.querySelector(".main-content").classList.toggle("minifying");   
        document.querySelector(".footer-style").classList.toggle("minifying");    
 
    },false);

    document.querySelectorAll(".btn-show-more").forEach((el) => {
        el.onclick = function () {
            this.previousElementSibling.style.maxHeight = this.previousElementSibling.scrollHeight + "px";
            this.style.display = "none";
        };
    });

    document.querySelectorAll(".accordion-header.js-accordion-header").forEach((el) => {
        el.addEventListener("click", function () {
            const that = this.nextElementSibling;
            console.log(that)
            this.classList.toggle("active");
            if (this.classList.contains("active")) {
                that.style.maxHeight = `${that.scrollHeight}px`;
            } else {
                that.style.maxHeight = 0;
            }
        });
    });
});