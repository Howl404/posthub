import { TestBed } from '@angular/core/testing';
import { TableService } from 'src/app/shared/table/table-service.service';

describe('TableService', () => {
  let service: TableService<object>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
