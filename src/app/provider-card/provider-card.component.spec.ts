import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ProviderCardComponent } from './provider-card.component';
import { DebugElement } from '@angular/core';

describe('ProviderCardComponent', () => {
  let component: ProviderCardComponent;
  let fixture: ComponentFixture<ProviderCardComponent>;
  let de: DebugElement;
  let el: HTMLElement

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProviderCardComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderCardComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    component.provider = {
      id: '1',
      name: 'John',
      address: '123 Greenway Blvd',
      phone: '8991234321'
    }
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have 4 child elements', () => {
    expect(de.query(By.css('li')).nativeElement.childElementCount).toEqual(4);
  })

  it('should render provider name, address, phone number, and button', () => {
    const expected = "Provider: John\n\nAddress: 123 Greenway Blvd\n\nPhone: (899) 123-4321\n\nSave Provider"
    expect(de.query(By.css('li')).nativeElement.innerText).toEqual(expected);
  });

  it('should call the sendDataToParent method on button click', () => {
    spyOn(component, 'sendDataToParent');
    el = de.query(By.css('button')).nativeElement;
    el.click();
    expect(component.sendDataToParent).toHaveBeenCalled();
  });
});
