import React, { PropTypes } from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import { changeCartCount, deleteCartItem } from '../modules/cart'

class Cart extends React.Component {

	static propTypes = {
		dispatch: PropTypes.func.isRequired,
		cart: PropTypes.array
	}

	onChange = (event) => {
		const newValue = event.target.value
		const productId = event.target.dataset.id
		console.log(this.isNumeric(newValue))
		if (this.isNumeric(newValue) && newValue > 0) {
			this.props.dispatch(changeCartCount(newValue, productId))
		}
	}

	isNumeric = (n) => {
		return !isNaN(parseFloat(n)) && isFinite(n)
	}

	deleteToCart = (event) => {
		const productId = event.target.dataset.id
		this.props.dispatch(deleteCartItem(productId))
	}

	render() {
		const { cart } = this.props
		let cartDiv = null
		let totalPrice = 0
		const _this = this
		if (cart && cart.length) {
			cartDiv = _.map(cart, function(item, key) {
				totalPrice += item.price * item.count
				return (
					<tr key={key}>
						<td scope="row">
							<b>{key + 1}</b>
						</td>
						<td>
							<img src={`/static/img/${item.img}`} alt={item.name} />
						</td>
						<td>{item.name}</td>
						<td>{item.price + '$'}</td>
						<td>
							<input
								type="text"
								name="count"
								className="form-control"
								data-id={item.id}
								value={item.count}
								onChange={::_this.onChange}
							/>
						</td>
						<td>
							<button
								className="btn btn-primary"
								data-id={item.id}
								onClick={::_this.deleteToCart}>
								Delete
							</button>
						</td>
					</tr>
				)
			})
			return (
				<div className="container-cart">
					<div className="row">
						<div className="col-sm-12 col-md-12">
							<h3 className="text-center">Your order</h3>
							<table className="table table-striped table-cart">
								<thead>
									<tr>
										<th>#</th>
										<th>Image</th>
										<th>Name</th>
										<th>Price for one</th>
										<th>Count</th>
										<th></th>
									</tr>
								</thead>
								<tbody>
									{cartDiv}
									<tr>
										<td colSpan="6" className="text-right">
											<h3>Total price: {totalPrice}$</h3>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			)
		}
		return (
			<div className="container">
				<div className="row">
					<div className="col-sm-12 col-md-12">
						<h3 className="text-center">Sorry, your cart is empty</h3>
					</div>
				</div>
			</div>
		)
	}
}

const selector = createSelector(
	( state ) => state.cart,
	( cart ) => {
		return { cart }
	}
)
const mapStateToProps = ( state ) => ({ ...selector(state) })
export default connect(mapStateToProps)(Cart)
