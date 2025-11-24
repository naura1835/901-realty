import { Controller, useFormContext } from "react-hook-form";
import { Field, FieldLabel, FieldDescription, FieldError } from "./field";
import { Textarea } from "./textarea";

interface Props extends React.ComponentProps<typeof Textarea> {
  label?: string;
  name: string;
  description?: string;
}

const FormTextarea = ({
  label,
  name,
  description,
  placeholder,
  ...rest
}: Props) => {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, ...restField }, fieldState }) => (
        <Field>
          {label && <FieldLabel htmlFor="input-id">{label}</FieldLabel>}
          <Textarea
            {...rest}
            {...restField}
            aria-invalid={fieldState.invalid}
            placeholder={placeholder}
            rows={6}
            autoComplete="off"
            onChange={(e) => onChange(e.target.value)}
            className="h-30"
          />
          {description && <FieldDescription>{description}</FieldDescription>}
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};

export default FormTextarea;
