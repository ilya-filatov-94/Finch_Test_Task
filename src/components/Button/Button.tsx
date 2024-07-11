import { FC, DetailedHTMLProps, ButtonHTMLAttributes } from 'react';
import styles from './Button.module.css';

interface IButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  text: string;
  loading?: boolean;
}

const Button: FC<IButtonProps> = ({ text, loading, ...props }) => {
  return (
    <button className={styles.wrapper} {...props}>
      {loading ? (
        <div className={styles.wrapperLoader}>
          <p>Пожалуйста, подождите</p>
          <div className={styles.loaderCircle} />
        </div>
      ) : (
        text
      )}
    </button>
  );
};

export default Button;
