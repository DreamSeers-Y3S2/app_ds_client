import React, { useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/Loading";
import { createDeliveryAction } from "../../actions/deliveryManagementActions/deliveriesAction";
import {authHeader} from "../../actions/userManagementActions/customerActions"
import ErrorMessage from "../../components/ErrorMessage";
import MainScreen from "../../components/MainScreen";
import axios from "axios";
import { API_ENDPOINT } from "../../config";

export default function DeliveriesCreate({ match, history }) {
	const [orderId, setOrderId] = useState("");
    const [deliveryServiceName, setDeliveryServiceName] = useState("");
     const [deliveryServiceEmail, setDeliveryServiceEmail] = useState("");
    const [deliveryServicePhone, setDeliveryServicePhone] = useState("");
     const [status, setStatus] = useState("");

	useEffect(() => {
		const fetching = async () => {
			const { data } = await axios.get(`${API_ENDPOINT}/orders/get-customer-orders/6446b7a83ba3bed9813b90ab`,{
				headers: authHeader()
			});
			setOrderId(data._id);
		};
		fetching();
	}, [match.params.id]);

	const dispatch = useDispatch();
	const customer_Login = useSelector((state) => state.customer_Login);
	const { customerInfo } = customer_Login;

	const deliveryCreate = useSelector((state) => state.deliveryCreate);
	const { loading, error } = deliveryCreate;

	
    const [customerName, setCustomerName] = useState(customerInfo.name);
    const [customerEmail, setCustomerEmail] = useState(customerInfo.email);
    const [customerPhone, setCustomerPhone] = useState(customerInfo.telephone);
  

	const resetHandler = () => {
		setCustomerName("");
		setCustomerEmail("");
		setCustomerPhone("");
		setDeliveryServiceName("");
        setDeliveryServicePhone("");
        setStatus("");
	};
	const submitHandler = (e) => {
		e.preventDefault();

		// const sendingData = { productId, email, reviewName, reviewTittle, reviewDescription, rating };
		// console.log(sendingData)

		dispatch(
			createDeliveryAction(
				orderId,
				customerName,
				customerEmail,
				customerPhone,
				deliveryServiceName,
				deliveryServicePhone,
				status
			)
		);

		resetHandler();
		// history.push("/");
	};

	if (customerInfo) {
		return (
			<div className="DeliveriesBackgroundCreate">
				<MainScreen title={"Enter Your Deliveries"}>
					<Button
						variant="success"
						style={{
							marginLeft: 10,
							marginBottom: 6,
							float: "left",
							fontSize: 15,
						}}
						size="lg"
						href={`/}`}
					>
						Back to the Deliveries List
					</Button>
					<br></br>
					<br></br>
					<br></br>
					<Card
						style={{
							margin: 50,
							marginLeft: "10%",
							marginRight: "0%",
							width: "80%",
							borderRadius: 45,
							borderWidth: 2.0,
							marginTop: 20,
							paddingInline: 10,
							background: "rgba(231, 238, 238, 0.9)",
						}}
					>
						<Card.Body>
							<br></br>

							<Form onSubmit={submitHandler}>
								{error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
								<Form.Group controlId="">
									<Form.Label>Order Id</Form.Label>
									<Form.Control
										style={{
											height: 40,
											fontSize: 18,
										}}
										type="orderId"
										value={orderId}
										readOnly
									/>

									<Form.Group controlId="Name">
										<Form.Label>Name</Form.Label>
										<Form.Control value={customerInfo.name} placeholder="Enter Your Name" readOnly />
									</Form.Group>
								</Form.Group>
								<Form.Group controlId="email">
									<Form.Label>Email</Form.Label>
									<Form.Control type="email" value={customerInfo.email} placeholder="Enter  Your Email" readOnly />
								</Form.Group>
								<Form.Group controlId="email">
									<Form.Label>Phone Number</Form.Label>
									<Form.Control
										type="email"
										value={customerInfo.telephone}
										placeholder="Enter  Your Phone Number"
										readOnly
									/>
								</Form.Group>

								<Form.Group controlId="deliveryServiceName">
									<Form.Label>Delivery Service Name</Form.Label>
									<Form.Control
										type="deliveryServiceName"
										value={deliveryServiceName}
										placeholder="Enter Your delivery Tittle "
										onChange={(e) => setDeliveryServiceName(e.target.value)}
										required
									/>
								</Form.Group>
								<Form.Group controlId="deliveryServiceEmail">
									<Form.Label> delivery Service delivery Email</Form.Label>
									<Form.Control
										type="Email"
										value={deliveryServiceEmail}
										placeholder="Enter the Description"
										onChange={(e) => setDeliveryServiceEmail(e.target.value)}
										required
									/>
								</Form.Group>
								<Form.Group controlId="deliveryServicePhone">
									<Form.Label> delivery Service Phone</Form.Label>
									<Form.Control
										type="deliveryServicePhone"
										value={deliveryServicePhone}
										placeholder="Enter the Description"
										onChange={(e) => setDeliveryServicePhone(e.target.value)}
										required
									/>
								</Form.Group>

								<div className="form-group">
									<label className="status">status</label>
									<select
										className="form-control"
										id="status"
										value={status}
										onChange={(e) => setStatus(e.target.value)}
										required
									>
										<option>Select Your Rating</option>
										<option value="Approve">Approve</option>
										<option value="Cancel">Cancel </option>
									</select>
								</div>
								<br></br>

								{loading && <Loading size={50} />}

								<Button type="submit" variant="success">
									Submit
								</Button>

								<Button className="mx-2" onClick={resetHandler} variant="danger">
									Reset
								</Button>
							</Form>
							<br></br>
						</Card.Body>
					</Card>
					<br></br>
					<br></br>
				</MainScreen>
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
