import React, { useMemo, useState } from "react";

import styles from "./feed.module.css";

import Resource from "component/Resource";

import TagInput from "component/Inputs/TagInput";

import useFeed from "hooks/useFeed";

const Feed = () => {
  const { data, loading, error } = useFeed();

  const resources = data?.feed;
  const [filters, setFilters] = useState({ value: [], placeholder: "search" });

  const doTagsApply = (resource) => {
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
    setFilters({ value: x });
  };

  const filteredResources = useMemo(
    () => resources?.filter(doTagsApply) || [filters, resources]
  );

  if (error) {
    console.log(error);
    throw error;
  }
  if (loading) return "loading";

  return (
    <>
      <TagInput
        className={styles.searchbar}
        formValue={filters}
        setSpecificFormValue={setValue}
      />

      <List
        className={styles.feed}
        Key="feed"
        Component={Resource}
        list={filteredResources}
      />
    </>
  );
};

const List = ({ list, Component, className, Key }) => {
  return (
    <div className={className}>
      {list.map((item, index) => (
        <Component key={Key + index} {...item} />
      ))}
    </div>
  );
};

export default Feed;
