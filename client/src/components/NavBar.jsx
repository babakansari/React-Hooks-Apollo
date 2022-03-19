import { Link } from 'react-router-dom';

const NavBar = () => {
    return ( 
        <nav>
            <div className="navbar-start">
                <Link className="navbar-item" to="/">Home</Link>
                <Link className="navbar-item" to="/jobs/new">Post Job</Link>
            </div>
        </nav> 
  );}
 
export default NavBar;