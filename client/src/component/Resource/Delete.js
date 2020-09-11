import React, { useState } from "react";

import { gql } from "apollo-boost";
import { useMutation } from "@apollo/client";

import { FeedQuery } from "component/Feed";

const MUTATION_DELETE = gql`
  mutation MUTATION_DELETE($id: Int!) {
    deleteResource(id: $id) {
      id
      title
      href
    }
  }
`;

const DeleteResource = ({ id }) => {
  const [mutate, { error, data }] = useMutation(MUTATION_DELETE, {
    update(cache, m_result, m_id) {
      const { deleteResource } = m_result.data;

      const data = cache.readQuery({ query: FeedQuery });

      const feed = data.feed;

      const index = feed.findIndex((x) => x.id === deleteResource.id);
      const new_data = {
        feed: [...feed.slice(0, index), ...feed.slice(index + 1)],
      };
      cache.writeQuery({ query: FeedQuery, data: new_data });
    },
  });

  const deleteResource = (id) => {
    mutate({ variables: { id } });
  };

  return <button onClick={() => deleteResource(id)}>Delete</button>;
};

export default DeleteResource;