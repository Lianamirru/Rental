type FormButtonProps = { label: string; disabled: boolean };

const Button = ({ label, disabled }: FormButtonProps) => {
  return (
    <button className="btn btn-form" type="submit" disabled={disabled}>
      {label}
    </button>
  );
};

export default Button;
