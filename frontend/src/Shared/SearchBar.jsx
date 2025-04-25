import React from "react";
import "./search-bar.css";
import { Col, Form, FormGroup, Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIceCream, faMugHot, faSearch } from "@fortawesome/free-solid-svg-icons";

const flavors = ["Vanilla", "Chocolate", "Strawberry", "Mango", "Butterscotch"];
const sizes = ["Small", "Medium", "Large"];

const SearchBar = ({
  selectedFlavor,
  setSelectedFlavor,
  selectedSize,
  setSelectedSize,
  handleSearch,
}) => {
  const searchHandler = () => {
    if (!selectedFlavor || !selectedSize) {
      alert("Please select both flavor and size!");
      return;
    }
    const orderSummary = `Your Ice Cream Order: ${selectedFlavor} in ${selectedSize} size.`;
    handleSearch(orderSummary);
  };

  return (
    <Col lg="12">
      <div className="search__bar">
        <Form className="form-div d-flex align-items-center gap-4 flex-wrap">
          {/* Flavor Selection */}
          <FormGroup className="d-flex gap-3 form__group">
            <span>
              <FontAwesomeIcon icon={faIceCream} />
            </span>
            <div>
              <h6>Flavor</h6>
              <select
                value={selectedFlavor}
                onChange={(e) => setSelectedFlavor(e.target.value)}
              >
                <option value="">Select Flavor</option>
                {flavors.map((flavor, index) => (
                  <option key={index} value={flavor}>
                    {flavor}
                  </option>
                ))}
              </select>
            </div>
          </FormGroup>

          {/* Size Selection */}
          <FormGroup className="d-flex gap-3 form__group">
            <span>
              <FontAwesomeIcon icon={faMugHot} />
            </span>
            <div>
              <h6>Size</h6>
              <div className="radio-group">
                {sizes.map((size, index) => (
                  <label key={index} className="radio-label">
                    <input
                      type="radio"
                      name="size"
                      value={size}
                      checked={selectedSize === size}
                      onChange={(e) => setSelectedSize(e.target.value)}
                    />
                    {size}
                  </label>
                ))}
              </div>
            </div>
          </FormGroup>

          {/* Search Button */}
          <Button className="search__icon" type="button" onClick={searchHandler}>
            <FontAwesomeIcon icon={faSearch} />
          </Button>
        </Form>
      </div>
    </Col>
  );
};

export default SearchBar;