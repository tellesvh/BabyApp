import React from 'react';
import Svg, { Path } from 'react-native-svg';

const CheckSvg = props => (
  <Svg
    viewBox="0 0 45.701 45.7"
    width={props.size}
    height={props.size}
    fill={props.color}
    {...props}>
    <Path d="M20.687 38.332a5.308 5.308 0 01-7.505 0L1.554 26.704A5.306 5.306 0 119.059 19.2l6.928 6.927a1.344 1.344 0 001.896 0L36.642 7.368a5.308 5.308 0 017.505 7.504l-23.46 23.46z" />
  </Svg>
);

export default CheckSvg;
