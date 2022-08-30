import React, { Fragment } from 'react';
import { fetchQueryResultsFromTermAndValue } from '../api';

const Feature = ({ featuredResult, setIsLoading, setSearchResults }) => {
  const renderFacts = () => {
    const { title, dated } = featuredResult;

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
            {renderRegularFacts()}
          </section>

          <section className='photos'>{renderImages()}</section>
        </div>
      </main>
    );
  };

  const renderDescription = () => {
    const { description } = featuredResult;

    return (
      description && (
        <>
          <span className='title'>{`Description:`}</span>
          <span className='content'>{description}</span>
        </>
      )
    );
  };

  const renderSearchableFacts = () => {
    const { culture, technique, medium } = featuredResult;
    const facts = [culture, technique, medium];
    const factNames = [`Culture`, `Technique`, `Medium`];

    return (
      <Fragment>
        {facts.map((fact, index) => {
          return (
            fact && (
              <Fragment key={index}>
                <span className='title'>{`${factNames[index]}:`}</span>
                <Searchable
                  searchTerm={`${factNames[index]}`.toLowerCase()}
                  searchValue={
                    `${factNames[index]}` === `Medium`
                      ? fact.toLowerCase()
                      : fact
                  }
                  setIsLoading={setIsLoading}
                  setSearchResults={setSearchResults}
                />
              </Fragment>
            )
          );
        })}

        {renderPeople()}
      </Fragment>
    );
  };

  const renderRegularFacts = () => {
    const { style, dimensions, department, division, contact, creditline } =
      featuredResult;
    const facts = [
      style,
      dimensions,
      department,
      division,
      contact,
      creditline,
    ];
    const factNames = [
      `Style`,
      `Dimensions`,
      `Department`,
      `Division`,
      `Contact`,
      `Creditline`,
    ];

    return facts.map((fact, index) => {
      return (
        fact && (
          <Fragment key={index}>
            <span className='title'>{`${factNames[index]}:`}</span>
            <span className='content'>{fact}</span>
          </Fragment>
        )
      );
    });
  };

  const renderPeople = () => {
    const { people } = featuredResult;

    return (
      people &&
      people.map((person, index) => {
        return (
          <Fragment key={index}>
            <span className='title'>{people && `Person:`}</span>
            <Searchable
              searchTerm='person'
              searchValue={person.displayname}
              setIsLoading={setIsLoading}
              setSearchResults={setSearchResults}
            />
          </Fragment>
        );
      })
    );
  };

  const renderImages = () => {
    const { images } = featuredResult;

    return (
      images && (
        <>
          {images.map((image, index) => {
            return (
              <img
                src={image.baseimageurl}
                alt={image.alttext}
                key={index}
                loading='lazy'
              />
            );
          })}
        </>
      )
    );
  };

  return <>{featuredResult && renderFacts()}</>;
};

const Searchable = ({
  searchTerm,
  searchValue,
  setIsLoading,
  setSearchResults,
}) => {
  return (
    <span className='content'>
      <a
        href='# '
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

export default Feature;
