export type TagName = "Work" | "Personal" | "Meeting" | "Shopping" | "Todo";
export interface Note {
  id: number;
  title: string;
  content: string;
  tag: "Work" | "Personal" | "Meeting" | "Shopping" | "Todo";
}

export interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export interface NoteFormValues {
  title: string;
  content: string;
  tag: TagName;
}
export interface NoteFormProps {
  onClose: () => void;
}

export type FetchNotesParams = {
  page: number;
  searchQuery?: string;
};

export interface ApiResponse {
  notes: Note[];
  totalPages: number;
}

export interface SearchBoxProps {
  value: string;
  onSearch: (value: string) => void;
}

export type CreateNoteProps = {
  onSuccess?: () => void;
};
