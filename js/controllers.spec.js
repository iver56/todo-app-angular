describe('List', function() {
  beforeEach(angular.mock.module('todoApp'));
  beforeEach(angular.mock.module('todoApp.controllers'));

  var $controller;

  beforeEach(inject(function(_$controller_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_;
  }));

  it('has a loading property', function() {
    var $scope = {};
    var controller = $controller('ListCtrl', { $scope: $scope });
    expect($scope.loading).toBeDefined();
  });
});
