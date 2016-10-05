(function() {
  'use strict';

  angular.module('todoApp', ['LocalStorageModule'])
    .config(function(localStorageServiceProvider) {
      localStorageServiceProvider
        .setPrefix('todoApp');
    })
  ;
})();
