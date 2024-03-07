import { useTheme } from 'next-themes';
import { useEffect } from 'react';

//Redux
import { useAppSelector, useAppDispatch } from '@redux/hooks';
import { selectActivitiesState } from '@redux/slices/activitiesSlices';

export default function Home() {
  const { theme, setTheme } = useTheme();

  //const activitiesReducer = useAppSelector(selectActivitiesState);
  //console.log({ activitiesReducer });

  return (
    <>
      <h1>Página principal</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquam
        deleniti iste sint saepe nulla perspiciatis reprehenderit quidem
        accusantium totam voluptates doloribus, facere consequatur excepturi,
        quibusdam, molestias distinctio veniam ab modi?
      </p>
    </>
  );
}
