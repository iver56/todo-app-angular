describe('ListCtrl', function() {
  beforeEach(module('todoApp', 'todoApp.controllers'));

  var $controller, createController;

  beforeEach(inject(function(_$controller_) {
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_;
    createController = function() {
      var $scope = {};
      return $controller('ListCtrl', {$scope: $scope});
    }
  }));

  it('has a loading property', function() {
    var vm = createController();
    expect(vm.loading).toBeDefined();
  });
});
