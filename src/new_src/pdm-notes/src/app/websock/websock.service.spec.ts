/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { WebsockService } from './websock.service';

describe('Service: Websock', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WebsockService]
    });
  });

  it('should ...', inject([WebsockService], (service: WebsockService) => {
    expect(service).toBeTruthy();
  }));
});
