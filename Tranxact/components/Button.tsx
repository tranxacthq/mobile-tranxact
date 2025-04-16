import React from 'react';
import { TouchableOpacity, Text } from "react-native";

type ButtonProps = {
    title: string;
    onPress: () => void;
    variant?: 'primary' | 'secondary' | 'outline';
    size?: 'small' | 'default' | 'large';
    className?: string;
    textClassName?: string;
    disabled?: boolean;
};

const Button: React.FC<ButtonProps> = ({
    title,
    onPress,
    variant = 'primary', 
    size = 'default', 
    className = '',
    textClassName = '',
    disabled = false,
}) => {
    let buttonClass = "rounded-xl py-4 items-center";
    let textClass = "font-bold text-lg";

    if (variant === 'primary') {
        buttonClass += " bg-white";
        textClass += " text-black";
    } else if (variant === 'secondary') {
        buttonClass += " bg-transparent";
        textClass += " text-white";
    } else if (variant === 'outline') {
        buttonClass += " bg-transparent border border-white";
        textClass += " text-white";
    }

    if (size === 'small') {
        buttonClass += " py-2 px-4";
        textClass += " text-base";
    } else if (size === 'large') {
        buttonClass += " py-5 px-8";
        textClass += " text-xl";
    }

    if (disabled) {
        buttonClass += " opacity-50";
    }

    buttonClass += ` ${className}`;
    textClass += ` ${textClassName}`;

    return (
        <TouchableOpacity
            className={buttonClass}
            onPress={onPress}
            disabled={disabled}
        >
            <Text className={textClass}>{title}</Text>
        </TouchableOpacity>
    );
};

export default Button;