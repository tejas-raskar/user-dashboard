import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../app/store";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getPostById } from "../features/postsSlice";
import {
  Container,
  Typography,
  Box,
  Divider,
  Paper,
  Chip,
  Skeleton,
  Alert,
} from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PersonIcon from "@mui/icons-material/Person";

const PostPageSkeleton = () => (
  <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
    <Paper elevation={3} sx={{ p: 4 }}>
      <Skeleton variant="text" width="80%" height={60} sx={{ mb: 2 }} />
      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        <Skeleton variant="text" width="120px" height={24} />
        <Skeleton variant="text" width="150px" height={24} />
      </Box>
      <Skeleton variant="rectangular" width="100%" height={1} sx={{ mb: 3 }} />
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <Skeleton variant="text" width="100%" height={24} />
        <Skeleton variant="text" width="95%" height={24} />
        <Skeleton variant="text" width="90%" height={24} />
        <Skeleton variant="text" width="85%" height={24} />
        <Skeleton variant="text" width="70%" height={24} />
      </Box>
    </Paper>
  </Container>
);

export const PostPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const { postId } = useParams<{ postId: string }>();
  const { currentPost, isLoading, isError, message } = useSelector(
    (state: RootState) => state.posts,
  );

  useEffect(() => {
    if (postId) {
      dispatch(getPostById(postId));
    }
  }, [postId, dispatch]);

  if (isLoading) {
    return <PostPageSkeleton />;
  }

  if (isError) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          Error: {message}
        </Alert>
      </Container>
    );
  }

  if (!currentPost) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Alert severity="warning" sx={{ mb: 2 }}>
          Post not found.
        </Alert>
      </Container>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatFileSize = (bytes: number) => {
    return (bytes / 1024).toFixed(1) + " KB";
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        {/* Post Title */}
        <Typography
          variant="h3"
          component="h1"
          sx={{
            fontWeight: 700,
            mb: 2,
            textAlign: "left",
            color: "text.primary",
            lineHeight: 1.2,
          }}
        >
          {currentPost.title}
        </Typography>

        {/* Meta Information */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: 2,
            mb: 3,
            alignItems: { xs: "flex-start", sm: "center" },
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <PersonIcon fontSize="small" color="action" />
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontWeight: 500 }}
            >
              by {currentPost.author.name}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <CalendarTodayIcon fontSize="small" color="action" />
            <Typography variant="body2" color="text.secondary">
              {formatDate(currentPost.createdAt)}
            </Typography>
          </Box>
        </Box>

        {/* Attachment Information */}
        {currentPost.attachment && (
          <Box sx={{ mb: 3 }}>
            <Chip
              icon={<AttachFileIcon />}
              label={`${currentPost.attachment.fileName} (${formatFileSize(
                currentPost.attachment.fileSize,
              )})`}
              variant="outlined"
              color="primary"
              sx={{ mr: 1 }}
            />
            <Chip
              label={currentPost.attachment.fileType}
              variant="filled"
              size="small"
              color="secondary"
            />
          </Box>
        )}

        {/* Divider */}
        <Divider sx={{ mb: 4 }} />

        {/* Post Content */}
        <Typography
          variant="body1"
          sx={{
            textAlign: "left",
            lineHeight: 1.7,
            fontSize: "1.1rem",
            color: "text.primary",
            whiteSpace: "pre-wrap",
          }}
        >
          {currentPost.content}
        </Typography>
      </Paper>
    </Container>
  );
};
