window.addEventListener('DOMContentLoaded', () => {

    // 4 Tabs

    const tabs = document.querySelectorAll('.tabheader__item'),
          tabsContent = document.querySelectorAll('.tabcontent'),
          tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });                                                  
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active'); 
    }
    
    hideTabContent();
    showTabContent();
                                    
    tabsParent.addEventListener('click', (event) => { 
        const target = event.target;

        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

    // Timer

    const deadline = '2022-07-05T23:59:59';

    function setZero(num) {
        if (num < 0) {
            num = 0;
        }
        return num;
    }

    function getTimeRemaining(endtime) {
        let t = setZero(Date.parse(endtime) - Date.parse(new Date())),
            days = Math.floor(t / (1000 * 60 * 60 * 24) ),
            hours = Math.floor( (t / (1000 * 60 * 60) % 24) ),
            minutes = Math.floor( (t / 1000 / 60 % 60) ), 
            seconds = Math.floor( (t / 1000 % 60) );

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        }
    };

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            let t = getTimeRemaining(endtime);

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
    

    // Modal

    const modalTrigger = document.querySelectorAll('[data-modal]'),
          modal = document.querySelector('.modal');

    modalTrigger.forEach(btn => {
        btn.addEventListener('click', openModal);
    });

    function openModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        clearInterval(modalTimerID);
    }

    const modalTimerID = setTimeout(openModal, 50000);

    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');
    };

    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal();
        }
    });

    class MenuCard {
        constructor(src, alt, title, descr, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
        }

        render() {

            const element = document.createElement('div');
            
            if (this.classes.length === 0) {
                this.element = 'menu__item';
                element.classList.add(this.element);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }

            element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
            `;
            this.parent.append(element);
        }
    }

    new MenuCard(
        'img/tabs/1card.jpg',
        '1card',
        'Сніданок',
        'Яйце куряче - 2 штуки, молоко 1,5% - 20 мл, бородинський хліб - 30 грамів, слабосолона форель - 30 г, сир мякий - 10 г. Зробити омлет із яєць з молоком. Приготувати бутерброд із рибою та сиром',
        '.menu .container',
        'menu__item',
        );

    new MenuCard(
        'img/tabs/2card.jpg', 
        '2card', 
        'Обід',
        'Цільнозернові макарони – 50 г, куряче філе – 90 г, спеції, масло – 3 г та вершки 10% – 35 мл. Відварити макарони, філе нарізати, обсмажити на маслі, залити вершками зі спеціями, протушкувати 3хв.',
        '.menu .container',
        'menu__item'
    );

    new MenuCard(
        'img/tabs/3card.jpg', 
        '3card', 
        'Вечеря',
        'Філе пангасіуса - 120 г, овочева суміш заморожена або свіжа - 150 грамів, гарбузове насіння - 10 г. Рибу з гарніром приготувати на пару, щоб зберегти більше користі. Посипати до подачі насінням.',
        '.menu .container',
        'menu__item'
    );


    // Forms

    const forms = document.querySelectorAll('form');
    //const input = document.querySelector('[name="name"]');

    const message = {
        message: "Дякуємо! Скоро ми з вами зв'яжемося"
    };

    forms.forEach(item => {
        postData(item);
    });



    //let inputName = document.querySelector('.value');
    //let inputNumber = document.querySelector('.input-number');
    // forms.onsubmit = function() {
        
    //     if(!validateName(input.value)) {
    //         console.log(input.value);
    //     }
    // }
    


    // let input = document.querySelector('input[name="name"]');
    // let span = document.querySelector('.span');
    // let regex = /[a-zA-Zа-яА-ЯЁё]/;
    // document.querySelector('.btn').onclick = function(e) {
    //     if (validate(regex, input.value) === false) {
    //         console.log('NO');
    //     } else {
    //         console.log('YES');
    //     }
    // };
    // function validate (regex, input) {
    //     return regex.test(input.value);
    // }
    
    // function validateName() {
    //     let regex = /[a-zA-Zа-яА-ЯЁё]/;
    //     return regex.test(input.value)
    // }
        
    function postData(form) { 
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            //validateName(input.value);

            
            const statusMessage = document.createElement('div');
            form.append(statusMessage);
            showThanksModal(message.message);
            form.reset();
        });
    }

    //оповіщення користувача

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        openModal();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');

        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class"modal__title">${message}</div>
            </div>
        `;

        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal();
        }, 4000);
    }

    //calculator

    const result = document.querySelector('.calculating__result span');

    let sex, height, weight, age, ratio;

    if (localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex');
    } else {
        sex = 'female';
        localStorage.setItem('sex', 'female');
    }

    if (localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio');
    } else {
        ratio = '1.375';
        localStorage.setItem('ratio', '1.375');
    }

    function initLocalSettings(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.classList.remove(activeClass);
            if (elem.getAttribute('id') === localStorage.getItem('sex')) {
                elem.classList.add(activeClass);
            }

            if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                elem.classList.add(activeClass);
            }
        });
    }

    initLocalSettings('#gender div', 'calculating__choose-item_active');
    initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');

    function calcTotal() {

        if (!sex || !height || !weight || !age || !ratio) {
            result.textContent = '____';
            return;
        }

        if (sex === 'female') {
            result.textContent = Math.round( (447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age) ) * ratio );
        } else {
            result.textContent = Math.round( (88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age) ) * ratio );
        }
    }
    calcTotal();


    function getStaticInformation(selector, activeClass) {

        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.addEventListener('click', (e) => {
                
                if (e.target.getAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
                } else {
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex', e.target.getAttribute('id'));
                }

                elements.forEach(elem => {
                    elem.classList.remove(activeClass);
                });

                e.target.classList.add(activeClass);
    
                calcTotal();
            })
        })
    }

    
    getStaticInformation('#gender div', 'calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');

    function getDynamicInformation(selector) {
        const input = document.querySelector(selector);

        input.addEventListener('input', () => {

            switch(input.getAttribute('id')) {
                case 'height':
                    height = +input.value;
                    break;
                case 'weight':
                    weight = +input.value;
                    break;
                case 'age':
                    age = +input.value;
                    break;
            }
            calcTotal();
        });
    }

    getDynamicInformation('#height');
    getDynamicInformation('#weight');
    getDynamicInformation('#age');

});