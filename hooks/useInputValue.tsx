import { useState } from 'react';

type Props = string | number | readonly string[] | undefined;

// Hook to control input values
import { ChangeEvent } from 'react';

export const useInputValue = (initialValue: Props) => {
  const [value, setValue] = useState(initialValue);
  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setValue(e.target.value);

  return { value, onChange, setValue };
};
