import {
    BrowserRouter as Router,
    Routes,
    Route
  } from "react-router-dom";
  import HomePage from './Home';
  import PostPage from './Post'
  
  function AppRouter() {
    return (
      <>
        <Router>
          <Routes>
            <Route path='/' element={<HomePage />}></Route>
            <Route path='/dir/:path' element={<PostPage />}></Route>
          </Routes>
        </Router>
      </>
    );
  }
  
  export default AppRouter;
  