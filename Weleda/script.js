  /**
   * Используем пространство имен hpmd.data для организации данных баннера.
   * Переменная hpmd гарантированно объявлена к моменту запуска баннера.
   */
  hpmd.data = {

    /**
     * ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ
     */

    /**
     * Определяет, является ли текущее устройство планшетом (не смартфоном)
     *
     * @return bool
     */
    detect: new MobileDetect(window.navigator.userAgent),
    isTablet: function () {
      return hpmd.data.detect.tablet() !== null;
    },

    /**
     * Определяет, находится ли устройство в портретной ориентации
     *
     * В качестве аргумента dimensions можно передать объект с ключами
     * width и height, описывающих ширину и высоту viewport.
     *
     * @return bool
     */
    isPortrait: function (dimensions) {
      if (!dimensions) {
        // если измерения не переданы,
        // используем текущие размеры окна
        dimensions = {
          width: window.innerWidth,
          height: window.innerHeight,
        };
      }

      // проверяем ориентацию
      return dimensions.width < dimensions.height;
    },

    /**
     * Управляется ли устройство iOS
     *
     * @return bool
     */
    isIOs: function () {
      return hpmd.data.detect.os() == "iOS";
    },

    /**
     * Управляется ли устройство Android
     *
     * @return bool
     */
    isAndroid: function () {
      return hpmd.data.detect.os() === "Android";
    },

    /**
     * Управляется ли устройство Windows Phone
     *
     * @return bool
     */
    isWP: function () {
      return hpmd.data.detect.os() == "Windows";
    },

    /**
     * Загружает список изображений в кэш браузера
     * и вызывает callback, когда загрузка завершена
     *
     * @param string[] images Список URL загружаемых картинок
     * @param Function callback Функция обратного вызова по завершении загрузки
     */
    preloadImages: function (images, callback) {
      var loaded = 0, imageObjects = [];
      var handler = function () {
        loaded++;
        if (loaded == images.length && !!callback) {
          callback();
        }
      };
      for (var i = 0; i < images.length; i++) {
        imageObjects[i] = new Image();
        imageObjects[i].onload = handler;
        imageObjects[i].onerror = handler;
        imageObjects[i].src = images[i];
      }
    },

    /**
     * Регистрирует обработчик события
     *
     * @param DOMElement element DOM-элемент
     * @param string event Название события (напр., "touchstart"))
     * @param Function handler Обработчик события
     */
    attachHandler: function (element, event, handler) {
      if (hpmd.data.isWP()) {
        switch (event) {
          case "touchstart":
            hpmd.data.attachHandler(element, 'MSPointerDown', handler);
            hpmd.data.attachHandler(element, 'pointerdown', handler);
            break;
          case "touchmove":
            hpmd.data.attachHandler(element, 'MSPointerMove', handler);
            hpmd.data.attachHandler(element, 'pointermove', handler);
            break;
          case "touchend":
            hpmd.data.attachHandler(element, 'MSPointerUp', handler);
            hpmd.data.attachHandler(element, 'pointerup', handler);
            break;
          case "touchcancel":
            hpmd.data.attachHandler(element, 'MSPointerCancel', handler);
            hpmd.data.attachHandler(element, 'pointercancel', handler);
            break;
        }
      }

      element.addEventListener(event, handler, false);
    },

    /**
     * Удаляет обработчик события
     *
     * @param DOMElement element DOM-элемент
     * @param string event Название события (напр., "touchstart"))
     * @param Function handler Обработчик события
     */
    detachHandler: function (element, event, handler) {
      if (hpmd.data.isWP()) {
        switch (event) {
          case "touchstart":
            hpmd.data.detachHandler(element, 'MSPointerDown', handler);
            hpmd.data.detachHandler(element, 'pointerdown', handler);
            break;
          case "touchmove":
            hpmd.data.detachHandler(element, 'MSPointerMove', handler);
            hpmd.data.detachHandler(element, 'pointermove', handler);
            break;
          case "touchend":
            hpmd.data.detachHandler(element, 'MSPointerUp', handler);
            hpmd.data.detachHandler(element, 'pointerup', handler);
            break;
          case "touchcancel":
            hpmd.data.detachHandler(element, 'MSPointerCancel', handler);
            hpmd.data.detachHandler(element, 'pointercancel', handler);
            break;
        }
      }

      element.removeEventListener(event, handler, false);
    },

    /**
     * Обрабатывает жесты пользователя
     *
     * Эта функция служит для обработки свайпов в четырех направлениях
     * (влево, вправо, вверх, вниз) и «тапа» по любому элементу.
     *
     * В качестве первого аргумента передается DOM-элемент;
     * в качестве второго аргумента передается объект, содержащий
     * некоторые (или все) из следующих ключей:
     * - left
     * - right
     * - down
     * - up
     * - tap
     *
     * Значения ключей должны быть функциями.
     *
     * При обнаружении свайпа в определенном направлении вызывается
     * соответствующая функция; в качестве аргументов ей передается
     * экземпляр события touchend и ссылка на исходный DOM-элемент.
     *
     * Например:
     * hpmd.data.handleSwipe(document.getElementById('hpmdf-my-node'), {
     *    up: function () {
     *       alert("Swipe up!");
     *    },
     *    down: function () {
     *       alert("Swipe down!");
     *    },
     *    tap: function (event, element) {
     *       alert("Tapped on " + element + "!");
     *    },
     * });
     *
     * @param DOMElement element
     * @param object handlers
     */
    handleSwipe: function(element, handlers) {
      var x, y;

      hpmd.data.attachHandler(element, 'touchstart', function (event) {
        var touch = !!event.changedTouches ? event.changedTouches[0] : event;

        x = touch.pageX;
        y = touch.pageY;
        event.preventDefault();

        if (!!event.stopPropagation) {
          event.stopPropagation();
          event.cancelBubble = true;
        }
      });
      hpmd.data.attachHandler(element, 'touchend', function (event) {
        var touch = !!event.changedTouches ? event.changedTouches[0] : event;
        var direction = hpmd.data.calcSwipeDirection(touch.pageX - x, touch.pageY - y);
        if (!!handlers[direction]) {
          handlers[direction](event, element);
        }

        if (!!event.stopPropagation) {
          event.stopPropagation();
          event.cancelBubble = true;
        }
      });
    },

    /**
     * Отключает скролл на странице.
     */
    disableScroll: function () {
      // Чтобы отключить скролл, «давим» все события touchmove и touchend.
      hpmd.data.attachHandler(document, 'touchmove', hpmd.data.cancelEvent);
      hpmd.data.attachHandler(document, 'touchend', hpmd.data.cancelEvent);
    },

    /**
     * Восстанавливает скролл на странице.
     */
    enableScroll: function () {
      // Удаляем обработчик событий touchmove и touchend, подавляющий их.
      hpmd.data.detachHandler(document, 'touchmove', hpmd.data.cancelEvent);
      hpmd.data.detachHandler(document, 'touchend', hpmd.data.cancelEvent);
    },

    /**
     * «Отменяет» событие.
     *
     * Используется в качестве обработчика события,
     * обработки которого нужно избежать (например,
     * запрет скролла)..)
     */
    cancelEvent: function (event) {
      event.preventDefault();
    },


    // ///////////////////////////////////////////////

    /**
     * ВНУТРЕННИЕ ФУНКЦИИ
     */

    /**
     * Список DOM-элементов, принадлежащих баннеру
     *
     * @var object of DOMElement
     */
    nodes: {},

    /**
     * Определяет направление свайпа по смещению
     * точки прикосновения
     *
     * Смещение вправо и вниз ― положительное,
     * влево и вверх ― отрицательное.
     *
     * @param number deltax Смещение в пикселях по горизонтали вправо
     * @param number deltay Смещение в пикселях по вертикали вниз
     *
     * @return string "tap", "left", "right", "up", "down"
     */
    calcSwipeDirection: function (deltax, deltay) {
      if (deltax == 0) {
        if (deltay == 0) {
          // смещения нет, произошел тап
          return "tap";
        } else {
          // смещение есть, зададим deltay равным единице,
          // чтобы избежать деления на ноль
          deltay = 1;
        }
      }
      if (Math.abs(deltax) < 10 && Math.abs(deltay) < 10) {
        // смещение меньше 10 пикселей, произошел тап
        return "tap";
      }
      if (Math.abs(deltay / deltax) > .5) {
        // наклон кривой к горизонтали больше 45°,
        // это вертикальный свайп,
        if (deltay < 0) {
          // смещение вверх
          return "up";
        } else {
          // смещение вниз
          return "down";
        }
      } else {
        // наклон кривой к горизонтали меньше 45°,
        // это горизонтальный свайп,
        if (deltax < 0) {
          // смещение влево
          return "left";
        } else {
          // смещение вправо
          return "right";
        }
      }
    },

    /**
     * Обрабатывает DOM-элементы, принадлежащий баннеру.
     *
     * Если ID имеет префикс "hpmdf-", сохраняет ссылку на элемент в объекте
     * hpmd.data.nodes для быстрого доступа; ключом является ID элемента без префикса.
     *
     * После завершения функция рекурсивно обрабатывает все дочерние элементы.
     *
     * @param DOMElement node
     */
    processNode: function (node) {
      // Проверяем ID.
      var attribute;
      if (!!node.getAttribute && !!(attribute = node.getAttribute('id')) && attribute.indexOf('hpmdf-') === 0) {
        // Нашли префикс "hpmdf-", сохраняем на будущее.
        hpmd.data.nodes[attribute.substring(6, 1000)] = node;
      }

      // Обрабатываем дочерние элементы.
      for (var i = 0; i < node.children.length; i++) {
        hpmd.data.processNode(node.children[i]);
      }
    },
    bannerIsOpened: false,
    /**
     * Выводит баннер на экран
     */
    idInterval: 0,
    direction: -1,
    idTimeout: 0,
    currentSlide: 1,
    
    trackShows: function(currentSlide) {
      if (hpmd.data.slidesForView.length !== 0) {
        var index = hpmd.data.slidesForView.indexOf(currentSlide);
        if (index !== -1) {
          hpmd.data.trackEvent('show-slide-number' + currentSlide);
          hpmd.data.slidesForView.splice(index, 1);
        }
      }
    },
    showNextSlide: function() {
      hpmd.data.action = 'next';
      if(hpmd.data.nodes.carousel.classList.contains("hpmdf-end")){
        hpmd.data.nodes.carousel.classList.remove("hpmdf-end");
      }
      if(hpmd.data.direction != -1){
        hpmd.data.nodes.slider.insertAdjacentElement('afterbegin',hpmd.data.nodes.slider.lastElementChild);
      }
      hpmd.data.direction = -1;
      hpmd.data.nodes.slider.style.transition = 'all 0.5s';
      hpmd.data.nodes.slider.style.transform = 'translate(-' + hpmd.data.offset + '%)';

      if (hpmd.data.currentSlide < hpmd.data.quantitySlides) {
        hpmd.data.currentSlide++;
      } else if (hpmd.data.currentSlide === hpmd.data.quantitySlides) {
        hpmd.data.currentSlide = 1;
      }
      hpmd.data.trackShows(hpmd.data.currentSlide);
    },
    showPrevSlide: function() {
      hpmd.data.action = 'prev';
      if(!hpmd.data.nodes.carousel.classList.contains("hpmdf-end")){
        hpmd.data.nodes.carousel.classList.add("hpmdf-end");
      }
      if(hpmd.data.direction != 1){
        hpmd.data.nodes.slider.appendChild(hpmd.data.nodes.slider.firstElementChild);
      }
      hpmd.data.direction = 1;
      hpmd.data.nodes.slider.style.transition = 'all 0.5s';
      hpmd.data.nodes.slider.style.transform = 'translate(' + hpmd.data.offset + '%)';

      if (hpmd.data.currentSlide > 1 && hpmd.data.currentSlide <= hpmd.data.quantitySlides) {
        hpmd.data.currentSlide--;
      } else if (hpmd.data.currentSlide === 1) {
        hpmd.data.currentSlide = 4;
      }

      hpmd.data.trackShows(hpmd.data.currentSlide);
    },
    openBanner: function () {
      /* TODO: добавьте сюда все, что должно быть сделано   
       * при выводе фуллскрина и может быть сделано, пока он
       * все еще находится в display: none.                 
       * 
       * Если HTML-код фуллскрина создается динамически, это
       * следует делать здесь.
       */

      // Скролл на ноль пикселей скрывает смарт-баннер на iOS.
      window.scrollBy(0, 0);

      // Сохраняем время раскрытия (для дальнейшего вызова hpmd.time-expanded).
      hpmd.data.openedAt = new Date();

      // Выводим фуллскрин на экран (на этом этапе он полностью прозрачен).)
      hpmd.data.nodes.popup.className = 'hpmdf-popup-steady';




      // Теперь, когда подготовительая работа проведена, нужно        
      // дать возможность браузеру отреагировать на window.scrollBy.  
      // Для этого устанавливаем нулевой таумаут и выходим из функции.
      // 
      // Браузеру Google Chrome на Android требуется дополнительное  
      // время на загрузку картинок из кэша, поэтому для этой системы
      // вместо нулевого таймаута используем задержку в 100 мс.      
      setTimeout(function () {
        // Пересчитываем размеры элементов баннера перед его показом.
        hpmd.data.forceCheckLayout();

        /* TODO: если из-за того, что элемент был в состоянии display: none,     
         * не удалось выполнить какие-либо действия над ним (например, определить
         * истинные размеры элемента), добавьте необходимые действия сюда.
         */

        // Полностью отключаем скролл на странице.
        hpmd.data.disableScroll();

        // Проявляем фуллскрин на экране.
        hpmd.data.nodes.popup.className = 'hpmdf-popup-steady hpmdf-popup-ready';
        hpmd.data.idInterval = setInterval(hpmd.data.showNextSlide, 2000);
        hpmd.data.trackEvent('show-slide-number1');
        // Ждем завершения анимации.
        setTimeout(function () {
          
          /* TODO: добавьте сюда все, что должно быть сделано
           * после полного появления фуллскрина на экране.   
           * 
           * Например, на этом этапе могут быть запущены программные
           * анимации или ресурсоемкие процедуры.
           */
        }, 600);
      }, hpmd.data.isIOs() || hpmd.data.isWP() ? 0 : 100);
    },


    /**
     * Закрывает баннер
     */
    closeBanner: function () {
      clearInterval(hpmd.data.idInterval);
      clearInterval(hpmd.data.idTimeout);
      // Регистрируем время просмотра баннера.
      if (!!hpmd.data.openedAt) {
        hpmd.data.trackEvent("close");
      }

      // Восстанавливаем скролл на странице.
      hpmd.data.enableScroll();

      // Скрываем фуллскрин...
      hpmd.data.nodes.popup.className = 'hpmdf-popup-steady';
      setTimeout(hpmd.data.destroy, 500)
    },

    /**
     * Полностью убирает все элементы баннера со страницы.
     */
    destroy: function () {
      /* Отключите здесь любые обработчики событий,      
       * которые были включены при запуске или в процессе
       * работы баннера.                                 
       */

      // На случай, если скролл в данный момент отключен,
      // пробуем включить его.                           
      hpmd.data.enableScroll();

      // Отключаем слежение за размерами экрана и ориентацией
      if (!!hpmd.data.watchLayoutInterval) {
        clearInterval(hpmd.data.watchLayoutInterval);
      }

      // Удаляем все HTML-элементы баннера.
      for (var k in hpmd.data.nodes) {
        if (hpmd.data.nodes.hasOwnProperty(k)) {
          try {
            hpmd.data.nodes[k].parentNode.removeChild(hpmd.data.nodes[k]);
          } catch (e) {}
        }
      }
    },

    watchLayoutInterval: null,

    /**
     * Запускает слежение за размерами «окна» браузера
     *
     * Результатом выполнения этой функции будет отслеживание
     * изменений в размерах окна браузера и вызов hpmd.data.onViewportUpdate
     * при обнаружении изменений.
     */
    watchLayout: function () {
      // Проверяем размер окна по событию scroll (при скролле может быть показана
      // или скрыта панель навигации браузера).
      hpmd.data.attachHandler(window, 'scroll', hpmd.data.checkLayout);
      // Проверяем размер окна, если браузер был так добр, что сообщил нам об изменениях.
      hpmd.data.attachHandler(window, 'resize', hpmd.data.checkLayout);
      // Проверяем размер окна при смене ориентации.
      hpmd.data.attachHandler(window, 'orientationchange', function () {
        // iOS сначала меняет ориентацию, а затем обновляет размеры 
        // панели навигации, поэтому первое вычисление даст неверные
        // результаты. Проверяем еще раз через 150 мс, когда все    
        // утрясется.
        var updated = false;
        if (!hpmd.data.checkOrientation()) {
          updated = hpmd.data.checkLayout();
        } else {
          updated = true;
        }
        if (updated && hpmd.data.isIOs() && !hpmd.data.bannerOpened) {
          hpmd.data.nodes.wrapper.style.visibility = 'hidden';
          setTimeout(function() {
            hpmd.data.nodes.wrapper.style.visibility = '';

            // window.innerWidth и window.innerHeight остаются старыми в iOS,    
            // даже если фактически размеры изменились; обновляются они только   
            // после скролла. Для получения актуальных значений имитируем скролл.
            // (Это действие сгенерирует событие scroll, в котором пойдет
            // дальнейшая обработка ситуации.)
            window.scrollBy(0, 0);
          }, 150);
        }
      });
      // Проверяем размер окна при завершении прикосновения. Жест зума может
      // изменять размер окна, не генерируя событий resize и scroll.        
      hpmd.data.attachHandler(document, 'touchend', hpmd.data.checkLayoutEnd);
      hpmd.data.attachHandler(document, 'touchcancel', hpmd.data.checkLayoutEnd);
      // Перепроверяем размер окна по факту загрузки страницы.
      hpmd.data.attachHandler(window, 'load', hpmd.data.checkLayout);
      // Перепроверяем размер окна по факту загрузки DOM; в этот момент браузер
      // уже должен определиться с текущим масштабом страницы.
      hpmd.data.attachHandler(document, 'DOMContentLoaded', hpmd.data.checkLayout);

      // В некоторых случаях - например, при «тапе» на панели навигации браузера -   
      // нам не везет, и никаких событий не вызывается. Проверяем три раза в секунду,
      // не изменился ли размер окна.                                                .)
      hpmd.data.watchLayoutInterval = setInterval(hpmd.data.checkLayout, 330);

      // 500 мс, как правило, достаточно для обработки таблицы стилей площадки
      // и определения масштаба страницы, так что по истечении этого времени  
      // попробуем еще раз проверить размер окна.                             
      setTimeout(hpmd.data.forceCheckLayout, 500);
    },

    /**
     * Проверяет размеры окна браузера при завершении или отмене касания
     */
    checkLayoutEnd: function (event) {
      // Делаем проверку, только если все касания завершены;    
      // в противном случае жест еще не закончен.               
      // Проверка `!event.touches` для событий на Windows Phone.
      if (!event.touches || event.touches.length <= 0) {
        setTimeout(function() {
          hpmd.data.forceCheckLayout();
        }, 0);
      }
    },

    /**
     * Последние зарегистрированные параметры окна браузера
     */
    lastLayout: {
      width: null,
      height: null,
      orientation: null,
    },
    userPlayLeft: false,
    userPlayRight: false,
    //пользователь нажал на стрелку "вправо"
    checkUserPlayNext: function() {
      if (!hpmd.data.userPlayRight) {
        hpmd.data.trackEvent('arrow_right')
        hpmd.data.userPlayRight = true;
      }
    },
    //пользователь нажал на стрелку "влево"
    checkUserPlayPrev: function() {
      if (!hpmd.data.userPlayLeft) {
        hpmd.data.trackEvent('arrow_left')
        hpmd.data.userPlayLeft = true;
      }
    },
    /**
     * Проверяет, не изменилась ли ориентация; если изменилась,
     * обновляет верстку в соответствии с новыми размерами.
     *
     * @return bool True в случае наличия изменений.
     */
    checkOrientation: function () {
      if (hpmd.data.lastLayout.orientation != window.orientation) {
        hpmd.data.forceCheckLayout();
        return true;
      }
      return false;
    },

    /**
     * Проверяет, не изменились ли размеры окна браузера.
     * Если изменились, обновляет верстку в соответствии
     * с новыми размерами.
     *
     * @return bool True в случае наличия изменений.
     */
    checkLayout: function () {
      if (hpmd.data.lastLayout.width != window.innerWidth || hpmd.data.lastLayout.height != window.innerHeight) {
        hpmd.data.forceCheckLayout();
        return true;
      }
      return false;
    },

    /**
     * Сохраняет новые размеры окна браузера и запускает
     * процедуру обновления верстки.
     */
    forceCheckLayout: function () {
      if (hpmd.data.isPortrait()) {
        hpmd.data.nodes.wrapper.classList.add('hpmdf-portrait');
        hpmd.data.nodes.wrapper.classList.remove('hpmdf-landscape');
      } else {
        hpmd.data.nodes.wrapper.classList.remove('hpmdf-portrait');
        hpmd.data.nodes.wrapper.classList.add('hpmdf-landscape');
      }
      hpmd.data.lastLayout = {
        width: window.innerWidth,
        height: window.innerHeight,
        orientation: window.orientation,
      };
      hpmd.data.updateLayout();

    },

    /**
     * Флаг повторного обновления, workaround для бага в iOS 7.
     * @var bool
     */
    secondLayoutUpdate: false,
    /**
     * Запускает процедуру обновления верстки.
     */
    updateLayout: function () {
      // Workaround для бага в iOS 7, см. выше.
      if (hpmd.data.secondLayoutUpdate || !hpmd.data.isIOs()) {
        hpmd.data.nodes.wrapper.style.visibility = 'visible';
      }
      hpmd.data.secondLayoutUpdate = true;

      // Запускаем пользовательскую функцию пересчета верстки.
      hpmd.data.onViewportUpdate();

      if (hpmd.data.bannerOpened) {
        // Заставляем браузер перерисовать верстку фуллскрина
        // и внешний вид панели навигации с изменениями.
        window.scrollBy(0, 0);
      }
    },
    offset: 0,
    quantitySlides: 0,
    slidesForView: [],
    device: '',
    action: 'next',
    /**
     * Инициализирует баннер
     */
    init: function () {
      // Обрабатываем все HTML-элементы баннера, начиная с корневого ― #hpmdf-wrapper.
      hpmd.data.processNode(document.getElementById('hpmdf-wrapper'));

      // Кнопка закрытия обязательно должна находиться в исходном коде,  
      // т.к. в противном случае при сбое фуллскрин нельзя будет закрыть.
      if (!hpmd.data.nodes['popup-close']) {
        window.console && console.log("[HPMD Framework] There's a problem with your banner layout; it should include #hpmdf-popup-close element.");
      } else {
        // Обрабатываем закрытие баннера при нажатии на кнопку.
        hpmd.data.handleSwipe(hpmd.data.nodes['popup-close'], {
          tap: hpmd.data.closeBanner
        });

        // Для отладки на десктопе также привязывамся к событию click.
        hpmd.data.attachHandler(hpmd.data.nodes['popup-close'], 'click', hpmd.data.closeBanner);
      }

      // Не позволяем событию touchstart выйти за пределы баннера.
      hpmd.data.attachHandler(hpmd.data.nodes.wrapper, 'touchstart', function (event) {
        event.stopPropagation();
      });

      // Определяем тип устройства
      hpmd.data.device = hpmd.data.isTablet() ? 'tablet' : 'mobile'
      hpmd.data.nodes.wrapper.classList.add('hpmdf-' + hpmd.data.device);

      // Начинаем наблюдение за размерами окна браузера.
      // Эта функция вызовет hpmd.data.onViewportUpdate 
      // через 330 мс.
      hpmd.data.watchLayout();
      hpmd.data.quantitySlides = hpmd.data.nodes.slider.children.length;
      for (var j = 2; j <= hpmd.data.quantitySlides; j++) {
        hpmd.data.slidesForView.push(j);
      }
      hpmd.data.nodes.slider.style.width = 100 * hpmd.data.quantitySlides + '%';
      hpmd.data.offset = 100 / hpmd.data.quantitySlides;
      for (var i = 0; i < hpmd.data.quantitySlides; i++) {
        hpmd.data.nodes.slider.children[i].style.flexBasis = hpmd.data.offset + '%';
      }
    },
    /**
     * Функция для перестройки верстки под изменившиеся размеры
     * окна браузера.
     *
     * Эта функция вызывается каждый раз, когда изменяются размеры
     * окна браузера в пикселях. Если вам необходимо вычислять размеры
     * или расположение каких-либо элементов верстки динамически,
     * поместите вычисления в эту функцию.
     */
    onViewportUpdate: function () {

    },
    trackEvent: function (event) {
      var img = new Image();
      img.src = 'https://px.adhigh.net/p/trce?b=[[BID_RESPONSE_STRING]]&t=' + event;
    }
  };

  /* Инициализируем баннер */
  hpmd.data.init();

  /**
   * Составляем список картинок, нужных для отображения
   * первого экрана баннера, в зависимости от текущей ориентации
   */
  var images;
  // портретная ориентация
  images = [
  // кнопка закрытия
  "./img/close.png",
  "./img/logo.png",
  // фоновое изображение
  "./img/slide1.jpg",
  "./img/slide2.jpg",
  // изображение кнопки
  "./img/button.png",
  "./img/slide1_content.png",
  "./img/slide2_content.png"
  ];


  /**
   * Запускаем предварительную загрузку картинок
   */
  hpmd.data.preloadImages(images, function () {
  /**
   * После того, как картинки загрузились, отображаем
   * баннер на экране:
   */
    hpmd.data.openBanner();

  });

  /* КОД-ПРИМЕР
   * 
   * Вам может быть необходимо удалить или обновить этот код.
   *
   */
  hpmd.data.handleSwipe(hpmd.data.nodes.next, {
    tap: function () {
      hpmd.data.checkUserPlayNext();
      clearInterval(hpmd.data.idInterval);
      clearInterval(hpmd.data.idTimeout);
      hpmd.data.showNextSlide();

      hpmd.data.idTimeout = setTimeout(function(){
        hpmd.data.idInterval = setInterval(hpmd.data.showNextSlide, 2000);
      }, 2000);
    }
  });

  document.querySelector('#hpmdf-next').addEventListener('click', () => {
    hpmd.data.checkUserPlayNext();
      clearInterval(hpmd.data.idInterval);
      clearInterval(hpmd.data.idTimeout);
      hpmd.data.showNextSlide();

      hpmd.data.idTimeout = setTimeout(function(){
        hpmd.data.idInterval = setInterval(hpmd.data.showNextSlide, 2000);
      }, 2000);
  })

  hpmd.data.handleSwipe(hpmd.data.nodes.controls, {
    left: function () {
      hpmd.data.checkUserPlayPrev();
      clearInterval(hpmd.data.idInterval);
      clearInterval(hpmd.data.idTimeout);
      hpmd.data.showNextSlide();

      hpmd.data.idTimeout = setTimeout(function(){
        hpmd.data.idInterval = setInterval(hpmd.data.showNextSlide, 2000);
      }, 2000)
    },
    right: function() {
      hpmd.data.checkUserPlayNext();
      clearInterval(hpmd.data.idInterval);
      clearInterval(hpmd.data.idTimeout);
      hpmd.data.showPrevSlide();

      hpmd.data.idTimeout = setTimeout(function(){
        hpmd.data.idInterval = setInterval(hpmd.data.showNextSlide, 2000);
      }, 2000)
    }
  });

  hpmd.data.handleSwipe(hpmd.data.nodes.prev, {
  tap: function() {
    hpmd.data.checkUserPlayPrev();
    clearInterval(hpmd.data.idInterval);
    clearInterval(hpmd.data.idTimeout);
    hpmd.data.showPrevSlide();

      hpmd.data.idTimeout = setTimeout(function(){
        hpmd.data.idInterval = setInterval(hpmd.data.showNextSlide, 2000);
      }, 2000)
  }
  });

  document.querySelector('#hpmdf-prev').addEventListener('click', () => {
    hpmd.data.checkUserPlayPrev();
    clearInterval(hpmd.data.idInterval);
    clearInterval(hpmd.data.idTimeout);
    hpmd.data.showPrevSlide();

      hpmd.data.idTimeout = setTimeout(function(){
        hpmd.data.idInterval = setInterval(hpmd.data.showNextSlide, 2000);
      }, 2000)
  })

  hpmd.data.nodes.slider.addEventListener('transitionend', function() {
  if (hpmd.data.direction === 1) {
    hpmd.data.nodes.slider.insertAdjacentElement('afterbegin',hpmd.data.nodes.slider.lastElementChild);
  } else {
    hpmd.data.nodes.slider.appendChild(hpmd.data.nodes.slider.firstElementChild);
  }
    hpmd.data.nodes.slider.style.transition = 'none';
    hpmd.data.nodes.slider.style.transform = 'translate(0)';
  }, false);

  hpmd.data.nodes.slider.addEventListener('webkitTransitionEnd', function() {
  if (hpmd.data.direction === 1) {
    hpmd.data.nodes.slider.insertAdjacentElement('afterbegin',hpmd.data.nodes.slider.lastElementChild);
  } else {
    hpmd.data.nodes.slider.appendChild(hpmd.data.nodes.slider.firstElementChild);
  }
    hpmd.data.nodes.slider.style.transition = 'none';
    hpmd.data.nodes.slider.style.transform = 'translate(0)';
  }, false);


  hpmd.data.handleSwipe(hpmd.data.nodes.controls, {
    tap: function () {
      hpmd.data.closeBanner();
      let slide;
      const clickElementClasses = document.querySelector('.hpmdf-slide').classList;
      if (clickElementClasses.contains('one')) {
        slide = 1;
      } else if (clickElementClasses.contains('two')) {
        slide = 2;
      } else if (clickElementClasses.contains('three')) {
          slide = 3;
      } else if (clickElementClasses.contains('four')) {
          slide = 4;
      }


      if (hpmd.data.action === 'prev') {
        if (slide > 1) {
          slide = slide - 1;
        } else if (slide === 1) {
          slide = 4
        }
      }

    
    }
});
