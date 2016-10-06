(function() {
  'use strict';

  angular
    .module('todoApp')
    .directive('todoList', function() {

      function ListCtrl($scope) {
        var vm = this;

        vm.init = function() {
          vm.newItem = {
            content: '',
            checked: false
          };
        };

        vm.addItem = function() {
          vm.list.items.push(angular.copy(vm.newItem));
          vm.newItem.content = '';

          vm.propagateChange();
        };

        vm.hasCheckedItems = function() {
          for (var i = 0; i < vm.list.items.length; i++) {
            if (vm.list.items[i].checked) {
              return true;
            }
          }
          return false;
        };

        vm.removeSelected = function() {
          vm.list.items = vm.list.items.filter(function(item) {
            return !item.checked;
          });
          vm.propagateChange();
        };

        vm.propagateChange = function() {
          $scope.$emit('dataUpdated');
        };

        vm.init();
      }

      return {
        restrict: 'E',
        templateUrl: 'views/todo-list.html',
        controller: ListCtrl,
        controllerAs: 'todoList',
        bindToController: {
          list: '='
        }
      };
    });
})();
