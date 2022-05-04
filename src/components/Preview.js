import React from 'react';

/**
 * We need to import fetchQueryResultsFromURL since we will sometimes have urls in info.prev and info.next
 * which are query urls.
 */
import { fetchQueryResultsFromURL } from '../api';

const Preview = ({ setSearchResults, setFeaturedResult, setIsLoading, searchResults: { info, records }}) => {
  /**
   * Don't touch this function, it's good to go.
   *
   * It has to be defined inside the Preview component to have access to setIsLoading, setSearchResults, etc...
   */
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
          disabled={info.prev ? false : true}
          className='previous'
          onClick={() => fetchPage(info.prev)}
        >
          Previous
        </button>

        <button
          disabled={info.next ? false : true}
          className='next'
          onClick={() => fetchPage(info.next)}
        >
          Next
        </button>
      </header>

      <section className='results'>
        {records.map((record, index) => {
          return (
            <div
              key={index}
              className='object-preview'
              onClick={(event) => {
                event.preventDefault();
                setFeaturedResult(record);
              }}
            >
              {record.primaryimageurl && (
                <img src={record.primaryimageurl} alt={record.description} />
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
