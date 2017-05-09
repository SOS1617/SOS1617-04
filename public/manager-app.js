angular.module("ManagerApp", ["angularUtils.directives.dirPagination", "ngRoute"]).config(function($routeProvider, $locationProvider) {

    $routeProvider
        .when("/", {
            templateUrl: "main.html"

        })
        .when("/export", {
            templateUrl: "export/listExport.html",
            controller: "ListCtrlExport",

        })
        .when("/export/:province/:year", {
            templateUrl: "/export/editExport.html",
            controller: "EditCtrlExport"
        })
        .when("/price", {
            templateUrl: "/price/listPrice.html",
            controller: "ListCtrlPrice"
        })
        .when("/price/:province/:year", {
            templateUrl: "/export/editPrice.html",
            controller: "EditCtrlPrice"
        })
        .when("/area", {
            templateUrl: "/area/listArea.html",
            controller: "ListCtrlArea"
        })
        .when("/area/:province/:year", {
            templateUrl: "/area/editArea.html",
            controller: "EditCtrlArea"
        })
         .when("/highExport", {
            templateUrl: "/export/highcharts.html",
            controller: "HighExportCtrl"
        })
         .when("/geoExport", {
            templateUrl: "/export/geochart.html",
            controller: "GeoExportCtrl"
        })
        .when("/tauExport", {
            templateUrl: "/export/tauchart.html",
            controller: "TauchartsCtrl"
        })
        .when("/highArea", {
            templateUrl: "/area/highcharts.html",
            controller: "HighAreaCtrl"
        })
         .when("/geoArea", {
            templateUrl: "/area/geochart.html",
            controller: "GeoAreaCtrl"
        })
        .when("/plotlyArea", {
            templateUrl: "/area/plotly.html",
            controller: "PlotlyCtrl"
        })
         .when("/highPrice", {
            templateUrl: "/price/highcharts.html",
            controller: "HighchartsCtrlPrice"
        })
         .when("/geoPrice", {
            templateUrl: "/price/geochart.html",
            controller: "GeochartsCtrlPrice"
        })/*
        .when("/tauExport", {
            templateUrl: "/price/tauchart.html",
            controller: "TauchartsCtrlPrice"
        })*/
        .when("/analytics", {
            templateUrl: "/analytics.html",
            
        })
<<<<<<< HEAD


    console.log("App initialized");
});angular.module("ManagerApp", ["angularUtils.directives.dirPagination", "ngRoute"]).config(function($routeProvider, $locationProvider) {

    $routeProvider
        .when("/", {
            templateUrl: "main.html"

        })
        .when("/export", {
            templateUrl: "export/listExport.html",
            controller: "ListCtrlExport",

        })
        .when("/export/:province/:year", {
            templateUrl: "/export/editExport.html",
            controller: "EditCtrlExport"
        })
        .when("/price", {
            templateUrl: "/price/listPrice.html",
            controller: "ListCtrlPrice"
        })
        .when("/price/:province/:year", {
            templateUrl: "/export/editPrice.html",
            controller: "EditCtrlPrice"
        })
        .when("/area", {
            templateUrl: "/area/listArea.html",
            controller: "ListCtrlArea"
        })
        .when("/area/:province/:year", {
            templateUrl: "/area/editArea.html",
            controller: "EditCtrlArea"
        })
         .when("/highExport", {
            templateUrl: "/export/highcharts.html",
            controller: "HighExportCtrl"
        })
         .when("/geoExport", {
            templateUrl: "/export/geochart.html",
            controller: "GeoExportCtrl"
        })
        .when("/tauExport", {
            templateUrl: "/export/tauchart.html",
            controller: "TauchartsCtrl"
        })
        .when("/highArea", {
            templateUrl: "/area/highcharts.html",
            controller: "HighchartsCtrl"
        })
         .when("/geoArea", {
            templateUrl: "/area/geochart.html",
            controller: "GeochartsCtrl"
        })
        .when("/plotlyArea", {
            templateUrl: "/area/plotly.html",
            controller: "PlotlyCtrl"
        })
         .when("/highPrice", {
            templateUrl: "/price/highcharts.html",
            controller: "HighchartsCtrlPrice"
        })
         .when("/geoPrice", {
            templateUrl: "/price/geochart.html",
            controller: "GeochartsCtrlPrice"
        })
        .when("/emberPrice", {
            templateUrl: "/price/emberchart.html",
            controller: "EmberChartsCtrlPrice"
        })
        ;
=======
>>>>>>> 5ee4f9b020fce86f48794c90a4af1ad9be2bd97c


    console.log("App initialized");
});
