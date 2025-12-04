import React, { useState, useRef, useEffect } from "react";
import { Tooltip, Box } from "@mui/material";

interface FieldWithTooltipProps {
  tooltip: React.ReactNode;
  children: React.ReactElement<any>;
  enterDelay?: number;
  leaveDelay?: number;
}

export default function InputTooltip({
  tooltip,
  children,
  enterDelay = 1000,
}: FieldWithTooltipProps) {
  const [open, setOpen] = useState(false);

  const openTimer = useRef<number | null>(null);
  const closeTimer = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (openTimer.current) clearTimeout(openTimer.current);
    };
  }, []);

  const closeNow = () => {
    if (openTimer.current) clearTimeout(openTimer.current);
    openTimer.current = null;
    closeTimer.current = null;
    setOpen(false);
  };

  const handleMouseEnter = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);

    openTimer.current = window.setTimeout(() => {
      setOpen(true);
    }, enterDelay);
  };

  const handleMouseLeave = () => {
    if (openTimer.current) clearTimeout(openTimer.current);

    setOpen(false);
  };

  useEffect(() => {
    const handleClick = () => closeNow();
    window.addEventListener("mousedown", handleClick);
    return () => window.removeEventListener("mousedown", handleClick);
  }, []);

  const enhancedChild = React.cloneElement(children, {
    ...children.props,
    onFocus: (e: any) => {
      closeNow();
      children.props.onFocus?.(e);
    },
    onClick: (e: any) => {
      closeNow();
      children.props.onClick?.(e);
    },
    onKeyDown: (e: any) => {
      closeNow();
      children.props.onKeyDown?.(e);
    },
  } as any);

  return (
    <Tooltip
      title={tooltip}
      open={open}
      disableFocusListener
      disableTouchListener
    >
      <Box
        onMouseOver={handleMouseEnter}
        onMouseOut={handleMouseLeave}
        sx={{ width: "100%" }}
      >
        {enhancedChild}
      </Box>
    </Tooltip>
  );
}
