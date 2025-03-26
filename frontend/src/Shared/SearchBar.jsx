import React from "react";
import "./search-bar.css";
import { Col, Form, FormGroup, Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIceCream, faCookieBite, faMugHot, faSearch } from "@fortawesome/free-solid-svg-icons";

const flavors = ["Vanilla", "Chocolate", "Strawberry", "Mango", "Butterscotch"];
const toppings = ["Choco Chips", "Sprinkles", "Nuts", "Caramel", "Fudge"];
const sizes = ["Small", "Medium", "Large"];

const SearchBar = ({
  selectedFlavor,
  setSelectedFlavor,
  selectedToppings,
  setSelectedToppings,
  selectedSize,
  setSelectedSize,
  handleSearch,
}) => {
  const handleToppingChange = (topping) => {
    const newToppings = selectedToppings.includes(topping)
      ? selectedToppings.filter((t) => t !== topping)
      : [...selectedToppings, topping];
    setSelectedToppings(newToppings);
  };

  const searchHandler = () => {
    if (!selectedFlavor || selectedToppings.length === 0 || !selectedSize) {
      alert("Please select all options!");
      return;
    }
    const orderSummary = `Your Ice Cream Order: ${selectedFlavor} with ${selectedToppings.join(
      ", "
    )} in ${selectedSize} size.`;
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

          {/* Toppings Selection */}
          <FormGroup className="d-flex gap-3 form__group">
            <span>
              <FontAwesomeIcon icon={faCookieBite} />
            </span>
            <div>
              <h6>Toppings</h6>
              <div className="checkbox-group">
                {toppings.map((topping, index) => (
                  <label key={index} className="checkbox-label">
                    <input
                      type="checkbox"
                      value={topping}
                      checked={selectedToppings.includes(topping)}
                      onChange={() => handleToppingChange(topping)}
                    />
                    {topping}
                  </label>
                ))}
              </div>
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
