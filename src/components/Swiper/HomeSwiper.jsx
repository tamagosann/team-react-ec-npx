import React, { useState } from 'react';
import Swiper from 'react-id-swiper'
import 'swiper/css/swiper.css';

const HomeSwiper = (props) => {
    const [params] = useState({
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true,
            dynamicBullets: true,
        },
        autoplay: {
            delay: 2500,
            disableOnInteraction: false
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        loop: true,
    });


    return (
        <Swiper {...params}>
            {props.images.map((image,index) => (
                    <div className="p-media__thumb" key={index}>
                        <img src={image} alt="商品画像"/>
                    </div>
                ))
            }
        </Swiper>
    )
}

export default HomeSwiper;