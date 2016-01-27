angular.module('service.main',[])

 .service('mainService',['$rootScope','$http','$q','myStorage',
  function($rootScope,$http,$q,myStorage){
     var host = 'http://localhost:5000';
     var self = this;
     
     
     
     var main = {
         
         init:function(){
             
             $rootScope.dash=myStorage.getObject('dash')||{
                 user_id:"",user_name:"",user_coins:"",
                 items:[{item_id:"",user_item_id:"",image_id:"",image_path:"",item_name:"",item_quantity:""}]
             };
         },
         
         userLogin:function(data){
             
             var deffered = $q.defer();
             
             var success = function(success){
                 console.log(success.data[0].user_id);
                 deffered.resolve(success);
             
                 
             }
             
             var error = function(error){
                 
                 deffered.reject(error);
             } 
              
             $http.post(host+'/login',data).then(success,error);
             return deffered.promise;
             
         },
         
         fetchDash:function(user_id){
              var deffered = $q.defer();
             
             var success = function(success){
                 console.log(success.data);
                 var dash = success.data;
                 myStorage.setObject('dash',dash);
                 
                 deffered.resolve(dash);
             }
             
             var error = function(error){
                 console.log(error);
                 deffered.reject(error);
             } 
             
             $http.get(host+'/users/'+user_id+'/dash').then(success,error);
             return deffered.promise;
         }
         
     }

     return main;
  }]);
 