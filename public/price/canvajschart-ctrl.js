angular.module("ManagerApp")
    .controller("canvajsChartsCtrlPrice", ["$scope", "$http", "$location", function($scope, $http, $location) {
        $scope.apikey = "?apikey=12345"
        console.log("GeochartsCtrl");
        $scope.change = function() {
            var dataS0;
            var dataM0;
            var dataCa0;
            var dataG0;
            var dataCo0;
            var dataA0;
            var dataJ0;
            var dataH0;
            var dataS1;
            var dataM1;
            var dataCa1;
            var dataG1;
            var dataCo1;
            var dataA1;
            var dataJ1;
            var dataH1;
            var dataS2;
            var dataM2;
            var dataCa2;
            var dataG2;
            var dataCo2;
            var dataA2;
            var dataJ2;
            var dataH2;
            $http
                .get("api/v2/price-stats" + $scope.apikey + "&year=" + $scope.year)
                .then(function(response) {
                        $scope.sta = response.data;
                        for (var i in $scope.sta) {
                            if (true) {
                                switch ($scope.sta[i].province) {
                                    case "sevilla":
                                        dataS0 = $scope.sta[i].priceaceite;
                                        dataS1 = $scope.sta[i].priceextra;
                                        dataS2 = $scope.sta[i].pricevirgen;
                                        break;
                                    case "malaga":
                                        dataM0 = $scope.sta[i].priceaceite;
                                        dataM1 = $scope.sta[i].priceextra;
                                        dataM2 = $scope.sta[i].pricevirgen;
                                        break;
                                    case "cadiz":
                                        dataCa0 = $scope.sta[i].priceaceite;
                                        dataCa1 = $scope.sta[i].priceextra;
                                        dataCa2 = $scope.sta[i].pricevirgen;
                                        break;
                                    case "granada":
                                        dataG0 = $scope.sta[i].priceaceite;
                                        dataG1 = $scope.sta[i].priceextra;
                                        dataG2 = $scope.sta[i].pricevirgen;
                                        break;
                                    case "cordoba":
                                        dataCo0 = $scope.sta[i].priceaceite;
                                        dataCo1 = $scope.sta[i].priceextra;
                                        dataCo2 = $scope.sta[i].pricevirgen;
                                        break;
                                    case "almeria":
                                        dataA0 = $scope.sta[i].priceaceite;
                                        dataA1 = $scope.sta[i].priceextra;
                                        dataA2 = $scope.sta[i].pricevirgen;
                                        break;
                                    case "jaen":
                                        dataJ0 = $scope.sta[i].priceaceite;
                                        dataJ1 = $scope.sta[i].priceextra;
                                        dataJ2 = $scope.sta[i].pricevirgen;
                                        break;
                                    case "huelva":
                                        dataH0 = $scope.sta[i].priceaceite;
                                        dataH1 = $scope.sta[i].priceextra;
                                        dataH2 = $scope.sta[i].pricevirgen;
                                        break;
                                }
                            }
                        }

                        // Datos de la gráfica
                        var data0= [{
                                label: "Sevilla",
                                y: parseFloat(dataS0)
                            },
                            {
                                label: "Malaga",
                                y: parseFloat(dataM0)
                            },
                            {
                                label: "Cadiz",
                                y: parseFloat(dataCa0)
                            },
                            {
                                label: "Granada",
                                y: parseFloat(dataG0)
                            },
                            {
                                label: "Cordoba",
                                y: parseFloat(dataCo0)
                            },
                            {
                                label: "Almeria",
                                y: parseFloat(dataA0)
                            },
                            {
                                label: "Jaen",
                                y: parseFloat(dataJ0)
                            },
                            {
                                label: "Huelva",
                                y: parseFloat(dataH0)
                            }
                        ];
                        var data1 = [{
                                label: "Sevilla",
                                y: parseFloat(dataS1)
                            },
                            {
                                label: "Malaga",
                                y: parseFloat(dataM1)
                            },
                            {
                                label: "Cadiz",
                                y: parseFloat(dataCa1)
                            },
                            {
                                label: "Granada",
                                y: parseFloat(dataG1)
                            },
                            {
                                label: "Cordoba",
                                y: parseFloat(dataCo1)
                            },
                            {
                                label: "Almeria",
                                y: parseFloat(dataA1)
                            },
                            {
                                label: "Jaen",
                                y: parseFloat(dataJ1)
                            },
                            {
                                label: "Huelva",
                                y: parseFloat(dataH1)
                            }
                        ];
                        var data2 = [{
                                label: "Sevilla",
                                y: parseFloat(dataS2)
                            },
                            {
                                label: "Malaga",
                                y: parseFloat(dataM2)
                            },
                            {
                                label: "Cadiz",
                                y: parseFloat(dataCa2)
                            },
                            {
                                label: "Granada",
                                y: parseFloat(dataG2)
                            },
                            {
                                label: "Cordoba",
                                y: parseFloat(dataCo2)
                            },
                            {
                                label: "Almeria",
                                y: parseFloat(dataA2)
                            },
                            {
                                label: "Jaen",
                                y: parseFloat(dataJ2)
                            },
                            {
                                label: "Huelva",
                                y: parseFloat(dataH2)
                            }
                        ];

                        // **** Dibujar gráfica
                        var chart = new CanvasJS.Chart("chartContainer", {
                            title: {
                                text: "Price Stats"
                            },
                            data: [{
                                    // Change type to "doughnut", "line", "splineArea", etc.
                                    type: "column",
                                    name: "Precio aceite",
                                    dataPoints: data0
                                },
                                {
                                    // Change type to "doughnut", "line", "splineArea", etc.
                                    type: "column",
                                    name: "Precio extra",
                                    dataPoints: data1
                                },
                                {
                                    // Change type to "doughnut", "line", "splineArea", etc.
                                    type: "column",
                                    name: "Precio virgen extra",
                                    dataPoints: data2
                                }
                            ],
                            axisY: {
                                maximum: Math.max(dataS0, dataM0, dataCa0, dataG0, dataCo0, dataA0, dataJ0, dataH0, dataS1, dataM1, dataCa1, dataG1, dataCo1, dataA1, dataJ1, dataH1, dataS2, dataM2, dataCa2, dataG2, dataCo2, dataA2, dataJ2, dataH2),
                            },
                            height: 400,
                        });
                        chart.render();
                        //**** Fin Dibujar gráfica

                    },
                    function(response) {
                        $scope.sta = [];
                    });

        }

    }]);