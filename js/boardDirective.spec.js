describe('boardDirective', function() {
  beforeEach(module('todoApp'));

  var localStorageService, store, createController;

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
      $httpBackend.whenGET("views/board.html").respond('<div></div>');
      $httpBackend.expectGET("views/board.html");
      var $scope = $rootScope.$new();
      var element = angular.element("<board></board>");
      template = $compile(element)($scope);
      $scope.$digest();
      $httpBackend.flush();
      return element.controller('board');
    }
  }));

  it('should retrieve items from localStorage', function() {
    var vm = createController();
    expect(localStorageService.get).toHaveBeenCalledWith('lists');
    expect(vm.lists).toEqual(jasmine.any(Array));
  });

  it('should be able to add a list and store it', function() {
    var vm = createController();
    vm.newList.name = 'My new list';
    vm.addList();
    expect(vm.lists.length).toBe(1);
    expect(localStorageService.set).toHaveBeenCalled();
  });

  it('should clear the name of newList after adding a list', function() {
    var vm = createController();
    vm.newList.name = 'My new list';
    vm.addList();
    expect(vm.newList.name.length).toBe(0);
  });

  it('should remember lists from the previous session', function() {
    localStorageService.set('lists', [
      {name: 'My first list', items: []},
      {name: 'My second list', items: []}
    ]);
    var vm = createController();
    expect(vm.lists.length).toBe(2);
  });
});
