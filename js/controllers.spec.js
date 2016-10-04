describe('ListCtrl', function() {
  beforeEach(module('todoApp', 'todoApp.controllers'));

  var createController;

  beforeEach(inject(function(_$controller_) {
    // The injector unwraps the underscores (_) from around the parameter names when matching
    createController = function() {
      var $scope = {};
      return _$controller_('ListCtrl', {$scope: $scope});
    }
  }));

  it('has a property called items', function() {
    var vm = createController();
    expect(vm.items).toBeDefined();
  });
});
