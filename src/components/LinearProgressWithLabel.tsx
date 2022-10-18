import {
  Box,
  LinearProgress,
  linearProgressClasses,
  LinearProgressProps,
  styled,
  Typography,
} from "@mui/material";
import React from "react";

const BorderLinearProgress = styled(LinearProgress)<
  LinearProgressProps & { valueColor: string }
>(({ theme, valueColor }) => ({
  height: 15,
  borderRadius: 6,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: "#323232",
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: valueColor,
  },
}));

const LinearProgressWithLabel: React.FC<
  LinearProgressProps & { value: number; prefix: string; valueColor: string }
> = (props) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ minWidth: 150 }}>
        <Typography
          variant="body2"
          color="text.secondary"
        >{`${props.prefix.toUpperCase()}`}</Typography>
      </Box>
      <Box sx={{ width: "100%", mr: 1 }}>
        <BorderLinearProgress
          variant="determinate"
          {...props}
          value={props?.value > 100 ? 100 : props?.value}
        />
      </Box>
    </Box>
  );
};

export default LinearProgressWithLabel;
