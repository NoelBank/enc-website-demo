import styles from './button.module.css';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
}

export function Button(props: ButtonProps) {
  return <button className={styles['button']}>{props.text}</button>;
}

export default Button;
