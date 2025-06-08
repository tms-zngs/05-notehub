import css from "./NoteList.module.css";
import { useDeleteNote } from "../CreateNote/HookMutation";
import type { NoteProps } from "../../types/note";

export default function NoteList({ notes }: NoteProps) {
  const { mutate, isPending } = useDeleteNote();

  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li className={css.listItem} key={note.id}>
          <h2 className={css.title}>{note.title}</h2>
          <p className={css.content}>{note.content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{note.tag}</span>
            <button
              className={css.button}
              onClick={() => mutate(note.id)}
              disabled={isPending}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
