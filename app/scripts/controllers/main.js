'use strict';

/**
 * @ngdoc function
 * @name auctionApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the auctionApp
 */
angular.module('controller.main',['ngMaterial'])
  .controller('MainCtrl',['$scope','$rootScope','$http','$location','mainService','myStorage','$mdDialog','$mdMedia',
  
       function ($scope,$rootScope,$http,$location,mainService,myStorage,$mdDialog,$mdMedia) {
           //$scope.stats={}
          // $scope.inventory={}
        var data = myStorage.getObject('dash');
        $scope.status = '  ';
        
        
        $scope.stats={
                        user_id:data.user_id,
                        user_name:data.user_name,
                        user_coins:data.user_coins
                    
                    }
                    
           $scope.inventory=data.items;
        $scope.apply;
        
        $scope.userLogin=function(data){
            
            console.log(data);
            var success = function(success){
                console.log(success);
                var user_id=success.data[0].user_id;
                if(user_id){
                    
                fetchDash(user_id,function(err,success){
                    if(err){
                        console.log(err);
                    }else{
                        console.log(success);
                    $rootScope.stats={
                        user_id:success.user_id,
                        user_name:success.user_name,
                        user_coins:success.user_coins};
                    
                    }
                    
                    $rootScope.inventory=success.items;
                    
                    console.log($rootScope.inventory);
                        
                    $scope.apply;
                });
                $location.path('/dash');
                }
            }
            
            var error = function(error){
                $rootScope.err=error.data;
                console.log($rootScope.err);
            }
            $scope.apply;
            mainService.userLogin(data).then(success,error);
        }
        

        
        function fetchDash(user_id,callback){
            
            var success= function(success){
              
                callback(null,success)
            }
            
            var error = function(error){
                callback(error);
                
            }
            
             mainService.fetchDash(user_id).then(success,error);
        }
        
        $scope.confirmAuction=function(ev,data){
            
                $mdDialog.show({
              
                templateUrl: 'views/directives/confirmAuction.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true,
              
                })
                .then(function(start) {
                    console.log('start');
                }, function() {
                
                });
                
                
                
        }
        
        $scope.leave=function(){
            myStorage.removeItem('dash');
            $location.path('/')
        }
        $scope.cancel=function(){
            $mdDialog.cancel();
        }
        
        // start auction
        $scope.start=function(data){
            console.log(data);
            
            var success = function(success){
                
            }
            var error = function(error){
                
            }
            
            mainService.startAuction(data).then(success,error);
            
            $scope.cancel();
        }
  }]);
