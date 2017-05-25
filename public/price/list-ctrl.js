/**
 * Controlador de List Price
 */
angular.module("ManagerApp")
    .controller("ListCtrlPrice", ["$scope", "$http", function($scope, $http) {
        //
        $scope.stats = [];
        $scope.currentPage = 1;
        $scope.pageSize = 5;
        
        /**
         * Búsqueda por intervalo de año
         */
        $scope.searchFrom = function(from, to) {
            $http
                .get("/api/v3/price-stats" + "?from=" + from + "&to=" + to)
                .then(function(response) {
                    $scope.stats = response.data;
                }, function(response) {
                    $scope.stats = [];
                });
        }
        
        /**
         * Formulario de búsqueda por provincia y año
         */
        $scope.search = function(province, year) {
            // Podemos usar provincia, año o ambos
            var province = (province)? "?province=" + province : "";
            var year = (year)? "year=" + year : "";
            var year = (province == "")? "?"+year: "&"+year ;
            
            //
            $http
                .get("/api/v3/price-stats" + province + year)
                .then(function(response) {
                    $scope.stats = response.data;
                }, function(response) {
                    $scope.stats = [];
                });
        }
        
        /**
         * Cargar página alante
         */
        $scope.pageMore = function() {
            $scope.currentPage++;
            $http
                .get("api/v3/price-stats" + "?limit=" + ($scope.pageSize) + "&offset=" + (($scope.currentPage - 1) * $scope.pageSize))
                .then(function(response) {
                    $scope.stats = response.data;
                    console.log($scope.stats);
                }, function(response) {
                    $scope.stats = [];
                });
        }
        
        /**
         * Cargar página atrás
         */
        $scope.pageLess = function() {
            $scope.currentPage--;
            $http
                .get("api/v3/price-stats" + "?limit=" + ($scope.pageSize) + "&offset=" + (($scope.currentPage - 1) * $scope.pageSize))
                .then(function(response) {
                    $scope.stats = response.data;
                    console.log($scope.stats);

                }, function(response) {
                    $scope.stats = [];
                });
        }
        
        /**
         * 
         */
        function initial() {
            $http
                .get("api/v3/price-stats" + "?limit=" + ($scope.pageSize) + "&offset=" + (($scope.currentPage - 1) * $scope.pageSize))
                .then(function(response) {
                    $scope.stats = response.data;
                    console.log($scope.stats);
                }, function(response) {
                    $scope.stats = [];
                });
        }

        /**
         * 
         */
        function refresh() {
            $http
                .get("api/v3/price-stats" + "?limit=1000")
                .then(function(response) {
                    $scope.data = response.data;
                    $scope.numPages = Math.ceil($scope.data.length / $scope.pageSize);
                }, function(response) {
                    $scope.data = [];
                });
        }
        
        /**
         * Añadir nueva estadística
         */
        $scope.addStat = function() {
            $http
                .post("api/v3/price-stats", $scope.newStat)
                .then(function(response) {
                    $scope.errorMessage = bootbox.alert("Add stat");
                    refresh();
                    initial();
                }, function(response) {
                    $scope.stats = [];
                    if (response.status == 422) {
                        $scope.errorMessage = bootbox.alert("Fields cannot be empty ");
                    }
                    if (response.status == 409) {
                        $scope.errorMessage = bootbox.alert("Stat already exists");
                    }
                })
        }
        
        /**
         * Cargar datos iniciales
         */
        $scope.loadInitial = function() {
            $http
                .get("api/v3/price-stats/loadInitialData")
                .then(function(response) {
                    $scope.errorMessage = bootbox.alert("Load Stats");
                    refresh();
                    initial();
                })
        }
        
        /**
         * Eliminar una estadística
         */
        $scope.deleteStat = function(province, year) {
            $http
                .delete("api/v3/price-stats/" + province + "/" + year, $scope.newStat)
                .then(function(response) {
                    $scope.errorMessage = bootbox.alert("Stat delete");
                    refresh();
                    initial();

                }, function(response) {
                    $scope.stats = [];
                    if (response.status == 404) {
                        $scope.errorMessage = bootbox.alert("Stat not exists");
                    }
                })
        }
        
        /**
         * Eliminar todo
         */
        $scope.deleteAll = function() {
            $http
                .delete("api/v3/price-stats")
                .then(function(response) {
                    $scope.errorMessage = bootbox.alert("Delete all stats");
                    refresh();
                    initial();

                }, function(response) {
                    $scope.stats = [];
                    if (response.status == 404) {
                        $scope.errorMessage = bootbox.alert("Stat is empty");
                    }
                })
        }
        
        /**
         * Carga inicial
         */
        refresh();
        initial();
    }]);
