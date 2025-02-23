import {memo} from 'react';
import {SwiperSlide, useSwiper, useSwiperSlide} from 'swiper/react';

import {formatDate, formatMoney} from 's/utils/format.js';

function Card(props) {
  var swiper = useSwiper();
  var swiperSlide = useSwiperSlide();
  var onSwipe = () => {
    if (swiperSlide.isPrev) {
      swiper.slidePrev();
    } else if (swiperSlide.isNext) {
      swiper.slideNext();
    }
  };
  var {salary, type, detail, amount, remark, date, bg} = props.data;

  return (
    <div className="card" onClick={onSwipe}>
      <img src={bg} className='card-bg' alt="" loading='lazy' />
      <div className="card-body">
        <p className='salary'>{`${salary.symbol}${formatMoney(salary.quantity)}`}</p>
        <div className="salary-info">
          {salary.logo && <div className="icon"></div>}
          <span className="country">{`${salary.country}${salary.currency ? ` · ${salary.currency}` : ''}`}</span>
        </div>
      </div>
      <div className="card-cash">
        <div className="icon"></div>
        <div className="card-cash-info">
          {type === 'payout'
            ? <>{`${salary.symbol}${formatMoney(amount)}`} Request</>
            : (
              <>
                <div className='detail'>
                  <span className='detail-text'>{detail}</span>
                  <span className="amount">{type==='cashin'?'+':'-'} {salary.symbol+formatMoney(amount)}</span>
                </div>
                <time className='remark'>{type === 'cashin' ? remark : formatDate(date)}</time>
              </>
            )
          }
        </div>
        {type === 'payout' && <button className="action">Send</button>}
      </div>
    </div>
  );
}

export default memo(Card);
