import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../app/store";
import { useEffect, useState } from "react";
import { deletePost, getMyPosts } from "../features/postsSlice";
import { Link } from "react-router-dom";
import { CreatePostForm } from "../components/CreatePostForm";
import type { Post } from "../types";
import {
  DataGrid,
  GridActionsCellItem,
  type GridColDef,
  type GridRowParams,
  type GridRowId,
} from "@mui/x-data-grid";
import { Box, Button, Typography, Container, Paper, Chip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AttachFileIcon from "@mui/icons-material/AttachFile";

export const MyPostsPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const { myPosts, isError, isLoading, message } = useSelector(
    (state: RootState) => state.posts,
  );

  const [showCreateForm, setShowCreateForm] = useState(false);

  useEffect(() => {
    dispatch(getMyPosts());
  }, [dispatch]);

  const handleDelete = (postId: GridRowId) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      dispatch(deletePost(postId.toString()));
    }
  };

  const handleView = (postId: GridRowId) => {
    window.open(`/posts/${postId}`, "_blank");
  };

  const handleEdit = (postId: GridRowId) => {
    // TODO: Implement edit functionality
    console.log("Edit post:", postId);
  };

  // Transform posts data for DataGrid
  const rows = myPosts.map((post: Post) => ({
    id: post._id,
    title: post.title,
    content: post.content,
    author: post.author.name,
    fileName: post.attachment?.fileName || "",
    fileType: post.attachment?.fileType || "",
    fileSize: post.attachment?.fileSize || 0,
    createdAt: new Date(post.createdAt),
    originalPost: post,
  }));

  const columns: GridColDef[] = [
    {
      field: "title",
      headerName: "Title",
      width: 200,
      renderCell: (params) => (
        <Link
          to={`/posts/${params.row.id}`}
          style={{
            textDecoration: "none",
            color: "inherit",
            fontWeight: 500,
          }}
        >
          {params.value}
        </Link>
      ),
    },
    {
      field: "content",
      headerName: "Content",
      width: 300,
      renderCell: (params) => (
        <Box
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            maxWidth: "100%",
          }}
        >
          {params.value}
        </Box>
      ),
    },
    {
      field: "fileName",
      headerName: "Attachment",
      width: 200,
      renderCell: (params) => {
        if (!params.value) {
          return (
            <Typography variant="body2" color="text.secondary">
              No file
            </Typography>
          );
        }
        return (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <AttachFileIcon fontSize="small" color="primary" />
            <Typography variant="body2" noWrap>
              {params.value}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "fileType",
      headerName: "File Type",
      width: 120,
      renderCell: (params) => {
        if (!params.value) {
          return (
            <Typography variant="body2" color="text.secondary">
              -
            </Typography>
          );
        }
        return (
          <Chip
            label={params.value}
            size="small"
            variant="outlined"
            color="primary"
          />
        );
      },
    },
    {
      field: "fileSize",
      headerName: "File Size",
      width: 120,
      renderCell: (params) => {
        if (!params.value || params.value === 0) {
          return (
            <Typography variant="body2" color="text.secondary">
              -
            </Typography>
          );
        }
        const sizeInKB = (params.value / 1024).toFixed(1);
        return <Typography variant="body2">{sizeInKB} KB</Typography>;
      },
    },
    {
      field: "createdAt",
      headerName: "Created",
      width: 150,
      type: "dateTime",
      valueFormatter: (value) => {
        if (!value) return "";
        return new Date(value).toLocaleDateString();
      },
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 120,
      getActions: (params: GridRowParams) => [
        <GridActionsCellItem
          icon={<VisibilityIcon />}
          label="View"
          onClick={() => handleView(params.id)}
        />,
        <GridActionsCellItem
          icon={<EditIcon />}
          label="Edit"
          onClick={() => handleEdit(params.id)}
          showInMenu
        />,
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          onClick={() => handleDelete(params.id)}
          showInMenu
        />,
      ],
    },
  ];

  if (isError) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 3, textAlign: "center" }}>
          <Typography variant="h6" color="error">
            Error: {message}
          </Typography>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box
        sx={{
          mb: 3,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          My Posts
        </Typography>
        <Button
          variant="contained"
          onClick={() => setShowCreateForm(!showCreateForm)}
          sx={{ minWidth: 120 }}
        >
          {showCreateForm ? "Cancel" : "Create Post"}
        </Button>
      </Box>

      {showCreateForm && (
        <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
          <CreatePostForm onPostCreated={() => setShowCreateForm(false)} />
        </Paper>
      )}

      <Paper elevation={3}>
        <Box sx={{ height: 600, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            loading={isLoading}
            pageSizeOptions={[10, 25, 50]}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
              },
              sorting: {
                sortModel: [{ field: "createdAt", sort: "desc" }],
              },
            }}
            disableRowSelectionOnClick
            sx={{
              border: "none",
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "grey.50",
                fontWeight: 600,
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "1px solid",
                borderColor: "grey.200",
              },
              "& .MuiDataGrid-row:hover": {
                backgroundColor: "grey.50",
              },
            }}
            slots={{
              noRowsOverlay: () => (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                    gap: 2,
                  }}
                >
                  <Typography variant="h6" color="text.secondary">
                    You haven't created any posts yet
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Create your first post to get started!
                  </Typography>
                  <Button
                    variant="contained"
                    onClick={() => setShowCreateForm(true)}
                  >
                    Create Your First Post
                  </Button>
                </Box>
              ),
            }}
          />
        </Box>
      </Paper>
    </Container>
  );
};
