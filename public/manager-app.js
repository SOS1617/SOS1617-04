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
        });


    console.log("App initialized");
});
