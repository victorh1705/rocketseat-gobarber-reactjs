import React, {
  InputHTMLAttributes,
  RefObject,
  useCallback,
  useState,
} from 'react';
import { IconBaseProps } from 'react-icons';

import { useFormContext } from 'react-hook-form';
import { Container } from './styles';

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

  const methods = useFormContext();

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(methods.formState.dirtyFields.has(name));
  }, []);

  return (
    <Container isFocused={isFocused} isFilled={isFilled}>
      {Icon && <Icon size={20} />}
      <input
        name={name}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        {...rest}
        ref={register}
      />
    </Container>
  );
};

export default Input;
