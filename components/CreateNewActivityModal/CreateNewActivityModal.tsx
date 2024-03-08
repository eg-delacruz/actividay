import BaseModal from '@components/BaseModal/BaseModal';

//Styles
import styles from './Styles.module.scss';

type Props = {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
};

const CreateNewActivityModal = ({ showModal, setShowModal }: Props) => {
  return (
    <div>
      <BaseModal show={showModal} onClose={() => setShowModal(false)}>
        <h2>Add a custom activity</h2>
      </BaseModal>
    </div>
  );
};

export default CreateNewActivityModal;
