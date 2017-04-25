app.controller("ListCtrl", ["$scope", "$http", function($scope, $http) {
    console.log("Controller initialized");
    $scope.viewby = 5;
    $scope.itemsPerPage = $scope.viewby;;
    $scope.currentPage = 0;
    $scope.items = [];
    
    $scope.setApikey= function(api){
        $scope.apikey="?apikey="+api;
        refresh();
    }
    
     $scope.setProvince= function(province){
        $scope.province = province;
        refresh();
    }
    
    $scope.setYear= function(year){
        $scope.year= year;
        refresh();
    }
    
    
    function res() {
        for (var i = 0; i < $scope.stats.length; i++) {
            $scope.items.push($scope.stats[i]);
        }
    }
    $scope.prevPage = function() {
        if ($scope.currentPage > 0) {
            $scope.currentPage--;
        }
    };
    $scope.prevPageDisabled = function() {
        return $scope.currentPage === 0 ? "disabled" : "";
    };
    $scope.pageCount = function() {
        return Math.ceil($scope.items.length / $scope.itemsPerPage) - 1;
    };
    $scope.nextPage = function() {
        if ($scope.currentPage < $scope.pageCount()) {
            $scope.currentPage++;
        }
    }
    $scope.setItemsPerPage = function(num) {
        $scope.itemsPerPage = num;
        $scope.currentPage = 0; //reset to first paghe
        console.log(num);
    }

    function refresh() {
        var province = ($scope.province)? "&province="+$scope.province: "";
        var year = ($scope.year)? "&year="+$scope.year: "";
        $http
            .get("api/v1/price-stats"+$scope.apikey+province+year)
            .then(function(response) {
                if (!response.data) {
                    toggleResults(0);
                } else {
                    toggleResults(1);
                }
                $scope.stats = response.data;
                res();
                document.getElementById("errorApiKey").innerHTML = "";
             }, function errorCallback(response) {
                if(response.status == 401){
                    document.getElementById("errorApiKey").innerHTML = "Introduzca ApiKey.";
                }
                else if(response.status == 403){
                    document.getElementById("errorApiKey").innerHTML = "ApiKey incorrecta.";
                }
                toggleResults(0);
             });
    }
    
    function toggleResults(i){
        // Ocultar
        if(i == 0){
            document.getElementById("results").style.visibility = "hidden";
            document.getElementById("NoResults").style.visibility = "";
        }
        // Mostrar
        else if(i == 1){
            document.getElementById("results").style.visibility = "";
            document.getElementById("NoResults").style.visibility = "hidden";
        }
    }

    $scope.addStat = function() {
        $http
            .post("api/v1/price-stats"+$scope.apikey, $scope.newStat)
            .then(function(response) {
                console.log("Stat added");
                refresh();
                document.getElementById("addError").innerHTML = "";
                document.getElementById("addOk").innerHTML = "Estadística añadida correctamente.";
            }, function errorCallback(response) {
                if(response.status == 409){
                    document.getElementById("addOk").innerHTML = "";
                    document.getElementById("addError").innerHTML = "Error 409, ha intentado añadir una estádística duplicada. Mejor edítela.";
                }
             })
    }
    $scope.update = function(province, year) {
        $http
            .put("api/v1/price-stats/" + province + "/" + year+$scope.apikey, $scope.newStat)
            .then(function(response) {
                console.log("Update stats " + province);
                refresh();
            })
    }
    $scope.loadInitial = function() {
        $http
            .get("api/v1/price-stats/loadInitialData"+$scope.apikey)
            .then(function(response) {
                console.log("Load data");
                refresh();
            })
    }

    $scope.deleteStat = function(province, year) {
        $http
            .delete("api/v1/price-stats/" + province + "/" + year +$scope.apikey, $scope.newStat)
            .then(function(response) {
                console.log("Deleting stats " + province);
                refresh();
            })
    }
    $scope.deleteAll = function() {
        $http
            .delete("api/v1/price-stats"+$scope.apikey)
            .then(function(response) {
                console.log("Deleting all stats ");
                refresh();
            })
    }

    refresh();




}]);
app.filter('offset', function() {
    return function(input, start) {
        if (!input || !input.length) {
            return;
        }
        start = +start; //parse to int
        return input.slice(start);
    };

});
