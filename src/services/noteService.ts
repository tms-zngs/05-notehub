import axios from "axios";
import type {
  ApiResponse,
  FetchNotesParams,
  Note,
  NoteFormValues,
} from "../types/note";
axios.defaults.baseURL = "https://notehub-public.goit.study/api";
const token = import.meta.env.VITE_NOTEHUB_TOKEN;

export const fetchNotes = async ({
  page = 1,
  searchQuery,
}: FetchNotesParams): Promise<ApiResponse> => {
  const perPage = 12;

  const response = await axios.get<ApiResponse>(`/notes`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      page,
      perPage,
      search: searchQuery,
    },
  });
  return response.data;
};

export const createNote = async (newNote: NoteFormValues): Promise<Note> => {
  const response = await axios.post<Note>(`/notes`, newNote, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const deleteNote = async (id: number): Promise<Note> => {
  const response = await axios.delete<Note>(`/notes/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
