// ["ngRoute", "angularUtils.directives.dirPagination"]).

angular.module("PriceManagerApp",["ngRoute", "angularUtils.directives.dirPagination"]).config(function($routeProvider){
    
    $routeProvider
        .when("/",{
            templateUrl : "listPrice.html",
            controller : "ListCtrl"
        })
        .when("/price-stats/:province/:year",{
            templateUrl : "editPrice.html",
            controller : "EditCtrl"
        });
    console.log("App initialized");
});
