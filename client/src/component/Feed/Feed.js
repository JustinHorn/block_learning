import React, { useMemo, useContext, useEffect, useRef } from "react";

import styles from "./feed.module.css";

import Project from "component/Project";

import List from "component/List";

import useFeed from "hooks/useFeed";
import useHandleQuery from "helper/useHandleQuery";
import ProjectLayoutContext from "context/ProjectLayout";

import useDoOnView from "hooks/useDoOnView";

const Feed = ({ filter, query }) => {
  !filter && (filter = () => true);

  const { data, addItems, loading } = query;
  const { lined } = useContext(ProjectLayoutContext);

  const projects = data?.feed.map((x) => ({
    ...x,
    showDescription: false,
  }));

  const filteredProjects = useMemo(() => projects?.filter(filter), [
    filter,
    projects,
  ]);

  const dotDotDot = useDoOnView(addItems);

  return (
    <div>
      <div className={lined ? "list px5  " : "feed"}>
        <List Key="feed" Component={Project} list={filteredProjects} />
      </div>
      <span ref={dotDotDot} onClick={addItems} className="load">
        . . .
      </span>
    </div>
  );
};

export default (props) => useHandleQuery(props, useFeed, Feed);
