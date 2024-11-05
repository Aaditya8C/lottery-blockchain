import * as React from "react";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

export default function Loader() {
  return (
    <div className="absolute inset-0 flex flex-col gap-2 justify-center items-center h-screen bg-cyan-700 bg-opacity-50 z-[1999] ">
      <p className="animate-pulse text-2xl font-semibold text-orange-300">
        Transaction is processing
      </p>
      <Box sx={{ width: "25%" }}>
        <LinearProgress />
      </Box>
    </div>
  );
}
