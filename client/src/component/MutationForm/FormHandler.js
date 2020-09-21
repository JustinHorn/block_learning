import React, { Component, useState } from "react";

import styles from "./mutationform.module.css";

const FormHandler = (props) => {
  const { k: key, formValues, setFormValue } = props;

  const formValue = formValues[key];
  const componentProps = {
    formValue,
    setSpecificFormValue: (v) => setFormValue(key, v),
  };

  if (formValue.handler === "action" || formValue.handler === "actionNoInput") {
    componentProps["action"] = formValue.useGetAction(setFormValue);
    componentProps["actionName"] = formValue.actionName;
  }

  const Component = selectComponent(formValue.handler);
  return <Component {...componentProps}></Component>;
};

const selectComponent = (handler) => {
  switch (handler) {
    case "tag":
      return TagInput;

    case "action":
      return ActionInput;

    case "actionNoInput":
      return ActionNoInput;
    default:
      return DefaultInput;
  }
};

const DefaultInput = ({ formValue, setSpecificFormValue }) => {
  return (
    <input
      placeholder={formValue.placeholder || ""}
      value={formValue.value}
      onChange={(e) => setSpecificFormValue(e.target.value)}
    />
  );
};

const ActionInput = ({
  formValue,
  setSpecificFormValue,
  action,
  actionName,
}) => {
  return (
    <div>
      <input
        placeholder={formValue.placeholder || ""}
        value={formValue.value}
        onChange={(e) => setSpecificFormValue(e.target.value)}
      />
      <button onClick={() => action(formValue.value)}>{actionName}</button>
    </div>
  );
};

/**
 * Save href, generate picture
 * @param {S} param0
 */
const ActionNoInput = ({ formValue, action, actionName }) => {
  return <button onClick={() => action(formValue.value)}>{actionName}</button>;
};

const TagInput = ({ formValue, setSpecificFormValue }) => {
  const tags = formValue.value;

  const [text, setText] = useState("");

  const onPress = (e) => {
    if (e.charCode === 13) {
      setSpecificFormValue([...tags, text]);
      setText("");
    }
  };

  const deleteTag = (index) => () => {
    setSpecificFormValue([...tags.slice(0, index), ...tags.slice(index + 1)]);
  };

  const onChange = (e) => {
    setText(e.target.value.trim());
  };
  return (
    <div>
      <input
        type="text"
        value={text}
        placeholder={formValue.placeholder}
        onKeyPress={onPress}
        onChange={onChange}
      />
      <ul className={styles.taglist}>
        {tags.map((t, index) => (
          <li key={index} className={styles.tag}>
            {t} <button onClick={deleteTag(index)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FormHandler;
