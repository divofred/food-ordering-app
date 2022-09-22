import React, { useState } from "react";

import { Col, Input, InputGroup, Row } from "reactstrap";
import RestaurantList from "../components/RestaurantList";

function Home() {
  const [query, updateQuery] = useState("");
  return (
    <div className="container-fluid">
      <Row>
        <Col>
          <div className="search">
            <InputGroup>
               <div className="input-group-append">
                <span className="input-group-text" id="basic-addon2">Search</span>
               </div>
              <Input
                onChange={e => updateQuery(e.target.value.toLocaleLowerCase())}
                value={query}
              />
            </InputGroup>
          </div>
           <RestaurantList search={query} />
        </Col>
      </Row>
      <style jsx>
        {`
          .search {
            margin: 20px;
            width: 500px;
          }
        `}
      </style>
    </div>
  );
}
export default Home;