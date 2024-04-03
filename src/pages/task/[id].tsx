import { useRouter } from "next/router";
import React from "react";

type Props = {};

const index = (props: Props) => {
  const router = useRouter();
  return <div>id: {router.query.id}</div>;
};

export default index;
