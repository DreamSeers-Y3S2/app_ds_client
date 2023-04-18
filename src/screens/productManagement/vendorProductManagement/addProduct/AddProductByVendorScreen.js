import React, { useEffect, useState } from "react";
import MainScreen from "../../../../components/MainScreen";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Row, Col, Card } from "react-bootstrap";
import { createProduct } from "../../../../actions/productManagementActions/productActions";
import Loading from "../../../../components/Loading";
import ErrorMessage from "../../../../components/ErrorMessage";
import swal from "sweetalert";
import "./addProduct.css";

function AddProductByVendorScreen({ history }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [productBrand, setProductBrand] = useState("");
  const [productCode, setProductCode] = useState("");
  const [description, setDescription] = useState("");
  const [picURL, setPicUrl] = useState(
    "https://res.cloudinary.com/dfmnpw0yp/image/upload/v1679235307/assets/tsuh9f6v1reihgqxwxrz.ico"
  );
  const [price, setPrice] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [usage, setUsage] = useState("");
  const [warnings, setWarnings] = useState("");
  const [discountNote, setDiscountNote] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [picMessage, setPicMessage] = useState(null);

  const dispatch = useDispatch();

  const productCreate = useSelector((state) => state.productCreate);
  const { loading, error } = productCreate;

  const vendor_Login = useSelector((state) => state.vendor_Login);
  const { vendorInfo } = vendor_Login;

  const [vendorEmail, setVendorEmail] = useState(vendorInfo.email);

  const resetHandler = () => {
    setTitle("");
    setCategory("");
    setProductBrand("");
    setProductCode("");
    setDescription("");
    setPrice();
    setIngredients("");
    setUsage("");
    setWarnings("");
    setDiscountNote("");
    setDiscountPrice();
    setQuantity();
  };

  const demoHandler = () => {
    setVendorEmail(vendorInfo.email);
    setTitle("Link Natural Face Cream");
    setCategory("Beauty and Personal Care");
    setProductBrand("Link");
    setProductCode("BC-01234");
    setDescription(
      "Link Natural Face Cream has a rich herbal and ayurvedic formulation that comforts and calms your skin while you sleep. Star ingredient Orange extraction moisturizes the skin and helps to restore skin's natural glow. Natural Honey induces a powerful cell activation mechanism offering health suppleness to the skin while enhancing the circulation for greater cell turnover, giving you a youthful, bright and glowing skin."
    );
    setPrice(1200);
    setIngredients(
      "Sandalwood, Pure Sandalwood Oil, Venivel (Yellow vine), Kokun Bark, Suwanda Kottan, Indian Turmeric, Velmadata."
    );
    setUsage("Apply on skin after a clean wash");
    setWarnings(
      "People who are with sesnsitive skin must have medical approval before use."
    );
    setDiscountNote("5% off");
    setDiscountPrice(1140);
    setQuantity(150);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (
      !vendorEmail ||
      !title ||
      !category ||
      !productBrand ||
      !productCode ||
      !description ||
      !picURL ||
      !price ||
      !ingredients ||
      !usage ||
      !warnings ||
      !discountNote ||
      !discountPrice ||
      !quantity
    )
      return;
    dispatch(
      createProduct(
        vendorEmail,
        title,
        category,
        productBrand,
        productCode,
        description,
        picURL,
        price,
        ingredients,
        usage,
        warnings,
        discountNote,
        discountPrice,
        quantity
      )
    );

    resetHandler();
    swal({
      title: "Success !!!",
      text: "Product Creation Successful.",
      icon: "success",
      timer: 2000,
      button: false,
    });
    setTimeout(function () {
      window.location.href = "/vendor-products";
    }, 2000);
  };

  const postDetails = (pics) => {
    if (
      pics ===
      "https://res.cloudinary.com/dfmnpw0yp/image/upload/v1679235307/assets/tsuh9f6v1reihgqxwxrz.ico"
    ) {
      return setPicMessage("Please Select an Image");
    }
    setPicMessage(null);
    if (
      pics.type === "image/jpeg" ||
      pics.type === "image/png" ||
      pics.type === "image/jpg"
    ) {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "vendorProducts");
      data.append("cloud_name", "dfmnpw0yp");
      fetch("https://api.cloudinary.com/v1_1/dfmnpw0yp/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPicUrl(data.url.toString());
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return setPicMessage("Please Select an Image");
    }
  };

  useEffect(() => {}, []);
  if (vendorInfo) {
    return (
      <div className="productBg">
        <br></br>
        <MainScreen title="Add a New Product">
          <Button
            variant="success"
            style={{
              float: "left",
              marginTop: 5,
              fontSize: 15,
            }}
            href="/vendor-products"
          >
            {" "}
            Back to Products List
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
              background: "rgba(231, 238, 238, 0.9)",
            }}
          >
            <div className="productContainer">
              <div>
                {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
                {loading && <Loading />}
              </div>
              <br></br>
              <Row className="ProductContainer">
                <Col md={6}>
                  <Form onSubmit={submitHandler}>
                    <Form.Group controlId="productFormBasicVendorEmail">
                      <Form.Label>Vendor Email</Form.Label>
                      <Form.Control
                        type="email"
                        value={vendorEmail}
                        onChange={(e) => setVendorEmail(vendorInfo.email)}
                        readOnly
                      />
                    </Form.Group>
                    <br></br>
                    <Form.Group controlId="productFormBasicTitle">
                      <Form.Label>Product Name</Form.Label>
                      <Form.Control
                        type="text"
                        value={title}
                        placeholder="Enter Product Name"
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        maxLength={10}
                      />
                    </Form.Group>
                    <br></br>
                    <Form.Group controlId="productFormBasicCategory">
                      <Form.Label>Product Category</Form.Label>
                      <Form.Control
                        type="text"
                        value={category}
                        placeholder="Enter Product Category"
                        onChange={(e) => setCategory(e.target.value)}
                        required
                      />
                    </Form.Group>
                    <br></br>
                    <Form.Group controlId="productFormBasicBrand">
                      <Form.Label>Product Brand</Form.Label>
                      <Form.Control
                        type="text"
                        value={productBrand}
                        placeholder="Enter Product Brand"
                        onChange={(e) => setProductBrand(e.target.value)}
                        required
                      />
                    </Form.Group>
                    <br></br>
                    <Form.Group controlId="formBasicPassword">
                      <Form.Label>Product Code</Form.Label>
                      <Form.Control
                        type="text"
                        value={productCode}
                        placeholder="Enter Product Code"
                        onChange={(e) => setProductCode(e.target.value)}
                        required
                      />
                    </Form.Group>
                    <br></br>
                    <Form.Group controlId="productFormBasicDescription">
                      <Form.Label>Product Description</Form.Label>
                      <textarea
                        style={{
                          width: "100%",
                          fontSize: "16px",
                          borderRadius: "5px",
                        }}
                        value={description}
                        placeholder="Enter Product Description"
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        rows={7}
                      />
                    </Form.Group>
                    <br></br>
                    <Form.Group controlId="confirmPassword">
                      <Form.Label>Product Price</Form.Label>
                      <Form.Control
                        type="text"
                        value={price}
                        placeholder="Enter Product Price"
                        onChange={(e) => setPrice(e.target.value)}
                        required
                      />
                    </Form.Group>
                    <br></br>
                    <Form.Group controlId="productFormBasicIngredients">
                      <Form.Label>Product Ingredients</Form.Label>
                      <textarea
                        style={{
                          width: "100%",
                          fontSize: "16px",
                          borderRadius: "5px",
                        }}
                        value={ingredients}
                        placeholder="Enter Product Ingredients"
                        onChange={(e) => setIngredients(e.target.value)}
                        required
                        rows={3}
                      />
                    </Form.Group>
                    <br></br>
                    <Form.Group controlId="productFormBasicUsage">
                      <Form.Label>Product Usage</Form.Label>
                      <textarea
                        style={{
                          width: "100%",
                          fontSize: "16px",
                          borderRadius: "5px",
                        }}
                        value={usage}
                        placeholder="Enter Product Usage"
                        onChange={(e) => setUsage(e.target.value)}
                        required
                        rows={2}
                      />
                    </Form.Group>
                    <br></br>
                    <Form.Group controlId="productFormBasicWarnings">
                      <Form.Label>Product Warnings</Form.Label>
                      <textarea
                        style={{
                          width: "100%",
                          fontSize: "16px",
                          borderRadius: "5px",
                        }}
                        value={warnings}
                        placeholder="Enter Product Warnings"
                        onChange={(e) => setWarnings(e.target.value)}
                        required
                        rows={3}
                      />
                    </Form.Group>
                    <br></br>
                    <Form.Group controlId="productFormBasicDiscountNote">
                      <Form.Label>Discount Note</Form.Label>
                      <textarea
                        style={{
                          width: "100%",
                          fontSize: "16px",
                          borderRadius: "5px",
                        }}
                        value={discountNote}
                        placeholder="Enter Discount Note"
                        onChange={(e) => setDiscountNote(e.target.value)}
                        required
                        rows={2}
                      />
                    </Form.Group>
                    <br></br>
                    <Form.Group controlId="productFormBasicDiscountPrice">
                      <Form.Label>Discount Price</Form.Label>
                      <Form.Control
                        type="text"
                        value={discountPrice}
                        placeholder="Enter Discount Price"
                        onChange={(e) => setDiscountPrice(e.target.value)}
                        required
                      />
                    </Form.Group>
                    <br></br>
                    <Form.Group controlId="productFormBasicQuantity">
                      <Form.Label>Quantity</Form.Label>
                      <Form.Control
                        type="text"
                        value={quantity}
                        placeholder="Enter Quantity"
                        onChange={(e) => setQuantity(e.target.value)}
                        required
                      />
                    </Form.Group>
                    <br></br>
                    {picMessage && (
                      <ErrorMessage variant="danger">{picMessage}</ErrorMessage>
                    )}
                    <Form.Group controlId="pic">
                      <Form.Label>Product Picture</Form.Label>
                      &emsp;
                      <input
                        type="file"
                        accept="image/*"
                        id="product-pic"
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
                      Submit
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
                    src={picURL}
                    alt={title}
                    className="profilePic"
                    style={{
                      boxShadow: "7px 7px 20px ",
                      borderColor: "black",
                      borderRadius: 25,
                      background: "white",
                      width: "300px",
                      height: "300px",
                    }}
                  />
                </Col>
              </Row>
            </div>
            <br></br>
          </Card>
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

export default AddProductByVendorScreen;