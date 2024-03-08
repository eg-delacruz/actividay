import BaseModal from "@components/BaseModal/BaseModal";

//Styles
import styles from "./Styles.module.scss";

//Components
import WarningExclamation from "@components/WarningExclamation/WarningExclamation";

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
  return (
    <>
      <BaseModal show={showModal} onClose={() => setShowModal(false)}>
        <div className={styles.container}>
          <h4>¿Quieres borrar esta actividad?</h4>
          <br />
          <WarningExclamation color="red" />
          <br />
          <h3>{activity}</h3>
          <br />
          <button className="btn__primary">Eliminar</button>
        </div>
      </BaseModal>
    </>
  );
};

export default DeleteActivityModal;
