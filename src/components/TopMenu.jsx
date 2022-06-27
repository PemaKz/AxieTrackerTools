import React, {useState} from 'react';
import {Link, NavLink} from 'react-router-dom';
import {BiMenu, BiDownArrowAlt} from 'react-icons/bi';
import Dropdown from 'react-bootstrap/Dropdown';

const TopMenu = () => {
  const [state, setState] = useState({show: false});

  const handleShowMenu = () => {
    setState({...state, show: state.show ? false : true});
  };

  return (<nav className='navbar navbar-expand-lg fixed-top topmenu'>
    <Link to="/" className='ms-2 primary-dg logo'>
      Axie Tracker
    </Link>
    <button className='navbar-toggler me-2'
      onClick={handleShowMenu}
      type='button'>
      <span className='navbar-toggler-icon'><BiMenu/></span>
    </button>
    <div className={`${state.show ? '' : 'collapse'} navbar-collapse`}>
      <NavLink to="/" className="nav-link text-center ms-auto">
        Home
      </NavLink>
      <Dropdown className='mx-2'>
        <Dropdown.Toggle className='nav-link text-center dropdownbutton'>
          Claim <BiDownArrowAlt size={12}/>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item href="#">
            <NavLink to="/claim" className="nav-link text-center">
              Claim
            </NavLink>
          </Dropdown.Item>
          <Dropdown.Item href="#">
            <NavLink to="/claimandsend" className="nav-link text-center">
              Claim & Send
            </NavLink>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <Dropdown className='mx-2'>
        <Dropdown.Toggle className='nav-link text-center dropdownbutton'>
          Send <BiDownArrowAlt size={12}/>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item href="#">
            <NavLink to="/sendaxies" className="nav-link text-center">
              Send Axies
            </NavLink>
          </Dropdown.Item>
          <Dropdown.Item href="#">
            <NavLink to="/senditems" className="nav-link text-center">
              Send Items
            </NavLink>
          </Dropdown.Item>
          <Dropdown.Item href="#">
            <NavLink to="/sendtokens" className="nav-link text-center">
              Send Tokens
            </NavLink>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <NavLink to="/analyzer" className="nav-link text-center">
        Analyze
      </NavLink>
    </div>
  </nav>);
};

export default TopMenu;
