import React, { useState, useEffect, useContext } from 'react';
import CommonSection from '../../Shared/CommonSection';
import { Col, Container, Row } from 'reactstrap';
import '../../Styles/menu.css';
import DesertCard from '../../Shared/DesertCard';
import SearchBar from '../../Shared/SearchBar';
import NewsLetter from '../../Shared/NewsLetter';
// Import your desert context (adjust the path as needed)
import { DesertContext } from '../../assets/data/desert';

const Menu = () => {
  const { deserts, error } = useContext(DesertContext);
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);

  
  // Assume 4 items per page; update pagination based on dynamic data
  useEffect(() => {
    if (deserts && deserts.length > 0) {
      const pages = Math.ceil(deserts.length / 4);
      setPageCount(pages);
    }
  }, [deserts]);
  
  console.log(deserts)
  // Get only the items for the current page
  const paginatedDeserts =
    deserts && deserts.length > 0
      ? deserts.slice(page * 4, page * 4 + 4)
      : [];

  return (
    <>
      <CommonSection title={'E-Icy Menu – Scoops of Happiness Await! '} />
      <section>
        <Container>
          <Row>
            <SearchBar />
          </Row>
        </Container>
      </section>

      <section className="pt-0">
        <Container>
          <Row className="justify-content-center">
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {paginatedDeserts?.map((desert) => (
              <Col lg="3" className="mb-5 d-flex" key={desert._id || desert.id}>
                <DesertCard desert={desert} />
              </Col>
            ))}
            <Col lg="12">
              <div className="pagination d-flex align-items-center justify-content-center mt-4 gap-3">
                {[...Array(pageCount).keys()].map((number) => (
                  <span
                    key={number}
                    onClick={() => setPage(number)}
                    className={page === number ? 'active__page' : ''}
                  >
                    {number + 1}
                  </span>
                ))}
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <NewsLetter />
    </>
  );
};

export default Menu;
