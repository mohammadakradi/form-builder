export interface FormBuilderJsonModel {
    form: DynamicFormModel;
    steps: number;
    current: number;
    fieldErrors: FieldErrors;
    errors: any[];
}

interface FieldErrors {
}

export interface DynamicFormModel {
    name: string;
    title: string;
    submitLabel: string;
    nestedFormShowType: string;
    fieldDescriptionShowType: string;
    fields: FieldModel[];
    forms: any[];
}

export interface FieldModel {
    '@type': string;
    name: string;
    title: string;
    description: string;
    errorMessage: string;
    required: boolean;
    minLength: number;
    maxLength: number;
    type: string;
    descriptionShowType?: string;
    regex?: string;
    info?: string;
    showConfirmPassword?: boolean;
}

export interface SubmitFormModel {
    identifier: string;
    username: string;
    first_name: string;
    last_name: string;
    confirmPassword: string;
    newPassword: string;
}