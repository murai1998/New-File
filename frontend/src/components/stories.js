import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import Web from "./webComponent";

export const myProps = {
  id: "1",
  className: "mySampleClass",
  sampleString: "Test Task",
  sampleDate: new Date(2018, 0, 1, 9, 0)
};

export const actions = {
  onActionOne: action("onActionOne"),
  onActionTwo: action("onActionTwo")
};

storiesOf("Web", module)
  .add("default", () => <Web {...myProps} {...actions} />)
  .add("pinned", () => <Web {...myProps} pinned={true} {...actions} />)
  .add("archived", () => <Web {...myProps} archived={true} {...actions} />);
