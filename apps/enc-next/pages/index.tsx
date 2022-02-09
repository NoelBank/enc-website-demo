import styles from './index.module.css';
import { Button } from '@nbank/uikit';

export function Index() {
  return (
    <div className={styles.page}>
      <Button text="Hallo" onClick={() => console.log('clicked')} />
    </div>
  );
}

export default Index;
