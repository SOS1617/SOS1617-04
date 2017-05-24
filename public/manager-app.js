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
        .when("/price-stats/:province/:year", {
            templateUrl: "/price/editPrice.html",
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
        })
        .when("/canvajsPrice", {
            templateUrl: "/price/canvajschart.html",
            controller: "canvajsChartsCtrlPrice"
        })
        .when("/analytics", {
            templateUrl: "/analytics.html",
            
        })
         .when("/highPrice1", {
            templateUrl: "/price/highcharts.1.html",
            controller: "HighchartsCtrlPrice1"
        })
         .when("/highPrice2", {
            templateUrl: "/price/highcharts.2.html",
            controller: "HighchartsCtrlPrice2"
        })
         .when("/highProxyExport", {
            templateUrl: "/export/highProxyExport.html",
            controller: "HighProxyExportCtrl"
        })
         .when("/corsExport", {
            templateUrl: "/export/corsExport.html",
            controller: "CorsExportCtrl"
        })
        .when("/highProxyArea", {
            templateUrl: "/area/highProxyArea.html",
            controller: "HighProxyAreaCtrl"
        })
        .when("/corsArea", {
            templateUrl: "/area/corsArea.html",
            controller: "CorsAreaCtrl"
        })
        .when("/api1", {
            templateUrl: "/price/api1.html",
            controller: "api1"
        })
});
