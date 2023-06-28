import Head from "next/head";
import React from "react";
interface Props {
  title?: string;
}
const DocumentHead: React.FC<Props> = ({ title }) => {
  return (
    <Head>
      <title>{title ? `SN Site | ${title}` : "SN Site"}</title>
      <meta
        name="description"
        content="Social Network Site Personal Project. Be inspired by Facebook"
      />
      <meta
        http-equiv="Content-Security-Policy"
        content="upgrade-insecure-requests"
      ></meta>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};
export default DocumentHead;
