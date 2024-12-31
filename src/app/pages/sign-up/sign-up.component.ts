import { Component, ViewChild } from '@angular/core';
import { DynamicFormComponent } from '../../shared/dynamic-form/dynamic-form.component';
import { DynamicFormService } from '../../shared/dynamic-form/services/dynamic-form.service';
import { DynamicFormModel, SubmitFormModel } from '../../shared/dynamic-form/models/dynamic-form.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sign-up',
  imports: [DynamicFormComponent],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {
  @ViewChild('dynamicForm') dynamicForm!: DynamicFormComponent

  formJsonData!: DynamicFormModel
  subscriptions: Subscription[] = [];

  constructor(
    private _dynamicFormService: DynamicFormService
  ) { }

  ngOnInit(): void {
    this.getFormJson()
  }
  getFormJson() {
    let getData = this._dynamicFormService.getFormJson().subscribe(res => {
      if (res) {
        this.formJsonData = res.form;
      } else {
        alert('Something went wrong')
      }
    })
    this.subscriptions.push(getData)
  }

  onSubmit(requestBody: SubmitFormModel) {
    let sub = this._dynamicFormService.submitForm(requestBody).subscribe({
      next: (resp) => {
        console.log(resp)
      },
      error: (errorResponse) => {
        this.dynamicForm.handleApiErrors(errorResponse)
      }
    })
    this.subscriptions.push(sub)
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe())
  }
}
