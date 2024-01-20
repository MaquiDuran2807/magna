import React from 'react';
import {NavBar} from '../components/navBar';
import Footer from '../components/footer1';

const ServicesPage: React.FC = () => {
    return (
        <div>
            <NavBar />
            {/* Content */}
            <div className='container-fluid'>
                <div className='row'>
                    <div className="col-8">
                        {/* imagen */}
                    </div>
                    <div className="col-4">
                        {/* texto */}
                    </div>
                </div>
                <div>
                    {/* Service content */}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ServicesPage;
