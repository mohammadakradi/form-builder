import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FormBuilderJsonModel, SubmitFormModel } from '../models/dynamic-form.model';

@Injectable({
  providedIn: 'root'
})
export class DynamicFormService {
  public formJsonUrl = 'assets/form-json-data.json';
  private apiUrl = 'https://accounts.mail.ir/app/sign-up'

  constructor(
    private _http: HttpClient
  ) { }

  getFormJson(): Observable<FormBuilderJsonModel> {
    return this._http.get<FormBuilderJsonModel>(this.formJsonUrl)
  }

  submitForm(data: SubmitFormModel): Observable<any> {
    return this._http.post(this.apiUrl, data)
  }
}