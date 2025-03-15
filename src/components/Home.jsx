import React, { useState, useEffect } from 'react';
import { Typewriter } from 'react-simple-typewriter';
import endpoints from '../constants/endpoints';
import Social from './Social';
import FallbackSpinner from './FallbackSpinner';

function Home() {
  console.log("inside home")
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
        <span className="text-blue-500 font-semibold">
          <Typewriter
            words={data?.roles}
            loop={0} // Infinite loop
            cursor
            cursorStyle="|"
            typeSpeed={50}
            deleteSpeed={30}
            delaySpeed={1500}
          />
        </span>
      </div>
      <Social />
    </div>
  ) : (
    <FallbackSpinner />
  );
}

export default Home;
