// var originUrl = location.href;
let originTitle = document.title;

document.addEventListener('DOMContentLoaded', function () {
    // window.onpopstate = function (event) {
    //     if (event.state) {
    //         const url = location.href;
    //         const trigger = document.querySelector('div[data-detail-url="' + url + '"]');
    //         const modal = document.querySelector('#preview-modal');
    //         const detailUrl = trigger.dataset.detailUrl;
    //         const detailTitle = trigger.dataset.detailTitle;
    //         document.title = detailTitle;
    //         const content = trigger.querySelector('.preview-content').innerHTML;
    //
    //         let modalContainer = modal.querySelector('.modal__container');
    //         modalContainer.scrollTop = 0;
    //         modalContainer.querySelector('#modal-content').innerHTML = content + '<br><a class="modal__btn" href="' + detailUrl + '">Read more</a>';
    //         modalContainer.querySelector('#modal-title').innerHTML = detailTitle;
    //         closeModal.classList.add('opening');
    //         closeModal.querySelector('a').href = '/goto/?url=' + trigger.dataset.detailOrigin;
    //         MicroModal.show('preview-modal');
    //     } else {
    //         MicroModal.close('preview-modal');
    //     }
    // };

    // document.querySelectorAll('[data-micromodal-trigger]').forEach(el => {
    //     el.addEventListener('click', function () {
    //         const detailUrl = el.dataset.detailUrl;
    //         const detailTitle = el.dataset.detailTitle;
    //         window.history.pushState({
    //             url: detailUrl,
    //             title: detailTitle
    //         }, detailTitle, detailUrl);
    //     });
    // });


    document.querySelectorAll('button[data-custom-close]').forEach(el => {
        el.addEventListener('click', function () {
            MicroModal.close(this.dataset.customClose);
            document.title = originTitle;
        });
        el.addEventListener('mouseover', function () {
            this.innerHTML = '&nbsp;Close';
        });
        el.addEventListener('mouseout', function () {
            this.innerHTML = '';
        });
    });
    const closeModal = document.getElementById('close-modal');
    MicroModal.init({
        disableFocus: true,
        onShow: (modal, _, event) => {
            let trigger = event.currentTarget;
            const detailUrl = trigger.dataset.detailUrl;
            const detailTitle = trigger.dataset.detailTitle;
            const detailDomain = trigger.dataset.detailDomain;
            const specialDomain = trigger.dataset.specialDomain;
            document.title = detailTitle;
            const content = trigger.querySelector('.preview-content').innerHTML;

            let modalContainer = modal.querySelector('.modal__container');
            modalContainer.scrollTop = 0;
            modalContainer.querySelector('#modal-title').innerHTML = detailTitle;
            modalContainer.dataset.forceCss = specialDomain ?? detailDomain;
            modalContainer.querySelector('#modal-content').innerHTML = content + (specialDomain ? '' : ('<br><a class="modal__btn" href="' + detailUrl + '">Read more</a>'));
            // closeModal.querySelector('#ori-link > b').innerHTML = `<img src="https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://${detailDomain}&size=16"> ${detailDomain}`;
            // closeModal.querySelector('a').href = '/goto/?url=' + trigger.dataset.detailOrigin;
            // closeModal.classList.add('opening');
            const lazyStart = performance.now();
            lazyLoadInstance.update();
            console.log(`Update lazyload in ${performance.now() - lazyStart} ms`);
            window.history.pushState({
                url: detailUrl,
                title: detailTitle
            }, detailTitle, detailUrl);
        },
        onClose: (modal, _, event) => {
            window.history.go(-1);
            document.title = originTitle;
            console.log(document.title)
            let modalContainer = modal.querySelector('.modal__container');
            modalContainer.querySelector('#modal-content').dataset.forceCss = '';
            modalContainer.querySelector('#modal-content').innerHTML = '';
            modalContainer.querySelector('#modal-title').innerHTML = '';
            // closeModal.classList.remove('opening');
            // closeModal.querySelector('a').href = '#';
        }
    });
});