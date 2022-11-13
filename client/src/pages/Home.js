import DLayout from "../components/DLayout.js";
import React, { useEffect } from "react";
import axios from "axios";
import { Row, Col } from "antd";
import { useDispatch } from "react-redux";
import Item from "../components/Item.js";

import "../styles/items.css";

function Home() {
  const [itemsData, setItemsData] = React.useState([]);
  const [selectedCategory, setSelectedCategoty] = React.useState("Appetizers");
  const dispatch = useDispatch();
  const categories = [
    {
      name: "Appetizers",
      imageURL:
        "https://www.acouplecooks.com/wp-content/uploads/2022/06/Caprese-Skewers-009.jpg",
    },
    {
      name: "Fries",
      imageURL:
        "https://static.toiimg.com/thumb/54659021.cms?imgsize=275086&width=800&height=800",
    },
    {
      name: "Rolls",
      imageURL:
        "https://frommybowl.com/wp-content/uploads/2020/12/chana-kathi-rolls-landscape.jpg",
    },
  ];
  const getAllItems = () => {
    dispatch({ type: "showLoading" });
    axios
      .get("/api/items/get-all-items")
      .then((response) => {
        dispatch({ type: "hideLoading" });
        setItemsData(response.data);
      })
      .catch((error) => {
        dispatch({ type: "hideLoading" });
        console.log(error);
      });
  };

  useEffect(() => {
    getAllItems(); // eslint-disable-next-line
  }, []);

  return (
    <DLayout>
      <div className="d-flex categories">
        {categories.map((category) => {
          return (
            <div
              onClick={() => setSelectedCategoty(category.name)}
              className={`d-flex category ${
                selectedCategory === category.name && "selected-category"
              }`}
            >
              <h4>{category.name}</h4>
              <img src={category.imageURL} alt="" height="60" width="80" />
            </div>
          );
        })}
      </div>

      <Row gutter={20}>
        {itemsData
          .filter((i) => i.category === selectedCategory)
          .map((item) => {
            return (
              <Col xs={24} lg={6} md={12} sm={6}>
                <Item item={item} />
              </Col>
            );
          })}
      </Row>
    </DLayout>
  );
}

export default Home;
