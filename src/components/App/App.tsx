import css from "./App.module.css";
import NoteList from "../NoteList/NoteList.tsx";
import { useState } from "react";
import { fetchNotes } from "../../services/noteService.ts";
import Pagination from "../Pagination/Pagination.tsx";
import NoteModal from "../NoteModal/NoteModal.tsx";
import NoteForm from "../NoteForm/NoteForm.tsx";
import SearchBox from "../SearchBox/SearchBox.tsx";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import { Toaster } from "react-hot-toast";
import type { Note } from "../../types/note.ts";

export default function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery] = useDebounce(searchQuery, 300);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const { data } = useQuery<{ notes: Note[]; totalPages: number }, Error>({
    queryKey: ["notes", currentPage, debouncedSearchQuery],
    queryFn: () =>
      fetchNotes({
        page: currentPage,
        searchQuery: debouncedSearchQuery || undefined,
      }),
    placeholderData: keepPreviousData,
  });

  const totalPages = data?.totalPages || 1;
  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={searchQuery} onSearch={setSearchQuery} />
        {totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        )}
        <button className={css.button} onClick={openModal}>
          Create note +
        </button>
      </header>
      <div>
        <Toaster position="top-center" reverseOrder={true} />
      </div>
      <NoteList notes={data?.notes || []} />
      {isModalOpen && (
        <NoteModal onClose={closeModal}>
          <NoteForm onClose={closeModal} />
        </NoteModal>
      )}
    </div>
  );
}
