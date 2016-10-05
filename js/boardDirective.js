(function() {
  'use strict';

  angular
    .module('todoApp')
    .directive('board', function() {

      function BoardCtrl($scope, localStorageService) {
        var vm = this;

        vm.init = function() {
          vm.lists = localStorageService.get('lists') || [];

          vm.newList = {
            name: '',
            items: []
          };

          $scope.$on('dataUpdated', vm.storeLists);
        };

        vm.addList = function() {
          vm.lists.push(angular.copy(vm.newList));
          vm.newList.name = '';
          $scope.$emit('dataUpdated');
        };

        vm.storeLists = function() {
          localStorageService.set('lists', vm.lists);
        };

        vm.init();
      }

      return {
        restrict: 'E',
        templateUrl: 'views/board.html',
        controller: BoardCtrl,
        controllerAs: 'board'
      };
    });
})();
