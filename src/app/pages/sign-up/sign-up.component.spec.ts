import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpComponent } from './sign-up.component';
import { of } from 'rxjs';
import { DynamicFormService } from '../../shared/dynamic-form/services/dynamic-form.service';
import { DynamicFormComponent } from '../../shared/dynamic-form/dynamic-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;
  let dynamicFormServiceMock: any;

  beforeEach(async () => {
    dynamicFormServiceMock = {
      getFormJson: jest.fn().mockReturnValue(of({
        form: {
          fields: [
            { name: 'username', type: 'text', required: true },
            { name: 'password', type: 'NEW_PASSWORD', required: true, showConfirmPassword: true }
          ]
        }
      })),
      submitForm: jest.fn().mockReturnValue(of({ success: true, message: 'Form submitted successfully!' }))
    };
    await TestBed.configureTestingModule({
      imports: [SignUpComponent, DynamicFormComponent, BrowserAnimationsModule],
      providers: [
        { provide: DynamicFormService, useValue: dynamicFormServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call onSubmit, invoke submitForm in the service, and handle the response correctly', () => {
    const dynamicFormServiceSpy = jest.spyOn(dynamicFormServiceMock, 'submitForm').mockReturnValue(
      of({ success: true, message: 'Form submitted successfully!' })
    );

    let requestBody = {
      username: 'testuser',
      password: 'password123',
      confirmPassword: 'password123',
      identifier: 'testIdentifier',
      first_name: 'Test',
      last_name: 'User',
      newPassword: 'newPassword123'
    };

    component.onSubmit(requestBody);
    expect(dynamicFormServiceSpy).toHaveBeenCalledWith({
      username: 'testuser',
      password: 'password123',
      confirmPassword: 'password123',
      identifier: 'testIdentifier',
      first_name: 'Test',
      last_name: 'User',
      newPassword: 'newPassword123'
    });
  });

  it('should unsubscribe from all subscriptions on destroy', () => {
    const unsubscribeSpy = jest.spyOn(component.subscriptions[0], 'unsubscribe');
    component.ngOnDestroy();
    expect(unsubscribeSpy).toHaveBeenCalled();
  });
});
