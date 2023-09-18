export default  interface ButtonInterface {
    text: string;
    variant: 'contained' | 'outlined';
    onClick?: () => void;
    type?: "button" | "submit" | "reset" | undefined;
  }