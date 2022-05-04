import React, { Fragment } from 'react';
import { fetchQueryResultsFromTermAndValue } from '../api';


const Searchable = ({ searchTerm, searchValue, setIsLoading, setSearchResults }) => {
  return (
    <span className='content'>
      <a href='#'
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


const Feature = ( props ) => {

  const renderFacts = () => {
    const { title, dated, description, dimensions, department, division, contact, creditline } = props.featuredResult;
    const facts = [dimensions, department, division, contact, creditline];
    const factNames = [`Dimensions`, `Department`, `Division`, `Contact`, `Creditline`];

    return (
      <main id='feature'>
        <div className='object-feature'>
          
          <header>
            <h3>{title}</h3>
            <h4>{dated}</h4>
          </header>

          <section className='facts'>
            { description &&
              <Fragment>
                <span className='title'>{description && `Description:`}</span>
                <span className='content'>{description}</span>
              </Fragment>
            }
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
          {renderImages()}
        </div>
      </main>
    );
  };


  const renderSearchableFacts = () => {
    const { culture, technique, medium, people } = props.featuredResult;
    const { setIsLoading, setSearchResults } = props;

    return (
      <Fragment>
        { culture &&
          <>
            <span className='title'>{culture && `Culture:`}</span>
            <Searchable searchTerm='culture' searchValue={culture} setIsLoading={setIsLoading} setSearchResults={setSearchResults} />
          </>
        }
        { technique &&
          <>
            <span className='title'>{technique && `Technique:`}</span>
            <Searchable searchTerm='technique' searchValue={technique} setIsLoading={setIsLoading} setSearchResults={setSearchResults} /> 
          </>
        }
        { medium &&
          <>
            <span className='title'>{medium && `Medium:`}</span>
            <Searchable searchTerm='medium' searchValue={medium} setIsLoading={setIsLoading} setSearchResults={setSearchResults} /> 
          </>
        }
         
        <Fragment>
          {
            people && people.map((person, index) => {
              return (
                <Fragment key={index}>
                  <span className='title'>{people && `Person:`}</span>
                  <Searchable searchTerm='person' searchValue={person.displayname} setIsLoading={setIsLoading} setSearchResults={setSearchResults} />
                </Fragment>
              )
            })
          }
        </Fragment>
      </Fragment>
    )
  }


  const renderImages = () => {
    const { images } = props.featuredResult;

    if (images) {
      return (
        <section className='photos'>
          {images.map((image, index) => {return <img src={image.baseimageurl} alt={image.alttext} key={index}/> })}
        </section>
      )  
    }
  }

  return <>{props.featuredResult && renderFacts()}</>;
};

export default Feature;