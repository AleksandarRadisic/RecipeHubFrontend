import React from 'react';
import PropTypes from 'prop-types';

import { Carousel } from 'react-responsive-carousel';


const ImageCarousel = (props) => {
  return (
    <>
      {props.images.length > 0 &&
        <div style={{ width: "50%", height: "500px", margin: "auto"}}>
          <Carousel autoPlay infiniteLoop>
            {
              (props.images).map((image, index) => {
                return (
                  <div>
                    <img src={"data:image/jpeg;base64," + image.data} />
                  </div>
                )
              })
            }
          </Carousel>
        </div>
      }
      {props.images.length === 0 &&
        <h2>No images</h2>
      }
    </>

  )

}

ImageCarousel.propTypes = {};

ImageCarousel.defaultProps = {};

export default ImageCarousel;
