import { TestBed } from '@angular/core/testing';

import { UpdateResolver } from './update.resolver';

describe('UpdateResolver', () => {
  let resolver: UpdateResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(UpdateResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
