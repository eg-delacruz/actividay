import Image from "next/image";
import { useState } from "react";

//Styles
import styles from "./Styles.module.scss";

//Assets
import trash_icon from "@assets/icons/trash.png";
import pencil_icon from "@assets/icons/pencil.png";

//Components
import DeleteActivityModal from "@components/DeleteActivityModal/DeleteActivityModal";

//Types
type Props = TActivity;

//TODO: Add functionality to the buttons
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

  const handleDeleteActivityModal = () => {
    return (
      <DeleteActivityModal
        showModal={showDeleteActivityModal}
        setShowModal={setShowDeleteActivityModal}
        id={id}
        activity={activity}
      />
    );
  };

  return (
    <>
      {handleDeleteActivityModal()}
      <div className={styles.card}>
        <div className={styles.card__info}>
          <p className={styles.headings}>Activity</p>
          <h4>{activity}</h4>
          {link && (
            <>
              <p className={styles.headings}>Related link: </p>
              <a href={link} target="_blank">
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
          <div className={styles.icon_container}>
            <Image
              onClick={() => setShowDeleteActivityModal(true)}
              src={trash_icon}
              alt="trash icon"
            />
          </div>
          <div className={`${styles.icon_container} ${styles.pencil}`}>
            <Image src={pencil_icon} alt="pencil icon" />
          </div>
        </div>
      </div>
    </>
  );
};

export default ActivityCard;
