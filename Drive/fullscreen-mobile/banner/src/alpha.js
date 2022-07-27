var canvas = $("<canvas></canvas>"),ctxW = 500,ctxH = 500,ctx;
$(canvas).attr("width",ctxW);
$(canvas).attr("height",ctxH);
$(canvas).attr("id","canvas");

$(function(){
    $("body").append(canvas);
    canvas = $("#canvas")[0];
    ctx = canvas.getContext("2d");
    loaderInfo.loader();
});
var data = [//Картинки которые будут показываться
    "http://img.lenagold.ru/a/avto/avto030.png",
    "http://s1.iconbird.com/ico/0912/My7icons/w512h5121347801471TravelBMV.png",
    "http://pngimg.com/uploads/bmw/bmw_PNG1674.png",
    "http://img0.liveinternet.ru/images/attach/d/1/129/964/129964588_17.png",
    "http://www.pngpix.com/wp-content/uploads/2016/02/BMW-Car-PNG-image-1.png",
    "http://pngimg.com/uploads/audi/audi_PNG1762.png",
    "http://www.pngmart.com/files/4/Car-PNG-Photo.png",
    "http://www.pngpix.com/wp-content/uploads/2016/06/PNGPIX-COM-Aston-Martin-V8-Vantage-N400-Orange-Car-PNG-Image-500x292.png"
];
var loaderInfo = {data:data,loaded:0, count:data.length, iload:function(){
        if(++loaderInfo.loaded == loaderInfo.count){
            handler();
        }
    },loader:function(){
        ctx.clearRect(0,0,ctxW,ctxH);
        ctx.fillText("Идет загрузка...",ctxW/2,ctxH/2);
        var tmpImg = [];
        this.data.map(function(el){
            tmpImg.push(new Image());
            tmpImg[tmpImg.length-1].src = el;
            tmpImg[tmpImg.length-1].addEventListener("load", loaderInfo.iload,false);
        });
        this.data = tmpImg;
    }};//Объект для загрузки изображений

var imgHandler = {
    data:[],
    imgNum:0/*порядковый номер катинки которую показать следующем*/,
    maxImg:5/*макс картинок*/,
    addImg:function(){//Показать следующую картинку
        var ot = loaderInfo.data[this.imgNum].width/loaderInfo.data[this.imgNum].height;//Соотношение сторон
        var maxw = 400;
        var width = Math.random() * (maxw - 100) + 100;//рандомная ширина от 100 до maxw px
        var height = parseInt(width/ot);//высота по соотношению
        var x = Math.random() * (ctxW - width);//Рандомный х
        var y = Math.random() * (ctxH - height);//Рандомный y
        this.data.push(new img(x,y,width,height,loaderInfo.data[this.imgNum])/*объект класса img*/);
        this.imgNum = (this.imgNum+1)%loaderInfo.data.length;//ставим следущую картинку по порядку
    },
    draw:function(){
        if(this.data.length == 0)//если нет картинок добавить одну
            this.addImg();
        if(this.data.length >= 5){//Если картинок более или равно максимуму,первую скрыть
            this.data[0].vector = false;
        }


        for(var i = 0; i < this.data.length;i++){
            if(i == this.data.length-1 && this.data[i].opacity == 1)//если у последней картинки полная непрозрачность начать показывать другую
                this.addImg();
            if(!this.data[i].vector && this.data[i].opacity == 0)//Если вектор выставлен на скрытие и картинка полностью прозрачная, удалить из массива
                this.data.splice(i--,1);
            else
                this.data[i].draw();
        }
    }
};//Объект управления эффектами
function img(x,y,w,h,src){//Класс картинки
    this.x = x;
    this.y = y;
    this.w = h;
    this.h = h;
    this.src = src;//image object
    this.opacity = 0;
    this.step = .01;
    this.vector = true;//true - show, false - hide
    this.draw = function(){

        ctx.globalAlpha = this.opacity;
        if(this.vector)
            this.opacity = this.opacity +this.step > 1?1:this.opacity +this.step;
        else
            this.opacity = this.opacity - this.step < 0?0:this.opacity -this.step;
        ctx.drawImage(this.src,this.x,this.y,this.w,this.h);
    }
}
function handler(){
    ctx.clearRect(0,0,ctxW,ctxH);
    imgHandler.draw();
    setTimeout(handler,1000/60);//60fps
}