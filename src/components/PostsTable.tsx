import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Card, CardContent, Typography, Box } from '@mui/material';

interface Post {
  id: number;
  title: string;
  body: string;
}

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 , minWidth: 35 },
  { field: 'userId', headerName: 'User ID', width: 90 , minWidth: 35 },
  { field: 'title', headerName: 'Title', width: 400, minWidth: 200 },
  { field: 'body', headerName: 'Body', width: 1000, minWidth: 600 },
];

const PostsTable: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((data) => setPosts(data));
  }, []);

  return (
    <Box mt={4}>
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Posts
          </Typography>
          <div style={{ height: 400, width: '100%' }}>
            <DataGrid 
            rows={posts} 
            columns={columns} 
            // pageSize={5} 
            // rowsPerPageOptions={[5]}
             />
          </div>
        </CardContent>
      </Card>
    </Box>
  );
};

export default PostsTable;
