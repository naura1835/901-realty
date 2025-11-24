import { Controller, useFormContext } from "react-hook-form";
import { Field, FieldLabel, FieldDescription, FieldError } from "./field";
import { Input } from "./input";

interface Props extends React.ComponentProps<typeof Input> {
  label?: string;
  name: string;
  description?: string;
  className?: string;
}

const FormInput = ({
  label,
  name,
  description,
  placeholder,
  className,
  ...rest
}: Props) => {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, ...restField }, fieldState }) => (
        <Field className={className}>
          {label && <FieldLabel htmlFor="input-id">{label}</FieldLabel>}
          <Input
            {...rest}
            {...restField}
            aria-invalid={fieldState.invalid}
            placeholder={placeholder}
            autoComplete="off"
            onChange={(e) => onChange(e.target.value)}
          />
          {description && (
            <FieldDescription className="text-foreground">
              {description}
            </FieldDescription>
          )}
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};

export default FormInput;
