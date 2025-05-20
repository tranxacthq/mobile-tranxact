import React from 'react';
import { TouchableOpacity, Text, TextStyle } from "react-native";

type ButtonProps = {
    title: string;
    onPress: () => void;
    variant?: 'primary' | 'secondary' | 'outline';
    size?: 'small' | 'default' | 'large';
    className?: string;
    textClassName?: string;
    textColor?: string;
    textSize?: 'base' | 'lg' | 'xl';
    disabled?: boolean;
};

const Button: React.FC<ButtonProps> = ({
    title,
    onPress,
    variant = 'primary',
    size = 'default',
    className = '',
    textClassName = '',
    textColor,
    textSize,
    disabled = false,
}) => {
    let buttonClass = "rounded-xl py-4 items-center";
    let textClass = "font-bold ";

    if (variant === 'primary') {
        buttonClass += " bg-[#1A535C]";
        textClass += " text-white";
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
    } else {
        textClass += " text-lg";
    }

    if (textSize === 'base') {
        textClass = textClass.replace('text-lg', 'text-base');
    } else if (textSize === 'xl') {
        textClass = textClass.replace('text-lg', 'text-xl');
    }

    if (textColor) {
        // You might need to remove the default color class based on variant
        if (variant === 'primary') textClass = textClass.replace('text-black', '');
        if (variant === 'secondary') textClass = textClass.replace('text-white', '');
        if (variant === 'outline') textClass = textClass.replace('text-white', '');
        textClass += ` text-${textColor}`; // Assuming Tailwind color names
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