import Image from 'next/image';
import { useState, lazy, Suspense } from 'react';

//Styles
import styles from './Styles.module.scss';

//Assets
import trash_icon from '@assets/icons/trash.png';
import pencil_icon from '@assets/icons/pencil.png';

//Components

//Types
type Props = TActivity;

const ActivityCard = ({
  activity,
  category,
  id,
  link,
  participants,
}: Props) => {
  //Delete activity modal
  const [showDeleteActivityModal, setShowDeleteActivityModal] =
    useState<boolean>(false);

  //Dynamically importing modal
  const DynamicDeleteActivityModal = lazy(
    () => import('@components/DeleteActivityModal/DeleteActivityModal')
  );

  const handleDeleteActivityModal = () => {
    return (
      <Suspense>
        <DynamicDeleteActivityModal
          showModal={showDeleteActivityModal}
          setShowModal={setShowDeleteActivityModal}
          id={id}
          activity={activity}
        />
      </Suspense>
    );
  };

  //Edit activity modal
  const [showEditActivityModal, setShowEditActivityModal] =
    useState<boolean>(false);

  //Dynamically importing modal
  const DynamicCreateEditModal = lazy(
    () => import('@components/CreateEditModal/CreateEditModal')
  );

  const handleEditActividyModal = () => {
    type Props = TActivity & {
      action: string;
    };

    return (
      <Suspense>
        <DynamicCreateEditModal
          showModal={showEditActivityModal}
          setShowModal={setShowEditActivityModal}
          action='edit'
          id={id}
          activity={activity}
          link={link}
          participants={participants}
          category={category}
        />
      </Suspense>
    );
  };

  return (
    <>
      {/* Modals */}
      {handleDeleteActivityModal()}
      {handleEditActividyModal()}

      <div className={styles.card}>
        <div className={styles.card__info}>
          <p className={styles.headings}>Activity</p>
          <h4>{activity}</h4>
          {link && (
            <>
              <p className={styles.headings}>Related link: </p>
              <a href={link} target='_blank'>
                {link}
              </a>
            </>
          )}

          <span className={styles.tags}>
            <strong>Category: </strong> {category}
          </span>
          <span className={styles.tags}>
            <strong>Participants: </strong> {participants}
          </span>
        </div>

        <div className={styles.card__buttons}>
          <div
            onClick={() => setShowDeleteActivityModal(true)}
            className={styles.icon_container}
          >
            <Image src={trash_icon} alt='trash icon' />
          </div>
          <div
            onClick={() => setShowEditActivityModal(true)}
            className={`${styles.icon_container} ${styles.pencil}`}
          >
            <Image src={pencil_icon} alt='pencil icon' />
          </div>
        </div>
      </div>
    </>
  );
};

export default ActivityCard;
