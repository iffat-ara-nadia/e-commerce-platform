import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { Table, Button } from 'react-bootstrap';
import Message from "../components/Message";
import { getUsers } from '../actions/userActions';

const UserListScreen = () => {

  const dispatch = useDispatch()

  const userList = useSelector(state=> state.userList)
  console.log("userList" + userList)
  const { users, error } = userList
  console.log("userScreen users:" + users)

  useEffect(() => {
      dispatch(getUsers())
  }, [dispatch])


  const deleteHandler = (id) => {
      console.log("delete user ")
  }

  return (
    <>
        <h2>Users</h2>
        { error ? <Message variant="red">{error}</Message> : (
            <Table striped bordered hover responsive className="table-sm">
                <thead>
                    <tr>
                    <th>ID</th>
                    <th>NAME</th>
                    <th>EMAIL</th>
                    <th>ADMIN</th>
                    <th></th>
                    </tr>
                </thead>
                <tbody>
                  { users.map(user => (
                    <tr key={user._id}>
                        <td>{user._id}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{ user.isAdmin ? (<i className="fas fa-check" style={{ color: "green"}}></i>) 
                         : (<i className="fas fa-times" style={{ color: "red"}}></i>)}</td>
                       
                        <td>
                            <LinkContainer to={`/user/${user._id}/edit`}>
                                <Button variant="light" className="btn-sm mr-2">
                                    <i className="fas fa-edit"></i>
                                </Button> 
                            </LinkContainer>
                            
                            <Button variant="danger" className="btn-sm" onClick={() => deleteHandler(user._id)}>
                                <i className="fas fa-trash"></i>
                            </Button>
                        </td>
                    </tr>
                  ))}
                </tbody> 
            </Table>
        )} 
    </>
  )
}

export default UserListScreen
