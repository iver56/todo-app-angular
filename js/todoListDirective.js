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
          if (0 === vm.newItem.content.length) {
            return;  // TODO: let HTML5 form validation take care of this..
          }
          vm.list.items.push(angular.copy(vm.newItem));
          vm.newItem.content = '';

          vm.propagateChange();
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
