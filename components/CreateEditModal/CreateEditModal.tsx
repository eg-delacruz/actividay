import { useState } from 'react';

//Styles
import styles from './Styles.module.scss';

//Components
import BaseModal from '@components/BaseModal/BaseModal';
import ConfirmationSwal from '@components/ConfirmationSwal/ConfirmationSwal';

//Redux
import { useAppDispatch } from '@redux/hooks';
import {
  addCustomActivity,
  editActivity,
} from '@redux/slices/activitiesSlices';

//Hooks
import { useInputValue } from '@hooks/useInputValue';

type Props = {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
  action: 'create' | 'edit';
  id?: string;
  activity?: string;
  link?: string;
  participants?: number;
  category?: string;
};

const CreateEditModal = ({
  showModal,
  setShowModal,
  action,
  id,
  activity,
  link,
  participants,
  category,
}: Props) => {
  const dispatch = useAppDispatch();

  //Controlling inputs
  const TITLE = useInputValue(action === 'edit' ? activity : '');
  const LINK = useInputValue(action === 'edit' ? link : '');
  const CATEGORY = useInputValue(action === 'edit' ? category : '');
  const PARTICIPANTS = useInputValue(action === 'edit' ? participants : 1);

  //Checking errors
  const [titleError, setTitleError] = useState<string>('');
  const [linkError, setLinkError] = useState<string>('');
  const [categoryError, setCategoryError] = useState<string>('');
  const [participantsError, setParticipantsError] = useState<string>('');

  const handleCreateEdit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    //Reset errors
    setTitleError('');
    setLinkError('');
    setCategoryError('');
    setParticipantsError('');

    //Checking errors
    if (TITLE.value === '') {
      setTitleError('Title is required');
    }

    if (LINK.value !== '' && !LINK.value?.toString().includes('http')) {
      setLinkError('Link must be a valid URL and include http:// or https://');
    }

    if (CATEGORY.value === '') {
      setCategoryError('Category is required');
    }
    if (Number.isNaN(Number(PARTICIPANTS.value))) {
      setParticipantsError('Participants must be a number');
    }
    if (Number(PARTICIPANTS.value) < 1) {
      setParticipantsError('Participants must be at least 1');
    }
    if (Number(PARTICIPANTS.value) > 99) {
      setParticipantsError('Participants must be less than 100');
    }

    //Stop execution if there are any errors
    if (
      TITLE.value === '' ||
      (LINK.value !== '' && !LINK.value?.toString().includes('http')) ||
      CATEGORY.value === '' ||
      Number.isNaN(Number(PARTICIPANTS.value)) ||
      Number(PARTICIPANTS.value) < 1 ||
      Number(PARTICIPANTS.value) > 99
    )
      return;

    if (action === 'create') {
      dispatch(
        addCustomActivity({
          activity: TITLE.value?.toString() || '',
          link: LINK.value?.toString() || '',
          category: CATEGORY.value?.toString() || '',
          participants: Number(PARTICIPANTS.value),
        })
      );

      //Close modal
      setShowModal(false);

      //Show confirmation
      ConfirmationSwal({ message: 'Activity added successfully!' });
    }

    if (action === 'edit') {
      dispatch(
        editActivity({
          id: id || '',
          activity: TITLE.value?.toString() || '',
          link: LINK.value?.toString() || '',
          category: CATEGORY.value?.toString() || '',
          participants: Number(PARTICIPANTS.value),
        })
      );

      //Close modal
      setShowModal(false);

      //Show confirmation
      ConfirmationSwal({ message: 'Activity edited successfully!' });
    }
    //Reset inputs
    TITLE.setValue('');
    LINK.setValue('');
    CATEGORY.setValue('');
    PARTICIPANTS.setValue(1);
  };

  return (
    <BaseModal show={showModal} onClose={() => setShowModal(false)}>
      <form
        action=''
        method='POST'
        onSubmit={handleCreateEdit}
        className={styles.container}
      >
        {action === 'create' ? (
          <h2>Add a custom activity</h2>
        ) : (
          <h2>Edit activity</h2>
        )}

        <br />

        <div>
          <label htmlFor='title' className={styles.input_label}>
            Activity title
          </label>
          <input
            autoFocus
            id='title'
            name='title'
            className={styles.input}
            type='text'
            value={TITLE.value}
            onChange={TITLE.onChange}
          />
        </div>

        <div>
          <label className={styles.input_label} htmlFor='link'>
            Related link (optional)
          </label>
          <input
            value={LINK.value}
            onChange={LINK.onChange}
            className={styles.input}
            id='link'
            name='link'
            type='text'
          />
        </div>

        <div className={styles.category_participants_container}>
          <div className={styles.category_input_container}>
            <label className={styles.input_label} htmlFor='category'>
              Select a category
            </label>
            <select
              value={CATEGORY.value}
              onChange={CATEGORY.onChange}
              className={styles.input}
              name='category'
              id='category'
            >
              <option value='' disabled hidden>
                -- Please select a category --
              </option>
              <option value='education'>Education</option>
              <option value='recreational'>Recreational</option>
              <option value='social'>Social</option>
              <option value='diy'>diy</option>
              <option value='charity'>Charity</option>
              <option value='cooking'>Cooking</option>
              <option value='relaxation'>Relaxation</option>
              <option value='music'>Music</option>
              <option value='busywork'>busywork</option>
            </select>
          </div>

          <div className={styles.participants_input_container}>
            <label className={styles.input_label} htmlFor='participants'>
              Participants
            </label>
            <input
              value={PARTICIPANTS.value}
              onChange={PARTICIPANTS.onChange}
              className={styles.input}
              id='participants'
              name='participants'
              type='number'
            />
          </div>
        </div>
        {titleError && <p className='form_error_message'>{titleError}</p>}
        {linkError && <p className='form_error_message'>{linkError}</p>}
        {categoryError && <p className='form_error_message'>{categoryError}</p>}
        {participantsError && (
          <p className='form_error_message'>{participantsError}</p>
        )}
        <button type='submit' className='btn__primary'>
          {action === 'create' ? 'Add activity' : 'Edit activity'}
        </button>
      </form>
    </BaseModal>
  );
};

export default CreateEditModal;
