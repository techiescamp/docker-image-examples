import React, { useContext, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Header.css';
import { UserContext } from '../../App';
import config from '../../config';
import axios from 'axios';

const apiUrl = config.apiUrl;

function Header() {
  const loc = useLocation();

  const { user, setUser, xCorrId } = useContext(UserContext);
  const usersession = JSON.parse(sessionStorage.getItem('userInfo')) || null;
  const gusersession = JSON.parse(sessionStorage.getItem('guser')) || null;

  useEffect(() => {
    const getUser = async () => {
      if(usersession) {
        setUser(usersession)
      } else if(gusersession) {
        setUser(usersession)
      } else {
        setUser(null)
      }
    }
    getUser();
  },[loc])

  const handlelogout = () => {
    sessionStorage.clear();
    fetch(`${apiUrl}/auth/logout`, {
      method: 'GET',
      headers: {
        'x-correlation-id': usersession.xCorrId || xCorrId
      }
    })
    .then(res => {
      if(res.ok) {
        window.location.href = '/'
      }
    })
    .catch(err => console.error('Error in logout: ', err.message));
  }

  return (
    <header>
      <nav className="navbar navbar-expand-lg" style={{color: '#DDE6ED'}}>
        <div className="container-fluid align-items-center justify-content-center justify-content-between">
          <Link className="navbar-brand ms-5" to="/">Pomodoro</Link>
          <button className="navbar-toggler focus-ring" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="menu-icon"><i className="bi bi-list"></i></span>
          </button>
          <div className="collapse navbar-collapse align-items-center justify-content-end" id="navbarNav">
            {user ?
              <ul className='navbar-nav me-lg-5 mb-lg-0'>
                <li className='nav-item me-lg-4 mb-1 mb-lg-0 dropdown'>
                  <button className='px-3 py-1 mx-auto rounded-pill border border-info-subtle d-flex align-items-md-center dropdown-toggle' type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    {user.avatar.imgType === 'text' ?  
                      <span className="avatar me-2">{user.avatar.data}</span>
                      :
                      <img src={user.avatar.data} className='me-2 rounded-pill' alt='avatar' width='20px' height='20px' />
                    }
                    <span className="">{user.displayName}</span>
                  </button>
                  <ul className='dropdown-menu'>
                    <li className='dropdown-header mb-1 border border-bottom-1'>
                      <Link to='/' className="text-decoration-none text-secondary">
                        <p className='mb-0'>{user.displayName}</p>
                        <p className='mb-0'>#{user.email}</p>
                      </Link>
                    </li>
                    <li className='dropdown-item mb-1 py-2'>
                      <Link to={`/${user.displayName}/settings`} className="text-decoration-none text-black">
                        <i className="bi bi-person-circle me-3"></i>Settings
                      </Link>
                    </li>
                    <li className='dropdown-item mb-1 py-2' onClick={handlelogout}>
                      <i className="bi bi-box-arrow-right me-3"></i>Logout
                    </li>
                  </ul>
                </li> 
              </ul>
            : (
            <ul className="navbar-nav justify-content-lg-end">
              <li className="nav-item mx-auto me-lg-4 mb-2 mb-lg-0">
                <Link className="nav-link" to="/login">Login</Link>
              </li>
              <li className="nav-item mx-auto me-lg-4 mb-2 mb-lg-0">
                <Link className="nav-link" to="/signup">Signup</Link>
              </li>
            </ul>)
          }

          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
