'use strict';

/**
 * @ngdoc overview
 * @name auctionApp
 * @description
 * # auctionApp
 *
 * Main module of the application.
 */
angular
  .module('auctionApp', [
      'ngRoute',
      'ngMaterial',
      'ngResource',
      'directives',
      'controller.main',
      'service.main',
      'services.utils'])
  
  .config(['$mdThemingProvider','$routeProvider',function($mdThemingProvider,$routeProvider){
      $mdThemingProvider.theme('default')
        .primaryPalette('green',{
            'default':'700'
        });
        $routeProvider
        .when('/',{
            templateUrl:'views/enter.html',
            controller:'MainCtrl'
            
 
            
        })
        .when('/dash',{
            templateUrl:'/views/dash.html',
            controller:'MainCtrl'
            
        })
  }])
