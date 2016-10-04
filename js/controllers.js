(function() {
  'use strict';

  angular.module('todoApp.controllers', [])

    .controller('ListCtrl', function($firebaseArray) {
      var vm = this;

      vm.loading = true;
      var ref = firebase.database().ref();

      vm.items = $firebaseArray(ref);

      vm.items.$loaded().then(function() {
        vm.loading = false;
      });

      vm.putItem = function() {
        if (0 === vm.newItem.content.length) {
          return;
        }
        vm.items.$add(vm.newItem);
        vm.newItem.content = "";
      };

      vm.checkedChange = function(item) {
        vm.items.$save(item);
      };

      vm.newItem = {
        content: '',
        checked: false
      };

      vm.clear = function() {
        for (var i = 0; i < vm.items.length; i++) {
          var item = vm.items[i];
          if (item.checked) {
            vm.items.$remove(item);
          }
        }
      };
    });
})();
