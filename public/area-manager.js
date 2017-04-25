angular.module("AreaManagerApp",["ngRoute", "angularUtils.directives.dirPagination"]).config(function($routeProvider){
    
    $routeProvider
        .when("/",{
            templateUrl : "listArea.html",
            controller : "ListCtrl"
        })
        .when("/area-stat/:province/:year",{
            templateUrl : "editArea.html",
            controller : "EditCtrl"
        });
    console.log("App initialized");
});

