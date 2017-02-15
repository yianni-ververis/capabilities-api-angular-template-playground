// var scriptsUrl = 'http://webapps.qlik.com/yianni/playground/';
var scriptsUrl = 'http://localhost/angularTemplate-playground/';

require.config({
	// baseUrl: "https://sense-demo.qlik.com:443/resources", 
  baseUrl: "http://localhost:4848/resources",
	paths: {
		'domReady': scriptsUrl +'js/vendor/domReady/domReady',
		'bootstrap': scriptsUrl + 'js/vendor/bootstrap/dist/js/bootstrap.min',
		'd3': scriptsUrl + 'js/vendor/d3/d3.min',
		'googleChartLoader': 'https://www.gstatic.com/charts/loader',
		'ui.bootstrap': scriptsUrl + 'js/vendor/angular-bootstrap/ui-bootstrap-tpls.min',
		'app': scriptsUrl + 'js/lib/app',
		'ga': scriptsUrl + 'js/lib/ga',
		'controller.dashboard': scriptsUrl + 'js/controllers/dashboard',
		'controller.performance': scriptsUrl + 'js/controllers/performance',
		'controller.header': scriptsUrl + 'js/controllers/header',
		'controller.d3': scriptsUrl + 'js/controllers/d3',
		'controller.google-annotation-chart': scriptsUrl + 'js/controllers/google-annotation-chart',
		'controller.visualization-api': scriptsUrl + 'js/controllers/visualization-api',
		'directive.getObject': scriptsUrl + 'js/directives/getObject',
		'directive.dropDown': scriptsUrl + 'js/directives/dropDown',
		'directive.exportToCsv': scriptsUrl + 'js/directives/exportToCsv',
		'directive.visualization': scriptsUrl + 'js/directives/visualization',
   		'directive.googleAnnotationChart': scriptsUrl + 'js/directives/googleAnnotationChart',
		'service.api': scriptsUrl + 'js/services/api',
		'service.utility': scriptsUrl + 'js/services/utilities'
	}
});

define([
    'require',
    'angular',
    'app'
], function (require, angular) {
    'use strict';

    // define( "client.services/grid-service", {} );
	app.obj.angularApp = angular.module('myApp', [
		'ngAnimate',
		'ngRoute',
		'ui.bootstrap'
	]);
	app.obj.angularApp.config(function($routeProvider,$locationProvider) {
		$routeProvider
			.when('/', { 
				templateUrl: scriptsUrl+"views/dashboard.html",
				controller: 'controller.dashboard' 
			} )
			.when('/performance', { 
				templateUrl: scriptsUrl+"views/performance.html",
				controller: 'controller.performance' 
			} )
			.when('/d3', { 
				templateUrl: scriptsUrl+"views/d3.html",
				controller: 'controller.d3' 
			} )
            .when('/visualization-api', { 
                templateUrl: scriptsUrl+"views/visualization-api.html",
                controller: 'controller.visualization-api' 
            } )
            .when('/google-annotation-chart', { 
                templateUrl: scriptsUrl+"views/google-annotation-chart.html",
                controller: 'controller.google-annotation-chart' 
            } )
			.otherwise({redirectTo: '/'})
		// $locationProvider.html5Mode({ enabled: true, requireBase: true });
	})
    require([
    	'domReady!', 
    	'js/qlik',
    	'angular',
        'ga',
    	'd3', 
    	'controller.dashboard',
    	'controller.performance',
    	'controller.header',
        'controller.d3',
		'controller.google-annotation-chart',
    	'controller.visualization-api',
    	'service.api',
    	'service.utility',
        'directive.getObject',
    	'directive.dropDown',
    	'directive.exportToCsv',
        'directive.visualization',
		'directive.googleAnnotationChart',
    	'bootstrap',
    	'angular-animate',
    	'ui.bootstrap',
		'googleChartLoader'
    ], function (document, qlik) {
    	app.obj.qlik = qlik;
		qlik.setOnError( function ( error ) {
			if (!angular.isUndefined(error) && error.code == 16) {
				location.reload();
			} else {
				console.log(error);
			}
		} );

        angular.bootstrap( document, ["myApp", "qlik-angular"] );

        app.boot();
    });
});
