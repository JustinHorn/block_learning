import React, { useState } from "react";

import styles from "./mutationform.module.css";

import Popup from "component/Popup";

import ChooseFormType from "./ChooseFormType";

const MutationPopup = ({ show, onClickAway, doMutation, headline, props }) => (
  <Popup show={show} onClickAway={onClickAway}>
    <MutationForm {...{ doMutation, headline, props }}></MutationForm>{" "}
  </Popup>
);

export const useHandleFormValues = (props) => {
  const [formValues, setFormValues] = useState(props);

  const resetFormValues = () => {
    setFormValues(props);
  };

  const setFormValue = (key, value) => {
    const new_props = { ...formValues };
    new_props[key] = {
      ...formValues[key],
      value: value,
    };
    setFormValues(new_props);
  };

  return { formValues, setFormValue, resetFormValues };
};

const MutationForm = ({ doMutation, headline, props }) => {
  const { formValues, setFormValue } = useHandleFormValues(props);

  return (
    <MutationFormWithoutState
      formValues={formValues}
      headline={headline}
      onClick={() => doMutation(formValues)}
      setFormValue={setFormValue}
    />
  );
};

export const MutationFormWithoutState = (props) => {
  const { onClick, headline, formValues, setFormValue } = props;
  return (
    <div className={styles.form}>
      <table className={styles.table}>
        <tbody>
          {Object.keys(formValues).map((key, index) => (
            <Elements
              k={key}
              formValues={formValues}
              setFormValue={setFormValue}
            />
          ))}
        </tbody>
      </table>

      <button onClick={onClick}>{headline}</button>
    </div>
  );
};

const Elements = (props) => {
  const { k: key, formValues, setFormValue } = props;

  return (
    <tr className={styles.column}>
      <td>
        <h4>
          {formValues[key].name}
          {formValues[key].trim ? "*" : ""}:
        </h4>
      </td>
      <td>
        <ChooseFormType {...props} />
      </td>
    </tr>
  );
};

export default MutationForm;
