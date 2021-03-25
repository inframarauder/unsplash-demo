import React from "react";
import { Card } from "react-bootstrap";

const ImageCard = ({ url }) => {
  return (
    <Card className="img-card">
      <Card.Img src={url} alt="Card image" />
    </Card>
  );
};

export default ImageCard;
