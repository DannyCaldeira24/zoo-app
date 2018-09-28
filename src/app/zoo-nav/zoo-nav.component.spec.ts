
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ZooNavComponent } from './zoo-nav.component';

describe('ZooNavComponent', () => {
  let component: ZooNavComponent;
  let fixture: ComponentFixture<ZooNavComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [MatSidenavModule],
      declarations: [ZooNavComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZooNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
