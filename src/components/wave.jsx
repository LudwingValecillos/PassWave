import React from 'react';
import Wavify from 'react-wavify'; // Asegúrate de importar correctamente

const Wave = (props) => (
  <Wavify 
    fill={props.fill}
    paused={false}
    style={{ display: 'flex' }}
    options={{
      height: 30,
      amplitude: 25,
      speed: 0.6, // Cambia este valor para aumentar la velocidad
      points: 3
    }}
  />
);

export default Wave;
