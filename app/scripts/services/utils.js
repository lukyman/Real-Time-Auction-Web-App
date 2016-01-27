angular.module('services.utils', [])

.factory('myStorage', ['$window', function($window) {
  return {
    setItem: function(key, value) {
      $window.localStorage[key] = value;
    },
    getItem: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    removeItem: function(key) {
        $window.localStorage.removeItem(key);
    },
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key) {
      return JSON.parse($window.localStorage[key] || '{}');
    }
  }
}])