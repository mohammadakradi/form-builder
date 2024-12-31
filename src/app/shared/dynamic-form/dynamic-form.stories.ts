import { moduleMetadata, Meta, StoryObj } from '@storybook/angular';
import { DynamicFormComponent } from './dynamic-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { action } from '@storybook/addon-actions';

export default {
    title: 'Components/DynamicForm',
    component: DynamicFormComponent,
    tags: ['autodocs'],
    render: (args) => ({
        component: DynamicFormComponent,
        props: {
            ...args,
            onSubmit: action('Submit clicked, form data will be emitted to the parent component'),
        },
        moduleMetadata: {
            imports: [
                ReactiveFormsModule,
                MatTooltipModule,
                MatInputModule,
                MatFormFieldModule,
                MatIconModule,
                MatButtonModule
            ],
        },
    }),
} as Meta<DynamicFormComponent>;

type DynamicFormStory = StoryObj<DynamicFormComponent>;

export const Primary: DynamicFormStory = {
    args: {
        formJsonData: {
            name: 'Name',
            title: 'Title',
            submitLabel: 'Submit',
            nestedFormShowType: 'nested',
            fieldDescriptionShowType: 'tooltip',
            fields: [
                {
                    '@type': '.input.TextField',
                    name: 'last_name',
                    title: 'Last name',
                    description: 'Enter last name',
                    errorMessage: 'Error message',
                    required: true,
                    minLength: 3,
                    maxLength: 20,
                    type: 'TEXT',
                },
                {
                    '@type': 'NEW_PASSWORD',
                    name: 'password',
                    title: 'Password',
                    description: 'Password',
                    errorMessage: 'Error message',
                    required: true,
                    minLength: 8,
                    maxLength: 20,
                    info: 'Password must be at least 8 characters long',
                    type: 'NEW_PASSWORD',
                },
            ],
            forms: [],
        },
    },
}