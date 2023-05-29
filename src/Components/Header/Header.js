import React, { useState } from 'react';
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    Collapse,
    NavbarToggler
} from 'reactstrap';
import { Link } from 'react-router-dom';

import styles from './Header.module.scss'


const Header = (props) => {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={styles['navbar-container']}>
        
            <Navbar expand="md" className={styles["navbar"]}>
                <NavbarBrand className={styles["navbar-brand"]} href="/">
                    <img src="https://www.noema.net/wp-content/uploads/2019/09/noema-logo-black-800.png" style={{ width: '200px', height: 'auto' }} alt="Noema" />
                </NavbarBrand>
                <NavbarToggler className={styles["navbar-toggler"]} onClick={() => { setIsOpen(prevState => !prevState) }} />
                <Collapse className={styles["navbar-collapse"]} isOpen={isOpen} navbar>
                    <Nav navbar className={styles["navbar-nav"]}>
                        <NavItem className={styles["navbar-nav-item"]}>
                            <Link className="nav-link" to="/create">Create Requests</Link>
                        </NavItem>
                        <NavItem className={styles["navbar-nav-item"]}>
                            <Link className="nav-link" to="/requests">View Requests</Link>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
            </div>
        
    );
}

export default Header;