import React from "react";
import { shallow } from "enzyme";
import { Cities } from "./Cities";

describe("Cities component", () => {
  let wrapper;

  const citiesProps = {
    cities: {
      cities: [
        { _id: 1, name: "test city 1", country: "test country 1" },
        { _id: 2, name: "test city 2", country: "test country 2" },
        { _id: 3, name: "test city 3", country: "test country 3" }
      ]
    },
    auth: {
      isAuthenticated: false
    }
  };

  wrapper = shallow(<Cities {...citiesProps} />, {
    disableLifecycleMethods: true
  });

  it("should render list of cities", () => {
    const component = wrapper.find(".city-button");
    expect(component.length).toBe(3);
  });

  it("should update list of cities according to filter", () => {
    wrapper.setState({
      filteredCities: [
        { _id: 3, name: "test city 3", country: "test country 3" }
      ]
    });

    const component = wrapper.find(".city-button");
    expect(component.length).toBe(1);
  });

  /* Assertions
  it("should get list of cities from api")
  */
});
