import Image from 'next/image';

//Styles
import styles from './Styles.module.scss';

//Assets
import logo from '@assets/images/logo.png';

//Components
import ThemeToggler from '@components/DarkModeToggler/ThemeToggler';

type Props = {
  children: React.ReactNode;
};
const Layout = ({ children }: Props) => {
  return (
    <div className={styles.container}>
      <header className={`${styles.header}`}>
        <div className={`container ${styles.header__container}`}>
          <Image className={`${styles.logo}`} src={logo} alt='Actividay logo' />
          <ThemeToggler />
        </div>
      </header>

      {children}

      <footer className={`${styles.footer}`}>
        <div className='container'>
          <strong>Designed and coded by Gerardo De La Cruz</strong>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
