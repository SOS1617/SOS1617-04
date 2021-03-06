angular.module("ManagerApp", ["ngRoute"]).config(function($routeProvider, $locationProvider) {

    $routeProvider
    /**
     *
     */
        .when("/", {
            templateUrl: "main.html"

        })
        .when("/analytics", {
            templateUrl: "/analytics.html",
            controller: "IntegrationsCtrl"

        })
        .when("/governance", {
            templateUrl: "/governance.html",

        })
        .when("/integrations", {
            templateUrl: "/integrations.html"


        })
        .when("/about", {
            templateUrl: "/about.html",


        })




    /**
     *
     */
    .when("/export", {
            templateUrl: "export/listExport.html",
            controller: "ListCtrlExport",
        })
        .when("/export/:province/:year", {
            templateUrl: "/export/editExport.html",
            controller: "EditCtrlExport"
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
        .when("/highProxyExport", {
            templateUrl: "/export/highProxyExport.html",
            controller: "HighProxyExportCtrl"
        })
        .when("/corsExport", {
            templateUrl: "/export/corsExport.html",
            controller: "CorsExportCtrl"
        })
        .when("/exportApi1", {
            templateUrl: "/export/exportApi1.html",
            controller: "ExportApi1Ctrl"
        })
        .when("/exportApi2", {
            templateUrl: "/export/exportApi2.html",
            controller: "ExportApi2Ctrl"
        })



    /**
     *
     */
    .when("/area", {
            templateUrl: "/area/listArea.html",
            controller: "ListCtrlArea"
        })
        .when("/area/:province/:year", {
            templateUrl: "/area/editArea.html",
            controller: "EditCtrlArea"
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
        .when("/highProxyArea", {
            templateUrl: "/area/highProxyArea.html",
            controller: "HighProxyAreaCtrl"
        })
        .when("/corsArea", {
            templateUrl: "/area/corsArea.html",
            controller: "CorsAreaCtrl"
        })
        .when("/plotlyExtArea", {
            templateUrl: "/area/plotly-ext.html",
            controller: "PlotlyExtCtrl"
        })
        .when("/chartistExtArea", {
            templateUrl: "/area/chartist-ext.html",
            controller: "ChartistExtCtrl"
        })
        /**
         * 
         */
        // https://market.mashape.com/divad12/numbers-1
        .when("/apiLuis1", {
            templateUrl: "/price/api1.html",
            controller: "api1"
        })
        // https://market.mashape.com/neutrinoapi/phone-validate
        .when("/apiLuis2", {
            templateUrl: "/price/api2.html",
            controller: "api2"
        })
        .when("/highPrice1", {
            templateUrl: "/price/highcharts.1.html",
            controller: "HighchartsCtrlPrice1"
        })
        .when("/highPrice2", {
            templateUrl: "/price/highcharts.2.html",
            controller: "HighchartsCtrlPrice2"
        })
        .when("/price", {
            templateUrl: "/price/listPrice.html",
            controller: "ListCtrlPrice"
        })
        .when("/price-stats/:province/:year", {
            templateUrl: "/price/editPrice.html",
            controller: "EditCtrlPrice"
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
});
