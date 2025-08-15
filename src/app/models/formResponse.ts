export interface Item {
  itemId: string;
  title?: string;
  description?: string;
  pageBreakItem?: any;
  questionItem?: {
    question: {
      questionId?: string;
      required?: boolean;
      description?: string;
      textQuestion?: {
        paragraph?: boolean;
      };
      choiceQuestion?: {
        type?: string;
        options?: [
          {
            value?: string;
            goToSectionId?: string;
          }
        ];
      };
      dateQuestion?: {
        includeYear?: boolean;
      };
    };
  };
  value?: any;
}

export interface FormResponse {
  formId?: string;
  info?: {
    title: string;
    description: string;
    documentTitle: string;
  };
  responderUri?: string;
  revisionId?: string;
  items?: Item[];
  linkedSheetId?: string;
  status?: boolean;
  created_at: number
  updated_at?: number
}


export class Form {
  formId?: string;
  info?: {
    title: string;
    description: string;
    documentTitle: string;
  };
  items?: any;
  linkedSheetId?: string;
  status?: boolean
  created_at?: number
  updated_at?: number
  key?: string
  tableRange?: string
}

export interface FormReturn {
  spreadsheetId?: string,
  tableRange?: string,
  updatedRange?: string,
  updates?: {
    spreadsheetId?: string,
    updatedRange?: string,
    updatedRows?: number,
    updatedColumns?: number,
    updatedCells?: number
  }

  /*{'spreadsheetId': '15SUEdA4EqIafYfyRbLF7WkHzuv1JHRJaYiZ1GCLbNlQ',
  'tableRange': "'2022-2023'!A1:AP7440",
  'updates':
   {'spreadsheetId': '15SUEdA4EqIafYfyRbLF7WkHzuv1JHRJaYiZ1GCLbNlQ',
   'updatedRange': "'2022-2023'!A7441:B7441",
   'updatedRows': 1, 'updatedColumns': 2, 'updatedCells': 2}}*/
}
