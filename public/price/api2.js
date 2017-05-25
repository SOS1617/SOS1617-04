/**
 * https://market.mashape.com/neutrinoapi/phone-validate
 */
angular.module("ManagerApp")
    .controller("api2", ["$scope", "$http", "$location", function($scope, $http, $location) {

        // Dato api propia
        var datoApiPropia;
        $http
            .get("api/v3/price-stats?apikey=12345&&year=2014&province=sevilla")
            .then(function(response) {
                    $scope.sta = response.data;
                    console.log(response.data);
                    for (var i in $scope.sta) {
                        datoApiPropia = parseFloat($scope.sta[i].pricevirgen);
                    }
                },
                function(response) {
                    $scope.sta = [];
                });
        console.log(datoApiPropia)

        var tlf = '34675589965';
        $http
            .get("https://neutrinoapi-phone-validate.p.mashape.com/phone-validate?mashape-key=YaJy4LPugsmshktTkd17zwvP56Aap1IdBzEjsndGfn4xhLsyoC&number="+tlf)
            .then(function(response) {
                    // response.data
                    var dato = Object.keys(response.data).map(function (key) { return response.data[key]; });
                    console.log(dato);

                    // **** Dibujar gráfica
                    var chart = new CanvasJS.Chart("chartContainer", {
                        title: {
                            text: "Comparativa precio aceite virgen extra sevilla 2014 con prefijo movil "+tlf
                        },
                        data: [{
                            // Change type to "doughnut", "line", "splineArea", etc.
                            type: "column",
                            name: "Comparativa",
                            dataPoints: [{
                                label: tlf,
                                y: parseFloat(dato[6])
                            }, {
                                label: "Precio aceite virgen extra sevilla 2014",
                                y: parseFloat(datoApiPropia)
                            }]
                        }],
                        height: 400,
                    });
                    chart.render();
                    //**** Fin Dibujar gráfica

                },
                function(response) {
                    $scope.sta = [];
                });


    }]);