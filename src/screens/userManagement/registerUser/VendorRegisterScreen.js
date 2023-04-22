import { useState } from "react";
import { Form, Button, Row, Col, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../../components/Loading";
import ErrorMessage from "../../../components/ErrorMessage";
import { vendorRegister } from "../../../actions/userManagementActions/vendorActions";
import MainScreen from "../../../components/MainScreen";
import "./RegisterScreen.css";

const VendorRegisterScreen = () => {
	const [name, setName] = useState("");
	const [telephone, setTelephone] = useState("");
	const [homeAddress, setHomeAddress] = useState("");
	const [email, setEmail] = useState("");
	const [pic, setPic] = useState("https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg");
	const [password, setPassword] = useState("");
	const [businessName, setBusinessName] = useState("");
	const [businessAddress, setBusinessAddress] = useState("");
	const [website, setWebsite] = useState("");
	const [businessRegNumber, setBusinessRegNumber] = useState("");
	const [description, setDescription] = useState("");
	const [confirmpassword, setConfirmPassword] = useState("");
	const [message, setMessage] = useState(null);
	const [picMessage, setPicMessage] = useState(null);

	const dispatch = useDispatch();
	const vendorRegistration = useSelector((state) => state.vendorRegistration);
	const { loading, error } = vendorRegistration;

	const submitHandler = async (e) => {
		e.preventDefault();

		if (password !== confirmpassword) {
			setMessage("Passwords do not match");
		} else {
			dispatch(
				vendorRegister(
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
					pic
				)
			);
		}
	};

	const demoHandler = async (e) => {
		e.preventDefault();

		setName("Jim Halpert");
		setTelephone("0778456212");
		setHomeAddress("Colombo");
		setEmail("jimhalpert@gmail.com");
		setPassword("test");
		setConfirmPassword("test");
		setBusinessName("Halpert Cosmetics");
		setBusinessAddress("One Galle Face Mall");
		setWebsite("www.halpertcosmetics.com");
		setBusinessRegNumber("BIS123564");
		setDescription(
			"Halpert Cosmetics is a full-service company that offers private labeling & contract manufacturing of cosmetics & Skin-Care products. Our experts develop the beauty, skin care and anti-aging products. The Halpert Cosmetics marketing team studies projects while anticipating future trends. We ensure optimal scientific monitoring of raw materials and active ingredients."
		);
	};

	const resetHandler = async (e) => {
		e.preventDefault();

		setName("");
		setTelephone("");
		setHomeAddress("");
		setEmail("");
		setBusinessName("");
		setBusinessAddress("");
		setWebsite("");
		setBusinessRegNumber("");
		setDescription("");
	};

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
	return (
		<div className="registerBg">
			<br></br>
			<MainScreen title="REGISTER - VENDOR">
				<Button
					variant="success"
					style={{
						float: "left",
						marginTop: 5,
						fontSize: 15,
					}}
					href="/vendor"
				>
					{" "}
					Back to Dashboard
				</Button>
				<br></br>
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
						<Row className="VendorProfileContainer">
							<Col md={6}>
								<Form onSubmit={submitHandler}>
									<Form.Group controlId="vendorName">
										<Form.Label>Name</Form.Label>
										<Form.Control
											type="name"
											value={name}
											placeholder="Enter name"
											onChange={(e) => setName(e.target.value)}
											required
										/>
									</Form.Group>
									<br></br>
									<Form.Group controlId="vendorFormBasicTelephone">
										<Form.Label>Telephone</Form.Label>
										<Form.Control
											type="text"
											value={telephone}
											placeholder="Enter Telephone Number"
											onChange={(e) => setTelephone(e.target.value)}
											required
											maxLength={10}
										/>
									</Form.Group>
									<br></br>
									<Form.Group controlId="vendorFormBasicAddress">
										<Form.Label>Home Address</Form.Label>
										<Form.Control
											type="textArea"
											value={homeAddress}
											placeholder="Enter Address"
											onChange={(e) => setHomeAddress(e.target.value)}
											required
										/>
									</Form.Group>
									<br></br>
									<Form.Group controlId="vendorFormBasicEmail">
										<Form.Label>Email</Form.Label>
										<Form.Control
											type="email"
											value={email}
											placeholder="Enter Email Address"
											onChange={(e) => setEmail(e.target.value)}
											required
										/>
									</Form.Group>
									<br></br>
									<Form.Group controlId="formBasicPassword">
										<Form.Label>Password</Form.Label>
										<Form.Control
											type="password"
											value={password}
											placeholder="Password"
											onChange={(e) => setPassword(e.target.value)}
											required
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
											required
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
											placeholder="Enter Description"
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
										Register
									</Button>
									&emsp;
									<Button
										variant="danger"
										onClick={resetHandler}
										style={{
											fontSize: 15,
											marginTop: 10,
										}}
									>
										Reset
									</Button>
									&emsp;
									<Button
										variant="info"
										onClick={demoHandler}
										style={{
											fontSize: 15,
											marginTop: 10,
										}}
									>
										Demo
									</Button>
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
};

export default VendorRegisterScreen;
