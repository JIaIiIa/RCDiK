const menuBtn = document.querySelector('.burger__btn')
const menuOpen = document.querySelector('.header__bottom')
const stopScroll = document.querySelector('body')


menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('active')
    menuOpen.classList.toggle('active')
    stopScroll.classList.toggle('lock')
})



if (document.querySelector('.wrapper')) {

    gsap.registerPlugin(ScrollTrigger);

    gsap.utils.toArray('.preload',).forEach(preload => {
        gsap.from(preload, {
          y: 50,
          opacity: 0,
          ease: "power1.out",
          scrollTrigger: {
            trigger: preload,
            start: "top 90%",
            end: "top 30%",
            toggleActions: "play none none reverse",
            duration: 1,
            oncomplete: () => {
              ScrollTrigger.refresh();
            }
          }
        });
      });
}




let swiperHero = new Swiper('.hero__swiper', {
    slidesPerView: 1,
    spaceBetween: 20,
    speed: 1000,
    pagination: {
        el: '.swiper-pagination-bottom',
        clickable: true,
        type: 'fraction',
    },
    navigation: {
        nextEl: '.swiper-button__next',
        prevEl: '.swiper-button__prev',
    },
    simulateTouch: false,
    touchRatio: 0,
})

new Swiper('.hero__swiper', {
    slidesPerView: 1,
    spaceBetween: 20,
    speed: 1000,
    pagination: {
        el: '.swiper-pagination-top',
        clickable: true,
        type: 'fraction',
    },
    navigation: {
        nextEl: '.swiper-button__next',
        prevEl: '.swiper-button__prev',
    },
    simulateTouch: false,
    touchRatio: 0,
})


let swiperGallery = new Swiper('.gallery__items', {
    slidesPerView: 2.4,
    centeredSlides: true,
    spaceBetween: 38.6,
    initialSlide: 1,
    speed: 1000,
    slideActiveClass: 'swiper-slide-active',
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
        type: 'fraction',
    },
    navigation: {
        nextEl: '.swiper__next',
        prevEl: '.swiper__prev',
    },
})




const showBtns = document.querySelectorAll('.show-btn');

// Для каждого .show-btn устанавливаем обработчик
showBtns.forEach((btn) => {
    // Находим соседний блок .main-content относительно кнопки
    const mainContent = btn.previousElementSibling; // Блок .main-content перед кнопкой
    if (!mainContent || !mainContent.classList.contains('main-content')) {
        console.error('Main content not found');
        return; // Если контейнер не найден, выходим
    }

    console.log('Main content found:', mainContent);

    // Находим все элементы .main-item внутри этого контейнера
    const items = mainContent.querySelectorAll('.main-item');
    console.log('All items:', items);

    let itemsToShow = 3; // Количество элементов для показа за раз

    function updateItemsToShow() {
        if (window.innerWidth <= 768) {
            itemsToShow = 2;
        } else {
            itemsToShow = 3;
        }
    }

    // Функция для обновления отображения элементов
    function updateItemsDisplay() {
        // При загрузке страницы скрываем все элементы, кроме первых itemsToShow
        items.forEach((item, index) => {
            if (index < itemsToShow) {
                item.classList.remove('hidden'); // Показываем первые elementsToShow элементов
            } else {
                item.classList.add('hidden'); // Скрываем остальные
            }
        });
    }

    // Инициализация при загрузке страницы
    updateItemsToShow();
    updateItemsDisplay();

    // Если элементов 3 или меньше, скрываем кнопку
    if (items.length <= 3) {
        btn.style.display = 'none';
    }

    // Обработчик клика на кнопке
    btn.addEventListener('click', (event) => {
        event.preventDefault(); // Предотвращаем переход по ссылке

        let shownCount = 0;

        // Показываем следующие скрытые элементы (по 3 за раз)
        items.forEach((item) => {
            if (shownCount < itemsToShow && item.classList.contains('hidden')) {
                item.classList.remove('hidden'); // Показываем элемент
                shownCount++;
            }
        });

        // Если все элементы показаны, скрываем кнопку
        if (mainContent.querySelectorAll('.main-item.hidden').length === 0) {
            btn.style.display = 'none'; // Скрыть кнопку, когда больше нет скрытых элементов
        }
    });

    // Обработчик события resize
    window.addEventListener('resize', function() {
        updateItemsToShow();
        updateItemsDisplay(); // Обновляем отображение элементов при изменении размера окна
    });
});








const toggle = document.getElementById('languageToggle');
const dropdown = document.querySelector('.language-dropdown');
const languageLinks = dropdown.querySelectorAll('a');

// Переключение видимости выпадающего меню
toggle.addEventListener('click', (event) => {
    event.preventDefault(); // Предотвращаем переход по ссылке
    dropdown.classList.toggle('visible');
    dropdown.classList.toggle('hidden');
    toggle.classList.add('active');
});

// Выбор языка
languageLinks.forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        const selectedLanguage = link.getAttribute('data-lang');
        toggle.childNodes[0].textContent = selectedLanguage; // Меняем текст кнопки на выбранный язык
        dropdown.classList.add('hidden');
        dropdown.classList.remove('visible');
        toggle.classList.remove('active'); // Скрываем меню после выбора языка

        console.log(`Selected language: ${selectedLanguage}`); // Для тестов
        // Здесь можно добавить логику смены языка, например, смена контента страницы.
    });
});

// Закрытие выпадающего меню при клике вне его
document.addEventListener('click', (event) => {
    if (!dropdown.contains(event.target) && event.target !== toggle) {
        dropdown.classList.add('hidden');
        dropdown.classList.remove('visible');
        toggle.classList.remove('active');
    }
});

let startDatePicker;

if (document.querySelector('.main-filter')) {

    if (document.querySelector('.filtres-section')) {
        startDatePicker = flatpickr("#start-date", {
            locale: "ru", // Устанавливаем русский язык
            dateFormat: "d-m-Y", // Формат даты
            minDate: "today",
            theme: "airbnb", // Минимальная дата
            onChange: function (selectedDates, dateStr, instance) {
                // Меняем текст ссылки на выбранную дату
                document.getElementById("start-date").innerText = dateStr;
            }
        });
    }

    document.addEventListener('DOMContentLoaded', () => {
        // Для каждого блока фильтров
        const filterButtons = document.querySelectorAll('.filtres-main__btn'); // Все кнопки фильтров
        const filterDropdowns = document.querySelectorAll('.filtres-dropdown'); // Все выпадающие меню с фильтрами
        const refreshBtn = document.querySelector('.filtres-section__btn')

        // Переключение видимости фильтров для каждого блока
        filterButtons.forEach((btn, index) => {
            btn.addEventListener('click', (event) => {
                // Если кнопка имеет id "start-date", то пропускаем логику
                if (btn.id === 'start-date') {
                    event.preventDefault();
                    return; // Останавливаем выполнение функции для этой кнопки
                }

                event.preventDefault(); // Предотвращаем переход по ссылке

                // Переключаем видимость для соответствующего выпадающего меню
                filterDropdowns[index].classList.toggle('visible');
                filterDropdowns[index].classList.toggle('hidden');
            });
        });

        // Обработка выбора фильтра
        filterDropdowns.forEach((dropdown, index) => {
            const filterLinks = dropdown.querySelectorAll('a'); // Все ссылки внутри выпадающего меню

            filterLinks.forEach(link => {
                link.addEventListener('click', (event) => {
                    // Если родительская кнопка имеет id "start-date", то пропускаем логику
                    if (filterButtons[index].id === 'start-date') {
                        return; // Останавливаем выполнение функции для этой кнопки
                    }

                    event.preventDefault(); // Предотвращаем переход по ссылке
                    const selectedFilter = link.getAttribute('data-filter');
                    const button = filterButtons[index];

                    // Изменяем текст кнопки фильтра на выбранный фильтр
                    button.textContent = link.textContent;

                    // Скрываем выпадающее меню после выбора
                    dropdown.classList.add('hidden');
                    dropdown.classList.remove('visible');

                    console.log(`Выбран фильтр: ${selectedFilter}`); // Для теста
                    // Добавьте здесь вашу логику для применения фильтра
                });
            });
        });

        // Закрытие выпадающего меню при клике вне его
        document.addEventListener('click', (event) => {
            filterDropdowns.forEach((dropdown, index) => {
                if (!dropdown.contains(event.target) && event.target !== filterButtons[index]) {
                    dropdown.classList.add('hidden');
                    dropdown.classList.remove('visible');
                }
            });
        });

        if (document.querySelector('.filtres-section__btn')) {
            refreshBtn.addEventListener('click', (event) => {
                event.preventDefault(); // Предотвращаем возможное поведение кнопки
    
                // Сбрасываем текст всех кнопок фильтров
                filterButtons.forEach((btn) => {
                    const defaultFilter = btn.getAttribute('data-filter-default') || '#Все'; // Предполагаем, что значение по умолчанию "all"
                    btn.textContent = defaultFilter; // Устанавливаем текст кнопки на значение data-filter
                });
    
                // Скрываем все выпадающие меню
                filterDropdowns.forEach((dropdown) => {
                    dropdown.classList.add('hidden');
                    dropdown.classList.remove('visible');
                });
    
                startDatePicker.clear();
                document.getElementById("start-date").innerText = `#Все`;  // Обновляем текст кнопки
            });
        }

       
    });

}





document.addEventListener('DOMContentLoaded', () => {
    const searchIcon = document.getElementById('searchIcon'); // Иконка поиска
    const searchContainer = document.querySelector('.search-container');
    const searchInput = document.getElementById('searchInput'); // Поле ввода для поиска

    // Обработчик клика по иконке поиска
    searchIcon.addEventListener('click', (event) => {
        event.preventDefault(); // Предотвращаем переход по ссылке

        // Переключаем видимость строки поиска
        searchContainer.classList.toggle('visible');

        // Фокусируемся на поле ввода после его появления
        if (searchContainer.classList.contains('visible')) {
            searchInput.focus();
        }
    });

    // Закрытие строки поиска при клике вне её
    document.addEventListener('click', (event) => {
        if (!searchContainer.contains(event.target) && event.target !== searchIcon) {
            searchContainer.classList.remove('visible');
        }
    });
});

const questionItems = document.querySelectorAll('.path__questions-item');
const answerItems = document.querySelectorAll('.path__answers-item');

questionItems.forEach((question, index) => {
    question.addEventListener('click', (event) => {
        event.preventDefault();

        // Удаляем класс active у всех элементов
        questionItems.forEach(item => item.classList.remove('active'));
        answerItems.forEach(item => item.classList.remove('active'));

        // Добавляем класс active к текущим элементам
        question.classList.add('active');
        answerItems[index].classList.add('active');
    });
});


const links = document.querySelectorAll(".accordeon__links-link");
const wrappers = document.querySelectorAll(".accordeon__list-wrapper");

links.forEach((link, index) => {
    link.addEventListener("click", (event) => {
        event.preventDefault();


        links.forEach(l => l.classList.remove("active"));
        wrappers.forEach(w => w.classList.remove("active"));


        link.classList.add("active");
        wrappers[index].classList.add("active");
    });
});

if (document.querySelector('.accordeon')) {
    accordeonButtons = document.querySelectorAll('.accordeon__title-wrapper');
    const paddingBottom = 30;

    accordeonButtons.forEach(button => {
        button.addEventListener('click', function () {
            const partnerItem = button.closest('.accordeon__item');
            const partnerContent = partnerItem.querySelector('.accordeon__item-content');
            const isExpanded = partnerContent.classList.contains('active');

            // Закрываем все другие аккордеоны
            const allAccordeonContents = document.querySelectorAll('.accordeon__item-content');
            allAccordeonContents.forEach(content => {
                if (content !== partnerContent && content.classList.contains('active')) {
                    content.style.maxHeight = '0px';
                    content.classList.remove('active');
                    const buttonToClose = content.closest('.accordeon__item').querySelector('.accordeon__title-wrapper');
                    buttonToClose.classList.remove('active'); // Убираем класс "active" с кнопки другого аккордеона
                }
            });

            // Открытие/закрытие текущего аккордеона
            if (isExpanded) {
                partnerContent.style.maxHeight = '1px';
                partnerContent.classList.remove('active');
            } else {
                const totalHeight = partnerContent.scrollHeight + paddingBottom;
                partnerContent.style.maxHeight = totalHeight + 'px';
                partnerContent.classList.add('active');
            }

            // Добавляем или убираем класс "active" на текущей кнопке
            button.classList.toggle('active', !isExpanded);
        });
    });
}

















