import React, { useEffect, useState } from 'react';

import {
  fetchAllCenturies,
  fetchAllClassifications,
  fetchQueryResults,
} from '../api';

const Search = ({ setisLoading, setSearchResults }) => {
  const [centuryList, setCenturyList] = useState([]);
  const [classificationList, setClassificationList] = useState([]);
  const [queryString, setQueryString] = useState('');
  const [century, setCentury] = useState('any');
  const [classification, setClassification] = useState('any');

  useEffect(() => {
    try {
      const centuriesPromise = fetchAllCenturies();
      const classificationsPromise = fetchAllClassifications();

      Promise.all([centuriesPromise, classificationsPromise]).then(
        ([centuries, classifications]) => {
          setCenturyList(centuries);
          setClassificationList(classifications);
        }
      );
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <form
      id='search'
      onSubmit={async (event) => {
        event.preventDefault();
        setisLoading = true;

        try {
          const results = await fetchQueryResults({
            century,
            classification,
            queryString,
          });
          setSearchResults(results);
        } catch (error) {
          console.error(error);
        } finally {
          setisLoading = false;
        }
      }}
    >
      <fieldset>
        <label htmlFor='keywords'>Query</label>
        <input
          id='keywords'
          type='text'
          placeholder='enter keywords...'
          value={queryString}
          onChange={(event) => setQueryString(event.target.value)}
        />
      </fieldset>

      <fieldset>
        <label htmlFor='select-classification'>
          Classification{' '}
          <span className='classification-count'>
            ({classificationList.length})
          </span>
        </label>
        <select
          name='classification'
          id='select-classification'
          value={classification}
          onChange={(event) => setClassification(event.target.value)}
        >
          <option value='any'>Any</option>
          {classificationList.map((classification) => {
            return (
              <option value={classification.name} key={classification.name}>
                {classification.name}
              </option>
            );
          })}
        </select>
      </fieldset>

      <fieldset>
        <label htmlFor='select-century'>
          Century <span className='century-count'>({centuryList.length})</span>
        </label>
        <select
          name='century'
          id='select-century'
          value={century}
          onChange={(event) => setCentury(event.target.value)}
        >
          <option value='any'>Any</option>
          {centuryList.map((century) => {
            return (
              <option value={century.name} key={century.name}>
                {century.name}
              </option>
            );
          })}
        </select>
      </fieldset>
      <button>SEARCH</button>
    </form>
  );
};

export default Search;
