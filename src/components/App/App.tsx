import css from "./App.module.css";
import NoteList from "../NoteList/NoteList.tsx";
import { useEffect, useState } from "react";
import { fetchNotes } from "../../services/noteService.ts";
import Pagination from "../Pagination/Pagination.tsx";
import NoteModal from "../NoteModal/NoteModal.tsx";
import SearchBox from "../SearchBox/SearchBox.tsx";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import { Toaster } from "react-hot-toast";
import type { Note } from "../../types/note.ts";
import { PulseLoader } from "react-spinners";
import ErrorMessage from "../ErrorMessage/ErrorMessage.tsx";
import EmptyState from "../EmptyState/EmptyState.tsx";

export default function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery] = useDebounce(searchQuery, 300);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchQuery]);

  const { data, isPending, isError, error } = useQuery<
    { notes: Note[]; totalPages: number },
    Error
  >({
    queryKey: ["notes", currentPage, debouncedSearchQuery],
    queryFn: () =>
      fetchNotes({
        page: currentPage,
        searchQuery: debouncedSearchQuery || undefined,
      }),
    placeholderData: keepPreviousData,
  });

  const totalPages = data?.totalPages || 1;
  const notes = data?.notes || [];

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
      {isPending && (
        <div className={css.loaderContainer}>
          <PulseLoader
            color="#4bc5af"
            cssOverride={{}}
            margin={6}
            size={10}
            speedMultiplier={1.5}
          />
        </div>
      )}
      {isError && <ErrorMessage message={error.message} />}
      {!isPending && !isError && notes.length === 0 && (
        <EmptyState
          message={
            debouncedSearchQuery
              ? `No notes found for "${debouncedSearchQuery}". Try a different search!`
              : "You don't have any notes yet. Create one!"
          }
        />
      )}
      {!isPending && !isError && notes.length > 0 && <NoteList notes={notes} />}
      {isModalOpen && <NoteModal onClose={closeModal} />}
    </div>
  );
}
