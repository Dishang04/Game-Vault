import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatformOptionsComponent } from './platform-options.component';

describe('PlatformOptionsComponent', () => {
  let component: PlatformOptionsComponent;
  let fixture: ComponentFixture<PlatformOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlatformOptionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlatformOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
