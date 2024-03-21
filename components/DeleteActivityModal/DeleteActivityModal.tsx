import BaseModal from '@components/BaseModal/BaseModal';

//Styles
import styles from './Styles.module.scss';

//Components
import WarningExclamation from '@components/WarningExclamation/WarningExclamation';
import ConfirmationSwal from '@components/ConfirmationSwal/ConfirmationSwal';

//Redux
import { useAppDispatch } from '@redux/hooks';
import { eliminateActivity } from '@redux/slices/activitiesSlices';

type Props = {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
  id: string;
  activity: string;
};

const DeleteActivityModal = ({
  showModal,
  setShowModal,
  id,
  activity,
}: Props) => {
  const dispatch = useAppDispatch();

  const handleDelete = () => {
    dispatch(eliminateActivity(id));
    ConfirmationSwal({ message: 'Activity deleted successfully' });
  };
  return (
    <BaseModal show={showModal} onClose={() => setShowModal(false)}>
      <div className={styles.container}>
        <h4>Delete this activity?</h4>
        <br />
        <WarningExclamation color='red' />
        <br />
        <h3>{activity}</h3>
        <br />
        <button onClick={handleDelete} className='btn__primary'>
          Delete
        </button>
      </div>
    </BaseModal>
  );
};

export default DeleteActivityModal;
