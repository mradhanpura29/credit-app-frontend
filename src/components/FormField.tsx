import { useFormContext, Controller } from 'react-hook-form';
import type { ControllerProps, FieldPath, FieldValues } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

type Option = {
  label: string;
  value: string;
};

type BaseFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName;
  label?: string;
  description?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
};

type InputFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = BaseFieldProps<TFieldValues, TName> & {
  type: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'date' | 'time' | 'datetime-local';
  inputClassName?: string;
};

type TextareaFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = BaseFieldProps<TFieldValues, TName> & {
  type: 'textarea';
  rows?: number;
};

type SelectFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = BaseFieldProps<TFieldValues, TName> & {
  type: 'select';
  options: Option[];
};

type RadioFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = BaseFieldProps<TFieldValues, TName> & {
  type: 'radio';
  options: Option[];
  orientation?: 'horizontal' | 'vertical';
};

type CheckboxFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = BaseFieldProps<TFieldValues, TName> & {
  type: 'checkbox';
  checkboxLabel?: string;
};

export type FormFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> =
  | InputFieldProps<TFieldValues, TName>
  | TextareaFieldProps<TFieldValues, TName>
  | SelectFieldProps<TFieldValues, TName>
  | RadioFieldProps<TFieldValues, TName>
  | CheckboxFieldProps<TFieldValues, TName>;

export function FormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(props: FormFieldProps<TFieldValues, TName>) {
  const {
    control,
    formState: { errors },
  } = useFormContext<TFieldValues>();

  const {
    name,
    label,
    description,
    placeholder,
    disabled,
    required,
    className,
    type,
  } = props;

  const error = errors[name];
  const errorMessage = error?.message as string | undefined;

  const renderField = (field: any) => {
    switch (type) {
      case 'text':
      case 'email':
      case 'password':
      case 'number':
      case 'tel':
      case 'url':
      case 'date':
      case 'time':
      case 'datetime-local':
        return (
          <Input
            {...field}
            type={type}
            placeholder={placeholder}
            disabled={disabled}
            className={cn(
              errorMessage && 'border-red-500 focus-visible:ring-red-500',
              (props as InputFieldProps).inputClassName
            )}
          />
        );

      case 'textarea':
        return (
          <Textarea
            {...field}
            placeholder={placeholder}
            disabled={disabled}
            rows={(props as TextareaFieldProps).rows}
            className={cn(errorMessage && 'border-red-500 focus-visible:ring-red-500')}
          />
        );

      case 'select':
        const selectProps = props as SelectFieldProps;
        return (
          <Select
            value={field.value}
            onValueChange={field.onChange}
            disabled={disabled}
          >
            <SelectTrigger
              className={cn(errorMessage && 'border-red-500 focus:ring-red-500')}
            >
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {selectProps.options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case 'radio':
        const radioProps = props as RadioFieldProps;
        return (
          <RadioGroup
            value={field.value}
            onValueChange={field.onChange}
            disabled={disabled}
            className={cn(
              radioProps.orientation === 'horizontal'
                ? 'flex flex-row space-x-4'
                : 'flex flex-col space-y-2'
            )}
          >
            {radioProps.options.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <RadioGroupItem value={option.value} id={`${name}-${option.value}`} />
                <Label
                  htmlFor={`${name}-${option.value}`}
                  className="font-normal cursor-pointer"
                >
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        );

      case 'checkbox':
        const checkboxProps = props as CheckboxFieldProps;
        return (
          <div className="flex items-center space-x-2">
            <Checkbox
              checked={field.value}
              onCheckedChange={field.onChange}
              disabled={disabled}
              id={name}
            />
            <Label
              htmlFor={name}
              className="font-normal cursor-pointer"
            >
              {checkboxProps.checkboxLabel || label}
            </Label>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div className={cn('space-y-2', className)}>
          {label && type !== 'checkbox' && (
            <Label htmlFor={name} className={cn(required && 'after:content-["*"] after:ml-0.5 after:text-red-500')}>
              {label}
            </Label>
          )}
          {renderField(field)}
          {description && (
            <p className="text-sm text-gray-500">{description}</p>
          )}
          {errorMessage && (
            <p className="text-sm text-red-500">{errorMessage}</p>
          )}
        </div>
      )}
    />
  );
}
