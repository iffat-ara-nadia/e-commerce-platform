import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { Table, Button, Row, Col, Pagination } from 'react-bootstrap';
import Message from "../components/Message";
import { listProducts, deleteProduct, createProduct } from '../actions/productActions';
import { PRODUCT_CREATE_RESET } from './../constants/productConstants';
import Paginate from "../components/Paginate"

const ProductListScreen = ({ history, match }) => {

  const dispatch = useDispatch()
  const pageNumber = match.params.pageNumber || 1

  const productList = useSelector(state=> state.productList)
  const { products, page, pages, error } = productList

  const productDelete = useSelector(state=> state.productDelete)
  const { loading: loadingDelete, success: successDelete, error: errorDelete } = productDelete

  const productCreate = useSelector(state=> state.productCreate)
  const { loading: loadingCreate, 
         success: successCreate, 
         error: errorCreate,
         product: createdProduct } = productCreate

  const userLogin = useSelector(state=> state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
     dispatch({ type: PRODUCT_CREATE_RESET })

      if(!userInfo.isAdmin)
        history.push('/login') //if not admin then redirect to login

      if(successCreate) {
        history.push(`/admin/product/${createdProduct._id}/edit`)
      } else {
        dispatch(listProducts('', pageNumber))
      }
         
  }, [dispatch, history, userInfo, successCreate, createdProduct, successDelete, pageNumber])

  const createProductHandler = () => {
    dispatch(createProduct()) 
  }

  const deleteHandler = (id) => {
      if(window.confirm('Are you sure?'))   {//alternate way of window.confirm??
        dispatch(deleteProduct(id))
      }
  }

  return (
    <>
        <Row className="align-items-center"> 
            <Col>
                <h1> Products </h1>
            </Col>

            <Col className="text-right">
                <Button className="my-3" onClick={createProductHandler}>
                    <i className="fas fa-plus"></i> Create Product
                </Button>
            </Col>
        </Row>
        {errorDelete && <Message variant="danger" > { errorDelete }</Message>}
        { error ? <Message variant="red">{error}</Message> : (
          <>
            <Table striped bordered hover responsive className="table-sm">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>NAME</th>
                    <th>PRICE</th>
                    <th>CATEGORY</th>
                    <th>BRAND</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  { products.map(product => (
                    <tr key={product._id}>
                        <td>{product._id}</td>
                        <td>{product.name}</td>
                        <td> ${product.price}</td>
                        <td>{product.category}</td>
                        <td>{product.brand}</td>
                        <td>
                         <LinkContainer to={`/admin/product/${product._id}/edit`}>
                            <Button variant="light" className="btn-sm mr-2">
                                <i className="fas fa-edit"></i>
                            </Button> 
                         </LinkContainer>
                            
                        <Button variant="danger" className="btn-sm" onClick={() => deleteHandler(product._id)}>
                            <i className="fas fa-trash"></i>
                        </Button>
                        </td>
                    </tr>
                  ))}
                </tbody> 
            </Table>
            <Paginate 
               pages={pages}
               pageNumber={page}
               isAdmin={true}
            />
          </>
        )} 
    </>
  )
}

export default ProductListScreen
