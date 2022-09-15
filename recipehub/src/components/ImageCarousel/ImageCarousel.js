import React from 'react';
import PropTypes from 'prop-types';

import { Carousel } from 'react-responsive-carousel';


const ImageCarousel = (props) => {
  return(
    <div>
      <Carousel autoPlay infiniteLoop>
        {
          (props.images).map((image, index) => {
            return(
              <div>
                <img src={"data:image/jpeg;base64," + image.data}/>
              </div>
            )
          })
        }
      </Carousel>
    </div>
  )
  
}

ImageCarousel.propTypes = {};

ImageCarousel.defaultProps = {};

export default ImageCarousel;
