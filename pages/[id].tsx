import axios from "axios";
import { GetStaticPaths, GetStaticProps } from "next";
import React from "react";
import { API_URL } from "../src/config";

const NewsDetail = ({ data }: any) => {
  return (
    <div>
      {data && <div dangerouslySetInnerHTML={{ __html: data.html }}></div>}
    </div>
  );
};

export default NewsDetail;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params?.id as string;
  const data = await axios.get(`${API_URL}/co-ban/chi-tiet?id=${id}`);

  //https://startoday123.herokuapp.com
  return {
    props: {
      data: data.data.data,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};
