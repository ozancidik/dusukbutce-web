// Form field types
export type FieldType = 'text' | 'select' | 'textarea' | 'number' | 'checkbox' | 'date';

export interface SelectOption {
  value: string;
  label: string;
}

export interface FormField {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  placeholder?: string;
  options?: SelectOption[];
  helpText?: string;
  showHelpModal?: boolean;
  gridColumn?: '1' | '2' | 'full';
  dependsOn?: {
    field: string;
    value: any;
  };
}

export interface FormSection {
  title: string;
  icon: string;
  fields: FormField[];
}

export interface ProductFormConfig {
  productType: string;
  category: string;
  apiEndpoint: string;
  returnUrl: string;
  pageTitle: string;
  pageIcon: string;
  sections: FormSection[];
  defaultFormData: Record<string, any>;
}

export interface BaseFormData {
  description: string;
  cosmeticCondition: string;
  hasBox: boolean;
  hasInvoice: boolean;
  hasWarranty: boolean;
  warrantyDuration: string;
  invoiceDate: string;
  quantity: number;
  images: string[];
}


