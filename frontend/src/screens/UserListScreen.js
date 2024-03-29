import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { Table, Button } from 'react-bootstrap';
import Message from "../components/Message";
import { getUsers, deleteUser } from '../actions/userActions';

const UserListScreen = ({ history }) => {

  const dispatch = useDispatch()

  const userList = useSelector(state=> state.userList)
  //console.log("userList" + userList)
  const { users, error } = userList
  //console.log("userScreen users:" + users)

  const userLogin = useSelector(state=> state.userLogin)
  const { userInfo } = userLogin

  const userDelete = useSelector(state=> state.userDelete)
  const { success:successDelete } = userDelete

  useEffect(() => {
      if(userInfo && userInfo.isAdmin) {
          dispatch(getUsers())
      } else {
          history.push('/login') //why not '/' for redirecting to homepage.
      }
  }, [dispatch, history, userInfo, successDelete])


  const deleteHandler = (id) => {
      if(window.confirm('Are you sure?')) //what else method?
        dispatch(deleteUser(id))
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
                            <LinkContainer to={`/admin/user/${user._id}/edit`}>
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
