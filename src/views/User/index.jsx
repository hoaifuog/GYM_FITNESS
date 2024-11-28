import React, { useEffect, useState, useRef } from 'react'; 
import axios from 'axios'; 
import { 
  Grid, Card, CardContent, Typography, Button, Box, 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField 
} from '@mui/material'; 

const UserManagement = () => {
  const [users, setUsers] = useState([
    // Làm ví dụ để dễ hình dung 
    { _id: '1', username: 'Nguyễn Hoài Phương', email: 'nam@example.com', gender: 'male', weight: 70, height: 175, locked: false, blogs: ['First blog post', 'Another gym update'], },
    { _id: '2', username: 'hoa', email: 'hoa@example.com', gender: 'female', weight: 55, height: 165, locked: true, blogs: ['My fitness journey', 'Healthy eating tips'], },
    { _id: '3', username: 'hosdfsa', email: 'hoa@example.com', gender: 'female', weight: 55, height: 165, locked: true, blogs: ['My fitness journey', 'Healthy eating tips'], },
    { _id: '4', username: 'hosdfsda', email: 'hoa@example.com', gender: 'female', weight: 55, height: 165, locked: true, blogs: ['My fitness journey', 'Healthy eating tips'], },

    // Thêm người dùng mặc định khác nếu cần
  ]);
  
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  const topRef = useRef(null); // Tạo tham chiếu đến đầu trang

  useEffect(() => {
    // Fetch users from the backend
    axios
      .get('/api/users')
      .then((response) => setUsers([...users, ...response.data]))
      .catch((error) => console.error(error));
  }, []);

  const handleSelectUser = (user) => {
    setSelectedUser(user);
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleToggleLock = (user) => {
    const updatedUser = { ...user, locked: !user.locked };
    axios
      .put(`/api/users/${user._id}`, updatedUser)
      .then((response) => {
        setUsers(users.map((u) => (u._id === user._id ? response.data : u)));
      })
      .catch((error) => console.error(error));
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
      <div ref={topRef}></div> {/* Phần tử được tham chiếu đến đầu trang */}
      
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Search Users"
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
            Users
          </Typography>
          <Grid container spacing={2}>
            {filteredUsers.map((user) => (
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
                        {/* Khung chứa ảnh đại diện */}
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
                    <Button
                      variant="contained"
                      color={user.locked ? 'secondary' : 'primary'}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleLock(user);
                      }}
                      sx={{
                        fontSize: '0.875rem', 
                        padding: '6px 12px', 
                        minWidth: '100px', 
                      }}
                    >
                      {user.locked ? 'Unlock' : 'Lock'}
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>

        <Grid item xs={6}>
          {selectedUser ? (
            <Box sx={{ padding: 2 }}>
              <Typography variant="h3" gutterBottom sx={{ color: 'white' }}>
                Account Details
              </Typography>
              <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
                <Table stickyHeader aria-label="user details table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Field</TableCell>
                      <TableCell>Information</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>Avatar</TableCell>
                      <TableCell>
                        <Box
                          sx={{
                            width: 56,
                            height: 56,
                            backgroundColor: 'grey',
                            borderRadius: '50%',
                          }}
                        >
                          {/* Khung chứa ảnh đại diện */}
                        </Box>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Username</TableCell>
                      <TableCell>{selectedUser.username}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Email</TableCell>
                      <TableCell>{selectedUser.email}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Gender</TableCell>
                      <TableCell>{selectedUser.gender}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Weight</TableCell>
                      <TableCell>{selectedUser.weight}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Height</TableCell>
                      <TableCell>{selectedUser.height}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Blogs</TableCell>
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
              Select a user to see details
            </Typography>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserManagement;
