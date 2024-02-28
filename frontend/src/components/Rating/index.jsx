import { memo } from 'react';
import {
  FaStar as Star,
  FaRegStar as StarEmpty,
  FaStarHalfAlt as StarHalf,
} from 'react-icons/fa';

const Rating = ({ value = 4.5, qnt }) => {
  const stars = Array.from({ length: 5 }, (_, index) => {
    if (value >= index + 1) {
      return <Star key={index} />;
    } else if (value >= index + 0.5) {
      return <StarHalf key={index} />;
    } else {
      return <StarEmpty key={index} />;
    }
  });

  return (
    <div>
      <span className="rating">{stars}</span>
      {qnt && <span className="rating-text">{`${qnt} reviews`}</span>}
    </div>
  );
};

export default memo(Rating);
