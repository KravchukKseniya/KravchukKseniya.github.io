var xhr = new XMLHttpRequest();
xhr.open('GET', 'https://px.adhigh.net/p/ck');
xhr.withCredentials = true;
xhr.onload = function() {
  if (xhr.status == 200) {
    var responseObj = xhr.response;
    console.log(responseObj.gi_u);
    if (responseObj.gi_u) {
      let date = new Date(Date.now() + (365*86400e3));
      date = date.toUTCString();
      document.cookie = "hpmd_gi_u=" + responseObj.gi_u + "; expires=" + date + "; path=/";
    }
  }
};
xhr.responseType = 'json';
xhr.send();
console.log('HPDM_GI [[WIDTH]]x[[HEIGHT]]');
(function() {
  var banner = {
    html: ' <section>\n' +
      '\t\t\t\t<!-- «Обертка». Сам элемент находится за пределами viewport,\n' +
      '\t\t\t\t     но нужен, чтобы передать дочерним элементам размеры\n' +
      '\t\t\t\t     «окна» браузера. -->\n' +
      '\t\t\t\t<div id="hpmdf-wrapper">\n' +
      '\t\t\t\t\t<!-- Тело баннера -->\n' +
      '\t\t\t\t\t<div id="hpmdf-popup">\n' +
      '\t\t\t\t\t\t<!-- Кнопка закрытия -->\n' +
      '\t\t\t\t\t\t<div id="hpmdf-popup-close"></div>\n' +
      '\t\t\n' +
      '\t\t\t\t\t\t<!-- TODO: сюда добавляются все прочие элементы баннера -->\n' +
      '\t\t\t\t\t\t<!-- <canvas id="hpmdf-canvas"></canvas> -->\n' +
      '\t\t\t\t\t\t<div id="hpmdf-smoke-init"></div>\n' +
      '\t\t\t\t\t\t<iframe id="hpmdf-iframe" src="https://creatives.getintent.com/anim.html" frameborder="0"></iframe>\n' +
      '\t\t\t\t\t\t<div id="hpmdf-iframe-wrap"></div>\n' +
      '\t\t\t\t\t\t<!-- Элемент-пример. Назначьте ему новые стили, или удалите из кода и замените\n' +
      '\t\t\t\t\t\t\t\tновыми. -->\n' +
      '\t\t\n' +
      '\t\t\t\t\t\t<div id="hpmdf-first-page">\n' +
      '\t\t\t\t\t\t\t<div class="hpmdf-title"></div>\n' +
      '\t\t\t\t\t\t\t<div class="hpmdf-tap"></div>\n' +
      '\t\t\n' +
      '\t\t\t\t\t\t\t<div class="hpmdf-grad"></div>\n' +
      '\t\t\n' +
      '\t\t\t\t\t\t\t<div class="hpmdf-film-name"></div>\n' +
      '\t\t\t\t\t\t\t<div class="hpmdf-film-name-hint"></div>\n' +
      '\t\t\t\t\t\t</div>\n' +
      '\t\t\t\t\t\t<div id="hpmdf-pers-name"></div>\n' +
      '\t\t\t\t\t\t<div id="hpmdf-final">\n' +
      '\t\t\t\t\t\t\t<div class="hpmdf-final-title"></div>\n' +
      '\t\t\t\t\t\t\t<div class="hpmdf-final-text"></div>\n' +
      '\t\t\t\t\t\t\t<div class="hpmdf-final-btn"></div>\n' +
      '\t\t\t\t\t\t</div>\n' +
      '\t\t\n' +
      '\t\t\t\t\t\t<div class="hpmdf-visual"></div>\n' +
      '\t\t\t\t\t\t<div id="hpmdf-sixteen" data-text="1"></div>\n' +
      '\t\t\t\t\t\t<div id="hpmdf-bottom-hint" data-text="1"></div>\n' +
      '\t\t\n' +
      '\t\t\t\t\t\t<div id="hpmdf-first-part"></div>\n' +
      '\t\t\t\t\t\t<div id="hpmdf-final-part"></div>\n' +
      '\t\t\t\t\t\t\t\n' +
      '\t\t\t\t\t\t<!-- Кнопка-пример. Назначьте ей новые стили, или удалите ее из кода и замените\n' +
      '\t\t\t\t\t\t\t\tновыми элементами. -->\n' +
      '\t\t\t\t\t\t<div class="hpmdf-button"></div>\n' +
      '\t\t\t\t\t</div>\n' +
      '\t\t\t\t</div>\n' +
      '</section>\n',
    css: '.hpmdf-landscape {\n' +
      '\t\t\t\t\tdisplay: none!important;\n' +
      '\t\t\t\t}\n' +
      '\t\t\t\t.hpmdf-portrait #hpmdf-smoke-init {\n' +
      '\t\t\t\t\twidth: 100%;\n' +
      '\t\t\t\t\theight: 100%;\n' +
      '\t\t\t\t\tposition: absolute;\n' +
      '\t\t\t\t\ttop: 0%;\n' +
      '\t\t\t\t\tleft: 0%;\n' +
      '\t\t\t\t\tbackground: url(\'https://creatives.getintent.com/smoke-init.jpg\') no-repeat 50% 50%;\n' +
      '\t\t\t\t\tbackground-size: cover;\n' +
      '\t\t\t\t}\n' +
      '\t\t\t\t#hpmdf-smoke-init.hpmdf-disable {\n' +
      '\t\t\t\t\t-webkit-transition: opacity .5s ease-in;\n' +
      '\t\t\t\t\t-moz-transition: opacity .5s ease-in;\n' +
      '\t\t\t\t\ttransition: opacity .5s ease-in;\n' +
      '\t\t\t\t\topacity: 0;\n' +
      '\t\t\t\t}\n' +
      '\t\t\t\t.hpmdf-portrait #hpmdf-first-part,\n' +
      '\t\t\t\t.hpmdf-portrait #hpmdf-final-part {\n' +
      '\t\t\t\t\twidth: 100%;\n' +
      '\t\t\t\t\theight: 100%;\n' +
      '\t\t\t\t\tposition: absolute;\n' +
      '\t\t\t\t\ttop: 0%;\n' +
      '\t\t\t\t\tleft: 0%;\n' +
      '\t\t\t\t}\n' +
      '\t\t\t\t.hpmdf-portrait #hpmdf-final-part {\n' +
      '\t\t\t\t\t-ms-touch-action: none;\n' +
      '\t\t\t\t\t    touch-action: none;\n' +
      '\t\t\t\t\tpointer-events: none;\n' +
      '\t\t\t\t}\n' +
      '\t\t\t\t.hpmdf-portrait #hpmdf-final-part.hpmdf-active {\n' +
      '\t\t\t\t\t-ms-touch-action: auto;\n' +
      '\t\t\t\t\t    touch-action: auto;\n' +
      '\t\t\t\t\tpointer-events: auto;\n' +
      '\t\t\t\t}\n' +
      '\t\t\t\t.hpmdf-portrait #hpmdf-sixteen {\n' +
      '\t\t\t\t\twidth: 20.92%;\n' +
      '\t\t\t\t\theight: 0%;\n' +
      '\t\t\t\t\tpadding-bottom: 20.92%;\n' +
      '\t\t\t\t\tposition: absolute;\n' +
      '\t\t\t\t\ttop: 0%;\n' +
      '\t\t\t\t\tleft: 0%;\n' +
      '\t\t\t\t}\n' +
      '\t\t\t\t#hpmdf-sixteen[data-text="1"] {\n' +
      '\t\t\t\t\tbackground: url(\'https://creatives.getintent.com/sixteen1.png\') no-repeat 50% 50%;\n' +
      '\t\t\t\t\t-webkit-background-size: 58% auto;\n' +
      '\t\t\t\t\t   -moz-background-size: 58% auto;\n' +
      '\t\t\t\t\t        background-size: 58% auto;\n' +
      '\t\t\t\t}\n' +
      '\t\t\t\t#hpmdf-sixteen[data-text="2"] {\n' +
      '\t\t\t\t\tbackground: url(\'https://creatives.getintent.com/sixteen2.png\') no-repeat 50% 50%;\n' +
      '\t\t\t\t\t-webkit-background-size: 58% auto;\n' +
      '\t\t\t\t\t   -moz-background-size: 58% auto;\n' +
      '\t\t\t\t\t        background-size: 58% auto;\n' +
      '\t\t\t\t}\n' +
      '\t\t\t\t.hpmdf-portrait #hpmdf-bottom-hint {\n' +
      '\t\t\t\t\twidth: 36.38%;\n' +
      '\t\t\t\t\theight: 0%;\n' +
      '\t\t\t\t\tpadding-bottom: 8.9%;\n' +
      '\t\t\t\t\tposition: absolute;\n' +
      '\t\t\t\t\tbottom: 0%;\n' +
      '\t\t\t\t\tright: 0%;\n' +
      '\t\t\t\t}\n' +
      '\t\t\t\t#hpmdf-bottom-hint[data-text="1"] {\n' +
      '\t\t\t\t\tbackground: url(\'https://creatives.getintent.com/bottom-hint1.png\') no-repeat 50% 50%;\n' +
      '\t\t\t\t\t-webkit-background-size: 86% auto;\n' +
      '\t\t\t\t\t   -moz-background-size: 86% auto;\n' +
      '\t\t\t\t\t        background-size: 86% auto;\n' +
      '\t\t\t\t}\n' +
      '\t\t\t\t#hpmdf-bottom-hint[data-text="2"] {\n' +
      '\t\t\t\t\tbackground: url(\'https://creatives.getintent.com/bottom-hint2.png\') no-repeat 50% 50%;\n' +
      '\t\t\t\t\t-webkit-background-size: 86% auto;\n' +
      '\t\t\t\t\t   -moz-background-size: 86% auto;\n' +
      '\t\t\t\t\t        background-size: 86% auto;\n' +
      '\t\t\t\t}\n' +
      '\t\t\t\t.hpmdf-portrait .hpmdf-grad {\n' +
      '\t\t\t\t\twidth: 100%;\n' +
      '\t\t\t\t\theight: 30%;\n' +
      '\t\t\t\t\tposition: absolute;\n' +
      '\t\t\t\t\tbottom: 0%;\n' +
      '\t\t\t\t\tleft: 0%;\n' +
      '\t\t\t\t\tbackground: url(\'https://creatives.getintent.com/grad.png\') no-repeat 50% 0%;\n' +
      '\t\t\t\t\t-webkit-background-size: cover;\n' +
      '\t\t\t\t\t   -moz-background-size: cover;\n' +
      '\t\t\t\t\t        background-size: cover;\n' +
      '\t\t\t\t}\n' +
      '\t\t\t\t.hpmdf-portrait .hpmdf-film-name {\n' +
      '\t\t\t\t\twidth: 44%;\n' +
      '\t\t\t\t\theight: 8%;\n' +
      '\t\t\t\t\tposition: absolute;\n' +
      '\t\t\t\t\ttop: 83.19%;\n' +
      '\t\t\t\t\tleft: 28%;\n' +
      '\t\t\t\t\tbackground: url(\'https://creatives.getintent.com/film-name1.png\') no-repeat 50% 50%;\n' +
      '\t\t\t\t\t-webkit-background-size: contain;\n' +
      '\t\t\t\t\t   -moz-background-size: contain;\n' +
      '\t\t\t\t\t        background-size: contain;\n' +
      '\t\t\t\t}\n' +
      '\t\t\t\t.hpmdf-portrait .hpmdf-film-name-hint {\n' +
      '\t\t\t\t\twidth: 38.1%;\n' +
      '\t\t\t\t\theight: 1.1%;\n' +
      '\t\t\t\t\tposition: absolute;\n' +
      '\t\t\t\t\ttop: 92.92%;\n' +
      '\t\t\t\t\tleft: 30.95%;\n' +
      '\t\t\t\t\tbackground: url(\'https://creatives.getintent.com/film-name-hint1.png\') no-repeat 50% 50%;\n' +
      '\t\t\t\t\t-webkit-background-size: contain;\n' +
      '\t\t\t\t\t   -moz-background-size: contain;\n' +
      '\t\t\t\t\t        background-size: contain;\n' +
      '\t\t\t\t}\n' +
      '\t\t\t\t.hpmdf-portrait #hpmdf-pers-name {\n' +
      '\t\t\t\t\twidth: 75%;\n' +
      '\t\t\t\t\theight: 29%;\n' +
      '\t\t\t\t\tposition: absolute;\n' +
      '\t\t\t\t\ttop: 23.72%;\n' +
      '\t\t\t\t\tleft: 0%;\n' +
      '\t\t\t\t\tbackground: url(\'https://creatives.getintent.com/pers-name.png\') no-repeat 50% 50%;\n' +
      '\t\t\t\t\t-webkit-background-size: contain;\n' +
      '\t\t\t\t\t   -moz-background-size: contain;\n' +
      '\t\t\t\t\t        background-size: contain;\n' +
      '\t\t\t\t\topacity: 0;\n' +
      '\t\t\t\t\t-ms-touch-action: none;\n' +
      '\t\t\t\t\t    touch-action: none;\n' +
      '\t\t\t\t\tpointer-events: none;\n' +
      '\t\t\t\t}\n' +
      '\t\t\t\t#hpmdf-pers-name.hpmdf-active {\n' +
      '\t\t\t\t\t-webkit-transition: opacity .4s ease-out;\n' +
      '\t\t\t\t\t-moz-transition: opacity .4s ease-out;\n' +
      '\t\t\t\t\ttransition: opacity .4s ease-out;\n' +
      '\t\t\t\t\topacity: 1;\n' +
      '\t\t\t\t}\n' +
      '\t\t\t\t#hpmdf-pers-name.hpmdf-active {\n' +
      '\t\t\t\t\t-webkit-transition: opacity .4s ease-out;\n' +
      '\t\t\t\t\t-moz-transition: opacity .4s ease-out;\n' +
      '\t\t\t\t\ttransition: opacity .4s ease-out;\n' +
      '\t\t\t\t\topacity: 1;\n' +
      '\t\t\n' +
      '\t\t\t\t\t-webkit-animation: resizeAnim 1s ease-out;\n' +
      '\t\t\n' +
      '\t\t\t\t\t   -moz-animation: resizeAnim 1s ease-out;\n' +
      '\t\t\n' +
      '\t\t\t\t\t        animation: resizeAnim 1s ease-out;\n' +
      '\t\t\t\t}\n' +
      '\t\t\n' +
      '\t\t\t\t@-webkit-keyframes resizeAnim {\n' +
      '\t\t\t\t\t0% {\n' +
      '\t\t\t\t\t\t-webkit-transform: scale(1);\n' +
      '\t\t\t\t\t\t        transform: scale(1);\n' +
      '\t\t\t\t\t\t-webkit-transform-origin: 25% 50%;\n' +
      '\t\t\t\t\t\t        transform-origin: 25% 50%;\n' +
      '\t\t\t\t\t}\n' +
      '\t\t\n' +
      '\t\t\t\t\t60% {\n' +
      '\t\t\t\t\t\t-webkit-transform: scale(1.5);\n' +
      '\t\t\t\t\t\t        transform: scale(1.5);\n' +
      '\t\t\t\t\t\t-webkit-transform-origin: 25% 50%;\n' +
      '\t\t\t\t\t\t        transform-origin: 25% 50%;\n' +
      '\t\t\t\t\t}\n' +
      '\t\t\t\t\t65% {\n' +
      '\t\t\t\t\t\t-webkit-transform: scale(1.5);\n' +
      '\t\t\t\t\t\t        transform: scale(1.5);\n' +
      '\t\t\t\t\t\t-webkit-transform-origin: 25% 50%;\n' +
      '\t\t\t\t\t\t        transform-origin: 25% 50%;\n' +
      '\t\t\t\t\t}\n' +
      '\t\t\t\t\t100% {\n' +
      '\t\t\t\t\t\t-webkit-transform: scale(1);\n' +
      '\t\t\t\t\t\t        transform: scale(1);\n' +
      '\t\t\t\t\t\t-webkit-transform-origin: 25% 50%;\n' +
      '\t\t\t\t\t\t        transform-origin: 25% 50%;\n' +
      '\t\t\t\t\t}\n' +
      '\t\t\t\t}\n' +
      '\t\t\n' +
      '\t\t\t\t@-moz-keyframes resizeAnim {\n' +
      '\t\t\t\t\t0% {\n' +
      '\t\t\t\t\t\t-moz-transform: scale(1);\n' +
      '\t\t\t\t\t\t     transform: scale(1);\n' +
      '\t\t\t\t\t\t-moz-transform-origin: 25% 50%;\n' +
      '\t\t\t\t\t\t     transform-origin: 25% 50%;\n' +
      '\t\t\t\t\t}\n' +
      '\t\t\n' +
      '\t\t\t\t\t60% {\n' +
      '\t\t\t\t\t\t-moz-transform: scale(1.5);\n' +
      '\t\t\t\t\t\t     transform: scale(1.5);\n' +
      '\t\t\t\t\t\t-moz-transform-origin: 25% 50%;\n' +
      '\t\t\t\t\t\t     transform-origin: 25% 50%;\n' +
      '\t\t\t\t\t}\n' +
      '\t\t\t\t\t65% {\n' +
      '\t\t\t\t\t\t-moz-transform: scale(1.5);\n' +
      '\t\t\t\t\t\t     transform: scale(1.5);\n' +
      '\t\t\t\t\t\t-moz-transform-origin: 25% 50%;\n' +
      '\t\t\t\t\t\t     transform-origin: 25% 50%;\n' +
      '\t\t\t\t\t}\n' +
      '\t\t\t\t\t100% {\n' +
      '\t\t\t\t\t\t-moz-transform: scale(1);\n' +
      '\t\t\t\t\t\t     transform: scale(1);\n' +
      '\t\t\t\t\t\t-moz-transform-origin: 25% 50%;\n' +
      '\t\t\t\t\t\t     transform-origin: 25% 50%;\n' +
      '\t\t\t\t\t}\n' +
      '\t\t\t\t}\n' +
      '\t\t\n' +
      '\t\t\t\t@keyframes resizeAnim {\n' +
      '\t\t\t\t\t0% {\n' +
      '\t\t\t\t\t\t-webkit-transform: scale(1);\n' +
      '\t\t\t\t\t\t   -moz-transform: scale(1);\n' +
      '\t\t\t\t\t\t        transform: scale(1);\n' +
      '\t\t\t\t\t\t-webkit-transform-origin: 25% 50%;\n' +
      '\t\t\t\t\t\t   -moz-transform-origin: 25% 50%;\n' +
      '\t\t\t\t\t\t        transform-origin: 25% 50%;\n' +
      '\t\t\t\t\t}\n' +
      '\t\t\n' +
      '\t\t\t\t\t60% {\n' +
      '\t\t\t\t\t\t-webkit-transform: scale(1.5);\n' +
      '\t\t\t\t\t\t   -moz-transform: scale(1.5);\n' +
      '\t\t\t\t\t\t        transform: scale(1.5);\n' +
      '\t\t\t\t\t\t-webkit-transform-origin: 25% 50%;\n' +
      '\t\t\t\t\t\t   -moz-transform-origin: 25% 50%;\n' +
      '\t\t\t\t\t\t        transform-origin: 25% 50%;\n' +
      '\t\t\t\t\t}\n' +
      '\t\t\t\t\t65% {\n' +
      '\t\t\t\t\t\t-webkit-transform: scale(1.5);\n' +
      '\t\t\t\t\t\t   -moz-transform: scale(1.5);\n' +
      '\t\t\t\t\t\t        transform: scale(1.5);\n' +
      '\t\t\t\t\t\t-webkit-transform-origin: 25% 50%;\n' +
      '\t\t\t\t\t\t   -moz-transform-origin: 25% 50%;\n' +
      '\t\t\t\t\t\t        transform-origin: 25% 50%;\n' +
      '\t\t\t\t\t}\n' +
      '\t\t\t\t\t100% {\n' +
      '\t\t\t\t\t\t-webkit-transform: scale(1);\n' +
      '\t\t\t\t\t\t   -moz-transform: scale(1);\n' +
      '\t\t\t\t\t\t        transform: scale(1);\n' +
      '\t\t\t\t\t\t-webkit-transform-origin: 25% 50%;\n' +
      '\t\t\t\t\t\t   -moz-transform-origin: 25% 50%;\n' +
      '\t\t\t\t\t\t        transform-origin: 25% 50%;\n' +
      '\t\t\t\t\t}\n' +
      '\t\t\t\t}\n' +
      '\t\t\n' +
      '\t\t\t\t.hpmdf-portrait #hpmdf-iframe-wrap {\n' +
      '\t\t\t\t\twidth: 100%;\n' +
      '\t\t\t\t\theight: 100%;\n' +
      '\t\t\t\t\tposition: absolute;\n' +
      '\t\t\t\t\ttop: 0%;\n' +
      '\t\t\t\t\tleft: 0%;\n' +
      '\t\t\t\t}\n' +
      '\t\t\t\t.hpmdf-portrait #hpmdf-iframe {\n' +
      '\t\t\t\t\twidth: 100%;\n' +
      '\t\t\t\t\theight: 100%;\n' +
      '\t\t\t\t\tposition: absolute;\n' +
      '\t\t\t\t\tbottom: 0%;\n' +
      '\t\t\t\t\tleft: 0%;\n' +
      '\t\t\t\t\tpadding: 0%!important;\n' +
      '\t\t\t\t\tmargin: 0%!important;\n' +
      '\t\t\t\t}\n' +
      '\t\t\t\t#hpmdf-iframe.hpmdf-disable {\n' +
      '\t\t\t\t\t-webkit-transition: opacity .5s ease-in;\n' +
      '\t\t\t\t\t-moz-transition: opacity .5s ease-in;\n' +
      '\t\t\t\t\ttransition: opacity .5s ease-in;\n' +
      '\t\t\t\t\topacity: 0;\n' +
      '\t\t\t\t\t-ms-touch-action: none;\n' +
      '\t\t\t\t\ttouch-action: none;\n' +
      '\t\t\t\t\tpointer-events: none;\n' +
      '\t\t\t\t}\n' +
      '\t\t\t\t.hpmdf-portrait #hpmdf-final {\n' +
      '\t\t\t\t\twidth: 100%;\n' +
      '\t\t\t\t\theight: 100%;\n' +
      '\t\t\t\t\tposition: absolute;\n' +
      '\t\t\t\t\ttop: 0%;\n' +
      '\t\t\t\t\tleft: 0%;\n' +
      '\t\t\t\t\topacity: 0;\n' +
      '\t\t\t\t\t-ms-touch-action: none;\n' +
      '\t\t\t\t\ttouch-action: none;\n' +
      '\t\t\t\t\tpointer-events: none;\n' +
      '\t\t\t\t}\n' +
      '\t\t\t\t.hpmdf-portrait #hpmdf-final:before {\n' +
      '\t\t\t\t\tcontent: \'\';\n' +
      '\t\t\t\t\tdisplay: block;\n' +
      '\t\t\t\t\twidth: 100%;\n' +
      '\t\t\t\t\theight: 100%;\n' +
      '\t\t\t\t\tposition: absolute;\n' +
      '\t\t\t\t\ttop: 0%;\n' +
      '\t\t\t\t\tleft: 0%;\n' +
      '\t\t\t\t\tbackground: url(\'https://creatives.getintent.com/final.jpg\') no-repeat 50% 20%;\n' +
      '\t\t\t\t\t-webkit-background-size: cover;\n' +
      '\t\t\t\t\t   -moz-background-size: cover;\n' +
      '\t\t\t\t\t        background-size: cover;\n' +
      '\t\t\t\t}\n' +
      '\t\t\t\t#hpmdf-final.hpmdf-active {\n' +
      '\t\t\t\t\t-webkit-transition: opacity .4s ease-out;\n' +
      '\t\t\t\t\t-moz-transition: opacity .4s ease-out;\n' +
      '\t\t\t\t\ttransition: opacity .4s ease-out;\n' +
      '\t\t\t\t\topacity: 1;\n' +
      '\t\t\t\t\t-ms-touch-action: auto;\n' +
      '\t\t\t\t\ttouch-action: auto;\n' +
      '\t\t\t\t\tpointer-events: auto;\n' +
      '\t\t\t\t}\n' +
      '\t\t\t\t.hpmdf-portrait .hpmdf-final-title {\n' +
      '\t\t\t\t\twidth: 80%;\n' +
      '\t\t\t\t\theight: 14%;\n' +
      '\t\t\t\t\tposition: absolute;\n' +
      '\t\t\t\t\ttop: 59.62%;\n' +
      '\t\t\t\t\tleft: 10%;\n' +
      '\t\t\t\t\tbackground: url(\'https://creatives.getintent.com/film-name2.png\') no-repeat 50% 50%;\n' +
      '\t\t\t\t\t-webkit-background-size: contain;\n' +
      '\t\t\t\t\t   -moz-background-size: contain;\n' +
      '\t\t\t\t\t        background-size: contain;\n' +
      '\t\t\t\t}\n' +
      '\t\t\t\t.hpmdf-portrait .hpmdf-final-btn {\n' +
      '\t\t\t\t\twidth: 57%;\n' +
      '\t\t\t\t\theight: 7%;\n' +
      '\t\t\t\t\tposition: absolute;\n' +
      '\t\t\t\t\ttop: 85.37%;\n' +
      '\t\t\t\t\tleft: 21.5%;\n' +
      '\t\t\t\t\tbackground: url(\'https://creatives.getintent.com/final-btn.png\') no-repeat 50% 50%;\n' +
      '\t\t\t\t\t-webkit-background-size: contain;\n' +
      '\t\t\t\t\t   -moz-background-size: contain;\n' +
      '\t\t\t\t\t        background-size: contain;\n' +
      '\t\t\t\t}\n' +
      '\t\t\t\t.hpmdf-portrait .hpmdf-final-text {\n' +
      '\t\t\t\t\twidth: 61%;\n' +
      '\t\t\t\t\theight: 7%;\n' +
      '\t\t\t\t\tposition: absolute;\n' +
      '\t\t\t\t\ttop: 76.61%;\n' +
      '\t\t\t\t\tleft: 19.5%;\n' +
      '\t\t\t\t\tbackground: url(\'https://creatives.getintent.com/final-text.png\') no-repeat 50% 50%;\n' +
      '\t\t\t\t\t-webkit-background-size: contain;\n' +
      '\t\t\t\t\t   -moz-background-size: contain;\n' +
      '\t\t\t\t\t        background-size: contain;\n' +
      '\t\t\t\t}\n' +
      '\t\t\t\t#hpmdf-final.hpmdf-active {\n' +
      '\t\t\t\t\t-webkit-transition: opacity .4s ease-out;\n' +
      '\t\t\t\t\t-moz-transition: opacity .4s ease-out;\n' +
      '\t\t\t\t\ttransition: opacity .4s ease-out;\n' +
      '\t\t\t\t\topacity: 1;\n' +
      '\t\t\t\t\t-ms-touch-action: auto;\n' +
      '\t\t\t\t\ttouch-action: auto;\n' +
      '\t\t\t\t\tpointer-events: auto;\n' +
      '\t\t\t\t}\n' +
      '\t\t\t\t.hpmdf-portrait #hpmdf-first-page {\n' +
      '\t\t\t\t\twidth: 100%;\n' +
      '\t\t\t\t\theight: 100%;\n' +
      '\t\t\t\t\tposition: absolute;\n' +
      '\t\t\t\t\ttop: 0%;\n' +
      '\t\t\t\t\tleft: 0%;\n' +
      '\t\t\t\t\t-ms-touch-action: none;\n' +
      '\t\t\t\t\ttouch-action: none;\n' +
      '\t\t\t\t\tpointer-events: none;\n' +
      '\t\t\t\t}\n' +
      '\t\t\t\t#hpmdf-first-page.hpmdf-disable {\n' +
      '\t\t\t\t\t-webkit-transition: opacity .4s ease-out;\n' +
      '\t\t\t\t\t-moz-transition: opacity .4s ease-out;\n' +
      '\t\t\t\t\ttransition: opacity .4s ease-out;\n' +
      '\t\t\t\t\topacity: 0;\n' +
      '\t\t\t\t}\n' +
      '\t\t\t\t.hpmdf-portrait .hpmdf-tap {\n' +
      '\t\t\t\t\twidth: 18%;\n' +
      '\t\t\t\t\theight: 0%;\n' +
      '\t\t\t\t\tpadding-bottom: 18%;\n' +
      '\t\t\t\t\tposition: absolute;\n' +
      '\t\t\t\t\ttop: 26.4%;\n' +
      '\t\t\t\t\tleft: 41%;\n' +
      '\t\t\t\t\tbackground: url(\'https://creatives.getintent.com/tap.png\') no-repeat 50% 50%;\n' +
      '\t\t\t\t\t-webkit-background-size: contain;\n' +
      '\t\t\t\t\t   -moz-background-size: contain;\n' +
      '\t\t\t\t\t        background-size: contain;\n' +
      '\t\t\t\t\t-webkit-animation: shake .5s linear infinite;\n' +
      '\t\t\t\t\t   -moz-animation: shake .5s linear infinite;\n' +
      '\t\t\t\t\t        animation: shake .5s linear infinite;\n' +
      '\t\t\t\t\t-webkit-transform-origin: 50% 50%;\n' +
      '\t\t\t\t\t   -moz-transform-origin: 50% 50%;\n' +
      '\t\t\t\t\t    -ms-transform-origin: 50% 50%;\n' +
      '\t\t\t\t\t        transform-origin: 50% 50%;\n' +
      '\t\t\t\t\t-webkit-animation-fill-mode: forwards;\n' +
      '\t\t\t\t\t   -moz-animation-fill-mode: forwards;\n' +
      '\t\t\t\t\t        animation-fill-mode: forwards;\n' +
      '\t\t\t\t}\n' +
      '\t\t\t\t@keyframes shake {\n' +
      '\t\t\t\t\t8%, 41% {\n' +
      '\t\t\t\t\t\t-webkit-transform: translateX(-1%);\n' +
      '\t\t\t\t\t\t   -moz-transform: translateX(-1%);\n' +
      '\t\t\t\t\t\t        transform: translateX(-1%);\n' +
      '\t\t\t\t\t}\n' +
      '\t\t\t\t\t25%, 58% {\n' +
      '\t\t\t\t\t\t-webkit-transform: translateX(1%);\n' +
      '\t\t\t\t\t\t   -moz-transform: translateX(1%);\n' +
      '\t\t\t\t\t\t        transform: translateX(1%);\n' +
      '\t\t\t\t\t}\n' +
      '\t\t\t\t\t75% {\n' +
      '\t\t\t\t\t\t-webkit-transform: translateX(-.5%);\n' +
      '\t\t\t\t\t\t   -moz-transform: translateX(-.5%);\n' +
      '\t\t\t\t\t\t        transform: translateX(-.5%);\n' +
      '\t\t\t\t\t}\n' +
      '\t\t\t\t\t92% {\n' +
      '\t\t\t\t\t\t-webkit-transform: translateX(.5%);\n' +
      '\t\t\t\t\t\t   -moz-transform: translateX(.5%);\n' +
      '\t\t\t\t\t\t        transform: translateX(.5%);\n' +
      '\t\t\t\t\t}\n' +
      '\t\t\t\t\t0%, 100% {\n' +
      '\t\t\t\t\t\t-webkit-transform: translateX(0);\n' +
      '\t\t\t\t\t\t   -moz-transform: translateX(0);\n' +
      '\t\t\t\t\t\t        transform: translateX(0);\n' +
      '\t\t\t\t\t}\n' +
      '\t\t\t\t}\n' +
      '\t\t\t\t.hpmdf-portrait .hpmdf-title {\n' +
      '\t\t\t\t\twidth: 65.84%;\n' +
      '\t\t\t\t\theight: 24.12%;\n' +
      '\t\t\t\t\tposition: absolute;\n' +
      '\t\t\t\t\ttop: 7.47%;\n' +
      '\t\t\t\t\tleft: 17.08%;\n' +
      '\t\t\t\t\tbackground: url(\'https://creatives.getintent.com/title.png\') no-repeat 50% 50%;\n' +
      '\t\t\t\t\t-webkit-background-size: contain;\n' +
      '\t\t\t\t\t   -moz-background-size: contain;\n' +
      '\t\t\t\t\t        background-size: contain;\n' +
      '\t\t\t\t}\n' +
      '\t\t\t\t/* «Обертка» */\n' +
      '\t\t\t\t#hpmdf-wrapper {\n' +
      '\t\t\t\t\t/* Прибита к верху экрана */\n' +
      '\t\t\t\t\tposition: fixed;\n' +
      '\t\t\t\t\t\n' +
      '\t\t\t\t\t/* Сохраняем ширину и высоту для дочерних элементов */\n' +
      '\t\t\t\t\twidth: 100%;\n' +
      '\t\t\t\t\theight: 100%;\n' +
      '\t\t\t\t\t\n' +
      '\t\t\t\t\t/* «Прибиваем» к верхней части экрана */\n' +
      '\t\t\t\t\ttop: 0;\n' +
      '\t\t\t\t\t\n' +
      '\t\t\t\t\t/* Сдвигаем за пределы viewport, чтобы элемент-обертка не перекрывал\n' +
      '\t\t\t\t\t * основной контент страницы */\n' +
      '\t\t\t\t\tleft: -100%;\n' +
      '\t\t\t\t\t\n' +
      '\t\t\t\t\t/* Размещаем поверх всех элементов площадки */\n' +
      '\t\t\t\t\tz-index: 2147483647;\n' +
      '\t\t\t\t\t\n' +
      '\t\t\t\t\t/* Отключаем «проглатывание» pointer-событий в Windows Phone\n' +
      '\t\t\t\t\t * для всех элементов баннера */\n' +
      '\t\t\t\t\ttouch-action: none;\n' +
      '\t\t\t\t}\n' +
      '\t\t\t\t\n' +
      '\t\t\t\t/* Попап (основное поле баннера) */\n' +
      '\t\t\t\t#hpmdf-popup {\n' +
      '\t\t\t\t\tposition: absolute;\n' +
      '\t\t\t\t\t\n' +
      '\t\t\t\t\t/* Сдвигаем назад в видимую область экрана */\n' +
      '\t\t\t\t\tleft: 100%;\n' +
      '\t\t\t\t\t\n' +
      '\t\t\t\t\t/* Растягиваем на всю доступную область экрана */\n' +
      '\t\t\t\t\ttop: 0;\n' +
      '\t\t\t\t\twidth: 100%;\n' +
      '\t\t\t\t\theight: 100%;\n' +
      '\t\t\t\t\t\n' +
      '\t\t\t\t\t/* Скрываем лишнее.\n' +
      '\t\t\t\t\t * \n' +
      '\t\t\t\t\t * Если какой-то из элементов будет выступать вправо или вниз,    \n' +
      '\t\t\t\t\t * это может разрушить верстку площадки из-за неверного вычисления\n' +
      '\t\t\t\t\t * браузером ширины контента.                                     \n' +
      '\t\t\t\t\t * \n' +
      '\t\t\t\t\t * Чтобы избежать проблем, ограничиваем баннер областью попапа:\n' +
      '\t\t\t\t\t */\n' +
      '\t\t\t\t\toverflow: hidden;\n' +
      '\t\t\t\t\t\n' +
      '\t\t\t\t\t/* Изначально скрываем фуллскрин, чтобы не показывать пользователю\n' +
      '\t\t\t\t\t * не до конца загруженную графику:\n' +
      '\t\t\t\t\t */\n' +
      '\t\t\t\t\tdisplay: none;\n' +
      '\t\t\t\t\t\n' +
      '\t\t\t\t\t/* Анимация при появлении фуллскрина и ее изначальное состояние.\n' +
      '\t\t\t\t\t * \n' +
      '\t\t\t\t\t * Примечание: если в баннере есть ресурсоемкие элементы,    \n' +
      '\t\t\t\t\t * например, плейер YouTUBE, анимация может отображаться     \n' +
      '\t\t\t\t\t * неустойчиво. Если возникла такая проблема, можно отключить\n' +
      '\t\t\t\t\t * анимацию, удалив все transition ниже.                     \n' +
      '\t\t\t\t\t */\n' +
      '\t\t\t\t\topacity: 0.0;\n' +
      '\t\t\t\t\ttransition: opacity .4s ease-in;\n' +
      '\t\t\t\t\t-webkit-transition: opacity .4s ease-in;\n' +
      '\t\t\t\t\t-moz-transition: opacity .4s ease-in;\n' +
      '\t\t\t\t\t-ms-transition: opacity .4s ease-in;\n' +
      '\t\t\t\t\t-o-transition: opacity .4s ease-in;\n' +
      '\t\t\t\t}\n' +
      '\t\t\t\t\n' +
      '\t\t\t\t/* Состояние попапа сразу после окончания загрузки */\n' +
      '\t\t\t\t#hpmdf-popup.hpmdf-popup-steady {\n' +
      '\t\t\t\t\tdisplay: block;\n' +
      '\t\t\t\t}\n' +
      '\t\t\t\t/* Состояние попапа после его проявления на экране */\n' +
      '\t\t\t\t#hpmdf-popup.hpmdf-popup-ready {\n' +
      '\t\t\t\t\topacity: 1.0;\n' +
      '\t\t\t\t}\n' +
      '\t\t\t\t\n' +
      '\t\t\t\t/* Кнопка закрытия */\n' +
      '\t\t\t\t#hpmdf-popup-close {\n' +
      '\t\t\t\t\tposition: absolute;\n' +
      '\t\t\t\t\t/* Фиксируем кнопку в правом верхнем углу */\n' +
      '\t\t\t\t\tright: 0;\n' +
      '\t\t\t\t\ttop: 0;\n' +
      '\t\t\t\t\t/* Размещаем кнопку над прочими элементами баннера */\n' +
      '\t\t\t\t\tz-index: 1000;\n' +
      '\t\t\t\t\t/* Картинка кнопки закрытия, по центру: */\n' +
      '\t\t\t\t\tbackground: url(https://creatives.getintent.com/close.png) 50% 50% no-repeat;\n' +
      '\t\t\t\t\t/* Делаем размер иконки половиной от всего размера кнопки, так,\n' +
      '\t\t\t\t\t * чтобы область для клика была достаточно большой, чтобы в нее\n' +
      '\t\t\t\t\t * можно было уверенно попасть пальцем, но иконка не казалась  \n' +
      '\t\t\t\t\t * громадной:                                                  \n' +
      '\t\t\t\t\t */\n' +
      '\t\t\t\t\t-o-background-size: 50% auto;\n' +
      '\t\t\t\t\t   background-size: 50% auto;\n' +
      '\t\t\t\t}\n' +
      '\t\t\t\t/* Размеры кнопки закрытия в портретной ориентации для смартфонов: */\n' +
      '\t\t\t\t.hpmdf-mobile.hpmdf-portrait #hpmdf-popup-close {\n' +
      '\t\t\t\t\t/* Ширина = 20% ширины экрана */\n' +
      '\t\t\t\t\twidth: 20%;\n' +
      '\t\t\t\t\t/* Высота = 20% ширины экрана */\n' +
      '\t\t\t\t\tpadding-top: 20%;\n' +
      '\t\t\t\t}\n' +
      '\t\t\t\t/* Размеры кнопки закрытия в ландшафтной ориентации для смартфонов: */\n' +
      '\t\t\t\t.hpmdf-mobile.hpmdf-landscape #hpmdf-popup-close {\n' +
      '\t\t\t\t\t/* Ширина = 12% ширины экрана */\n' +
      '\t\t\t\t\twidth: 12%;\n' +
      '\t\t\t\t\t/* Высота = 12% ширины экрана */\n' +
      '\t\t\t\t\tpadding-top: 12%;\n' +
      '\t\t\t\t}\n' +
      '\t\t\t\t/* Размеры кнопки закрытия в портретной ориентации для планшетов: */\n' +
      '\t\t\t\t.hpmdf-tablet.hpmdf-portrait #hpmdf-popup-close {\n' +
      '\t\t\t\t\t/* Ширина = 13% ширины экрана */\n' +
      '\t\t\t\t\twidth: 13%;\n' +
      '\t\t\t\t\t/* Высота = 13% ширины экрана */\n' +
      '\t\t\t\t\tpadding-top: 13%;\n' +
      '\t\t\t\t}\n' +
      '\t\t\t\t/* Размеры кнопки закрытия в ландшафтной ориентации для планшетов: */\n' +
      '\t\t\t\t.hpmdf-tablet.hpmdf-landscape #hpmdf-popup-close {\n' +
      '\t\t\t\t\t/* Ширина = 8% ширины экрана */\n' +
      '\t\t\t\t\twidth: 8%;\n' +
      '\t\t\t\t\t/* Высота = 8% ширины экрана */\n' +
      '\t\t\t\t\tpadding-top: 8%;\n' +
      '\t\t\t\t}\n' +
      '\t\t\t\t\n' +
      '\t\t\t\t/* Фоновая картинка баннера в портретной ориентации */\n' +
      '\t\t\t\t.hpmdf-portrait #hpmdf-popup {\n' +
      '\t\t\t\t\tbackground: #000 url(https://creatives.getintent.com/portrait.jpg) 100% 50% no-repeat;\n' +
      '\t\t\t\t\t-o-background-size: cover;\n' +
      '\t\t\t\t\t   background-size: cover;\n' +
      '\t\t\t\t}',
    js: '<JS>',
    placement: {},
  }

  // [[HEIGHT]]
  // [[WIDTH]]

  var loadScript = function(src, onLoadCallback) {
    let script = document.createElement('script');
    script.async = 1;
    script.onload = function () {
      onLoadCallback();
    };
    script.src = src;

    window.document.head.appendChild(script);
  }

  banner.js = function(hpmd) {

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
      // detect: new MobileDetect(window.navigator.userAgent),
      isTablet: function () {
        return false;
        // return hpmd.data.detect.tablet() !== null;
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
        return false;
        // return hpmd.data.detect.os() == "iOS";
      },

      /**
       * Управляется ли устройство Android
       *
       * @return bool
       */
      isAndroid: function () {
        return true;
        return hpmd.data.detect.os() == "Android";
      },

      /**
       * Управляется ли устройство Windows Phone
       *
       * @return bool
       */
      isWP: function () {
        return false;
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
      EasingFunctions: {
        // no easing, no acceleration
        linear: function (t) { return t },
        // accelerating from zero velocity
        easeInQuad: function (t) { return t*t },
        // decelerating to zero velocity
        easeOutQuad: function (t) { return t*(2-t) },
        // acceleration until halfway, then deceleration
        easeInOutQuad: function (t) { return t<.5 ? 2*t*t : -1+(4-2*t)*t },
        // accelerating from zero velocity
        easeInCubic: function (t) { return t*t*t },
        // decelerating to zero velocity
        easeOutCubic: function (t) { return (--t)*t*t+1 },
        // acceleration until halfway, then deceleration
        easeInOutCubic: function (t) { return t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1 },
        // accelerating from zero velocity
        easeInQuart: function (t) { return t*t*t*t },
        // decelerating to zero velocity
        easeOutQuart: function (t) { return 1-(--t)*t*t*t },
        // acceleration until halfway, then deceleration
        easeInOutQuart: function (t) { return t<.5 ? 8*t*t*t*t : 1-8*(--t)*t*t*t },
        // accelerating from zero velocity
        easeInQuint: function (t) { return t*t*t*t*t },
        // decelerating to zero velocity
        easeOutQuint: function (t) { return 1+(--t)*t*t*t*t },
        // acceleration until halfway, then deceleration
        easeInOutQuint: function (t) { return t<.5 ? 16*t*t*t*t*t : 1+16*(--t)*t*t*t*t }
      },
      createAnimation: function() {
        function assign(target) {
          var slice = Array.prototype.slice;
          var sources = slice.call(arguments, 1);

          for (var i = 0; i < sources.length; i++) {
            for (var key in sources[i]) {
              if (sources[i].hasOwnProperty(key)) {
                target[key] = sources[i][key];
              }
            }
          }

          return target;
        }

        function Timeline(config) {
          this.config = {
            duration: 1000,
            delay: 0,
            onUpdate: function() {},
            onFinish: function() {},
            easingFn: function(x) { return x; }
          }

          assign(this.config, config);

          this.state = {
            startTime: null,
            currentTime: 0,
            progress: 0,
            isFinished: false
          }

          this.update = function() {
            if (this.state.isFinished) return;

            if (this.state.startTime === null) {
              this.state.startTime = Date.now();
            }

            this.state.currentTime = Date.now() - this.state.startTime;
            this.state.progress = this.state.currentTime < this.config.delay ? 0 : (this.state.currentTime - this.config.delay) / this.config.duration;

            if (this.state.progress >= 1) {
              this.state.isFinished = true;
              this.config.onUpdate(1);
              this.config.onFinish();
            } else if (this.state.progress > 0 && this.state.progress < 1) {
              this.config.onUpdate(this.config.easingFn(this.state.progress));
            }
          }
        }

        function Animation() {
          var self = this;

          this._timelines = [];
          this.timelines = [];

          this.rid = null;
          this.isPlaying = false;

          this._render = function() {
            if (self.isPlaying) self.rid = requestAnimationFrame(self._render);

            self.timelines = self.timelines.filter(function(timeline) {
              timeline.update();
              return !timeline.state.isFinished;
            });

            if (self.timelines.length === 0) {
              self.isPlaying = false;
            }
          }
        }

        Animation.prototype.addTimeline = function(config) {
          this._timelines.push(new Timeline(config));
        }

        Animation.prototype.start = function() {
          this.timelines = this._timelines;
          this.isPlaying = true;
          this.rid = requestAnimationFrame(this._render);
        }

        Animation.prototype.stop = function() {
          this.isPlaying = false;
          cancelAnimationFrame(this.rid);
        }

        return new Animation();
      },
      isClosed: false,
      isInteraction: false,
      initShake: function(config) {

        var slice = Array.prototype.slice;
        var state = {
          page: 1,
          isBlock: false
        }

        function Shake(options) {
          //feature detect
          this.hasDeviceMotion = 'ondevicemotion' in window;

          this.options = {
            threshold: 5, //default velocity threshold for shake to register
            timeout: 1 //default interval between events
          };

          this.options.threshold = options.threshold || 5;
          this.options.timeout = options.timeout || 1;

          if (typeof options === 'object') {
            for (var i in options) {
              if (options.hasOwnProperty(i)) {
                this.options[i] = options[i];
              }
            }
          }

          //use date to prevent multiple shakes firing
          this.lastTime = new Date();

          //accelerometer values
          this.lastX = null;
          this.lastY = null;
          this.lastZ = null;

          this.listeners = [];
        }

        Shake.prototype.observe = function (listener) {
          this.listeners.push(listener);
        };

        //reset timer values
        Shake.prototype.reset = function () {
          this.lastTime = new Date();
          this.lastX = null;
          this.lastY = null;
          this.lastZ = null;
        };

        //start listening for devicemotion
        Shake.prototype.start = function () {
          this.reset();
          // if (this.hasDeviceMotion) {
          // 	window.addEventListener('devicemotion', this.devicemotion, false);
          // }
          this.devicemotion = this.devicemotion.bind(this)
          window.addEventListener('deviceorientation', this.devicemotion, false);
        };

        //stop listening for devicemotion
        Shake.prototype.stop = function () {
          // if (this.hasDeviceMotion) {
          // 	window.removeEventListener('devicemotion', this.devicemotion, false);
          // }
          window.removeEventListener('deviceorientation', this.devicemotion, false);
          this.reset();
        };

        //calculates if shake did occur
        Shake.prototype.devicemotion = function (e) {
          var current = e;
          var currentTime;
          var timeDifference;
          var deltaX = 0;
          var deltaY = 0;
          var deltaZ = 0;

          if ((this.lastX === null) && (this.lastY === null) && (this.lastZ === null)) {
            this.lastX = current.alpha;
            this.lastY = current.beta;
            this.lastZ = current.gamma;
            return;
          }

          deltaX = Math.abs(this.lastX - current.alpha);
          deltaY = Math.abs(this.lastY - current.beta);
          deltaZ = Math.abs(this.lastZ - current.gamma);

          if (
            ((deltaX > this.options.threshold) && (deltaY > this.options.threshold * 0.5)) ||
            ((deltaX > this.options.threshold) && (deltaZ > this.options.threshold * 0.5)) ||
            ((deltaY > this.options.threshold) && (deltaZ > this.options.threshold * 0.5)) ||
            ((deltaX > this.options.threshold * 0.5) && (deltaY > this.options.threshold)) ||
            ((deltaX > this.options.threshold * 0.5) && (deltaZ > this.options.threshold)) ||
            ((deltaY > this.options.threshold * 0.5) && (deltaZ > this.options.threshold))
          ) {
            //calculate time in milliseconds since last shake registered
            currentTime = new Date();
            timeDifference = currentTime.getTime() - this.lastTime.getTime();

            if (timeDifference > this.options.timeout) {
              // window.dispatchEvent(this.event);
              this.listeners.forEach(function(listener) {
                listener('shake');
              })
              this.lastTime = new Date();
            }
          }

          this.lastX = current.alpha;
          this.lastY = current.beta;
          this.lastZ = current.gamma;
        };



        //event handler
        Shake.prototype.handleEvent = function (e) {
          if (typeof (this[e.type]) === 'function') {
            return this[e.type](e);
          }
        };

        return new Shake(config);
      },
      getAbsoluteBoundingRect: function getAbsoluteBoundingRect(el) {
        var doc  = document,
          win  = window,
          body = doc.body,
          // pageXOffset и pageYOffset работают везде, кроме IE <9.
          offsetX = win.pageXOffset !== undefined ? win.pageXOffset :
            (doc.documentElement || body.parentNode || body).scrollLeft,
          offsetY = win.pageYOffset !== undefined ? win.pageYOffset :
            (doc.documentElement || body.parentNode || body).scrollTop,

          rect = el.getBoundingClientRect();

        if (el !== body) {
          var parent = el.parentNode;

          // На прямоугольник элемента будут влиять позиции прокрутки
          // *всех* его прокручиваемых родители, а не только окна, поэтому нам нужно
          // пройтись по дереву и собрать каждое смещение прокрутки.

          while (parent !== body && parent !== null) {
            if (parent.scrollLeft) offsetX += parent.scrollLeft;
            if (parent.scrollTop)  offsetY += parent.scrollTop;
            parent = parent.parentNode;
          }
        }

        return {
          bottom: rect.bottom + offsetY,
          height: rect.height,
          left  : rect.left + offsetX,
          right : rect.right + offsetX,
          top   : rect.top + offsetY,
          width : rect.width
        };
      },
      viewIID: null,
      checkViewability: function(prefix, callback) {
        function has(item, value) {
          return item.indexOf(value) > -1;
        }
        function isDOMElement(elem) {
          return elem instanceof Element
        }
        function def(value) {
          return value !== undefined && value !== null;
        }
        function findOverlapElems(elem) {
          var coords;

          coords = {
            w: window.innerWidth,
            h: window.innerHeight,
            x: 0,
            y: 0
          };

          function collectElems(acc, coord, index) {
            var item = isOverlap(
              elem,
              coord.x,
              coord.y
            );

            return (
              item.overlap &&
              isDOMElement(item.elem) &&
              !has(acc, item.elem)
            ) ? acc.concat(item.elem) : acc;
          }

          return generateGrid(5, coords).reduce(collectElems, []);
        }

        function getOverlapPersantage(elems) {
          var elems = findOverlapElems(hpmd.data.nodes.popup);
          function getSize(rectX, rectW, innWidth) {
            rectW = ((rectW + rectX) > innWidth) ? innWidth : rectW;
            return rectX < 0 ?
              rectW + rectX :
              (rectX + rectW > innerWidth) ?
                rectW - (rectX + rectW - innWidth) :
                rectW;
          }

          function getIntersectingRectangle(r1, r2) {
            var x = Math.max(r1.left, r2.left),
              y = Math.max(r1.top, r2.top),
              w = Math.min(r1.left + r1.width,  r2.left + r2.width)  - x,
              h = Math.min(r1.top  + r1.height, r2.top  + r2.height) - y;

            return {
              x: x,
              y: y,
              w: w,
              h: h
            };
          };

          return elems.reduce(function(acc, elem) {
            var rect1 = hpmd.data.getAbsoluteBoundingRect(elem);
            var rect2 = hpmd.data.getAbsoluteBoundingRect(
              hpmd.data.nodes.popup
            );

            var elemCoord3 = getIntersectingRectangle(
              rect1,
              rect2
            );

            var p1 = elemCoord3.w * elemCoord3.h;
            var p2 = rect2.width * rect2.height;
            var percent = Math.round(((p1 / p2) || 0) * 100);

            return acc + percent;
          }, 0);
        }
        function generateGrid(num, coords) {
          var x = coords.x;
          var y = coords.y;
          var width  = coords.w;
          var height = coords.h;
          var grid = [];
          var coord = {};

          for (var j = 0; j <= num; j++) {
            for (var i = 0; i <= num; i++) {
              coord = {
                x: Math.round(width  / num * i + x + ((i === 0) ? 2 : -2)),
                y: Math.round(height / num * j + y + ((j === 0) ? 2 : -2))
              }
              grid.push(coord);
            }
          }

          return grid;
        }
        function assign(target) {
          var slice = Array.prototype.slice;
          var sources = slice.call(arguments, 1);

          for (var i = 0; i < sources.length; i++) {
            for (var key in sources[i]) {
              if (sources[i].hasOwnProperty(key)) {
                target[key] = sources[i][key];
              }
            }
          }

          return target;
        }
        function isOverlap(elem, x, y) {
          var returnValue = {
            overlap: false,
            elem: null
          }

          if (!isDOMElement(elem))
            return returnValue;

          try {
            var rect = hpmd.data.getAbsoluteBoundingRect(elem);
            var htmlElem = document.documentElement;
            var screenWidth  = htmlElem.clientWidth  || window.innerWidth;
            var screenHeight = htmlElem.clientHeight || window.innerHeight;
            var sizesSum = elem.offsetWidth + elem.offsetHeight + rect.height + rect.width;
            var elemCenter = {
              x: x || rect.left + elem.offsetWidth  / 2,
              y: y || rect.top  + elem.offsetHeight / 2
            };
            var pointContainer = document.elementFromPoint(elemCenter.x, elemCenter.y);
            var pointContainer2 = pointContainer;

            var style = getComputedStyle(elem);

            if (style.display === 'none')
              return returnValue;

            if (style.visibility !== 'visible')
              return returnValue;

            if (style.opacity < 0.1)
              return returnValue;

            if (sizesSum === 0)
              return returnValue;

            if (elemCenter.x < 0)
              return returnValue;

            if (elemCenter.x > screenWidth)
              return returnValue;

            if (elemCenter.y < 0)
              return returnValue;

            if (elemCenter.y > screenHeight)
              return returnValue;

            do {
              if (pointContainer === elem) {
                return assign(
                  returnValue,
                  { overlap: true }
                );
              }
            }
            while (pointContainer = pointContainer.parentNode);

            return assign(
              returnValue,
              {
                overlap: true,
                elem:  (
                  def(pointContainer2) &&
                  !has(pointContainer2.className, prefix) &&
                  !has(pointContainer2.id, prefix)
                ) ? pointContainer2 : null
              }
            );

          } catch(e) {
            return returnValue;
          }
        }

        hpmd.data.viewIID = setInterval(function() {
          var percent = getOverlapPersantage(
            findOverlapElems(hpmd.data.nodes.popup)
          ) || 0;

          percent = percent > 100 ? 100 : percent;

          if (percent > 0) {
            callback(percent);
          }
        }, 1000);
      },
      bannerIsOpened: false,
      /**
       * Выводит баннер на экран
       */
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

          // Ждем завершения анимации.
          setTimeout(function () {
            /* TODO: добавьте сюда все, что должно быть сделано
             * после полного появления фуллскрина на экране.
             *
             * Например, на этом этапе могут быть запущены программные
             * анимации или ресурсоемкие процедуры.
             */
            var isLaunched = false;
            var shakeEvent = hpmd.data.initShake({
              threshold: 7,
              timeout: 100
            });

            hpmd.data.handleSwipe(document.querySelector('#hpmdf-first-part'), {
              tap: function () {
                if (!isLaunched) {
                  isLaunched = true;
                  hpmd.data.nodes['first-page'].classList.add('hpmdf-disable');
                  hpmd.trackEvent('hpmd-interaction');
                  hpmd.data.isInteraction = true;
                  startAnim();
                }
              }
            });

            // shakeEvent.observe(function(event) {
            // 	if (!isLaunched) {
            // 		isLaunched = true;
            // 		hpmd.data.nodes['first-page'].classList.add('hpmdf-disable');
            // 		hpmd.trackEvent('hpmd-interaction');
            // 		hpmd.data.isInteraction = true;
            // 		startAnim();
            // 		shakeEvent.stop();
            // 	}
            // });



            shakeEvent.start();


            var gamma = null;

            var tid = null;

            // window.addEventListener('deviceorientation', function(event) {
            // 	if (!hpmd.data.isPortrait() || isRotating) return;

            // 	if (gamma === null) {
            // 		gamma = event.gamma;
            // 	}

            // 	if (event.gamma >= gamma + 3 || event.gamma <= gamma - 3) {
            // 		clearTimeout(tid);
            // 		gamma = event.gamma;

            // 		tid = setTimeout(function() {
            // 			if (!isLaunched) {
            // 				isLaunched = true;
            // 				hpmd.data.nodes['first-page'].classList.add('hpmdf-disable');
            // 				hpmd.trackEvent('hpmd-interaction');
            // 				hpmd.data.isInteraction = true;
            // 				// startAnim();
            // 				shakeEvent.stop();
            // 			}
            // 		}, 20);
            // 	}
            // });



            var anim1 = hpmd.data.createAnimation();

            function setTransform(node, properties) {
              node.style.WebkitTransform = properties;
              node.style.MozTransform = properties;
              node.style.OTransform = properties;
              node.style.transform = properties;
            }

            function startAnim() {
              isLaunched = true;
              setTimeout(function() {
                hpmd.data.nodes['smoke-init'].classList.add('hpmdf-disable');
              }, 2500);

              hpmd.data.nodes['iframe'].contentWindow.postMessage(JSON.stringify({
                name: 'hpmd',
                action: 'start-anim2',
                data: {
                  width: window.innerWidth,
                  height: window.innerHeight
                }
              }), '*');
            }

            // setTimeout(function() {
            // 	if (!isLaunched) {
            // 		isLaunched = true;

            // 		hpmd.data.nodes['first-page'].classList.add('hpmdf-disable');

            // 		setTimeout(function() {
            // 		hpmd.data.nodes['smoke-init'].classList.add('hpmdf-disable');
            // 	}, 2500);
            // 		hpmd.data.nodes['iframe'].contentWindow.postMessage(JSON.stringify({
            // 			name: 'hpmd',
            // 			action: 'start-anim2',
            // 			data: {
            // 				width: window.innerWidth,
            // 				height: window.innerHeight
            // 			}
            // 		}), '*');
            // 	}
            // }, 4000);

            hpmd.data.checkViewability('hpmdf', function(percent) {
              console.log(percent);
              hpmd.trackEvent('hpmd.overlap', {
                weight: percent
              });
              clearInterval(hpmd.data.viewIID);
            });

          }, 600);
        }, hpmd.data.isIOs() || hpmd.data.isWP() ? 0 : 100);
      },

      /**
       * Закрывает баннер
       */
      closeBanner: function () {
        if (!!hpmd.data.openedAt) {
          hpmd.data.trackEvent("hpmd.close");
        }
        hpmd.data.isClosed = true;
        // Восстанавливаем скролл на странице.
        hpmd.data.enableScroll();

        // Скрываем фуллскрин...
        hpmd.data.nodes.popup.className = 'hpmdf-popup-steady';

        clearInterval(hpmd.data.viewIID);

        hpmd.close();
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
      device: '',
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
            tap: function(e){
              e.stopPropagation();
              hpmd.data.closeBanner()
            }
          });

          // Для отладки на десктопе также привязывамся к событию click.
          hpmd.data.attachHandler(hpmd.data.nodes['popup-close'], 'click', function(e){
            e.stopPropagation();
            hpmd.data.closeBanner()
          });
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
        hpmd.data.trackImp('qwe');
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

      trackEvent: function(event) {
        var img = new Image();
        img.src = 'https://px.adhigh.net/p/conversion.gif?b=[[BID_RESPONSE_STRING]]&pixel_id=' + encodeURIComponent(event);
      },

      trackImp: function(event) {
        var img = new Image();
        img.src = 'https://px.adhigh.net/p/imp.gif?b=[[BID_RESPONSE_STRING]]';
      }

    };

    /* Инициализируем баннер */
    hpmd.data.init();

    /**
     * Составляем список картинок, нужных для отображения
     * первого экрана баннера, в зависимости от текущей ориентации
     */
    var images;
    if (hpmd.data.isPortrait()) {
      // портретная ориентация
      images = [
        // кнопка закрытия
        "https://creatives.getintent.com/close.png",

        // // фоновое изображение
        "https://creatives.getintent.com/portrait.jpg",
        "https://creatives.getintent.com/smoke-init.jpg",
        "https://creatives.getintent.com/tap.png",
        "https://creatives.getintent.com/title.png",
        "https://creatives.getintent.com/vol1.png"
      ];
    } else {
      // ландшафтная ориентация
      images = [
        // кнопка закрытия
        "https://creatives.getintent.com/close.png",

        // // фоновое изображение
        "https://creatives.getintent.com/portrait.jpg",
        "https://creatives.getintent.com/smoke-init.jpg",
        "https://creatives.getintent.com/tap.png",
        "https://creatives.getintent.com/title.png",
        "https://creatives.getintent.com/vol1.png"
      ];
    }

    /**
     * Запускаем предварительную загрузку картинок
     */
    window.addEventListener('message', function(event) {
      var data = event.data;
      var pixelRatio = window.devicePixelRatio || 1;

      try {
        data = JSON.parse(event.data);

        if (data.name === 'hpmd') {
          switch (data.action) {
            case 'page-loaded':
              hpmd.data.nodes['iframe'].contentWindow.postMessage(JSON.stringify({
                name: 'hpmd',
                action: 'start-anim',
                data: {
                  width: window.innerWidth,
                  height: window.innerHeight
                }
              }), '*');
              hpmd.data.preloadImages(images, function () {
                setTimeout(function() {
                  hpmd.data.openBanner();
                }, 500)
                /**
                 * После того, как картинки загрузились, отображаем
                 * баннер на экране:
                 */



                var preloadTime = Math.ceil((Date.now() - startTime) / 1000 + 0.01);

                hpmd.trackEvent('hpmd.loading', {
                  weight: preloadTime
                });
              });
              break;
            case 'final':
              hpmd.data.nodes['iframe'].classList.add('hpmdf-disable');
              setTimeout(function() {
                hpmd.data.nodes['pers-name'].classList.add('hpmdf-active');
              }, 510);
              setTimeout(function() {
                if (hpmd.data.isInteraction) {
                  hpmd.trackEvent('hpmd-interaction-final');
                } else {
                  hpmd.trackEvent('hpmd-auto-final');
                }
                hpmd.data.nodes['final'].classList.add('hpmdf-active');
                hpmd.data.nodes['final-part'].classList.add('hpmdf-active');
                hpmd.data.nodes['sixteen'].setAttribute('data-text', 2);
                hpmd.data.nodes['bottom-hint'].setAttribute('data-text', 2);
              }, 2000);
              break;
          }
        }
      } catch (e) {}
    });


    /* КОД-ПРИМЕР
     *
     * Вам может быть необходимо удалить или обновить этот код.
     *
     * Открываем кликовую ссылку при нажатии на кнопку (элемент
     * .hpmdf-button).
     */
    hpmd.data.handleSwipe(document.querySelector('#hpmdf-popup'), {
      tap: function () {
        hpmd.data.closeBanner();
        setTimeout(function(){
          window.open("[[CLICK_PREFIX]]", "_blank");
        }, 200);
      },
    });
    document.querySelector('#hpmdf-popup').addEventListener('click', function() {
      hpmd.data.closeBanner();
      setTimeout(function(){
        window.open("[[CLICK_PREFIX]]", "_blank");
      }, 200);
    });
  }

  banner.id = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 10);
  banner.placementId = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 10);

  function processCSSRules(styleSheet, idPrefix, kfPrefix) {
    /**
     * Index of rule currently processed
     * @type {number}
     */
    let index = 0;
    /**
     * Total number of rules in the stylesheet
     * @type {number}
     */
    let total = styleSheet.cssRules.length;
    /**
     * Shortcut to CSS rule in use
     * @type {CSSRule}
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/CSSRule}
     */
    let rule;
    /**
     * New CSS for rule currently in use
     * @type {string}
     */
    let cssText;



    // Iterate until there's no more rules
    while (index < total) {
      // A shortcut to current rule
      rule = styleSheet.cssRules[index];

      // Check the rule type
      if (rule.type === rule.STYLE_RULE) {
        // A "regular" rule consisting of a selector
        // and some CSS declarations.

        // Check if we need to rewrite animation names
        // (including vendor-prefixed properties)
        let animationNameList = [
          "animationName",
          "webkitAnimationName",
          "msAnimationName",
          "oAnimationName",
          "mozAnimationName",
        ];

        for (let i = 0; i < animationNameList.length; i++) {
          // This rule have that declaration?
          if (rule.style[animationNameList[i]]) {
            // WP / IE11 has a bug. One 'animation-name:' rule is exposed
            // as animationName, webkitAnimationName and msAnimationName
            // simultaneously, so that naive implementation results
            // in three prefixes instead of just one.
            //
            // Check that we don't have a prefix for this rule yet:
            if (rule.style[animationNameList[i]].indexOf(kfPrefix) === 0) {
              // Oops, there's already a prefix. Let's move on.
              continue;
            }

            // Okay, add a prefix to animation name
            rule.style[animationNameList[i]] = kfPrefix + rule.style[animationNameList[i]];
          }
        }

        // .selectorText is read-only in IE and Firefox,
        // so we cannot update existing rule. Generate
        // CSS for a new one instead:

        // selector prefix after every comma
        //
        // NOTE: this will corrupt stylesheets using construct like
        // > div[title='a,b,c']
        // Try to avoid using them.
        let prefixedCommaSeparatedRules = rule.selectorText.replace(/,/g, `, ${idPrefix} `);

        /**
         * 1. Prefix
         * 2. Prefixes after every comma
         * 3. Rule body
         * @type {string}
         */
        cssText = `${idPrefix} ${prefixedCommaSeparatedRules} {${rule.style.cssText}}`;

        // Replace rule: delete old one and insert new
        // at the same position
        styleSheet.deleteRule(index);
        styleSheet.insertRule(cssText, index);

      } else if (
        rule.type === rule.KEYFRAMES_RULE ||
        rule.type === rule.WEBKIT_KEYFRAMES_RULE ||
        rule.type === rule.MOZ_KEYFRAMES_RULE ||
        rule.type === rule.MS_KEYFRAMES_RULE
      ) {
        // A @keyframes rule (including vendor-prefixed variants).
        // Animation name must be prefixed.
        rule.name = kfPrefix + rule.name;

      } else if (rule.cssRules && rule.cssRules.length) {
        // Unknown rule, but it has children rules (it may be @media, @supports etc).
        // Recursively process these.
        processCSSRules(rule, idPrefix, kfPrefix);
      } else if (rule.type === rule.IMPORT_RULE) {
        // An @import rule.
        // We cannot process this (actually, we may not even be able to load it
        // in the first place). For the sake of safety, deny any imports and remove
        // the rule.
        //
        // If you want to use a font from Google.Webfonts and the like... well, don't
        // do that. Site webmasters definitely won't be happy about this. Consider using
        // either images or iframes.
        styleSheet.deleteRule(index);
        // Rewind back one step...
        index--;
        // and decrease rules count (we've just destroyed one).
        total--;
      }

      // Go to the next rule
      index++;

    }
  }

  var embedCss = function(css, idPrefix) {
    let style = document.createElement('style');
    style.setAttribute('type', 'text/css');
    style.innerHTML = css;

    document.head.appendChild(style);

    style.sheet.disabled = true;

    processCSSRules(style.sheet, '#umatags-slot-' + idPrefix, 'kf-prefix-' + idPrefix);

    style.sheet.disabled = false;

    return style;
  }

  var calcSlot = function(placement, bannerId) {

    let document = top.document;
    let slot = document.createElement('div');
    slot.setAttribute('id', `umatags-slot-${bannerId}`);
    slot.classList.add('umatags-slot');

    placement.element = document.createElement('div');
    document.body.appendChild(placement.element);

    placement.element.appendChild(slot);
    placement.element.style.display = 'block';
    placement.element.style.visibility = 'visible';

    return slot
  }

  let _elementCallback = function(node) {
    banner.nodes.push( node );
  };

  var injectHtml = function(container, htmlTextOrElements, elementCallback, callback) {
    let scripts;
    let node;
    let div = document.createElement('div');


    // If passed html is a string - save it as innerHTML
    // Otherwise it must be DOM Nodes created from external script
    // during document.write operation (like Sizmek banners)
    if (typeof htmlTextOrElements === 'string') {
      div.innerHTML = htmlTextOrElements;
    } else {
      while ( (node = htmlTextOrElements.shift()) ) {
        div.appendChild( node );
      }
    }

    while (div.childNodes.length > 0) {
      // Take banner wrapper element
      node = div.childNodes[0];

      container.appendChild( node );
      elementCallback && elementCallback( node );
    }

    callback && callback();
  }

  banner.slot = calcSlot(banner.placement, banner.id);
  banner.nodes = [ embedCss(banner.css, banner.id) ];

  var hpmd = {
    close: function() {
      try {
        hpmd.data.destroy()
      } catch(e) {
        // silent catch
      }
      // Was inside try {} for some reason
      if (banner.nodes && banner.nodes.length) {
        for (let i = 0; i < banner.nodes.length; i++) {
          try {
            banner.nodes[i].parentNode.removeChild( banner.nodes[i] )
          } catch(e) {
            // silent catch
          }
        }
      }
    }
  }

  injectHtml(banner.slot, banner.html, _elementCallback, function() {
    loadScript('https://cdnjs.cloudflare.com/ajax/libs/mobile-detect/1.4.4/mobile-detect.min.js', function() {
    banner.js(hpmd);
    })
  });

})()
