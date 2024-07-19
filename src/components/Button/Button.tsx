import { FC, DetailedHTMLProps, ButtonHTMLAttributes, Fragment } from 'react';
import styles from './Button.module.css';

interface IButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  text: string;
  loading?: boolean;
}

const Button: FC<IButtonProps> = ({ text, loading, ...props }) => {
  return (
    <button className={styles.button} {...props}>
      {loading ? (
        <Fragment>
          <p>Пожалуйста, подождите</p>
          <i className={styles.loaderCircle} />
        </Fragment>
      ) : (
        text
      )}
    </button>
  );
};

export default Button;
