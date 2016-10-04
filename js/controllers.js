(function() {
  'use strict';

  angular.module('todoApp.controllers', [])

    .controller('ListCtrl', function($scope, $firebaseArray) {
      $scope.loading = true;
      var ref = firebase.database().ref();

      $scope.items = $firebaseArray(ref);

      $scope.items.$loaded().then(function() {
        $scope.loading = false;
      });

      $scope.putItem = function() {
        if (0 === $scope.newItem.content.length) {
          return;
        }
        $scope.items.$add($scope.newItem);
        $scope.newItem.content = "";
      };

      $scope.checkedChange = function(item) {
        $scope.items.$save(item);
      };

      $scope.newItem = {
        content: '',
        checked: false
      };

      $scope.clear = function() {
        for (var i = 0; i < $scope.items.length; i++) {
          var item = $scope.items[i];
          if (item.checked) {
            $scope.items.$remove(item);
          }
        }
      };
    });
})();
