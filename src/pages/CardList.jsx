import {use, useRef} from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Pagination, A11y} from 'swiper/modules';
import {connect} from 'react-redux';


import Card from './Card.jsx';

import { fakeRequest } from 's/utils/fakeRequest.js';

function CardList(props) {
  var res = use(props.cardPromise);
  return (
    <>
      <Swiper
        className='card-list'
        modules={[Pagination, A11y]}
        slidesPerView={2}
        pagination={{clickable: true, el: '.card-nav'}}
        breakpoints={{
          768: {slidesPerView: 3,centeredSlides: true,spaceBetween: 20},
          1024: {slidesPerView: 3,centeredSlides: true,spaceBetween: 20},
        }}
        spaceBetween={10}
        autoplay={{delay: 2_500}}
        loop
        lazy
      >
        {props.card.map((v) => (
          <SwiperSlide key={v.id}>
            <Card data={v} />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="card-nav"></div>
    </>
  );
}



export default CardList;
