import { useState } from "react";

const useForm = (options) =>  {
    const [data, setData] = useState((options?.initialValues || {}));
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const key = e.target.name;
        const value = e.target.value;
        setData({
          ...data,
          [key]: value,
        });
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        const validations = options?.validations;
        if (validations) {
          let valid = true;
          const newErrors = {};
          for (const key in validations) {
            const value = data[key];
            const validation = validations[key];
            if (validation?.required?.value && !value) {
              valid = false;
              newErrors[key] = validation?.required?.message;
            }
      
            const pattern = validation?.pattern;
            if (pattern?.value && !RegExp(pattern.value).test(value)) {
              valid = false;
              newErrors[key] = pattern.message;
            }
      
            const custom = validation?.custom;
            if (custom?.isValid && !custom.isValid(value)) {
              valid = false;
              newErrors[key] = custom.message;
            }
          }
      
          if (!valid) {
            setErrors(newErrors);
            return;
          }
        }
      
        setErrors({});
      
        if (options?.onSubmit) {
          options.onSubmit();
        }
      };
    
    return {
        data,
        handleChange,
        handleSubmit,
        errors
    }
}

export default useForm;