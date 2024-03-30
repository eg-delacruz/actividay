import { useState, useEffect, lazy, Suspense } from 'react';
import { useAutoAnimate } from '@formkit/auto-animate/react';

//Redux
import { useAppSelector, useAppDispatch } from '@redux/hooks';
import {
  selectActivitiesState,
  getActivities,
  getAnotherActivity,
} from '@redux/slices/activitiesSlices';

//Components
import Layout from '@components/Layout/Layout';
import ActivityCard from '@components/ActivityCard/ActivityCard';
import MainActivitiesSkeleton from '@components/MainActivitiesSkeleton/MainActivitiesSkeleton';

//styles
import styles from '@styles/pages/index.module.scss';

export default function Home() {
  //Redux
  const dispatch = useAppDispatch();

  const activitiesReducer = useAppSelector(selectActivitiesState);

  useEffect(() => {
    dispatch(getActivities());
  }, [dispatch]);

  //Animate list of activities
  const [animationParent] = useAutoAnimate();

  //Add custom activity modal
  const [showAddCustomActivityModal, setShowAddCustomActivityModal] =
    useState<boolean>(false);

  //Dynamically importing modal
  const DynamicCreateEditModal = lazy(
    () => import('@components/CreateEditModal/CreateEditModal')
  );

  const handleCreateActividyModal = () => {
    return (
      <Suspense>
        <DynamicCreateEditModal
          showModal={showAddCustomActivityModal}
          setShowModal={setShowAddCustomActivityModal}
          action='create'
        />
      </Suspense>
    );
  };

  if (activitiesReducer.activities_error)
    return (
      <Layout>
        <div className='container'>
          <h1 className={styles.error_while_fetching_message}>
            There was an error fetching the activities
          </h1>
        </div>
      </Layout>
    );

  return (
    <>
      {/* Modals */}
      {handleCreateActividyModal()}

      <Layout>
        <div className='container'>
          <h1>Get inspired, explore, create, learn!</h1>
          <p>Are you bored and don&apos;t know what to do?</p>
          <p>Get inspired by one of these exciting random proposals!</p>
          <p>But don&apos;t stay on the couch... 😉</p>

          <br />
          <br />

          {activitiesReducer.activities_initial_loading ? (
            <MainActivitiesSkeleton />
          ) : (
            <div className={styles.btn_activities_wrapper}>
              <div className={styles.upper_btn_wrapper}>
                <button
                  disabled={activitiesReducer.activities_fetching_new}
                  onClick={() => dispatch(getAnotherActivity())}
                  className={`btn__primary ${
                    activitiesReducer.activities_fetching_new
                      ? styles.buttonLoading
                      : ''
                  }`}
                >
                  Add Random
                </button>
                <button
                  className={`btn__primary ${styles.add_custom_btn}`}
                  onClick={() => setShowAddCustomActivityModal(true)}
                >
                  <div></div>
                  <div></div>
                </button>
              </div>

              <br />

              <div ref={animationParent} className={styles.activities_wrapper}>
                {activitiesReducer.activities.map((activity) => (
                  <ActivityCard
                    link={activity.link}
                    category={activity.category}
                    key={activity.id}
                    participants={activity.participants}
                    activity={activity.activity}
                    id={activity.id}
                  />
                ))}
              </div>
            </div>
          )}

          <br />
        </div>
      </Layout>
    </>
  );
}
