import { FC, Dispatch, SetStateAction, ReactNode } from 'react';
import styles from './ModalWindow.module.css';

interface IModalWindowProps {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
}

const ModalWindow: FC<IModalWindowProps> = ({ visible, setVisible, children }) => {
  const rootClasses = [styles.modalWindow];
  if (visible) {
    rootClasses.push(styles.active);
  }

  return (
    <div className={rootClasses.join(' ')} onPointerDown={() => setVisible(false)}>
      <div className={styles.contentWindow} onPointerDown={event => event.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default ModalWindow;
