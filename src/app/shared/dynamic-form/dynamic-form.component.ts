import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DynamicFormModel, SubmitFormModel } from './models/dynamic-form.model';
import { Subscription } from 'rxjs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-dynamic-form',
  imports: [
    ReactiveFormsModule,
    MatTooltipModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButton
  ],
  templateUrl: './dynamic-form.component.html',
  styleUrl: './dynamic-form.component.scss'
})
export class DynamicFormComponent {
  @Input() formJsonData!: DynamicFormModel;
  @Output() onSubmit = new EventEmitter<SubmitFormModel>();
  formGroup: FormGroup = new FormGroup({});
  subscriptions: Subscription[] = [];
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;
  passwordFieldName: string = 'password';

  // Confirm Password Fields' Static Labels
  confirmPasswordFieldName: string = 'confirmPassword';
  confirmPasswordLabel: string = 'Confirm Password';
  passwordMismatchErrorMessage: string = "Password Doesn't Match";

  constructor(
    public _formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.createFormGroup();
  }

  createFormGroup() {
    const formGroup: any = {};
    this.formJsonData.fields.forEach(field => {
      if (field.type === 'NEW_PASSWORD' && field.showConfirmPassword) {
        formGroup[this.confirmPasswordFieldName] = ['', Validators.required]
        this.passwordFieldName = field.name
      }
      formGroup[field.name] = ['', this.addFormControlValidations(field)]
    })
    this.formGroup = this._formBuilder.group(formGroup)
  }

  addFormControlValidations(field: any) {
    const validations: any = [];
    if (field.required) validations.push(Validators.required);
    if (field.regex) validations.push(Validators.pattern(field.regex));
    if (field.minLength) validations.push(Validators.minLength(field.minLength));
    if (field.maxLength) validations.push(Validators.maxLength(field.maxLength));
    return validations
  }

  checkIdenticalPassword() {
    let password = this.formGroup.controls[this.passwordFieldName].value
    let confirmPassword = this.formGroup.controls[this.confirmPasswordFieldName].value
    if (password !== confirmPassword) {
      this.formGroup.controls[this.confirmPasswordFieldName].setErrors({ passwordMismatch: true });
    } else {
      this.formGroup.controls[this.confirmPasswordFieldName].setErrors(null);
    }
  }

  handleApiErrors(apiResponse: any) {
    if (apiResponse.fieldErrors) {
      for (const field in apiResponse.fieldErrors) {
        if (this.formGroup.controls[field]) {
          this.formGroup.controls[field].setErrors({ apiError: apiResponse.fieldErrors[field] });
        }
      }
    }
  }

  submit() {
    this.onSubmit.emit(this.formGroup.value)
  }
}
