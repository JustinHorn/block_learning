import React, { useState, useContext } from "react";
import Feed from "component/Feed";

import UserContext from "context";

import TagInput from "component/forms/Inputs/TagInput";

import styles from "./mainpage.module.css";

import useFeed from "hooks/useFeed";

const Mainpage = () => {
  const { user } = useContext(UserContext);

  const [filters, setFilters] = useState({ value: [], placeholder: "search" });

  const filter = (resource) => {
    if (filters.value.length) {
      const tags = filters.value.map((x) => x.toLowerCase());
      const r_tags = resource.tags.map((x) => x.name.toLowerCase());
      for (let i = 0; i < r_tags.length; i++) {
        for (let j = 0; j < tags.length; j++) {
          if (r_tags.includes(tags[j])) return true;
        }
      }
      return false;
    }
    return true;
  };

  const setValue = (x) => {
    setFilters({ ...filters, value: x });
  };

  const { data, loading, error } = useFeed();

  if (error) {
    console.log(error);
    throw error;
  }
  if (loading) return "loading";

  return (
    <div className={styles.main}>
      <div className={styles.greet}>{user && <h1>Hello {user.name}</h1>}</div>
      <TagInput
        className={styles.searchbar}
        formValue={filters}
        setSpecificFormValue={setValue}
      />
      <div className={styles.feed}>
        <Feed filter={filter} data={data?.feed} />
      </div>
    </div>
  );
};

export default Mainpage;
