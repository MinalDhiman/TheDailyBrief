import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './Components/Layout';
import Loginform from './Components/loginform/Loginform';
import NewsCard from './Components/NewsCard';
import Signupform from './Components/loginform/Signupform';

const router = createBrowserRouter([
  {
    path:"/",
    element:<Layout/>,
    children:[
      {
        path:"/signup",
        element:<Signupform/>

      },
      {
        path:"/",
        element:<Loginform/>
      },
      {
        path:"/general",
        element:<NewsCard category="general" exact key="general"/>
      },
      {
        path:"/entertainment",
        element:<NewsCard category="entertainment" exact key="entertainment"/>
      },
      {
        path:"/health",
        element:<NewsCard category="health" exact key="health"/>
      },
      {
        path:"/technology",
        element:<NewsCard category="technology" exact key="technology"/>
      },
      {
        path:"/business",
        element:<NewsCard category="business" exact key="business"/>
      },
      {
        path:"/sports",
        element:<NewsCard category="sports" exact key="sports"/>
      },
    ]
  }
])
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   <RouterProvider router={router}/>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
