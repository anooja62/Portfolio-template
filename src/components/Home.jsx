import React, { useState, useEffect } from 'react';
import Typewriter from 'typewriter-effect';
import endpoints from '../constants/endpoints';
import Social from './Social';
import FallbackSpinner from './FallbackSpinner';

function Home() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(endpoints.home)
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => console.error(err));
  }, []);

  return data ? (
    <div className="flex flex-col items-center justify-center h-screen text-center animate-fadeIn">
      <h1 className="text-5xl font-bold">{data?.name}</h1>
      <div className="flex items-center text-2xl mt-2">
        <h2 className="mr-2">I'm</h2>
        <Typewriter
          options={{
            loop: true,
            autoStart: true,
            strings: data?.roles,
          }}
        />
      </div>
      <Social />
    </div>
  ) : (
    <FallbackSpinner />
  );
}

export default Home;
