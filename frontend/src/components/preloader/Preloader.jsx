import React, { useEffect } from 'react';

import { preLoaderAnim } from '../../animations';

import './preloader.scss';

const Preloader = () => {

    useEffect(() => {
        preLoaderAnim();
    }, []);

    return (
        <div className="preloader">

            <div className="texts-container">
                <span>Rainbow</span>
                <span>game</span>
                <span>world</span>
            </div>
            
        </div>
    );
};

export default Preloader;
