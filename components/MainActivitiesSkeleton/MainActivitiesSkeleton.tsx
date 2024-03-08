//Styles
import styles from "./Styles.module.scss";

const MainActivitiesSkeleton = () => {
  const skeleton = [1, 2, 3, 4];
  return (
    <div className={styles.container}>
      <div className={styles.skeleton_btn_container}>
        <div className={styles.skeleton_btn_1}></div>
        <div className={styles.skeleton_btn_2}></div>
      </div>
      {skeleton.map((item, index) => (
        <div className={styles.skeleton_card} key={index}></div>
      ))}
    </div>
  );
};

export default MainActivitiesSkeleton;
