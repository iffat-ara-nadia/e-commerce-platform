import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import {Form, Button } from 'react-bootstrap';
import FormContainer from "../components/FormContainer";
import { getUserDetails, updateUser } from '../actions/userActions';
import { USER_UPDATE_RESET } from "../constants/userConstants"; //this one's exception.

const UserEditScreen = ({ match, history }) => {
  const userId = match.params.id
 
  const[name, setName] = useState('')
  const[email, setEmail] = useState('')
  const[isAdmin, setIsAdmin] = useState(false)
 
  const dispatch = useDispatch()

  const userDetails = useSelector(state => state.userDetails)
  const { error, user } = userDetails
  //console.log(user)

  const userUpdate = useSelector(state => state.userUpdate)
  const {loading, success:successUpdate, error:updateError } = userUpdate

  useEffect(() => {
      if(successUpdate) {
          dispatch({ type: USER_UPDATE_RESET}) //????????WHY??
          history.push('/admin/userList')
      } else { //???
          if(!user.name || user._id !== userId) {
              //user.name used as a checking for one of the fields.
            dispatch(getUserDetails(userId))
          } else {
              setName(user.name)  //wrong: setName: user.name
              setEmail(user.email)
              setIsAdmin(user.isAdmin)
          } 
      }
  }, [dispatch, history, user, userId, successUpdate]);

  const submitHandler = (e) => {
        e.preventDefault()
        
        dispatch(updateUser({ _id: userId, name, email, isAdmin }))

        
  }

  return (
  <> 
    <Link to="/admin/userlist" className="btn btn-light my-3">
        Go Back
    </Link>
    <FormContainer>
       <h1>Edit User</h1>
       <Form onSubmit={submitHandler}>
       <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
                <Form.Control 
                    type="name" 
                    placeholder="Enter name" 
                    value={name}
                    onChange={e => setName(e.target.value)}
                    >
                </Form.Control>
        </Form.Group>
        
        <Form.Group controlId="email">
            <Form.Label>Email address</Form.Label>
                <Form.Control 
                    type="email" 
                    placeholder="Enter email" 
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    >
                </Form.Control>
        </Form.Group>

        <Form.Group controlId="isAdmin">
            <Form.Label>Email address</Form.Label>
                <Form.Check 
                    type="checkbox" 
                    label="Is Admin"
                    checked={isAdmin}
                    onChange={e => setIsAdmin(e.target.checked)}
                    ></Form.Check>
        </Form.Group>
        <Button size="lg" type = "submit" variant="success"> Update </Button>
      </Form>
    </FormContainer>
  </>
  )
}

export default UserEditScreen;
