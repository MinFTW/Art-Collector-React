import React from 'react';
import { fetchQueryResultsFromURL } from '../api';

const Preview = ({
  setSearchResults,
  setFeaturedResult,
  setIsLoading,
  searchResults: { info, records },
}) => {
  async function fetchPage(pageUrl) {
    setIsLoading(true);

    try {
      const results = await fetchQueryResultsFromURL(pageUrl);
      setSearchResults(results);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <aside id='preview'>
      <header className='pagination'>
        <button
          className='previous'
          disabled={info.prev ? false : true}
          onClick={() => fetchPage(info.prev)}
        >
          Previous
        </button>

        <button
          className='next'
          disabled={info.next ? false : true}
          onClick={() => fetchPage(info.next)}
        >
          Next
        </button>
      </header>

      <section className='results'>
        {records.map((record, index) => {
          return (
            <div
              className='object-preview'
              key={index}
              onClick={(event) => {
                event.preventDefault();
                setFeaturedResult(record);
              }}
            >
              {record.primaryimageurl && (
                <img
                  src={record.primaryimageurl}
                  alt={record.description}
                  loading='lazy'
                />
              )}
              {record.title ? <h3>{record.title}</h3> : <h3>MISSING INFO</h3>}
            </div>
          );
        })}
      </section>
    </aside>
  );
};

export default Preview;
