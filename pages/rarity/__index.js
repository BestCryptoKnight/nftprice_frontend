import React from 'react';
import ColumnTopCollections from '../../components/components/ColumnTopCollections';

const Rarity = () => {

    return (
        <div>
            <section className='p-5' style={{ background: "#ebf0f4" }}>
                <div className='spacer-double'/>
                <div className='container'>
                    <div className='row'>
                        <div className='col-lg-12'>
                            <div className='text-center'>
                                <h2>Top Collections </h2>
                                <p className='timestamp'>Last 24 Hours</p>
                            </div>
                        </div>
                    </div>
                    <ColumnTopCollections />
                </div>
            </section>
        </div>);
};
export default Rarity;
