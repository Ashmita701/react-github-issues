import React from 'react';
import { AiFillGithub } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import './Navbar.css';

export function Navbar() {

    return (
        <nav>
            <Link to='/' className='link'>
                <div id='logo-with-img'>
                    <AiFillGithub id="logo-img" size={40} />
                    GITHUB ISSUES
                </div>
            </Link>
        </nav>
    );
}