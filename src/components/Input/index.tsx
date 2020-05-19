import React, {
  InputHTMLAttributes,
  RefObject,
  useCallback,
  useState,
} from 'react';
import { IconBaseProps } from 'react-icons';

import { useFormContext } from 'react-hook-form';
import { FiAlertCircle } from 'react-icons/all';
import { Container, Error } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  register?:
    | string
    | ((instance: HTMLInputElement | null) => void)
    | RefObject<HTMLInputElement>
    | null
    | undefined;
  icon?: React.ComponentType<IconBaseProps>;
}

const Input: React.FC<InputProps> = ({
  icon: Icon,
  name,
  register,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const {
    errors,
    formState: { dirtyFields },
  } = useFormContext();

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(dirtyFields.has(name));
  }, []);

  return (
    <Container
      isErrored={!!errors[name]}
      isFocused={isFocused}
      isFilled={isFilled}
    >
      {Icon && <Icon size={20} />}
      <input
        name={name}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        {...rest}
        ref={register}
      />
      {errors[name] && (
        <Error title={errors[name]?.message}>
          <FiAlertCircle color="#c53030" size={20} />
        </Error>
      )}
    </Container>
  );
};

export default Input;
