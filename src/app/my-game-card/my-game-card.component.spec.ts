import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyGameCardComponent } from './my-game-card.component';

describe('MyGameCardComponent', () => {
  let component: MyGameCardComponent;
  let fixture: ComponentFixture<MyGameCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyGameCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyGameCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
