import { Field, ErrorMessage } from "formik";
const InputField = ({
  name,
  type,
  placeholder,
  error,
  touched,
  Icon,
  showPassword,
  setShowPassword,
}: {
  name: string;
  type: string;
  placeholder: string;
  error?: boolean | string;
  touched?: boolean | string;
  Icon?: React.ReactNode;
  showPassword?: boolean;
  setShowPassword?: any;
}) => (
  <div className="mb-4">
    <div className="relative">
      <Field
        name={name}
        type={showPassword ? "text" : type}
        placeholder={placeholder}
        className={`w-full px-3 rounded-lg inputShadow text-[13px] py-4 interFont bg-slate-50 border-2 focus:border-primary50 focus:outline-none ${
          error && touched ? "border-red-600" : ""
        }`}
      />
      {Icon && (
        <span
          className="absolute right-4 top-5 cursor-pointer w-5"
          onClick={() => {
            setShowPassword(!showPassword);
          }}
        >
          {Icon}
        </span>
      )}
    </div>
    <ErrorMessage
      name={name}
      component="div"
      className="text-red-600 text-sm mt-1"
    />
  </div>
);

export default InputField;
