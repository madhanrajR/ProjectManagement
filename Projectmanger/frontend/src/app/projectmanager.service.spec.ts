import { TestBed } from '@angular/core/testing';

import { ProjectmanagerService } from './projectmanager.service';

describe('ProjectmanagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProjectmanagerService = TestBed.get(ProjectmanagerService);
    expect(service).toBeTruthy();
  });
});
