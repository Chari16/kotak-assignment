import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  Container,
  Dialog,
  Grid,
  List,
  ListItem,
  ListItemText,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Notification from "./components/Notification";
import { Formik, Form } from "formik";
import { productValidationSchema } from "./utils";
import api from "./api";
import { INITIAL_PRODUCT_VALUES, STATUS_MESSAGE } from "./constants";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [productDetails, setProductDetails] = useState(null);
  const [products, setProducts] = useState([]);
  const [showSnackBar, setShowSnackBar] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const fetchAllProducts = async () => {
    try {
      const productsResponse = await api.getProducts();
      setProducts(productsResponse.data.data);
    } catch (e) {
      setMessage(e.message);
      setShowSnackBar(true);
    }
  };

  const editProduct = async (id) => {
    try {
      const productResponse = await api.getProduct(id);
      setShowForm(true);
      setProductDetails(productResponse.data.data);
    } catch (e) {
      setMessage(e.message);
      setShowSnackBar(true);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await api.deleteProduct(id);
      setShowSnackBar(true);
      setMessage(STATUS_MESSAGE.delete);
      fetchAllProducts();
    } catch (e) {
      setShowSnackBar(true);
      setMessage(e.message);
    }
  };

  const renderProducts = () => {
    return products.map((item) => {
      return (
        <Card key={item._id} sx={{ mb: 2 }}>
          <ListItem
            alignItems="flex-start"
            secondaryAction={
              <>
                <EditIcon onClick={() => editProduct(item._id)} />
                <DeleteIcon onClick={() => deleteProduct(item._id)} />
              </>
            }
          >
            <ListItemText
              primary={item.name}
              secondary={
                <>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {item.description}
                  </Typography>
                </>
              }
            />
          </ListItem>
        </Card>
      );
    });
  };

  const renderAddProduct = () => {
    return (
      <Button variant="contained" onClick={productHandler}>
        Add New Product
      </Button>
    );
  };

  const productHandler = () => {
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
  };

  const renderForm = () => {
    return (
      <Dialog open={showForm} onClose={closeForm}>
        <Box sx={{ p: 4 }} noValidate autoComplete="off">
          <Formik
            initialValues={
              productDetails ? productDetails : INITIAL_PRODUCT_VALUES
            }
            validationSchema={productValidationSchema}
            onSubmit={async (values, { setSubmitting }) => {
              if (values._id) {
                const { name, description } = values;
                const updatePayload = { name, description };
                await api.updateProduct(values._id, updatePayload);
                setProductDetails(null);
                setShowSnackBar(true);
                setMessage(STATUS_MESSAGE.update);
              } else {
                await api.addProduct(values);
                setShowSnackBar(true);
                setMessage(STATUS_MESSAGE.create);
              }
              setTimeout(async () => {
                setSubmitting(false);
                await fetchAllProducts();
                setShowForm(false);
              }, 400);
            }}
          >
            {(formik) => {
              const {
                errors,
                handleChange,
                handleSubmit,
                isSubmitting,
                touched,
                values,
              } = formik;

              return (
                <Form>
                  <Grid container spacing={5}>
                    <Grid item xs={10} lg={12} md={12}>
                      <TextField
                        id="outlined-basic"
                        label="Name"
                        name="name"
                        variant="outlined"
                        fullWidth
                        value={values.name}
                        onChange={handleChange}
                        error={touched.name && Boolean(errors.name)}
                        helperText={touched.name && errors.name}
                      />
                    </Grid>
                    <Grid item xs={10} lg={12} md={12}>
                      <TextField
                        id="outlined-basic"
                        label="Description"
                        name="description"
                        variant="outlined"
                        fullWidth
                        value={values.description}
                        onChange={handleChange}
                        error={
                          touched.description && Boolean(errors.description)
                        }
                        helperText={touched.description && errors.description}
                      />
                    </Grid>
                    <Grid item xs={10} lg={12} md={12}>
                      <Stack
                        direction="row"
                        spacing={2}
                        justifyContent="flex-end"
                      >
                        <Button
                          variant="contained"
                          disabled={isSubmitting}
                          onClick={handleSubmit}
                          type="submit"
                        >
                          Submit
                        </Button>
                        <Button variant="outlined" onClick={closeForm}>
                          Cancel
                        </Button>
                      </Stack>
                    </Grid>
                  </Grid>
                </Form>
              );
            }}
          </Formik>
        </Box>
      </Dialog>
    );
  };

  const closeHandler = () => {
    setShowSnackBar(false);
  };

  return (
    <Container maxWidth="sm">
      <Box display="flex" flexDirection="column" alignItems={"center"}>
        <Typography variant="h2">Products</Typography>
        {renderAddProduct()}
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        >
          {renderProducts()}
          {showForm ? renderForm() : undefined}
        </List>
        <Notification
          open={showSnackBar}
          autoHideDuration={1000}
          message={message}
          onClose={closeHandler}
        />
      </Box>
    </Container>
  );
}

export default App;
