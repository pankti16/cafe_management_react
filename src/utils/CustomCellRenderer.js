//This file contains all the custom renders for table
import React from "react";
import { Images } from "../utils/Images";
import { SERVER_IMAGE_PATH } from "../utils/Constants";
import { Btn } from "../components/Controls/Button/Button";
//Custom component for rendering logo
const LogoRenderer = (props) => {
  const { data } = props;

  let imgPath = Images.cafe_default_logo;
  if (data.logo) {
    imgPath = `${SERVER_IMAGE_PATH}/${data.logo}`;
  }

  return (
    <span>
      <img
        style={{ height: "50px", width: "50px", borderRadius: '50%' }}
        src={imgPath}
        alt={data.name}
      />
    </span>
  );
};
//Custom component for rendering action
const ActionRenderer = (props) => {
  const { data, isEditDisable } = props;

  const buttonClicked = (e) => {
    if (!props.clicked) return;
    props.clicked(e.target.dataset.id, e.target.dataset.type);
  };

  return (
    <span>
      <Btn
        text="Edit"
        data-id={data.id}
        disabled={isEditDisable}
        data-type={"edit"}
        handleClick={buttonClicked}
      />
      <Btn
        text="Delete"
        color={"error"}
        data-id={data.id}
        data-type={"delete"}
        handleClick={buttonClicked}
      />
    </span>
  );
};
//Custom component for rendering id
const IdRenderer = (props) => {
  return props.node ? props.node.rowIndex + 1 : null;
};

export { LogoRenderer, IdRenderer, ActionRenderer };
