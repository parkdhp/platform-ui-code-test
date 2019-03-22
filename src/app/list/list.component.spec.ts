import { ListComponent } from './list.component';

describe('ListComponent', () => {
  let component: ListComponent;

  beforeEach(() => {
    component = new ListComponent();
    let store = {};
    const mockLocalStorage = {
      getItem: (key: string): string => {
        return key in store ? store[key] : null;
      },
      setItem: (key: string, value: string) => {
        store[key] = `${value}`;
      }
    };
    spyOn(localStorage, 'getItem').and.callFake(mockLocalStorage.getItem);
    spyOn(localStorage, 'setItem').and.callFake(mockLocalStorage.setItem);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('unselected providers', () => {
    it('should have an initial length of 3', () => {
      expect(component.unselectedProviders.length).toEqual(3);
    });

    it('should have an id', () => {
      expect(component.unselectedProviders[0].id).toEqual('1');
    });

    it('should have a name', () => {
      expect(component.unselectedProviders[0].name).toEqual('John');
    });

    it('should have an address', () => {
      expect(component.unselectedProviders[0].address).toEqual('123 Greenway Blvd');
    });

    it('should have a phone', () => {
      expect(component.unselectedProviders[0].phone).toEqual('8991234321');
    });
  });

  describe('selected providers', () => {
    it('should have no initial length', () => {
      expect(component.selectedProviders.length).toEqual(0);
    });
  });

  describe('saveToLocalStorage', () => {
    it('should should be a function', () => {
      expect(typeof component.swapProvider).toBe('function');
    });

    it('should store provider information to local storage', () => {
      localStorage.setItem('unselectedProviders', JSON.stringify(component.unselectedProviders));
      localStorage.setItem('selectedProviders', JSON.stringify(component.selectedProviders));
      expect(localStorage.getItem('unselectedProviders')).toEqual(JSON.stringify(component.unselectedProviders));
      expect(localStorage.getItem('selectedProviders')).toEqual(JSON.stringify(component.selectedProviders));
    });
  });
  
  describe('getLocalStorage', () => {
    it('should should be a function', () => {
      expect(typeof component.swapProvider).toBe('function');
    });

    it('should get provider information from local storage', () => {
      localStorage.setItem('unselectedProviders', JSON.stringify(component.unselectedProviders));
      localStorage.setItem('selectedProviders', JSON.stringify(component.selectedProviders));
      expect(localStorage.getItem('unselectedProviders')).toEqual(JSON.stringify(component.unselectedProviders));
      expect(localStorage.getItem('selectedProviders')).toEqual(JSON.stringify(component.selectedProviders));
    });
  });

  describe('swapProvider', () => {
    it('should should be a function', () => {
      expect(typeof component.swapProvider).toBe('function');
    });

    it('should swap an element in one array to another array', () => {
      const arr1 = [{
        id: 1,
        name: 'John',
        address: '123 Greenway Blvd',
        phone: '8991234321',
      }];
      const arr2 = [];
      const expected = [{
        id: 1,
        name: 'John',
        address: '123 Greenway Blvd',
        phone: '8991234321',
      }];
      component.swapProvider(1, arr1, arr2);
      expect(arr2).toEqual(expected);
    });
  });

  describe('saveProvider', () => {
    it('should call getLocalStorage and swapProvider when fired', () => {
      spyOn(component, 'getLocalStorage');
      spyOn(component, 'swapProvider');
      component.saveProvider({ target: { id: 1 } });
      expect(component.getLocalStorage).toHaveBeenCalled();
      expect(component.swapProvider).toHaveBeenCalled();
    });
  });

  describe('removeProvider', () => {
    it('should call getLocalStorage and swapProvider when fired', () => {
      spyOn(component, 'getLocalStorage');
      spyOn(component, 'swapProvider');
      component.saveProvider({ target: { id: 1 } });
      expect(component.getLocalStorage).toHaveBeenCalled();
      expect(component.swapProvider).toHaveBeenCalled();
    });
  });
});
