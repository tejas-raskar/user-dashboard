import { Box, Skeleton, Paper } from "@mui/material";

interface DataGridSkeletonProps {
  rows?: number;
  height?: number;
}

export const DataGridSkeleton = ({
  rows = 10,
  height = 600,
}: DataGridSkeletonProps) => {
  return (
    <Paper elevation={3}>
      <Box sx={{ height, width: "100%", p: 2 }}>
        {/* Header skeleton */}
        <Box
          sx={{
            display: "flex",
            gap: 1,
            mb: 2,
            borderBottom: "1px solid",
            borderColor: "grey.200",
            pb: 2,
          }}
        >
          <Skeleton variant="text" width="15%" height={40} />
          <Skeleton variant="text" width="25%" height={40} />
          <Skeleton variant="text" width="12%" height={40} />
          <Skeleton variant="text" width="15%" height={40} />
          <Skeleton variant="text" width="10%" height={40} />
          <Skeleton variant="text" width="8%" height={40} />
          <Skeleton variant="text" width="10%" height={40} />
          <Skeleton variant="text" width="5%" height={40} />
        </Box>

        {/* Rows skeleton */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          {Array.from({ length: rows }).map((_, index) => (
            <Box
              key={index}
              sx={{ display: "flex", gap: 1, alignItems: "center" }}
            >
              <Skeleton variant="text" width="15%" height={32} />
              <Skeleton variant="text" width="25%" height={32} />
              <Skeleton variant="text" width="12%" height={32} />
              <Skeleton variant="text" width="15%" height={32} />
              <Skeleton variant="text" width="10%" height={32} />
              <Skeleton variant="text" width="8%" height={32} />
              <Skeleton variant="text" width="10%" height={32} />
              <Skeleton
                variant="rectangular"
                width="5%"
                height={24}
                sx={{ borderRadius: 1 }}
              />
            </Box>
          ))}
        </Box>

        {/* Pagination skeleton */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 2,
            pt: 2,
            borderTop: "1px solid",
            borderColor: "grey.200",
          }}
        >
          <Skeleton variant="text" width="20%" height={32} />
          <Box sx={{ display: "flex", gap: 1 }}>
            <Skeleton
              variant="rectangular"
              width={32}
              height={32}
              sx={{ borderRadius: 1 }}
            />
            <Skeleton
              variant="rectangular"
              width={32}
              height={32}
              sx={{ borderRadius: 1 }}
            />
            <Skeleton
              variant="rectangular"
              width={32}
              height={32}
              sx={{ borderRadius: 1 }}
            />
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};
