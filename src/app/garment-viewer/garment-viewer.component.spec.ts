import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GarmentViewerComponent } from './garment-viewer.component';

describe('GarmentViewerComponent', () => {
  let component: GarmentViewerComponent;
  let fixture: ComponentFixture<GarmentViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GarmentViewerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GarmentViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
