
# React 
**React is a single page application framework.
To create a boilerplate of our application:**

*Either we can install create-react-app in our system globally and then run it

    npm install -g create-react-app
    create-react-app app_name

Or we can just use the npx command and then run create-react-app without installing

    npx create-react-app app_name

**To run frontend dev server**

    npm start

**Add title of our application**

In index.html file we can add our title. This title would be displayed everypage in our application. To have custom page title, we can use **react helmet**.

_return should be one single element like:
 **div**. We can use an empty element called fragment <> </> or react.fragment_

 ## Some useful git commands ##
 
 This will list all the files of all the folder contents even the hiddle files and folders

    ls -a

If there is a .git folder already there we wnat to get rid of that .git repository. To do that:

    rm -rf .git

[ Because I don't want my .git repository in the frontend, I want it in the root of our project.  _.gitignore_ file should be in the root of our folder. _.gitignore_ file should contain all the files and folders that we dont't want to pust to our _github_ repository]

## Useful VSCode Extentions ##
- ES7 React/Redux....snippets (ex: rface, rfc, rcc)
- Simple React Snippets
- Prettier (code formator)
- Markdown 

## How to install and import some dependencies ##

 **Bootstrap**

    npm i bootstrap

    import 'bootstrap/dist/css/bootstrap.css' in index.js file

For using Bootstrap framework:
    Bootswatch is a free theme for Bootstrap and Bootswatch is a customized Bootstrap files. Download prefered theme.
     
    import './bootstrap.min.css'

 **React-Bootstrap**

        npm i react-bootstrap

        import { Container, Row, Column, Navbar, Nav etc.} from 'react-bootstrap'

 **Font-awesome**

    Go to **cdnjs** and copy **all.min.css** link tag and put this link inside public **index.html** file. (udemy)

- Install

        npm i font-awesome

- Import font-awesome.css file in the index.js


      import "font-awesome/css/font-awesome.css";

**Proptypes**

With proptypes we can check the type of each prop.

        npm i prop-types

        import PropTypes from 'prop-types'


After we define our component, we need to add a new property to it and with this property we define type checking requirements of a component.

```
Rating.propTypes = {
    value: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    color: PropTypes.number

*we can also use PropTypes.func.isRequired            
}

```
_defaultProps_ :

    Rating.defaultProps = {
        color: '#f8e825'
    }

**Debugging React App**

- Use React Developer Tools extention for chrome/firefox.

## React Router ##

To add a router in our application, we need a library called **react-router-dom**

    npm i react-router-dom  react-router-bootstrap

After installing we need to go to _index.js_ file and 

    import { BrowserRouter } from 'react-router-dom' (rrd -> tab)

Then have to wrap **App** component with **BrowserRouter**

    <BrowserRouter>
        <App />
    </BrowserRouter>

**BrowserRouter** grabs _history_ object in browsers and passes it down to component tree. So, anywhere in our component tree will be able to use the _history_ object.
    
In _App.js_ file

    import { Route } from 'react-router-dom';

- How to use Route component

        <Route path="/products" component={Products} />

- For exact path we should use _exact_ keyword like this :

        <Route path="/" exact component={Home} />

- We can also use 'Switch' component for getting exact path 

        import { Switch } from'react-router-dom';

    - **Shortcut**
        Route[path] [component]*4 (then press tab)

And wrap all Routes inside Switch component. **Switch** will render the first child that matches the location. With **Switch** we no longer need to use **exact**

        <Switch>
            <Route />
            <Route />
            <Route />
        </Switch>

When using the **Switch** component we should **order the routes from the most specific ones to the most generic ones.**

- **Link** component from **React Router**: For single page application. We don't have to download entire bundle and html page every time we navigates from one page to another.

  Using **Link** we can only updates the URL and we will get new content in the DOM. Because **Link** component prevents the default behaviour of anchor tag's (reloading) handler function. 

        import { Link } from 'react-router-dom';

```javascript
const Navbar = () => {
    return (
        <ul>
          <li>
            <Link to="/">
            [Instead of using <a href=""></a> tag]
          </li>
        </ul>
    )
}

```

In the **to** attribute specify the target path.

- **NavLink** component

    When we use **NavLink**, we can automatically applies **active class to the currently selected link**.

        import { NavLink } from 'react-router-dom'


**OR** 

We can use **LinkContainer**

    import { LinkContainer } from 'react-router-bootstrap';

    <LinkContainer to="/">
    
        <Navbar.Brand> Proshop </Navbar.Brand>

    </LinkContainer>


- **Passing Props**

    - If we want to pass **additional props**, use **render** attribute instead of component attribute in Route.

            <Route path="products" render={(props) => <Products sortBy="newest" {...props}} />

    With _props_ React will automatically inject default props **history**, **match**, **location** to this Component.

- **Route Parameter**

        <Route path="/products/:id" component={ProductDetails} />

We can extract route parameters (like: id) passed to a component, from **match** object's **params** property.

    const Products = ({ match }) => {
        render(
            <div>
                <h1> {match.params.id} </h1>
            </div>
        )
}

- **Optional Parameter**

This is like a regular expression in JavaScript. [Optional Parameter is something that we should avoid.]

``` javascript
App.js file
<Route path="/posts/:year?/:month?" component={Posts} />

posts.js file

const Posts = ({ match }) => {
    return (
        <div>
            <h1>Posts</h1>
            Year: { match.params.year } , Month: { match.params.month }

        </div>
    )
}

```

- **Query String Parameters** ***

Generally when are dealing with optional parameters, instead of including them in the route, we should include them in **Query String**

**Query String** is what we append in the URL using question mark. 

_localhost:3000/posts?sortBy=newest&approved=true_

- How to extract Query String :

    **Query String** parameters are in the **location** object's **search property**

    location: {
    
    search : "?sortBy=newst&approved=true"
    
    }
     
To be working with **Query Strings** there is a very popular npm package 

- Install

    npm i query-string

- Usage

        import queryString from 'query-string';

Then we use **query-string** package to parse **location.search** string and this will give us an object with properties based on the parameters of **query string**.

```javascript
const Posts = ({ match, location }) => {
    const result = queryString.parse(location.search);

    console.log(result); // {approved: "true", sortBy: "newest"}
}
```
Values of the output are always strings. So, if we want to work with numbers or booleans we need to parse them accordingly.

- **Redirects**

We want to redirect the user to a different URL like **/not-found** when we go to an invalid route.

    import { Redirect } from 'react-router-dom';

We want to display:
```javascript
    <Route path="/products" component={Products} />
    <Route path="not-found" component={NotFound} />
    <Route path="/" exact component={Home} />
    <Redirect from="/" exact to="/products" />
    <Redirect to="/not-found" /> [this can be applied to any other URLs]
```


If we type an invalid URL, we get automatically redirected to /not-found and we get NotFound component.

Sometimes we want to move resources from one URL to another one. We can use **Redirect** component to achieve this.

    <Redirect from="/messages" to="/posts" />

If the **current** URL we type in the browser, matches the ("from") we can automatically get redirected ("to")

- **Programatic Navigation**

When we click a button or submit a form.

**history** object has useful methods for navigation.

- **push()*****(mostly used)
    
    - This _push()_ method add a new address in the browser's **history** object. So, we can use the back button and see where we were.
    
    ```javascript
    const PaymentScreen = ({ history }) => {
        const submitHandler = (e) => {
        e.preventDefault()

       dispatch(savePaymentMethod(paymentMethod))
       history.push("/placeorder")
    }
    ```
    
- **replace()**

    - _replace()_ basically replace the current address. So we won't have history and go back to the previous page.
    - This method is often used in _login_ pages. So, when the user logs in and goes to a new page, if that person click the back button, we don't want to take him/her back to the _login_ page.

- **Nested Routing**
    - **Route Component**
<Route /> is just like another componet. We can use **Route** component anywhere in our application not just in _App.js_ file.

```const Dashboard = ({ match }) => {
    return (
     <div>
        <h1> Admin Dashboard </h1>
        <Sidebar />
        <Route path="/admin/users" component={User} />
     </div>
    )
}
```

## Fetching Data ##
- **Axios**

    **Axios** is a _http_ library that we use it to make a _http_ request to our backend.
    
    - **Install**

            npm i axios

    - How to use with **React Hooks**
```javascript
  import React, { useState, useEffect } from 'react';
  import axios from "axios";

  const HomeScreen = () => {
      const [products, setProducts] = useState([]) //to initialize state "useState"

      useEffect(() => {
          const fetchProducts = async () => {
            const { data } = await axios.get('/api/products')
            
            setProducts(data); //to change piece of state.

          }

          fetchProducts()
      }, []) //as a second argument to useEffect we pass array of dependencies, anything to fire useEffect() off when it changes.
  }

```


**Some Covension**

For default export, we don't need curly braces around it when importing.

    import Counter from './components/counter'

# Redux #

Install **Redux Dev Tools** in browser which is highly recommended by developers. This gives us overall pictures of **Redux Store** with all of our state. Any state changes from component to component.

It is mandatory to use **redux dev tools** if we want to work with **redux**.

## Install Redux ##

We have to install redux on frontend not on server.

    npm i redux  react-redux  redux-thunk  redux-devtools-extension

## Steps to use Redux ##

First step is to create redux **store.js** file directly in the **source folder**

- **Import**

        import { createStore, combineReducers, applyMiddleware } from 'redux';
        import thunk from 'redux-thunk'
        import { composeWithDevTools } from 'redux-devtools-extension

        const reducer = combineReducers({})

        const initialState = {}

        const middleware = [ thunk ]

        const store = createStore(reducer, initialState,          composeWithDevTools(applyMiddleware(...middleware)))

- **Notes**

    - **redux** is state management library.
    It is commonly used with react. 

    - To work react and redux together we use package **react-redux**

    - **redux-thunk** is a piece of middleware and basically allows us in our action creators to make **_asynchronous_** request. Because we have to talk to our server from those action creators.

    - **redux-devtools-extension** because _redux-dev-tools_ doesn't work by default

- **Provider**

    The way we actually implement **store** into our application is through a **Provider**. And that provider comes from **react-redux** .

    - In our _index.js_ file : 
    
            import { Provider } from 'react-redux'

    - We also want to bring the **store** in because that has to be passed into the **provider**.

            import store from './store';

```javascript
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)
```

- **Reducer**

Create a folder called _reducers_ and basically each resource of our application will have a reducer file such as **products**.

Inside **reducers** folder we gonna create a file **productReducers**. It's gonna be plural, because we gonna have bunch of different reducer functions in here but they all gonna related to products.

A **reducer** takes in 2 things: **initial state** and **action**

    export const productReducer = (state = { products: []}, action) => {
        switch (action.type) {
            case 'A':
                return { products: [] }
            case 'B' :
                return { products: action.payload }
            case 'C' :
                return { error: action.payload }
            default:
                return state
        }

    }