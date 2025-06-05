import css from "./App.module.css";
import NoteList from "../NoteList/NoteList.tsx";
import { useState } from "react";
import { fetchNotes } from "../../services/NoteSevice.ts";
import Pagination from "../Pagination/Pagination.tsx";
import NoteModal from "../NoteModal/NoteModal.tsx";
import NoteForm from "../NoteForm/NoteForm.tsx";
import SearchBox from "../SearchBox/SearchBox.tsx";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export default function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const { data } = useQuery({
    queryKey: ["notes", currentPage],
    queryFn: () => fetchNotes(currentPage),
    placeholderData: keepPreviousData,
  });

  const totalPages = data?.totalPages || 1;
  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox />
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
      <NoteList notes={data?.notes || []} />
      {isModalOpen && (
        <NoteModal onClose={closeModal}>
          <NoteForm onClose={closeModal} />
        </NoteModal>
      )}
    </div>
  );
}
