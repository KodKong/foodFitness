window.addEventListener('DOMContentLoaded', ()=> {

    const tabs = document.querySelectorAll('.tabheader__item'), 
            tabsContent = document.querySelectorAll('.tabcontent'), 
            tabsParent = document.querySelector('.tabheader__items'); 
    function hideTabContent () {
        tabsContent.forEach(item => {
            item.style.display = 'none'; 
        }); 
        
        tabs.forEach(tab => {
            tab.classList.remove('tabheader__item_active'); 
        });
    }

    function showTabContent (i = 0) {
        tabsContent[i].style.display = 'block'; 
        tabs[i].classList.add('tabheader__item_active'); 
    }

    hideTabContent(); 
    showTabContent(); 

    tabsParent.addEventListener('click', (event) => {
        const target = event.target; 

        if (target && target.classList.contains('tabheader__item'))
        {
            tabs.forEach((item, i) => {
                if(target == item) {
                    hideTabContent(); 
                    showTabContent(i);                  
                }
            });
        }
    });


    // timer
    const deadline = '2020-10-05';

    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor( (t/(1000*60*60*24)) ),
            seconds = Math.floor( (t/1000) % 60 ),
            minutes = Math.floor( (t/1000/60) % 60 ),
            hours = Math.floor( (t/(1000*60*60) % 24) );

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function getZero(num){
        if (num >= 0 && num < 10) { 
            return '0' + num;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {

        const timer = document.querySelector(selector),
            days = timer.querySelector("#days"),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock('.timer', deadline);

    // modal window
    const modalTrigger = document.querySelectorAll('[data-modal]'), 
          modal = document.querySelector('.modal'), 
          modalClose = document.querySelectorAll('[data-close]');  

          modalTrigger.forEach(item => {
            item.addEventListener('click', ()=> {
                openModal(); 
            });
        }); 

        function openModal(){
            modal.style.display = 'block'; 
            document.body.style.overflow = 'hidden';
            clearInterval(modalTimerId); 
        }

        function closeModal (){
            modal.style.display = 'none'; 
            document.body.style.overflow = '';
        }
        
        modalClose.forEach(item => {
            item.addEventListener('click', ()=> {
            closeModal(); 
            });
        }); 

        modal.addEventListener('click', (e) => {
            if(e.target === modal){
               closeModal(); 
            }
        });

        document.addEventListener('keydown', (e)=> {
            if(e.code === "Escape" && modal.style.display == 'block'){
                closeModal(); 
            }
        });

       // const modalTimerId = setTimeout(openModal, 5000); 

        function showModalByScroll () {
            if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight)
            {
                openModal(); 
                window.removeEventListener('scroll', showModalByScroll); 
            }
        }

        window.addEventListener('scroll', showModalByScroll);
        
        // Классы 
        class MenuCard {
            constructor(src, alt, title, descr, price, parentSelector, ...classes){
                this.src = src; 
                this.alt = alt; 
                this.title = title; 
                this.descr = descr; 
                this.price = price; 
                this.classes = classes; 
                this.transfer = 78;
                this.changeToRub(); 
                this.parent = document.querySelector(parentSelector);  
            }

            changeToRub() {
                this.price = this.price * this.transfer; 
            }

            render(){
                const element = document.createElement('div');
                if(this.classes.length === 0){
                    this.element = 'menu__item'; 
                    element.classList.add(this.element); 
                } else{
                    this.classes.forEach(className => {
                        element.classList.add(className); 
                    });
                }
                
                element.innerHTML= `
                
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">${this.price}</div>
                    <div class="menu__item-total"><span>229</span> руб/день</div>
                </div>
        
                `; 
                this.parent.append(element); 
            }
        }

        new MenuCard(
            "img/tabs/vegy.jpg",
            "vegy",
            'Меню "Фитнес"',
            'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
            9,
            ".menu .container"
        ).render();
    
        new MenuCard(
            "img/tabs/post.jpg",
            "post",
            'Меню "Постное"',
            'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
            14,
            ".menu .container"
        ).render();
    
        new MenuCard(
            "img/tabs/elite.jpg",
            "elite",
            'Меню “Премиум”',
            'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
            21,
            ".menu .container"
        ).render();

        // Forms 

        const forms = document.querySelectorAll('form'); 

        const message = {
            loading: 'Загрузка', 
            success: 'Спасибо, свяжемся',
            fail: 'Что-то пошла не так' 
        };

        forms.forEach(item => {
            postData(item); 
        });

        function  postData (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault(); 

                const statusMessage = document.createElement('div'); 
                statusMessage.classList.add('status'); 
                statusMessage.textContent = message.loading; 
                form.append(statusMessage); 

                const request = new XMLHttpRequest(); 
                request.open('POST', 'server.php'); 


               request.setRequestHeader('Content-type', 'application/json'); 
                const formData = new FormData(form);
                
                const object = {};
                formData.forEach((value, key)=>{
                    object[key] = value; 
                });

                const json = JSON.stringify(object);

                request.send(json); 

                request.addEventListener('load', ()=> {
                    if(request.status === 200){
                        console.log(request.response); 
                        statusMessage.textContent = message.success;
                        form.reset(); 
                        setTimeout(() => {
                            statusMessage.remove(); 
                        }, 2000);
                    }else{
                        statusMessage.textContent = message.fail;
                    }
                });
            });
        }
}); 