import { TestBed } from '@angular/core/testing';
import { PostCardsService } from './post-cards.service';

describe('PostCardsService', () => {
  let service: PostCardsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostCardsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
