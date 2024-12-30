import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { DynamicFormComponent } from './dynamic-form.component';
import { DynamicFormService } from './services/dynamic-form.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('DynamicFormComponent', () => {
  let component: DynamicFormComponent;
  let fixture: ComponentFixture<DynamicFormComponent>;
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
      }))
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, DynamicFormComponent, BrowserAnimationsModule],
      providers: [
        { provide: DynamicFormService, useValue: dynamicFormServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DynamicFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form group with fields from service', () => {
    expect(component.formGroup.contains('username')).toBe(true);
    expect(component.formGroup.contains('password')).toBe(true);
    expect(component.formGroup.contains('confirmPassword')).toBe(true);
  });

  it('should validate password and confirm password fields', () => {
    const passwordControl = component.formGroup.controls['password'];
    const confirmPasswordControl = component.formGroup.controls['confirmPassword'];

    passwordControl.setValue('password123');
    confirmPasswordControl.setValue('password1234');
    component.checkIdenticalPassword();
    expect(confirmPasswordControl.errors).toEqual({ passwordMismatch: true });

    confirmPasswordControl.setValue('password123');
    component.checkIdenticalPassword();
    expect(confirmPasswordControl.errors).toBeNull();
  });

  it('should call onSubmit and log form value', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    component.formGroup.controls['username'].setValue('testuser');
    component.formGroup.controls['password'].setValue('password123');
    component.formGroup.controls['confirmPassword'].setValue('password123');
    component.onSubmit();
    expect(consoleSpy).toHaveBeenCalledWith({
      username: 'testuser',
      password: 'password123',
      confirmPassword: 'password123'
    });
  });

  it('should unsubscribe from all subscriptions on destroy', () => {
    const unsubscribeSpy = jest.spyOn(component.subscriptions[0], 'unsubscribe');
    component.ngOnDestroy();
    expect(unsubscribeSpy).toHaveBeenCalled();
  });
});
