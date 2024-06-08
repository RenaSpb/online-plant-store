//import React from 'react';

type RatingProps = {
    rating: number;
    max: number;
}
 function Rating({rating, max}: RatingProps) {
    const stars = [];
    for (let i = 0; i < max; i++) {
        if (i < rating) {
            stars.push(<span key={i} style={{ color: 'orange', fontSize: '0.8rem' }}>★</span>);
        } else {
            stars.push(<span key={i} style={{ color: 'lightgrey', fontSize: '0.8rem' }}>☆</span>); // Изменено на пустую звезду
        }
    }
    return <div>{stars}</div>;
}

export default Rating;