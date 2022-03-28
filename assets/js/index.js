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
            this.classList.toggle("active");
            if (this.classList.contains("active")) {
                that.style.maxHeight = `${that.scrollHeight}px`;
            } else {
                that.style.maxHeight = 0;
            }
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const organicContents = document.querySelectorAll(".organic-content");

    const lazyStart = performance.now();
    window.lazyLoadInstance = new LazyLoad({
        threshold: 20,
        callback_loaded: (ins) => {
            if (organicContents) {
                organicContents.forEach((el) => {
                    if (el.contains(ins) && el.classList.contains("expanding")) {
                        el.style.maxHeight = `${el.scrollHeight + ins.scrollHeight}px`;
                    } else if (el.contains(ins)) {
                        if (el.scrollHeight > 300 && el.nextElementSibling == null) {
                            el.insertAdjacentHTML("afterend", `
                                <button class="continue-read">Read more</button>
                            `);
                        }
                    }
                });
            }
        }
    });
    console.log(`Init lazyload in ${performance.now() - lazyStart} ms`);
})