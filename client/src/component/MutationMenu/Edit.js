import React from "react";

import { MutationFormWithoutState } from "component/Forms/MutationForm";

const Edit = ({ props, actionName }) => {
  return (
    <div className="edit">
      <MutationFormWithoutState headline={actionName || "share"} {...props} />
    </div>
  );
};

export default Edit;
