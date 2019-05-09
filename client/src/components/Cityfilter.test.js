import React from "react";
import { mount } from "enzyme";
import Cityfilter from "./Cityfilter";

/* // Assertions

it('state should be updated with input value');
it('input change should call method updateFilter through onChange');
it('updateFilter should call prop method filterCities with parameter')
it('city list should be updated according to value cityFilter');
it('city list should display only cities that start with the letters entered in the input field'); */

describe("Cityfilter component", () => {
  let wrapper;
  let onChange;
  let input;
  beforeEach(() => {
    onChange = jest.fn();
    wrapper = mount(<Cityfilter onChange={onChange} />);
    input = wrapper.find("input");
  });

  it("state should be updated with input value", () => {
    input.simulate("change", { target: { value: "Barcelona" } });
    expect(wrapper.state("cityFilter")).toBe("Barcelona");
  });

  it("input change should call method updateFilter through onChange", () => {
    input.simulate("change", { target: { value: "Barcelona" } });
    expect(onChange).toHaveBeenCalled();
  });
});
