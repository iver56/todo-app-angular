(function() {
  'use strict';

  angular.module('todoApp.controllers', [])

    .controller('ListCtrl', function(localStorageService, $timeout) {
      var vm = this;

      vm.init = function() {
        vm.newItem = {
          content: '',
          checked: false
        };

        vm.items = localStorageService.get('items');
        console.log('items', vm.items);
        if (null === vm.items) {
          vm.items = [];
        }
      };

      vm.addItem = function() {
        if (0 === vm.newItem.content.length) {
          return;
        }
        vm.items.push(angular.copy(vm.newItem));
        vm.newItem.content = '';
        vm.storeItems();
      };

      vm.checkedChange = function(item) {
        vm.storeItems();
      };

      vm.clear = function() {
        vm.items = vm.items.filter(function(item) {
          return !item.checked;
        });

        vm.storeItems();
      };

      vm.storeItems = function() {
        $timeout(function() {
          localStorageService.set('items', vm.items);
        });
      };

      vm.init();
    });
})();
