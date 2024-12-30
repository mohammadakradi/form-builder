import { TestBed } from '@angular/core/testing';

import { DynamicFormService } from './dynamic-form.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FormBuilderJsonModel, SubmitFormModel } from '../models/dynamic-form.model';

describe('DynamicFormService', () => {
  let service: DynamicFormService;
  let httpTestingController: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DynamicFormService]
    });
    service = TestBed.inject(DynamicFormService);
    httpTestingController = TestBed.inject(HttpTestingController)
  });

  afterEach(() => {
    httpTestingController.verify();;
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return form json data', () => {
    let mockData: FormBuilderJsonModel | undefined;
    service.getFormJson().subscribe(res => {
      mockData = res;
    })
    const req = httpTestingController.expectOne(service.formJsonUrl);
    req.flush({ form: { name: '', title: 'test', submitLabel: '', nestedFormShowType: '', fieldDescriptionShowType: '', fields: [], forms: [] }, steps: 0, current: 0, fieldErrors: {}, errors: [] });
    expect(mockData).toEqual({ form: { name: '', title: 'test', submitLabel: '', nestedFormShowType: '', fieldDescriptionShowType: '', fields: [], forms: [] }, steps: 0, current: 0, fieldErrors: {}, errors: [] });
    expect(req.request.method).toEqual('GET');
  })

  it('should submit form data successfully', () => {
    const mockFormData: any = {
      username: 'testUser',
      newPassword: 'testPassword'
    };

    const mockResponse = {
      success: true,
      message: 'Form submitted successfully!'
    };

    service.submitForm(mockFormData).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne(service.getApiUrl());
    req.flush(mockResponse);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockFormData);
  });
});
