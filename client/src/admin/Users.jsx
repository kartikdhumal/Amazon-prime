import React, { useState, useRef, useEffect } from 'react'
import './users.scss'
import { NavLink, useNavigate } from 'react-router-dom'
import DeleteIcon from '@mui/icons-material/Delete';
import Axios from 'axios';
import AdminNavbar from './AdminNavbar'
import { styled } from '@mui/system';
import {
  TablePagination,
  tablePaginationClasses as classes,
} from '@mui/base/TablePagination';
import bcrypt from 'bcryptjs'

function Users() {
  const [userdata, getUserData] = useState([])
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - userdata.length) : 0;

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    isAdmin: false
  });
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const fetchData = () => {
    fetch('https://amazon-prime-server.vercel.app/finduser')
    .then((response) => response.json())
    .then((data) => {
      getUserData(data);
      setFilteredData(data);
    })
    .catch((error) => console.error(error));
  }
  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    filterData();
  }, [searchQuery, userdata]);

  const handleDelete = (recordId) => {
    Axios.delete(`https://amazon-prime-server.vercel.app/deleteuser/${recordId}`)
      .then((response) => {
        fetchData();
      })
      .catch((error) => {
        console.error('Error deleting record:', error);
      });
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const navigate = useNavigate();
  const CustomTablePagination = styled(TablePagination)`
  & .${classes.toolbar} {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;

    @media (min-width: 768px) {
      flex-direction: row;
      align-items: center;
    }
  }

  & .${classes.selectLabel} {
    margin: 0;
  }

  & .${classes.displayedRows} {
    margin: 0;

    @media (min-width: 768px) {
      margin-left: auto;
    }
  }

  & .${classes.spacer} {
    display: none;
  }

  & .${classes.actions} {
    display: flex;
    gap: 0.25rem;
  }
`;

  useEffect(() => {
    if (!sessionStorage.userid) {
      navigate('/login');
    }
  }, [navigate]);

  const filterData = () => {
    if (!searchQuery) {
      setFilteredData(userdata);
    } else {
      const filtered = userdata.filter((user) => {
        const isAdminValue = user.isAdmin ? 'admin' : 'user';
        return (
          user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.createdAt.includes(searchQuery) ||
          isAdminValue.toLowerCase().includes(searchQuery.toLowerCase())
        );
      });
      setFilteredData(filtered);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSelect = (e) => {
    const isadmin = e.target.value == "Admin" ? "1" : "0";
    formData.isAdmin = isadmin;
  }
  const form = useRef();
  const handleUserSubmit = async (e) => {
    e.preventDefault();
    try {
      const sendData = await Axios.post('https://amazon-prime-server.vercel.app/users', {
        username: formData.username,
        email: formData.email,
        password: bcrypt.hashSync(formData.password, 8),
        isAdmin: formData.isAdmin
      },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        });
      if (sendData) {
        alert('User added');
        fetchData();
        document.getElementById('email').value = "";
        document.getElementById('password').value = "";
        document.getElementById('isadmin').value = "";
        setFormData({
          email: "",
          password: "",
          isAdmin: false,
        })
      }
      else {
        alert("Something went wrong");
      }
    } catch (err) {
      console.log(err);
    }
  }
  const heads = ['ID', 'Register Date', 'Email', 'Role', 'Delete']
  return (
    <div className='users'>
      <AdminNavbar />
      <div className="form">
        <form className='formmy' onSubmit={handleUserSubmit} ref={form}>
          <input type='email' id='email' value={setFormData.email} name="email" onChange={handleChange} required placeholder='email'></input>
          <input type='password' id='password' value={setFormData.password} name='password' onChange={handleChange} required placeholder='password'></input>
          <select id='isadmin' value={setFormData.isAdmin} onChange={handleSelect} required>
            <option disabled name='isadmin'> Select Role </option>
            <option> Admin </option>
            <option> User </option>
          </select>
          <button> Add user </button>
        </form>
      </div>
      <div className="search">
        <input
          type="text"
          placeholder="Search by Email, date, year, role..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className='searchbox'
        />
      </div>
      <table aria-label="custom pagination table" id='userdatatable' cellPadding="10px" cellSpacing="10px">
        <tr>
          {
            heads.map((val) => {
              return <th> {val} </th>
            })
          }
        </tr>
        <tbody>
          {(rowsPerPage > 0
            ? filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : filteredData
          ).map((row, index) => (
            <tr key={row.name}>
              <td>{index + page * rowsPerPage + 1}</td>
              <td>
                {new Date(row.createdAt).toLocaleDateString('en-IN', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric'
                })} - {' '}
                {
                new Date(row.createdAt).toLocaleTimeString('en-US', {
                  hour: '2-digit',
                  minute: '2-digit',
                  timeZone: 'UTC'
              })              
                }
              </td>

              <td style={{ width: 160 }} align="right">
                {row.email}
              </td>
              <td style={{ width: 160 }} align="right">
                {row.isAdmin === true ? "Admin" : "User"}
              </td>
              <td>
                <DeleteIcon onClick={() => handleDelete(`${row._id}`)} className='deleteicons' />
              </td>
            </tr>
          ))}
          {emptyRows > 0 && (
            <tr style={{ height: 41 * emptyRows }}>
              <td colSpan={3} aria-hidden />
            </tr>
          )}
        </tbody>
        <tr>
          <CustomTablePagination
            rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
            colSpan={5}
            count={userdata.length}
            rowsPerPage={rowsPerPage}
            page={page}
            slotProps={{
              select: {
                'aria-label': 'Users per page',
              },
              actions: {
                showFirstButton: true,
                showLastButton: true,
              },
            }}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </tr>
      </table>

    </div>
  )
}

export default Users
