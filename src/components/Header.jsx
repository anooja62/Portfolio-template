import React from 'react';
import PropTypes from 'prop-types';

function Header({ title }) {
  return (
    <div className="text-3xl font-bold text-center py-4 bg-blue-500 text-white rounded-md shadow-md">
      {title}
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
