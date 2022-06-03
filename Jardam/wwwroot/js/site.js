


//var weather5Days;
//var option;
//var myChart;
//var datetimeAndPopWeather5Days;
//var dateAndPopWeather5Days;


//option = {
//    grid: {
//        left: '15%'
//    },
//    title: {
//        text: 'Идельный день для мойки',
//        subtext: ''
//    },
//    tooltip: {
//        trigger: 'axis',
//        axisPointer: {
//            type: 'cross'
//        }
//    },
//    toolbox: {
//        show: true,
//        feature: {
//            saveAsImage: {}
//        }
//    },
//    xAxis: {
//        type: 'category',
//        boundaryGap: false,
//        // prettier-ignore
//        data: ['00:00', '01:15', '02:30', '03:45', '05:00', '06:15', '07:30', '08:45', '10:00', '11:15', '12:30', '13:45', '15:00', '16:15', '17:30', '18:45', '20:00', '21:15', '22:30', '23:45']
//    },
//    yAxis: {
//        type: 'value',
//        axisLabel: {
//            formatter: '{value} %'
//        },
//        axisPointer: {
//            snap: true
//        }
//    },
//    visualMap: {
//        show: false,
//        dimension: 0,
//        pieces: [
//            {
//                lte: 6,
//                color: 'green'
//            },
//            {
//                gt: 6,
//                lte: 8,
//                color: 'red'
//            },
//            {
//                gt: 8,
//                lte: 14,
//                color: 'green'
//            },
//            {
//                gt: 14,
//                lte: 17,
//                color: 'red'
//            },
//            {
//                gt: 17,
//                color: 'green'
//            }
//        ]
//    },
//    series: [
//        {
//            name: 'Идеальность',
//            type: 'line',
//            smooth: true,
//            // prettier-ignore
//            data: [300, 280, 250, 260, 270, 300, 550, 500, 400, 390, 380, 390, 400, 500, 600, 750, 800, 700, 600, 400],
//            //markArea: {
//            //    itemStyle: {
//            //        color: 'rgba(255, 173, 177, 0.4)'
//            //    },
//            //    data: [
//            //        [
//            //            {
//            //                name: 'Morning Peak',
//            //                xAxis: '07:30'
//            //            },
//            //            {
//            //                xAxis: '10:00'
//            //            }
//            //        ],
//            //        [
//            //            {
//            //                name: 'Evening Peak',
//            //                xAxis: '17:30'
//            //            },
//            //            {
//            //                xAxis: '21:15'
//            //            }
//            //        ]
//            //    ]
//            //}
//        }
//    ]
//};


//$(document).ready(function () {
//    moment.locale("ru");


//    weather5Days = JSON.parse($('#weather5DaysJson').text());

//    // дата
//    dateAndPopWeather5Days = [];

//    // дата и время
//    datetimeAndPopWeather5Days = [];

//    // получить только дата-время и вероятность осадков
//    weather5Days.list.forEach(m => { datetimeAndPopWeather5Days.push({ pop: m.pop * 100, datetime: m.dt_txt }) })

//    // взять только максимальную вероятность осадков за день
//    datetimeAndPopWeather5Days.forEach(m => {

//        var onlyDate = moment(m.datetime).format('YYYY-MM-DD');

//        var indx = dateAndPopWeather5Days.map(m => m.date).indexOf(onlyDate);
//        // если такой даты ещё нет, то добавить
//        if (indx == -1) {

//            dateAndPopWeather5Days.push({
//                pop: m.pop,
//                date: onlyDate,
//                day: moment(onlyDate).format('ddd')
//            });

//        } else {
//            // иначе, присвоить если это значение больше 
//            if (dateAndPopWeather5Days[indx].pop < m.pop) {
//                dateAndPopWeather5Days[indx].pop = m.pop;
//            }
//            // иначе, просто просуммировать
//            //dateAndPopWeather5Days[indx].pop = (dateAndPopWeather5Days[indx].pop + m.pop) / 2;
//        }

//    });
    

//    option.xAxis.data = dateAndPopWeather5Days.map(m => m.day);
//    option.series[0].data = dateAndPopWeather5Days.map(m => Math.round(100 - m.pop));

//    // построить график
//    var chartDom = document.getElementById('main');
//    myChart = echarts.init(chartDom);

//    option && myChart.setOption(option);

//    a();
//});


//var less60Indxs = [];

//function a() {
//    less60Indxs = [];
//    dateAndPopWeather5Days = [];

//    for (var i = 0; i < 20; i++) {
//        dateAndPopWeather5Days.push({ pop: Math.round(Math.random() * 100) });
//    }

//    // 1. X. найти индексы цифр в dateAndPopWeather5Days ниже 60%
//    // 2. посчитать количество цифр ниже 60 подряд, после Х 

    
//    dateAndPopWeather5Days.forEach((m, i) => {

//        if (m.pop < 60) {
//            less60Indxs.push({ index: i, cntAfter: 0 });
//        }
//    });

//    var prelastIndx = less60Indxs.length - 2;

//    var cnt = 0;

//    for (var i = prelastIndx; i >= 0; i--) {

//        var a = less60Indxs[i].index;
//        var b = less60Indxs[i + 1].index;

//        if (b - a == 1) {

//            cnt += 1;
//            less60Indxs[i].cntAfter = cnt;
//        }

//        //if (i - 1 == 0) {
//        //    less60Indxs[i].cntAfter = cnt;
//        //}

//        if (b - a != 1) {
//            cnt = 0;
//        }
//    }

//    // посчитать количество цифр ниже 60 подряд, после Х 
//    //dateAndPopWeather5Days.forEach((m, i) => { if (m.pop < 60) less60Indxs.push(i) })
//}













////function a() {

////    // 1. X. найти индексы цифр в dateAndPopWeather5Days ниже 60%
////    // 2. посчитать количество цифр ниже 60 подряд, после Х 

////    var less60Indxs = [];
////    var firstLess60Indx = null;

////    dateAndPopWeather5Days.forEach((m, i) => {

////        if (m.pop < 50) {

////            less60Indxs.push({ index: i, cntAfter: 0 });

////            if (firstLess60Indx == null) firstLess60Indx = i;

////        } else {
////            firstLess60Indx = null;
////        }


////        if (i > 0 && firstLess60Indx != null) {

////            for (var j = firstLess60Indx; j <= i; j++) {

////                less60Indxs[j].cntAfter += 1;
////            }
////        }
////    });

////    // посчитать количество цифр ниже 60 подряд, после Х 
////    //dateAndPopWeather5Days.forEach((m, i) => { if (m.pop < 60) less60Indxs.push(i) })


////}