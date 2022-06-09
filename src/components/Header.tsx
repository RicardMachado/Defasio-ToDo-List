import styles from './Header.module.css';
import todoListLogo from '../assets/logo.svg';

export function Header() {
  return(
    <header className={styles.header}>
      <img src={todoListLogo} alt="Logotipo do ToDo List" />
    </header>
  )
} 