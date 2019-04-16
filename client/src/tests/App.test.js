import React from 'react';
import { shallow } from 'enzyme';
import App from '../App';




describe('App renders', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.length).toEqual(1);
  });
});