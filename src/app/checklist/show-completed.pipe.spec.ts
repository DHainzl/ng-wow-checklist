import { async, TestBed } from '@angular/core/testing';

import { LocalStorageService } from '../services/local-storage/local-storage.service';

import { ShowCompletedPipe } from './show-completed.pipe';

describe('ShowCompletedPipe', () => {
    let pipe: ShowCompletedPipe;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            providers: [
                ShowCompletedPipe,
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        pipe = TestBed.get(ShowCompletedPipe);
    });

    it('create an instance', () => {
        expect(pipe).toBeTruthy();
    });
});
