import React, { useState } from 'react';
import './App.css';
import products from './api/data';
import filters from './api/filters';
import { Fieldset } from 'primereact/fieldset';
import { Card } from 'primereact/card';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';
import styled, { css } from 'styled-components';
import { Ripple } from 'primereact/ripple';
import defaultThumbnail from './assets/thumbnail.jpg'

function App() {

  const [selectedCategories, setSelectedCategories] = useState([])


  const Header = styled.div`
    height: 60px;
    box-shadow: 0 0 3px 0 rgba(0,0,0,0.2)
  `
  const FilterContainer = styled.div`
    margin: 30px;
    position: fixed;
  `

  const CheckboxLabel = styled.label`
    cursor: pointer;
  `
  const Thumbnail = styled.img`
    width: 100%;
  `

  const ProductTitle = styled.h2`
    color: #1f2d40;
    font-size: 21px;
  `

  const ProductID = styled.span`
    font-size: 12px;
    color: rgba(0,0,0,0.5);
  `
  const CardCategory = styled.span`
    color: #fff;
    background-color: #F48FB1;
    font-size: 16px;
    padding: 4px;
    border-radius: 4px;
    float: right;
  `

  const onCategoryChange = (e) => {
    const { value, checked } = e.target
    setSelectedCategories(prevState =>
      checked ? [...prevState, value] : prevState.filter(c => c !== value)
    )
  }

  const onClearFilters = (e) => {
    setSelectedCategories([])
  }

  const renderProducts = () => {
    const list = !selectedCategories.length ? [...products] : products.filter(p => selectedCategories.indexOf(p.CategoryId) !== -1)
    console.log(selectedCategories.length)
    return list.map(p =>
      <div className="p-col-12 p-md-4 p-ripple" key={p.ProductID}>
        <Card>
          <Thumbnail src={defaultThumbnail} />
          <ProductTitle>{p.ProductName} <ProductID>Product ID: {p.ProductID}</ProductID>
          </ProductTitle>
          <CardCategory>{p.CategoryName}</CardCategory>

        </Card>
      </div>
    )
  }

  return (
    <article className="main">
      <div className="p-grid">
        <div className="p-col">
          <Header />
        </div>
      </div>
      <div className="p-grid">
        <div className="p-col-12 p-md-2">
          <FilterContainer>
            {
              filters.categories.map(f => {
                const { id, label } = f
                return <div className="p-field-checkbox p-ripple" key={id}>
                  <Checkbox inputId={id} value={id} onChange={onCategoryChange} checked={selectedCategories.indexOf(id) !== -1} />
                  <CheckboxLabel className="p-ripple" htmlFor={id}>{label}</CheckboxLabel>
                </div>
              })
            }
            {selectedCategories && selectedCategories.length
              && <Button icon="pi pi-times" className="p-ripple" label="Clear Filters" onClick={onClearFilters} /> || null}
          </FilterContainer>
        </div>
        <div className="p-col-12 p-md-10">
          <Fieldset legend="Products List">
            <div className="p-grid">{renderProducts()}</div>
          </Fieldset>
        </div>
      </div>
    </article>
  );
}

export default App;
