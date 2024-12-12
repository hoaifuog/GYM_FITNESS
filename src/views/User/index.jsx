import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

const UserManagement = () => {
  const [users, setUsers] = useState([
    { _id: '1', username: 'Nguyễn Hoài Phương', email: 'nam@example.com', gender: 'male', weight: 70, height: 175, locked: false, blogs: ['First blog post', 'Another gym update'] },
    { _id: '2', username: 'Hoa', email: 'hoa@example.com', gender: 'female', weight: 55, height: 165, locked: true, blogs: ['My fitness journey', 'Healthy eating tips'] },
    { _id: '3', username: 'Hà', email: 'ha@example.com', gender: 'female', weight: 50, height: 160, locked: false, blogs: ['Morning workout routine'] },
    { _id: '4', username: 'An', email: 'an@example.com', gender: 'male', weight: 72, height: 178, locked: true, blogs: ['Diet tips', 'Evening cardio'] },
    // Thêm nhiều người dùng để test phân trang
  ]);

  const [selectedUser, setSelectedUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(2); // Số lượng người dùng trên mỗi trang

  const topRef = useRef(null); // Tham chiếu đến đầu trang

  // Lọc người dùng dựa trên tìm kiếm
  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Tính tổng số trang
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  // Phân trang danh sách người dùng
  const displayedUsers = filteredUsers.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); // Đặt về trang đầu tiên khi tìm kiếm
  };

  const handleSelectUser = (user) => {
    setSelectedUser(user);
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <Box
      sx={{
        backgroundImage: 'url(/background.jpg)', 
        backgroundSize: 'cover',
        minHeight: '100vh',
        padding: 3,
        color: 'white',
      }}
    >
      <div ref={topRef}></div>
      
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Tìm kiếm người dùng"
            value={searchQuery}
            onChange={handleSearchChange}
            margin="normal"
            variant="outlined"
            InputLabelProps={{
              style: { color: 'white' },
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                color: 'white',
                '& fieldset': { borderColor: 'white' },
                '&:hover fieldset': { borderColor: 'white' },
                '&.Mui-focused fieldset': { borderColor: 'white' },
              },
            }}
          />
        </Grid>

        <Grid item xs={6}>
          <Typography variant="h3" gutterBottom sx={{ color: 'white' }}>
            Danh sách người dùng
          </Typography>
          <Grid container spacing={2}>
            {displayedUsers.map((user) => (
              <Grid item xs={12} key={user._id}>
                <Card
                  onClick={() => handleSelectUser(user)}
                  sx={{ cursor: 'pointer', padding: 2 }}
                >
                  <CardContent
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      height: '150px',
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box
                        sx={{
                          width: 56,
                          height: 56,
                          backgroundColor: 'grey',
                          borderRadius: '50%',
                          marginRight: 2,
                        }}
                      >
                      </Box>
                      <Box>
                        <Typography variant="h5" gutterBottom>
                          {user.username}
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                          {user.email}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Phân trang */}
          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 3 }}>
            {Array.from({ length: totalPages }, (_, index) => (
              <Button
                key={index}
                variant={currentPage === index + 1 ? 'contained' : 'outlined'}
                onClick={() => handlePageChange(index + 1)}
                sx={{ margin: 0.5 }}
              >
                {index + 1}
              </Button>
            ))}
          </Box>
        </Grid>

        <Grid item xs={6}>
          {selectedUser ? (
            <Box sx={{ padding: 2 }}>
              <Typography variant="h3" gutterBottom sx={{ color: 'white' }}>
                Chi tiết tài khoản
              </Typography>
              <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
                <Table stickyHeader aria-label="user details table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Trường</TableCell>
                      <TableCell>Thông tin</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>Username</TableCell>
                      <TableCell>{selectedUser.username}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Email</TableCell>
                      <TableCell>{selectedUser.email}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Giới tính</TableCell>
                      <TableCell>{selectedUser.gender}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Cân nặng</TableCell>
                      <TableCell>{selectedUser.weight} kg</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Chiều cao</TableCell>
                      <TableCell>{selectedUser.height} cm</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Bài viết</TableCell>
                      <TableCell>
                        <ul>
                          {selectedUser.blogs &&
                            selectedUser.blogs.map((blog, index) => (
                              <li key={index}>
                                <Typography variant="body2">{blog}</Typography>
                              </li>
                            ))}
                        </ul>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          ) : (
            <Typography variant="h6" sx={{ color: 'white' }}>
              Chọn người dùng để xem chi tiết
            </Typography>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserManagement;
