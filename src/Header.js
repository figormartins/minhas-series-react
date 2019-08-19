import React, { useState } from 'react'
import {
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
import { Link } from 'react-router-dom'

const Header = () => {
  const [open, setOpen] = useState(false)
  const toggle = () => {
    setOpen(!open)
  }

  return (
    <Navbar color='light' light expand='md'>
      <div className='container'>
        <NavbarBrand tag={Link} to='./'>Minhas Séries</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={open} navbar>
          <Nav className='ml-auto' navbar>
            <NavItem>
              <NavLink tag={Link} to='./series' onClick={toggle} href='/'>Séries</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to='./generos' onClick={toggle} href='/'>Gêneros</NavLink>
            </NavItem>
          </Nav>
      </Collapse>
      </div>
    </Navbar>
  );
}

export default Header