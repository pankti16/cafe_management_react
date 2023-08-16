import React from "react";
import Button from '@mui/material/Button';
//Button component
export const Btn = ({text, size="small", variant = "contained", color="primary", handleClick, ...props}) => {
  return (
    <Button variant={variant} color={color} size={size} onClick={handleClick} {...props}>
      {text}
    </Button>
  );
};
