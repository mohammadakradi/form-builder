# Chaapaar Task (Form Builder)

Chaapaar Task is an Angular-based dynamic form project that facilitates creating and handling customizable forms with validation, password management, and error handling. This document outlines the project's structure, components, services, models, and testing strategy.

---

## Project Overview

The project is designed with modularity and scalability in mind. It includes the following main components:

1. **Dynamic Form Component**: Handles dynamic form rendering and validation.
2. **Error Interceptor**: Captures and handles HTTP errors globally.
3. **Services**: Manages data retrieval and form submission.
4. **Models**: Defines data structures for forms and submissions.
5. **Unit Testing**: Ensures reliability and correctness of the components and services.

---

## Project Structure

### **Components**
#### DynamicFormComponent
- **File**: `src/app/components/dynamic-form/dynamic-form.component.ts`
- **Responsibilities**:
  - Renders dynamic forms based on JSON data.
  - Manages form validations (required fields, regex, min/max length).
  - Handles password confirmation and mismatch scenarios.
  - Displays and resolves API errors at the field level.
  - Submits form data to the backend using `DynamicFormService`.

---

### **Services**
#### DynamicFormService
- **Responsibilities**:
  - Fetches JSON data for form fields and configurations.
  - Submits form data to the backend.
  - Handles API communication.

---

### **Interceptors**
#### ErrorInterceptor
- **File**: `src/app/interceptors/error.interceptor.ts`
- **Responsibilities**:
  - Captures HTTP errors globally.
  - Prepares error responses for display or further handling in components.

---

### **Testing**
#### Unit Tests
- **Testing Framework**: Jest.
- **Coverage**:
  - **SignUpComponent**:
    - Ensures form is rendered correctly with validations.
    - Verifies method to retrieve data.
    - Verifies form submission.
  - **DynamicFormComponent**:
    - Ensures form is rendered correctly with validations.
    - Validates password mismatch and error handling.
    - Verifies method to create form group.
    - Verifies onSubmit emitter emits correct form value model.
  - **DynamicFormService**:
    - Tests form data retrieval and submission logic.

---

## Installation & Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/mohammadakradi/form-builder.git
   cd form-builder
   ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Run the development server:
    ```bash
    ng serve
    ```

## Usage
1.	The dynamic form component will automatically fetch form configurations from the backend.
2.	Fill out the form based on the displayed fields.
3.	Click submit to send the data. API responses will be handled and displayed.

## Scripts
- __Start Development Server:__ ng serve
- __Run Unit Tests:__ npm test
- __Build for Production:__ ng build --configuration=production

## License
This project is licensed under the MIT License. See the LICENSE file for details.