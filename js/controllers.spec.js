describe('ListCtrl', function() {
  beforeEach(module('todoApp', 'todoApp.controllers'));

  var localStorageService, createController, store;

  beforeEach(inject(function($rootScope, $controller, _localStorageService_) {
    localStorageService = _localStorageService_;
    store = {};

    spyOn(localStorageService, 'get').and.callFake(function(key) {
      return store[key] || null;
    });
    spyOn(localStorageService, 'set').and.callFake(function(key, val) {
      store[key] = val;
    });

    createController = function() {
      var $scope = $rootScope.$new();
      return $controller('ListCtrl', {$scope: $scope});
    }
  }));

  it('should retrieve items from localStorage', function () {
    var vm = createController();
    expect(localStorageService.get).toHaveBeenCalledWith('items');
    expect(vm.items).toEqual(jasmine.any(Array));
  });

  it('should be able to add an item and store it', function() {
    var vm = createController();
    vm.newItem.content = 'My new item';
    vm.addItem();
    expect(localStorageService.set).toHaveBeenCalled();
  });

  it('should clear the content of newItem after adding an item', function() {
    var vm = createController();
    vm.newItem.content = 'My new item';
    vm.addItem();
    expect(vm.newItem.content.length).toBe(0);
  });

  it('should reject empty items', function() {
    var vm = createController();
    vm.newItem.content = '';
    vm.addItem();
    expect(vm.items.length).toBe(0);
  });

  it('should remember items from the previous session', function() {
    localStorageService.set('items', [
      {content: 'My first item', checked: false},
      {content: 'My second item', checked: false}
    ]);
    var vm = createController();
    expect(vm.items.length).toBe(2);
  });

  it('should be able to remove selected items', function() {
    localStorageService.set('items', [
      {content: 'My first item', checked: false},
      {content: 'My second item', checked: true},
      {content: 'My third item', checked: false}
    ]);
    var vm = createController();
    vm.removeSelected();
    expect(vm.items).toEqual([
      {content: 'My first item', checked: false},
      {content: 'My third item', checked: false}
    ]);
  });
});
