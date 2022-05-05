import React, { Fragment } from 'react';
import { fetchQueryResultsFromTermAndValue } from '../api';


const Searchable = ({ searchTerm, searchValue, setIsLoading, setSearchResults }) => {
  return (
    <span className='content'>
      <a href='# '
        onClick={async (event) => {
          event.preventDefault();
          setIsLoading(true);

          try {
            const result = await fetchQueryResultsFromTermAndValue(
              searchTerm,
              searchValue
            );
            setSearchResults(result);
          } catch (error) {
            console.error(error);
          } finally {
            setIsLoading(false);
          }
        }}
      >
        {searchValue}
      </a>
    </span>
  );
};


const Feature = ( { featuredResult, setIsLoading, setSearchResults } ) => {

  const renderFacts = () => {
    const { title, dated, style, dimensions, department, division, contact, creditline } = featuredResult;
    const facts = [style, dimensions, department, division, contact, creditline];
    const factNames = [`Style`, `Dimensions`, `Department`, `Division`, `Contact`, `Creditline`];

    return (
      <main id='feature'>
        <div className='object-feature'>
          <header>
            <h3>{title}</h3>
            <h4>{dated}</h4>
          </header>

          <section className='facts'>
            {renderDescription()}
            {renderSearchableFacts()}
            {
              facts.map((fact, index) => {
                return fact && 
                <Fragment key={index}>
                  <span className='title'>{`${factNames[index]}:`}</span>
                  <span className='content'>{fact}</span>
                </Fragment>
              })
            }
          </section>

          <section className='photos'>
          {renderImages()}
          </section>

        </div>
      </main>
    );
  };


  const renderDescription = () => {
    const { description } = featuredResult;

    return (
       description &&
        <>
          <span className='title'>{`Description:`}</span>
          <span className='content'>{description}</span>
        </>   
    )
  }


  const renderSearchableFacts = () => {
    const { culture, technique, medium, people } = featuredResult;
    const facts = [culture, technique, medium];
    const factNames = [`Culture`, `Technique`, `Medium`];
    
    return (
      <Fragment>
        {
        facts.map((fact, index) => {
          return fact &&
            <Fragment key={index}>
              <span className='title'>{`${factNames[index]}:`}</span>
              <Searchable 
                searchTerm={`${factNames[index]}`.toLowerCase()} 
                searchValue={`${factNames[index]}` === `Medium` ? fact.toLowerCase() : fact } 
                setIsLoading={setIsLoading} setSearchResults={setSearchResults} />
            </Fragment>
          })
        }
        {
        people && people.map((person, index) => {
          return (
            <Fragment key={index}>
              <span className='title'>{people && `Person:`}</span>
              <Searchable 
                searchTerm='person' 
                searchValue={person.displayname} 
                setIsLoading={setIsLoading} 
                setSearchResults={setSearchResults} />
            </Fragment>
          )
        })
        }
      </Fragment>
    )
  }


  const renderImages = () => {
    const { images } = featuredResult;
   
      return images && (
        <>
          {images.map((image, index) => {return <img src={image.baseimageurl} alt={image.alttext} key={index}/> })}
        </>
      )  
  }

  return <>{featuredResult && renderFacts()}</>;
};

export default Feature;