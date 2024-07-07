import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import {
  Box,
  Container,
  Typography,
  IconButton,
  Tooltip,
  Button,
  Modal,
  TextField,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';

const HomePage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/v1/getusers');
        setUsers(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/v1/delete/${id}`);
      setUsers(users.filter(user => user._id !== id));
      console.log(`Deleted user with id: ${id}`);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleEdit = (id) => {
    console.log(`Editing user with id: ${id}`);
  };

  const handleAdd = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({
      ...newUser,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting new user:', newUser); // Log new user data before sending the request
    try {
      const response = await axios.post('http://localhost:4000/api/v1/create', newUser);
      console.log('User added successfully:', response.data);
      setUsers([...users, response.data.data]); // Update the users list
      handleClose();
    } catch (error) {
      console.error('Error adding new user:', error);
    }
  };

  const columns = [
    { field: '_id', headerName: 'ID', width: 70 },
    { field: 'firstName', headerName: 'First Name', width: 130 },
    { field: 'lastName', headerName: 'Last Name', width: 130 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'role', headerName: 'Role', width: 100 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <Box>
          <Tooltip title="Edit">
            <IconButton color="primary" onClick={() => handleEdit(params.row._id)}>
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton color="secondary" onClick={() => handleDelete(params.row._id)}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  return (
    <Container>
      <Box sx={{ height: 450, width: '100%', mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          User Data
        </Typography>
        <Box display="flex" justifyContent="flex-end" mb={2}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleAdd}
          >
            Add User
          </Button>
        </Box>
        <DataGrid
          rows={users}
          columns={columns}
          getRowId={(row) => row._id}
          pageSize={5}
          loading={loading}
          rowsPerPageOptions={[5, 10, 20]}
          checkboxSelection
        />
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="add-user-modal-title"
        aria-describedby="add-user-modal-description"
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <Typography id="add-user-modal-title" variant="h6" component="h2">
            Add New User
          </Typography>
          <TextField
            label="First Name"
            name="firstName"
            value={newUser.firstName}
            onChange={handleInputChange}
            required
          />
          <TextField
            label="Last Name"
            name="lastName"
            value={newUser.lastName}
            onChange={handleInputChange}
            required
          />
          <TextField
            label="Email"
            name="email"
            value={newUser.email}
            onChange={handleInputChange}
            required
          />
          <TextField
            label="Password"
            name="password"
            value={newUser.password}
            onChange={handleInputChange}
            required
          />
          <Button type="submit" variant="contained" color="primary">
            Add User
          </Button>
        </Box>
      </Modal>
    </Container>
  );
};

export default HomePage;
