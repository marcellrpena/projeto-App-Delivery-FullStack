import PropTypes, { string, number } from 'prop-types';
import { useState, useEffect } from 'react';

const HOST = process.env.REACT_APP_API_HOST || 'localhost';
const PROTOCOL = process.env.REACT_APP_API_PROTOCOL || 'https';

export default function ProductCard({
  id,
  name,
  image,
  price,
  handleCard,
  setIsActive,
}) {
  const [quantity, setQuantity] = useState(0);

  const updateLocalStorage = (newQuantity) => {
    const arrCart = JSON.parse(localStorage.getItem('carrinho'));
    const arrCartPrepared = arrCart.filter((item) => item.id !== id);
    const newItem = {
      id,
      name,
      quantity: newQuantity,
      unitPrice: price,
      subTotal: parseFloat(price.replace(',', '.')) * newQuantity,
    };
    localStorage.setItem(
      'carrinho',
      JSON.stringify([...arrCartPrepared, newItem]),
    );
  };

  const increaseQuantity = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    updateLocalStorage(newQuantity);
    setIsActive(false);
    handleCard(JSON.parse(localStorage.getItem('carrinho')));
  };

  const decreaseQuantity = () => {
    const newQuantity = quantity - 1;
    if (newQuantity < 0) return setQuantity(0);
    setQuantity(newQuantity);
    updateLocalStorage(newQuantity);

    handleCard(JSON.parse(localStorage.getItem('carrinho')));
  };

  const inputQuantity = ({ value }) => {
    if (value < 0) return setQuantity(0);
    setQuantity(value);
    updateLocalStorage(value);

    handleCard(JSON.parse(localStorage.getItem('carrinho')));
  };

  useEffect(() => {
    localStorage.setItem('carrinho', JSON.stringify([]));
  }, []);

  return (

    <div className="div-card-product card align-items-center p-3">
      <div className="bg-image hover-overlay hover-zoom hover-shadow ripple">
        <img
          className="card-img-top"
          data-testid={ `customer_products__img-card-bg-image-${id}` }
          src={ `${PROTOCOL}://${HOST}${image}` }
          alt=""
        />
      </div>

      <div className="card-body">
        <h5
          className="card-title text-center"
          data-testid={ `customer_products__element-card-title-${id}` }
        >
          {name}
        </h5>

        <p
          className="card-text text-center"
          data-testid={ `customer_products__element-card-price-${id}` }
        >
          {`R$ ${price}`}
        </p>

        <div className="input-group mb-3">
          <button
            className="btn btn-outline-secondary"
            type="button"
            data-testid={ `customer_products__button-card-rm-item-${id}` }
            title="remove"
            onClick={ () => decreaseQuantity() }
          >
            -
          </button>

          <input
            className="form-control text-center"
            type="text"
            data-testid={ `customer_products__input-card-quantity-${id}` }
            value={ quantity }
            title="inputQuantity"
            onChange={ (e) => inputQuantity(e.target) }
          />

          <button
            className="btn btn-outline-secondary"
            type="button"
            data-testid={ `customer_products__button-card-add-item-${id}` }
            title="add"
            onClick={ () => increaseQuantity() }
          >
            +
          </button>

        </div>

      </div>
    </div>

  );
}

ProductCard.propTypes = {
  id: number.isRequired,
  name: string.isRequired,
  image: string.isRequired,
  price: string.isRequired,
  handleCard: PropTypes.func.isRequired,
  setIsActive: PropTypes.func.isRequired,
};
