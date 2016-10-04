(function() {
  'use strict';

  angular.module('todoApp', ['todoApp.controllers', 'LocalStorageModule'])
    .config(function(localStorageServiceProvider) {
      localStorageServiceProvider
        .setPrefix('todoApp');
    })
  ;
})();
