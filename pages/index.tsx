import { useTheme } from "next-themes";
import { use, useEffect } from "react";

//Redux
import { useAppSelector, useAppDispatch } from "@redux/hooks";
import {
  selectActivitiesState,
  getActivities,
} from "@redux/slices/activitiesSlices";
import { useDispatch } from "react-redux";

export default function Home() {
  const { theme, setTheme } = useTheme();

  //Redux
  const dispatch = useAppDispatch();

  const activitiesReducer = useAppSelector(selectActivitiesState);
  console.log({ activitiesReducer });

  useEffect(() => {
    dispatch(getActivities());
  }, []);

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
