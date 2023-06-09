import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../../../components/Loading";
import ErrorMessage from "../../../../components/ErrorMessage";
import { vendorUpdateProfileById } from "../../../../actions/userManagementActions/vendorActions";
import axios from "axios";
import MainScreen from "../../../../components/MainScreen";
import { authHeader } from "../../../../actions/userManagementActions/adminActions";
import { API_ENDPOINT } from "../../../../config";
import "./adminUserEdit.css";

const VendorEditByAdminScreen = ({ match }) => {
	const [name, setName] = useState("");
	const [telephone, setTelephone] = useState("");
	const [homeAddress, setHomeAddress] = useState("");
	const [email, setEmail] = useState("");
	const [pic, setPic] = useState("");
	const [password, setPassword] = useState("");
	const [businessName, setBusinessName] = useState("");
	const [businessAddress, setBusinessAddress] = useState("");
	const [website, setWebsite] = useState("");
	const [businessRegNumber, setBusinessRegNumber] = useState("");
	const [description, setDescription] = useState("");
	const [confirmpassword, setConfirmPassword] = useState("");
	const [message, setMessage] = useState(null);
	const [picMessage, setPicMessage] = useState(null);

	const [regDate, setRegDate] = useState("");

	const dispatch = useDispatch();

	const admin_Login = useSelector((state) => state.admin_Login);
	const { adminInfo } = admin_Login;

	const vendorUpdateById = useSelector((state) => state.vendorUpdateById);
	const { loading, error } = vendorUpdateById;

	const postDetails = (pics) => {
		if (pics === "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg") {
			return setPicMessage("Please Select an Image");
		}
		setPicMessage(null);
		if (pics.type === "image/jpeg" || pics.type === "image/png" || pics.type === "image/jpg") {
			const data = new FormData();
			data.append("file", pics);
			data.append("upload_preset", "vendorProfile");
			data.append("cloud_name", "dfmnpw0yp");
			fetch("https://api.cloudinary.com/v1_1/dfmnpw0yp/image/upload", {
				method: "post",
				body: data,
			})
				.then((res) => res.json())
				.then((data) => {
					setPic(data.url.toString());
				})
				.catch((err) => {
					console.log(err);
				});
		} else {
			return setPicMessage("Please Select an Image");
		}
	};

	const submitHandler = async (e) => {
		e.preventDefault();

		if (password !== confirmpassword) {
			setMessage("Passwords do not match");
		} else {
			dispatch(
				vendorUpdateProfileById(
					match.params.id,
					name,
					telephone,
					homeAddress,
					email,
					password,
					businessName,
					businessAddress,
					website,
					businessRegNumber,
					description,
					pic,
					regDate
				)
			);
		}
	};

	useEffect(() => {
		if (adminInfo != null) {
			const fetching = async () => {
				const { data } = await axios.get(`${API_ENDPOINT}/user/admin/vendor/profile/view/${match.params.id}`, {
					headers: authHeader(),
				});
				setName(data.name);
				setTelephone(data.telephone);
				setHomeAddress(data.homeAddress);
				setEmail(data.email);
				setBusinessName(data.businessName);
				setBusinessAddress(data.businessAddress);
				setWebsite(data.website);
				setBusinessRegNumber(data.businessRegNumber);
				setDescription(data.description);
				setPic(data.pic);
				setRegDate(data.regDate);
			};

			fetching();
		}
	}, [match.params.id, adminInfo]);

	if (adminInfo) {
		return (
			<div className="adminVendorEditBg">
				<br></br>
				<MainScreen title="EDIT - CUSTOMER">
					<Button
						variant="success"
						style={{
							float: "left",
							marginTop: 5,
							fontSize: 15,
						}}
						href="/admin-vendors"
					>
						{" "}
						Back to vendors List
					</Button>
					<br></br>

					<br></br>
					<Card
						className="profileCont"
						style={{
							borderRadius: 45,
							borderWidth: 2.0,
							marginTop: 20,
							paddingInline: 10,
							paddingLeft: 25,
							paddingRight: 25,
							background: "rgba(231, 238, 238, 0.8)",
						}}
					>
						<div className="loginContainer">
							<br></br>
							<div>
								{error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
								{message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
								{loading && <Loading />}
							</div>
							<br></br>
							<Row className="vendorProfileContainer">
								<Col md={6}>
									<Form onSubmit={submitHandler}>
										<Form.Group controlId="vendorViewName">
											<Form.Label>Name</Form.Label>
											<Form.Control
												type="text"
												value={name}
												onChange={(e) => setName(e.target.value)}
												required
											></Form.Control>
										</Form.Group>
										<br></br>
										<Form.Group controlId="vendorFormBasicTelephone">
											<Form.Label>Telephone</Form.Label>
											<Form.Control
												type="text"
												value={telephone}
												onChange={(e) => setTelephone(e.target.value)}
												required
											/>
										</Form.Group>
										<br></br>
										<Form.Group controlId="vendorFormBasicAddress">
											<Form.Label>Home Address</Form.Label>
											<Form.Control
												type="textArea"
												value={homeAddress}
												onChange={(e) => setHomeAddress(e.target.value)}
												required
											/>
										</Form.Group>
										<br></br>
										<Form.Group controlId="vendorFormBasicEmail">
											<Form.Label>Email</Form.Label>
											<Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
										</Form.Group>
										<br></br>
										<Form.Group controlId="formBasicPassword">
											<Form.Label>Password</Form.Label>
											<Form.Control
												type="password"
												value={password}
												placeholder="Password"
												onChange={(e) => setPassword(e.target.value)}
											/>
										</Form.Group>
										<br></br>
										<Form.Group controlId="confirmPassword">
											<Form.Label>Confirm Password</Form.Label>
											<Form.Control
												type="password"
												value={confirmpassword}
												placeholder="Confirm Password"
												onChange={(e) => setConfirmPassword(e.target.value)}
											/>
										</Form.Group>
										<br></br>
										<Form.Group controlId="vendorFormBasicBusinessName">
											<Form.Label>Business Name</Form.Label>
											<Form.Control
												type="text"
												value={businessName}
												placeholder="Enter Business Name"
												onChange={(e) => setBusinessName(e.target.value)}
												required
											/>
										</Form.Group>
										<br></br>
										<Form.Group controlId="vendorFormBasicBusinessAddress">
											<Form.Label>Business Address</Form.Label>
											<Form.Control
												type="textArea"
												value={businessAddress}
												placeholder="Enter Business Address"
												onChange={(e) => setBusinessAddress(e.target.value)}
												required
											/>
										</Form.Group>
										<br></br>
										<Form.Group controlId="vendorFormBasicWebsite">
											<Form.Label>Website</Form.Label>
											<Form.Control
												type="text"
												value={website}
												placeholder="Enter Website"
												onChange={(e) => setWebsite(e.target.value)}
												required
											/>
										</Form.Group>
										<br></br>
										<Form.Group controlId="vendorFormBasicBusinessRegNo">
											<Form.Label>Business Registration Number</Form.Label>
											<Form.Control
												type="text"
												value={businessRegNumber}
												placeholder="Enter Business Registration Number"
												onChange={(e) => setBusinessRegNumber(e.target.value)}
												required
											/>
										</Form.Group>
										<br></br>
										<Form.Group controlId="vendorFormBasicDescription">
											<Form.Label>Description</Form.Label>
											<textarea
												style={{
													width: "100%",
													fontSize: "16px",
													borderRadius: "5px",
												}}
												value={description}
												onChange={(e) => setDescription(e.target.value)}
												required
												rows={7}
											/>
										</Form.Group>
										<br></br>
										{picMessage && <ErrorMessage variant="danger">{picMessage}</ErrorMessage>}
										<Form.Group controlId="pic">
											<Form.Label>Profile Picture</Form.Label>
											&emsp;
											<input
												type="file"
												accept="image/*"
												id="vendor-pic"
												onChange={(e) => postDetails(e.target.files[0])}
											/>
										</Form.Group>
										<br></br>
										<Button
											variant="primary"
											type="submit"
											style={{
												fontSize: 15,
												marginTop: 10,
											}}
										>
											Update
										</Button>
										&emsp;
									</Form>
								</Col>
								<Col
									style={{
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
									}}
								>
									<img
										src={pic}
										alt={name}
										className="profilePic"
										style={{
											boxShadow: "7px 7px 20px ",
											borderColor: "black",
											borderRadius: 250,
											background: "white",
											width: "300px",
											height: "300px",
										}}
									/>
								</Col>
							</Row>
							<br></br>
						</div>
					</Card>
					<br></br>
				</MainScreen>
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
};

export default VendorEditByAdminScreen;
