import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FormBuilderJsonModel } from '../models/dynamic-form.model';

@Injectable({
  providedIn: 'root'
})
export class DynamicFormService {
  public formJsonUrl = 'assets/form-json-data.json';

  constructor(
    private _http: HttpClient
  ) { }

  getFormJson(): Observable<FormBuilderJsonModel> {
    return this._http.get<FormBuilderJsonModel>(this.formJsonUrl)
  }
}