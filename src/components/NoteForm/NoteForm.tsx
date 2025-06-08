import css from "./NoteForm.module.css";
import type { NoteFormProps, NoteFormValues } from "../../types/note";
import { useCreateNote } from "../CreateNote/HookMutation";
import { Formik, Form, Field, ErrorMessage, type FormikHelpers } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";

export default function NoteForm({ onClose }: NoteFormProps) {
  const initialValues: NoteFormValues = {
    title: "",
    content: "",
    tag: "Todo",
  };

  const mutation = useCreateNote();

  const noteFormSchema = Yup.object().shape({
    title: Yup.string()
      .min(3, "Name must be at least 3 characters")
      .max(50, "Name is too long")
      .required("Title is required"),
    content: Yup.string()
      .max(500, "Content is too long")
      .required("Content is required"),
    tag: Yup.string().required("Tag is required"),
  });

  const handleSubmit = (
    values: NoteFormValues,
    actions: FormikHelpers<NoteFormValues>
  ) => {
    mutation.mutate(values, {
      onSuccess: () => {
        toast.success("New note created successfully");
        actions.resetForm();
        onClose();
      },
    });
    console.log("Note data:", values);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={noteFormSchema}
      onSubmit={handleSubmit}
    >
      <Form className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor="title">Title</label>
          <Field id="title" type="text" name="title" className={css.input} />
          <ErrorMessage name="title" component="span" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="content">Content</label>
          <Field
            id="content"
            name="content"
            rows="8"
            as="textarea"
            className={css.textarea}
          />
          <ErrorMessage name="content" component="span" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="tag">Tag</label>
          <Field as="select" id="tag" name="tag" className={css.select}>
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </Field>
          <ErrorMessage name="tag" component="span" className={css.error} />
        </div>

        <div className={css.actions}>
          <button type="button" className={css.cancelButton} onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className={css.submitButton}>
            Create note
          </button>
        </div>
      </Form>
    </Formik>
  );
}
