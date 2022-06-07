
let helpNeedsData = [];
let helpNeedsActualData = [];
let myMap;
let myGeoObject;
let placemarks = [];
let polylines = [];

let showBeforeHours = 12;

$(document).ready(function(){
    moment.locale('ru'); 
    ymaps.ready(init);

    $('#map').css({
        height: (window.screen.availHeight - 150) + 'px', 
        width: window.screen.availWidth + 'px'
    });

    let timerId = setTimeout(function tick(){

        timerId = setTimeout(tick, 30*1000);

        getThenShowHelpNeeds();

    }, 30*1000);
    
    elementsChanges();
});


function elementsChanges() {
    
    $('#timeToShowRange').on('input', function () {
        $(this).trigger('change');
        $('#timeToShowTxt').text($(this).val());

        showBeforeHours = parseFloat($(this).val());

        
        showHelpNeeds();
        drawPolylines();
    });

}

function getThenShowHelpNeeds() {

    console.log("Обновление меток");
    $.ajax({
        type: "GET",
        url: "/HelpDatas",
        success: function (data) {

            helpNeedsData = data;
            // createDateTime: "2022-06-01T22:36:52.3999775"
            // lat: "112.00"
            // long: "1223.00"
            // userFirstName: "Куштар"
            // userLastName: "Тимка"

            
            showHelpNeeds();
            drawPolylines();
    
        },
        // error: function (xhr, ajaxOptions, thrownError) {
        //     console.log(xhr);
            
        // },
        // complete: function (data) {
        //     console.log(data);
            
        // }
    });
}

function showHelpNeeds() {
    
    helpNeedsActualData = [];

    // удалить все метки на карте
    removeAllPlacemarks();

    removeAllPolylines();

    let data = helpNeedsData;

    let halfAnHourAgo = moment().subtract(30, 'minutes').toDate().getTime();
    let twelveHoursAgo = moment().subtract(showBeforeHours, 'hours').toDate().getTime();

    let countPlacemark = 0;
    data.forEach(m => {

        // отображать метки не позднее 12 часов
        if (moment(m.createDateTime) < twelveHoursAgo) return;

        helpNeedsActualData.push(m);


        // метки до 30 минут красного цвета, если больше то серого цвета
        let iconColor = moment(m.createDateTime) > halfAnHourAgo ? 'red' : 'grey';

        // пользователь
        let forWhom = m.userFirstName != null ? '<b>' + m.userFirstName + m.userLastName + '</b>': 
            '<span class="text-muted">Неизвестно кто</span>';
        let balloonContent = "Вызов от: " +  forWhom;

        // время создания и сколько прошло
        balloonContent += "<br><b class='text-primary'>" + moment(m.createDateTime).fromNow() + "</b>";
        balloonContent += "<br>" + moment(m.createDateTime).format('HH:mm DD.MM.YYYY ');

        // добавить метку на карте
        let placemark = new ymaps.Placemark([parseFloat(m.lat), parseFloat(m.long)], {
            iconContent:  `ID-${m.helpDataID}.Нужна помощь! ${forWhom}`,
            balloonContent: balloonContent
        }, {
            preset: `islands#${iconColor}StretchyIcon`,
            iconColor: iconColor
        });

        placemarks.push(placemark);

        myMap.geoObjects.add(placemark);
        countPlacemark++;
    });
    $('#placemarkCount').text(countPlacemark);
}

function drawPolylines() {

    
    let usersIds = helpNeedsActualData.map(m => m.userID);    
    let uniqUsersIds = [... new Set(usersIds)];

    uniqUsersIds.forEach(u => {

        // получить координаты одного пользователья
        let coords = helpNeedsActualData.map(p => { 
            if (p.userID == u) return [parseFloat(p.lat), parseFloat(p.long)]
        });

        // убрать undefined
        coords = coords.filter(function( element ) {
            return element !== undefined;
        });

        if (coords.length < 2) return;

        // console.log(coords);

        // Создаем ломаную с помощью вспомогательного класса Polyline.
        var myPolyline = new ymaps.Polyline(
            // Указываем координаты вершин ломаной.
            coords
        , {
            // Описываем свойства геообъекта.
            // Содержимое балуна.
            balloonContent: "Ломаная линия"
        }, {
            // Задаем опции геообъекта.
            // Отключаем кнопку закрытия балуна.
            balloonCloseButton: false,
            // Цвет линии.
            strokeColor: "#000000",
            // Ширина линии.
            strokeWidth: 4,
            // Коэффициент прозрачности.
            strokeOpacity: 0.5
        });

        // Добавляем линии на карту.
        myMap.geoObjects.add(myPolyline);


        // добавить метку на карте чтобы знали конечную точку
        let placemark = new ymaps.Placemark(coords[coords.length - 1], {
        }, {
            preset: 'islands#greenCircleDotIcon',
            iconColor: 'green'
        });
        myMap.geoObjects.add(placemark);

        placemarks.push(placemark);

        polylines.push(myPolyline);
    });
}

function removeAllPlacemarks() {

    placemarks.forEach(p => myMap.geoObjects.remove(p));
}

function removeAllPolylines() {

    polylines.forEach(p => myMap.geoObjects.remove(p));
}


function getHelp() {
    getLocation();
}

function sendLocation(lat, long) {
    $.ajax({
        type: "POST",
        url: "/HelpDatas/Create",
        data: {
            Id : null,
            CreateDateTime  : null,
            Lat: lat + '',
            Long: long + '',
            UserID  : null,
            User  : null 
        },
         
        dataType: 'json',  
        success: function (data) {
            console.log(data);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr);
            
        },
        complete: function (data) {
            console.log(data);
            
        }
    });
}

function getLocation() {

  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
  }
}

function showPosition(position) {
    console.log(position.coords.latitude + ", " + position.coords.longitude);
    
    // myMap.geoObjects
    //     .add(new ymaps.Placemark([position.coords.latitude, position.coords.longitude], {
    //         iconContent: 'нужна помощь!',
    //         balloonContent: 'пользователь не зарегистрирован'
    //     }, {
    //         preset: 'islands#redStretchyIcon',
    //         iconColor: 'red'
    //     }));

    sendLocation(position.coords.latitude, position.coords.longitude);

    getThenShowHelpNeeds();
}

function init() {
    
        myMap = new ymaps.Map("map", {
            center: [42.882004, 74.582748],
            zoom: 12
        }, {
            searchControlProvider: 'yandex#search'
        });

        // Создаем геообъект с типом геометрии "Точка".
        myGeoObject = new ymaps.GeoObject({
            // Описание геометрии.
            // geometry: {
            //     type: "Point",
            //     coordinates: [42.882004, 74.582748]
            // },
        });
        // myPieChart = new ymaps.Placemark([
        //     55.847, 37.6
        // ], {
        //     // Данные для построения диаграммы.
        //     data: [
        //         {weight: 8, color: '#0E4779'},
        //         {weight: 6, color: '#1E98FF'},
        //         {weight: 4, color: '#82CDFF'}
        //     ],
        //     iconCaption: "Диаграмма"
        // }, {
        //     // Зададим произвольный макет метки.
        //     iconLayout: 'default#pieChart',
        //     // Радиус диаграммы в пикселях.
        //     iconPieChartRadius: 30,
        //     // Радиус центральной части макета.
        //     iconPieChartCoreRadius: 10,
        //     // Стиль заливки центральной части.
        //     iconPieChartCoreFillStyle: '#ffffff',
        //     // Cтиль линий-разделителей секторов и внешней обводки диаграммы.
        //     iconPieChartStrokeStyle: '#ffffff',
        //     // Ширина линий-разделителей секторов и внешней обводки диаграммы.
        //     iconPieChartStrokeWidth: 3,
        //     // Максимальная ширина подписи метки.
        //     iconPieChartCaptionMaxWidth: 200
        // });

    // myMap.geoObjects
    //     .add(myGeoObject)
    //     .add(new ymaps.Placemark([42.843318, 74.608349], {
    //         iconContent: 'нужна помощь!',
    //         balloonContent: 'пользователь не зарегистрирован'
    //     }, {
    //         preset: 'islands#redStretchyIcon',
    //         iconColor: 'red'
    //     }));

    getThenShowHelpNeeds();

}
