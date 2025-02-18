import React from 'react'
import { Col } from 'reactstrap'

// import tourData from '../../assets/data/tours';
import Tourcard from '../../shared/Tourcard';

import useFetch from '../../hooks/useFetch';
import { BASE_URL } from '../../utils/config';

const FeaturedTourList = () => {

    const { data: featuredTours, loading, error } = useFetch(
        `${BASE_URL}/tours/search/getFeaturedTours`
    );

    console.log(featuredTours);
    return (
        <>
            {
                loading && <h4>Loading............</h4>
            }
            {
                error && <h4>{error}</h4>
            }
            {!loading && !error &&
                featuredTours?.map(tour => (
                    <Col lg='3' sm='6' md='6' className='mb-4' key={tour._id}>
                        <Tourcard tour={tour} />
                    </Col>
                ))

            }

        </>
    )
}

export default FeaturedTourList