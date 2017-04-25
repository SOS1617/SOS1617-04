// ["ngRoute", "angularUtils.directives.dirPagination"]).

angular.module("ExportManagerApp",["ngRoute", "angularUtils.directives.dirPagination"]).config(function($routeProvider){
    
    $routeProvider
        .when("/",{
            templateUrl : "listExport.html",
            controller : "ListCtrl"
        })
        .when("/export-stat/:province/:year",{
            templateUrl : "editExport.html",
            controller : "EditCtrl"
        });
    console.log("App initialized");
});
