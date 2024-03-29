import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {Form, Button } from 'react-bootstrap';
import FormContainer from "../components/FormContainer";
import { listProductDetails, updateProduct } from '../actions/productActions'; //error: userActions
import { PRODUCT_UPDATE_RESET } from './../constants/productConstants';


const ProductEditScreen  = ({ match, history }) => {
  const productId = match.params.id
 
  const[name, setName] = useState('')
  const[price, setPrice] = useState(0)
  const[image, setImage] = useState('')
  const[brand, setBrand] = useState('')
  const[category, setCategory] = useState('')
  const[countInStock, setCountInStock] = useState(0)
  const[description, setDescription] = useState('')
  //const[uploading, setUploading] = useState(false)

  const dispatch = useDispatch()

  const productDetails = useSelector(state => state.productDetails)
  const { error, product } = productDetails

  const productUpdate = useSelector(state => state.productUpdate)
  const { error: errorUpdate, success: successUpdate } = productUpdate


  useEffect(() => {
    if(successUpdate){
        dispatch({ type: PRODUCT_UPDATE_RESET})
         history.push('/admin/productlist')
    } else {
        if(!product.name || product._id !== productId) {
            //product.name used as a checking for one of the fields.
            dispatch(listProductDetails(productId))
            } else {
                  setName(product.name)  //wrong: setName: product.name
                  setPrice(product.price)
                  setImage(product.image)
                  setBrand(product.brand)
                  setCategory(product.category)
                  setCountInStock(product.countInStock)
                  setDescription(product.description)
            } 
    } 
     
  }, [dispatch, history, product, productId, successUpdate]);

  const uploadFileHandler = async (e) => {
      const file = e.target.files[0]
      const formData = new FormData()
      formData.append('image', file)
      //setUploading(true)

      try {
          const config = {
              headers: {
                  'Content-Type': 'multipart/form-data'
              }
          }

          const { data } = await axios.post('/api/upload', formData, config)

          setImage(data)
          //setUploading(false)
      } catch (error) {
          console.error(error)
          //setUploading(false)  
      }
  }

  const submitHandler = (e) => {
        e.preventDefault()

        //UPDATE PRODUCT 
        dispatch(updateProduct({
             _id: productId,
             name, price, image, brand, category, description, countInStock        
             
             /* WRONG: name: product.name,
                            price: product.price,
                            image: product.image,
                            brand: product.brand,
                            category: product.category,
                            countInStock: product.countInStock,
                            description: product.description */ 
            
        }))           
  }

  return (
  <> 
    <Link to="/admin/productlist" className="btn btn-light my-3">
        Go Back
    </Link>
    <FormContainer>
       <h1>Edit Product</h1>
       <Form onSubmit={submitHandler}>
       <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
                <Form.Control 
                    type="name" 
                    placeholder="Enter product name" 
                    value={name}
                    onChange={e => setName(e.target.value)}
                    >
                </Form.Control>
        </Form.Group>
       <Form.Group controlId="price">
            <Form.Label>Price</Form.Label>
                <Form.Control 
                    type="number" 
                    placeholder="Enter product price" 
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                    >
                </Form.Control>
        </Form.Group>
        
        <Form.Group controlId="image">
            <Form.Label>Image</Form.Label>
                <Form.Control 
                    type="text"  //file upload
                    placeholder="Enter image url" //image url (is new)
                    value={image}
                    onChange={e => setImage(e.target.value)}
                    >
                </Form.Control>
                <Form.File id="image-file" label="Choose File" 
                custom onChange={uploadFileHandler}></Form.File>
        </Form.Group>

        <Form.Group controlId="brand">
            <Form.Label>Brand</Form.Label>
                <Form.Control
                    type="text" 
                    placeholder="Enter brand"
                    value={brand}
                    onChange={e => setBrand(e.target.value)}
                ></Form.Control>
        </Form.Group>

        <Form.Group controlId="category">
            <Form.Label>Category</Form.Label>
                <Form.Control
                    type="text" 
                    placeholder="Enter category"
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                ></Form.Control>
        </Form.Group>

        <Form.Group controlId="countInStock">
            <Form.Label>Count In Stock</Form.Label>
                <Form.Control
                    type="number" 
                    placeholder="Enter countInStock"
                    value={countInStock}
                    onChange={e => setCountInStock(e.target.value)}
                ></Form.Control>
        </Form.Group>

        <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
                <Form.Control
                    type="text" 
                    placeholder="Enter description"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                ></Form.Control>
        </Form.Group>
        <Button size="lg" type = "submit" variant="success"> Update </Button>
      </Form>
    </FormContainer>
  </>
  )
}

export default ProductEditScreen ;
