import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import { Feature, Loading, Preview, Search, Title } from './components';

const App = () => {
  const [searchResults, setSearchResults] = useState({ info: {}, records: [] });
  const [featuredResult, setFeaturedResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className='app'>
      <Title />
      <Search setIsLoading={setIsLoading} setSearchResults={setSearchResults} />
      <Preview
        setIsLoading={setIsLoading}
        searchResults={searchResults}
        setSearchResults={setSearchResults}
        setFeaturedResult={setFeaturedResult}
      />
      <Feature
        setIsLoading={setIsLoading}
        setSearchResults={setSearchResults}
        featuredResult={featuredResult}
      />
      {isLoading && <Loading />}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));
