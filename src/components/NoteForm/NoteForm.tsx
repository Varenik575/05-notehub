import { Formik, Form, Field, type FormikHelpers, ErrorMessage } from 'formik';
import css from './NoteForm.module.css';
import { useId } from 'react';
import type { Note } from '../../types/note';
import { createNote } from '../../services/noteService';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import * as Yup from 'yup';

interface NoteFormValues {
  title: string;
  content: string;
  tag: Note['tag'];
}

interface NoteFormProps {
  onCancel: () => void;
}

const NoteFormSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, 'Your title should be at least 3 letters long!')
    .max(50, 'Title should be shorter than 50 letters!')
    .required('Title is a required field'),
  content: Yup.string().max(
    500,
    'The note should be shorter than 500 letters!'
  ),
  tag: Yup.string()
    .oneOf(['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'])
    .required('Tag is a required field too!'),
});

export default function NoteForm({ onCancel }: NoteFormProps) {
  const fieldId = useId();

  const handleCancel = () => {
    onCancel();
  };

  const queryClient = useQueryClient();

  const mutationCreate = useMutation({
    mutationFn: async (values: NoteFormValues) =>
      createNote(values.title, values.content, values.tag),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      onCancel();
    },
  });

  const handleSubmit = (
    values: NoteFormValues,
    actions: FormikHelpers<NoteFormValues>
  ) => {
    mutationCreate.mutate(values);
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={{ title: '', content: '', tag: 'Todo' }}
      validationSchema={NoteFormSchema}
      onSubmit={handleSubmit}
    >
      <Form className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor={`${fieldId}-title`}>Title</label>
          <Field
            id={`${fieldId}-title`}
            type="text"
            name="title"
            className={css.input}
          />
          <ErrorMessage component="span" name="title" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor={`${fieldId}-content`}>Content</label>
          <Field
            as="textarea"
            id={`${fieldId}-content`}
            name="content"
            rows={8}
            className={css.textarea}
          />
          <ErrorMessage component="span" name="content" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor={`${fieldId}-tag`}>Tag</label>
          <Field
            as="select"
            id={`${fieldId}-tag`}
            name="tag"
            className={css.select}
          >
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </Field>
          <ErrorMessage component="span" name="tag" className={css.error} />
        </div>

        <div className={css.actions}>
          <button
            type="button"
            className={css.cancelButton}
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button type="submit" className={css.submitButton} disabled={false}>
            Create note
          </button>
        </div>
      </Form>
    </Formik>
  );
}

//  <form className={css.form}>
//   <div className={css.formGroup}>
//     <label htmlFor="title">Title</label>
//     <input id="title" type="text" name="title" className={css.input} />
//     <span name="title" className={css.error} />
//   </div>

//   <div className={css.formGroup}>
//     <label htmlFor="content">Content</label>
//     <textarea
//       id="content"
//       name="content"
//       rows={8}
//       className={css.textarea}
//     />
//     <span name="content" className={css.error} />
//   </div>

//   <div className={css.formGroup}>
//     <label htmlFor="tag">Tag</label>
//     <select id="tag" name="tag" className={css.select}>
//       <option value="Todo">Todo</option>
//       <option value="Work">Work</option>
//       <option value="Personal">Personal</option>
//       <option value="Meeting">Meeting</option>
//       <option value="Shopping">Shopping</option>
//     </select>
//     <span name="tag" className={css.error} />
//   </div>

//   <div className={css.actions}>
//     <button type="button" className={css.cancelButton}>
//       Cancel
//     </button>
//     <button
//       type="submit"
//       className={css.submitButton}
//       disabled=false
//     >
//       Create note
//     </button>
//   </div>
// </form>
