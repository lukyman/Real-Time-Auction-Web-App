angular.module('directives',[])

.directive('stats',function(){
  return{  
      restrict:'AE',
    templateUrl:'views/directives/stats.html'
  }
})

.directive('inventory',function(){
    return{
        
        restrict:'AE',
        templateUrl:'views/directives/inventory.html'
    }
})

.directive('auction',function(){
    return{
        restrict:'AE',
        templateUrl:'views/directives/auction.html'
    }
})
