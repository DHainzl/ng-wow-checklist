import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ChecklistLineComponent } from './checklist-line.component';

describe('ChecklistLineComponent', () => {
    let component: ChecklistLineComponent;
    let fixture: ComponentFixture<ChecklistLineComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [ ChecklistLineComponent ],
        })
    .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ChecklistLineComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
