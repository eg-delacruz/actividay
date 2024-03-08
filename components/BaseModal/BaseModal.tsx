import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

//Styles
import styles from './Styles.module.scss';

//Fonts
//Need to import since the fonts applied in _app.tsx are not applied to the root-modal div element
import { rubik, nunito_sans } from '@font/font';

type Props = {
  onClose: () => void;
  show: boolean;
  children: React.ReactNode;
};

//Component to be used as a basis to create different modals
const BaseModal = ({ onClose, show, children }: Props) => {
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleClose = (e: React.MouseEvent<HTMLElement>): void => {
    e.preventDefault();
    onClose();
  };

  const modalContent = show ? (
    <div onClick={handleClose} className={`${styles.overlay}`}>
      <div
        className={`${styles.modal} ${rubik.variable} ${nunito_sans.variable}`}
        onClick={(e) => {
          //Needed to avoid that the modal closes if clicked
          e.stopPropagation();
        }}
      >
        <div className={styles.header}>
          <button onClick={handleClose}>X</button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  ) : null;

  return isClient
    ? createPortal(
        modalContent,
        document.getElementById('modal-root') as HTMLElement
      )
    : null;
};

export default BaseModal;
