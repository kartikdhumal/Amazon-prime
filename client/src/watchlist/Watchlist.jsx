import React, { useEffect, useRef, useState } from 'react';
import '../admin/home.scss';
import Navbar from '../Navbar';
import ListItem from '../listitem/ListItem';
import './watchlist.scss';
import List from '../list/List';

function Watchlist() {
    const listRef = useRef();

    return (
        <div className='mymains'>
            <div className="navbas">
                <Navbar />
            </div>
            <div className="cards">
                <p className='title'> Watchlist </p>
                    <div className="mycards" ref={listRef}>
                        <List type="mywatchlists" />
                    </div>
            </div>
        </div>
    );
}

export default Watchlist;
