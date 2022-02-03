import React from 'react';
import ReactDom from "react-dom";
import { BrowserRouter} from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";
import { render, cleanup } from '@testing-library/react';
import renderer from 'react-test-renderer';
import Home from "../home";


afterEach(cleanup);

it('reders without crashing', () => {
    const div = document.createElement('div');
    ReactDom.render<any, any>(<BrowserRouter>
    <Home></Home>
    </BrowserRouter>, div)
})

it('checks if table exists', () => {
    const HomePage = render(<BrowserRouter><Home></Home></BrowserRouter>);
    const empTable = HomePage.container.querySelector('#employee-table');
    expect(empTable).toBeTruthy();
    expect(empTable).toBeDefined();
})

it(' Home Page matches snapshot', () => {
    const tree = renderer.create(<BrowserRouter><Home></Home></BrowserRouter>).toJSON();
    expect(tree).toMatchSnapshot();
})







