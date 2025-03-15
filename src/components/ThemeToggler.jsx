import React, { useContext } from 'react';
import DarkModeToggle from 'react-dark-mode-toggle';
import PropTypes from 'prop-types';
import AppContext from '../AppContext';

function ThemeToggler({ onClick }) {
  const { darkMode } = useContext(AppContext);

  const handleOnChange = () => {
    darkMode.toggle();
    onClick();
  };

  return (
    <div className="mb-2 flex justify-center">
      <DarkModeToggle
        onChange={handleOnChange}
        checked={darkMode.value}
        size={50}
      />
    </div>
  );
}

ThemeToggler.propTypes = {
  onClick: PropTypes.func,
};
ThemeToggler.defaultProps = {
  onClick: () => {},
};

export default ThemeToggler;
