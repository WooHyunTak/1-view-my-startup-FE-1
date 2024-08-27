import { useState } from "react";

const validateField = (name, value) => {
  switch (name) {
    case "name":
      return value.length >= 1 && value.length <= 10
        ? ""
        : "투자자명은 1자리 이상 10자리 이내 입니다.";
    case "amount":
      const num = Number(value);
      if (isNaN(num)) {
        return "투자 금액은 숫자만 입력 가능합니다.";
      } else {
        return value.length >= 1 ? "" : "투자 금액은 1자리 이상 입니다.";
      }
    case "comment":
      return value.length >= 1 ? "" : "투자 설명은 1자리 이상입니다.";
    case "password":
      return value.length >= 1 ? "" : "비밀번호를 입력해 주세요";
    default:
      return "";
  }
};

const useFormValidation = (initialValues) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [disabled, setDisabled] = useState(true);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });

    // 유효성 검사
    const error = validateField(name, value);
    setErrors({
      ...errors,
      [name]: error,
    });
    setDisabled(!!error);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // 모든 필드 유효성 검사
    const newErrors = {};
    let hasErrors = false;

    Object.keys(values).forEach((key) => {
      const error = validateField(key, values[key]);
      if (error) {
        newErrors[key] = error;
        hasErrors = true;
      }
    });

    if (hasErrors) {
      setErrors(newErrors);
      setDisabled(true);
      return false;
    } else {
      return true;
    }
  };

  return {
    values,
    errors,
    disabled,
    handleChange,
    handleSubmit,
  };
};

export default useFormValidation;
