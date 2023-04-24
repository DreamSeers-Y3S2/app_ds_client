import { useHistory, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import { listCustomerOrders } from "../../actions/orderManagementActions/orderAction";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import MainScreen from "../../components/MainScreen";

export default function CustomerOrderList() {
	const dispatch = useDispatch();
	const customer_Login = useSelector((state) => state.customer_Login);
	const { customerInfo } = customer_Login;

	const customerOrderList = useSelector((state) => state.customerOrderList);
	const { loading, customerOrders, error } = customerOrderList;

	const history = useHistory();
	useEffect(() => {
		dispatch(listCustomerOrders());
	}, [dispatch, history, customerInfo]);

	if (customerInfo) {
		return (
			<div
				style={{
					minHeight: 700,
					marginLeft: "20%",
					marginRight: "20%",
					marginBottom: "100px",
				}}
			>
				<br></br>
				<br></br>
				<br></br>
				<br></br>
				{error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
				{loading && <Loading />}
				<Table style={{ background: "white" }}>
					<>
						<tbody>
							{customerOrders?.reverse().map((order) => (
								<tr
									key={order._id}
									style={{
										boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
									}}
								>
									<td
										style={{
											fontSize: 20,
										}}
									>
										{order.orderID}
									</td>
									<td
										style={{
											fontSize: 20,
										}}
									>
										{order.products}
									</td>
									<td
										style={{
											fontSize: 20,
										}}
									>
										{order.total}
									</td>
									<td
										style={{
											fontSize: 20,
										}}
									>
										{order.status}
									</td>
									<td>
										<Link to="/delivery">
											<Button
												style={{
													fontSize: 15,
													backgroundColor: "red",
													borderRadius: 0,
													border: "3px solid white",
												}}
												disabled={order.status === "pending"}
											>
												Delivery
											</Button>
										</Link>
									</td>
								</tr>
							))}
						</tbody>
					</>
				</Table>

				<br></br>
			</div>
		);
	} else {
		return (
			<div className="denied">
				<MainScreen />
				<br></br>
			</div>
		);
	}
}
