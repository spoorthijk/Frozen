import React, { useState, useEffect, useContext } from "react";
import CommonSection from "../../Shared/CommonSection";
import {
  Col,
  Container,
  Row,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import "../../Styles/menu.css";
import DesertCard from "../../Shared/DesertCard";
import SearchBar from "../../Shared/SearchBar";
import NewsLetter from "../../Shared/NewsLetter";
// Import your dessert context (adjust the path as needed)
import { DesertContext } from "../../assets/data/desert";

const Menu = () => {
  const { deserts, error } = useContext(DesertContext);
  const [page, setPage] = useState(0);

  // State for the search bar values
  const [selectedFlavor, setSelectedFlavor] = useState("");
  const [selectedToppings, setSelectedToppings] = useState([]);
  const [selectedSize, setSelectedSize] = useState("");

  // State for filtered desserts (for modal display)
  const [filteredDeserts, setFilteredDeserts] = useState([]);
  const [orderSummary, setOrderSummary] = useState("");

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);

  // Callback to handle the search action from the SearchBar
  const handleSearch = (orderSummaryText) => {
    // Filter desserts based on search criteria.
    // Safe-check dessert.toppings by defaulting to an empty array if undefined.
    const results = deserts.filter((desert) => {
      const flavorMatch = desert.flavor === selectedFlavor;
      const sizeMatch = desert.size === selectedSize;
      const desertToppings = Array.isArray(desert.toppings) ? desert.toppings : [];
      const toppingsMatch = selectedToppings.every((topping) =>
        desertToppings.includes(topping)
      );
      return flavorMatch && sizeMatch && toppingsMatch;
    });

    setOrderSummary(orderSummaryText);
    setFilteredDeserts(results);
    setPage(0);
    setModalOpen(true);
  };

  // Optional: Reset search to show all desserts
  const resetSearch = () => {
    setSelectedFlavor("");
    setSelectedToppings([]);
    setSelectedSize("");
    setFilteredDeserts([]);
  };

  // Get paginated desserts from the filtered results if available,
  // otherwise fall back to all desserts.
  const itemsToDisplay =
    filteredDeserts.length > 0 ? filteredDeserts : deserts;

  const pageCount = itemsToDisplay ? Math.ceil(itemsToDisplay.length / 4) : 0;

  const paginatedDeserts =
    itemsToDisplay && itemsToDisplay.length > 0
      ? itemsToDisplay.slice(page * 4, page * 4 + 4)
      : [];

  return (
    <>
      <CommonSection title={"E-Icy Menu – Scoops of Happiness Await!"} />
      <section>
        <Container>
          <Row className="align-items-center">
            <SearchBar
              selectedFlavor={selectedFlavor}
              setSelectedFlavor={setSelectedFlavor}
              selectedToppings={selectedToppings}
              setSelectedToppings={setSelectedToppings}
              selectedSize={selectedSize}
              setSelectedSize={setSelectedSize}
              handleSearch={handleSearch}
            />
            <Button
              color="secondary"
              onClick={resetSearch}
              style={{ marginLeft: "20px" }}
            >
              Reset Search
            </Button>
          </Row>
        </Container>
      </section>

      <section className="pt-0">
        <Container>
          <Row className="justify-content-center">
            {error && <p style={{ color: "red" }}>{error}</p>}
            {paginatedDeserts.length > 0 ? (
              paginatedDeserts.map((desert) => (
                <Col lg="3" className="mb-5 d-flex" key={desert._id || desert.id}>
                  <DesertCard desert={desert} />
                </Col>
              ))
            ) : (
              <p>No desserts available.</p>
            )}
            <Col lg="12">
              <div className="pagination d-flex align-items-center justify-content-center mt-4 gap-3">
                {[...Array(pageCount).keys()].map((number) => (
                  <span
                    key={number}
                    onClick={() => setPage(number)}
                    className={page === number ? "active__page" : ""}
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

      {/* Modal for displaying search results (centered) */}
      <Modal isOpen={modalOpen} toggle={() => setModalOpen(!modalOpen)} centered>
        <ModalHeader toggle={() => setModalOpen(!modalOpen)}>
          Search Results
        </ModalHeader>
        <ModalBody>
          <p>{orderSummary}</p>
          {filteredDeserts.length > 0 ? (
            <ul>
              {filteredDeserts.map((desert) => (
                <li key={desert._id || desert.id}>
                  {desert.name} {/* adjust if your dessert object has a different naming property */}
                </li>
              ))}
            </ul>
          ) : (
            <p>No desserts match your search criteria.</p>
          )}
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={() => setModalOpen(false)}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default Menu;
