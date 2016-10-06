describe('todoListDirective', function() {
  beforeEach(module('todoApp'));

  var localStorageService, store, $scope, createController;

  beforeEach(inject(function($rootScope, $controller, _localStorageService_, $compile, $httpBackend) {
    localStorageService = _localStorageService_;
    store = {};

    spyOn(localStorageService, 'get').and.callFake(function(key) {
      return store[key] || null;
    });
    spyOn(localStorageService, 'set').and.callFake(function(key, val) {
      store[key] = val;
    });

    createController = function() {
      $httpBackend.whenGET("views/todo-list.html").respond('<div></div>');
      $httpBackend.expectGET("views/todo-list.html");
      $scope = $rootScope.$new();
      $scope.list = {
        name: 'My list',
        items: []
      };
      var element = angular.element('<todo-list list="list"></todo-list>');
      template = $compile(element)($scope);
      $scope.$digest();
      $httpBackend.flush();
      spyOn($scope, '$emit');
      return element.controller('todoList');
    }
  }));

  it('should should have the list object bound to the controller', function() {
    var vm = createController();
    expect(vm.list).toBeDefined();
    expect(vm.list.items).toEqual(jasmine.any(Array));
  });

  it('should be able to add an item and store it', function() {
    var vm = createController();
    vm.newItem.content = 'My new item';
    vm.addItem();
    expect($scope.$emit).toHaveBeenCalledWith('dataUpdated');
  });

  it('should clear the content of newItem after adding an item', function() {
    var vm = createController();
    vm.newItem.content = 'My new item';
    vm.addItem();
    expect(vm.newItem.content.length).toBe(0);
  });

  it('should be able to remove selected items', function() {
    var vm = createController();
    vm.list.items = [
      {content: 'My first item', checked: false},
      {content: 'My second item', checked: true},
      {content: 'My third item', checked: false}
    ];
    vm.removeSelected();
    expect(vm.list.items).toEqual([
      {content: 'My first item', checked: false},
      {content: 'My third item', checked: false}
    ]);
  });
});
