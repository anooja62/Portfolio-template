import React, { useEffect, useState, useContext } from 'react';
import { SocialIcon } from 'react-social-icons';
import { ThemeContext } from 'styled-components';
import endpoints from '../constants/endpoints';

function Social() {
  const theme = useContext(ThemeContext);
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(endpoints.social)
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="flex flex-wrap justify-center gap-4 mt-4">
      {data &&
        data.social.map((social) => (
          <SocialIcon
            key={social.network}
            url={social.href}
            network={social.network}
            bgColor={theme.socialIconBgColor}
            target="_blank"
            rel="noopener noreferrer"
          />
        ))}
    </div>
  );
}

export default Social;
