
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

    _import 'bootstrap/dist/css/bootstrap.css' in index.js file_

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

        <Route path="/" exact component={Home}>

- We can also use 'Switch' component for getting exact path 

        import { Switch } from'react-router-dom';

And wrap all Routes inside Switch component. **Switch** will render the first child that matches the location. With **Switch** we no longer need to use **exact**

        <Switch>
            <Route />
            <Route />
            <Route />
        </Switch>

When using the **Switch** component we should order the routes from the most specific ones to the most generic ones.

- **Link** component from **React Router**: For single page application. We don't have to download entire bundle and html page every time we navigates from one page to another.

  Using **Link** we can only updates the URL and we will get new content in the DOM. Because **Link** component prevents the default behaviour of anchor tag's handler function. 
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

In the to attribute specify the target path.
```

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
     
To working with **Query Strings** there is a very popular npm package 

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






**Some Covension**

For default export, we don't need curly braces around it when importing.

    import Counter from './components/counter'
