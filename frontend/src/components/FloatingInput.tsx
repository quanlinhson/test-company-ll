import React from 'react';
import styles from './FloatingInput.module.css';

interface InputFieldProps {
    type: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    required?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
    type,
    value,
    onChange,
    placeholder,
    required = true
}) => {
    return (
        <div>
            <input className={styles.input}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
            />
        </div>
    );
};

export default InputField;