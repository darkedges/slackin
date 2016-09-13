/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SlackinService } from './slackin.service';

describe('Service: SlackinService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SlackinService]
    });
  });

  it('should ...', inject([SlackinService], (service: SlackinService) => {
    expect(service).toBeTruthy();
  }));
});
