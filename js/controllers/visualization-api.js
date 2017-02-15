'use strict';

/**
 * @ngdoc function
 * @name friluftsframjandetApp.controller:controller.performance
 * @author yianni.ververis@qlik.com
 * @description
 * # controller.performance
 * Controller of the myApp
 */
app.obj.angularApp
	.controller('controller.visualization-api', function ($scope, $rootScope, $location, $injector, api, utility) {
		var me = {};

		me.init = function () {
			$rootScope.page = 4;
			$rootScope.title = 'Visualization API';
			$scope.types = ['barchart','combochart','gauge','kpi','linechart','piechart','pivot-table','scatterplot','table','treemap'];
			$scope.currentType = 'barchart';
			$scope.visualizationTitle = 'On the fly chart';
			$scope.columns = ['Case Owner Group','=Avg([Case Duration Time])'];
		}
		
		me.boot = function () {
			me.init();
			
			me.events();
			$scope.generateChart();

			utility.log('Page loaded: ', $scope.page);
		};

		me.events = function () {
			$scope.changeType = function (type) {
				$scope.currentType = type;
				$scope.generateChart();
			}
			$scope.generateChart = function () {
				// app.obj.app.visualization.create($scope.currentType, $scope.columns, { title: $scope.visualizationTitle }).then(function(obj){
				// 	obj.show('visualizationChart');
				// }); 
				//Speciality breakdown
				app.obj.app.visualization.create('barchart', 
					[
						{
						qDef:{
							qFieldDefs:["Category"],
							qSortCriterias: [
								{
									qSortByAscii: 1,
									qSortByLoadOrder: 1,
									qExpression: {}
								}
							],
							},
							qNullSuppression: true
						}, {
						qDef: {
							qDef: "-1*Count({$<PATIENT_KEY=$(vExpression)>}DISTINCT %CID_Key)", 
							qLabel:"Distict HCPs",
							qNumFormat: {
								qType: "R",
								qnDec: 0,
								qUseThou: 0,
								qFmt: "#,##0;#,##0",
								qDec: ".",
								qThou: ","
								},
							qSortBy: {
								qSortByNumeric: -1,
								qSortByLoadOrder: 1,
								qExpression: {}
								}
							}
						}, {
						qDef:{
							qDef:"Count({$<PATIENT_KEY=$(vExpression)>} DISTINCT PATIENT_KEY)",
							qLabel:"Distinct Patients",
							qNumFormat: {
								qType: "R",
								qnDec: 2,
								qUseThou: 0,
								qFmt: "#,##0;#,##0",
								qDec: ".",
								qThou: ","
								},
							qSortBy: {
								qSortByNumeric: -1,
								qSortByLoadOrder: 1,
								qExpression: {}
								}
							}
						}
					],
					{
						// qInterColumnSortOrder: [1,0,2],
						// qSuppressMissing: true,
						orientation: "horizontal", //options
						dataPoint: {showLabels:true},
						barGrouping: {grouping:"stacked"},
						legend: {dock: "bottom", showTitle: false},
						dimesionAxis: {show: "labels"},
						measureAxis: {show: "labels"},
						showTitles: "false"
					}
				).then(function(viz) {
					console.log(viz)
					viz.show('diagnobreakdown');
					// vizlibrary.specialitychart = viz;
				});
			}
			$rootScope.clearAll = function () {
				app.obj.app.clearAll();
			}
			$rootScope.goTo = function(page) {
				api.destroyObjects().then(function(){
					$location.url('/' + page);
				});
			}
		}

		me.boot();
	});
