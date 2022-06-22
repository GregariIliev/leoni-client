import { TestBed } from '@angular/core/testing';

import { AuthentiacationResolver } from './authentiacation.resolver';

describe('AuthentiacationResolver', () => {
  let resolver: AuthentiacationResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(AuthentiacationResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
