'use strict';

/**
 * @ngdoc function
 * @name friluftsframjandetApp.controller:controller.d3
 * @author yianni.ververis@qlik.com
 * @description
 * # controller.d3
 * Controller of the myApp
 */
app.obj.angularApp
	.controller('controller.google-annotation-chart', function ($scope, $rootScope, $location, $injector, api, utility) {
		var me = {};

		me.init = function () {
			$rootScope.page = 5;
			$rootScope.title = 'Google Annotation Chart';

			$scope.googleAnnotation = {
				id: 'cases',
				title: 'New Cases by Department over time',
				height: 600,
				dimensions: [
					'Case Created Date', 
					'Case Owner Group', // Title
					'Case Owner', // Description
				],
				measures: [
					"=Sum([Number of New Cases])",
				],
				headers: ['Date', 'Number of New Cases','Case Owner Group','Case Owner'],
				options: {
					displayAnnotations: true,
					colors: ['#cc3c3c','#395878','#c88d8d','#6f92b5'],
					displayAnnotationsFilter: true,
					displayDateBarSeparator: true,
					displayZoomButtons: true,
					displayRangeSelector: true,
					thickness: 2,
				},
				// zoomStart: new Date(2015, 0, 1),
				// zoomEnd: new Date(2015, 3, 1),
			}
			$scope.dt = {
				from: new Date(2015, 0, 1),
				to: new Date(2015, 3, 1)
			};
		}
		
		me.boot = function () {
			me.init();
			
			me.events();

			// app.obj.app.getObject('CurrentSelections', 'CurrentSelections');

			utility.log('Page loaded: ', $scope.page);
		};

		me.events = function () {
			// Clear current scope's function
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
