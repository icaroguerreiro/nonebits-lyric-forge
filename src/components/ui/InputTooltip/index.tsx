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
  enterDelay = 500,
  leaveDelay = 50,
}: FieldWithTooltipProps) {
  const [open, setOpen] = useState(false);

  const openTimer = useRef<number | null>(null);
  const closeTimer = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (openTimer.current) clearTimeout(openTimer.current);
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, []);

  const closeNow = () => {
    if (openTimer.current) clearTimeout(openTimer.current);
    if (closeTimer.current) clearTimeout(closeTimer.current);
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

    closeTimer.current = window.setTimeout(() => {
      setOpen(false);
    }, leaveDelay);
  };

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
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        sx={{ width: "100%" }}
      >
        {enhancedChild}
      </Box>
    </Tooltip>
  );
}
