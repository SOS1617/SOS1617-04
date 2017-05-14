angular.module("ManagerApp")
    .controller("HighchartsCtrlPrice2", ["$scope", "$http", "$location", function($scope, $http, $location) {

        $scope.apikey = "GVAODcH3";
        $scope.data = {};
        var dataCache = {};
        $scope.categorias = [];
        $scope.rpcyear = [];
        $scope.rpcvariation = [];

        
        function capitalizeFirstLetter(string) {
                return string.charAt(0).toUpperCase() + string.slice(1);
            }
        
        $http.get("https://sos1617-02.herokuapp.com/api/v1/rpc-stats"+ "?" + "apikey=" + $scope.apikey).then(function(response){
            
            dataCache = response.data;
            $scope.data =dataCache;
            
            for(var i=0; i<response.data.length; i++){
                $scope.categorias.push(capitalizeFirstLetter($scope.data[i].country));
                $scope.rpcyear.push(Number($scope.data[i]["rpc-year"]));
                $scope.rpcvariation.push(Number($scope.data[i]["rpc-variation"]));
                
                
                console.log($scope.data[i].country);

            }
        });    
            
        console.log("Controller initialized");
        $http.get("https://sos1617-02.herokuapp.com/api/v1/rpc-stats"+ "?" + "apikey=" + $scope.apikey).then(function(response){
            
            //RPC en 2014
            Highcharts.chart('container',{
                title: {
                    text: 'WORLD RPC 2014'
                },
                chart: {
                    type: 'bar',
                    inverted: false
                },
                xAxis: {
                    categories: $scope.categorias
                },
                yAxis: {
            title: {
                countries: $scope.rpcyear
            }   
                },
                 tooltip: {
        valueSuffix: '€'
    },

    plotOptions: {
        columnrange: {
            dataLabels: {
                enabled: true,
                formatter: function () {
                    return this.y + '°€';
                }
            }
        }
    },
                
                legend: {
        enabled: false
    },
                
                series:[{
                    name: 'RPC Year',
                    data: $scope.rpcyear
                }]
            });
            
        
    });
}]);