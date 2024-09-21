import { TestBed } from '@angular/core/testing';

import { MyGamesService } from './my-games.service';

describe('MyGamesService', () => {
  let service: MyGamesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyGamesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
