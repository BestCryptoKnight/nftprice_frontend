import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { animated, useTransition } from "@tim-soft/react-spring-web";
import ButtonControl from "./ButtonControl";

const ArrowButton = ({ position, onClick, disabled }) => {
  const transitions = useTransition(!disabled, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 }
  });

  return transitions.map(
    ({ item, key, props }) =>
      item && (
        <animated.div
          key={key}
          style={{
            ...props,
            zIndex: 999
          }}
        >
          <Button className='btnLright' position={position} type="button" onClick={onClick}>
            <i className="fa fa-chevron-right"></i>
          </Button>
        </animated.div>
      )
  );
};

ArrowButton.propTypes = {
  
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool
};

ArrowButton.defaultProps = {
  disabled: false
};

export default ArrowButton;

const Button = styled(ButtonControl)`
  position: absolute;
  right: 0;
`;
