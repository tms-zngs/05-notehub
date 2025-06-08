export type TagName = "Work" | "Personal" | "Meeting" | "Shopping" | "Todo";
export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  tag: "Work" | "Personal" | "Meeting" | "Shopping" | "Todo";
}

export interface NoteProps {
  notes: Note[];
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

export type NoteModalProps = {
  onClose: () => void;
  children: React.ReactNode;
};

export interface NoteFormProps {
  onClose: () => void;
}

export type FetchNotesParams = {
  page: number;
  searchQuery?: string;
};

export interface SearchBoxProps {
  value: string;
  onSearch: (value: string) => void;
}

export type CreateNoteProps = {
  onSuccess?: () => void;
};
