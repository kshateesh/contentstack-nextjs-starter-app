import React from "react";
import moment from "moment";
import ReactHtmlParser from "react-html-parser";
import Stack from "../../sdk-plugin/index";
import Layout from "../../components/layout";

import RenderComponents from "../../components/render-components";
import ArchiveRelative from "../../components/archive-relative";

export default function BlogPost(props) {
  const {
    header, banner, footer, result,
  } = props;
  return (
    <Layout header={header} footer={footer} seo={result.seo}>
      {banner.page_components && (
        <RenderComponents pageComponents={banner.page_components} blogsPage />
      )}
      <div className="blog-container">
        <div className="blog-detail">
          <h2>{result.title ? result.title : ""}</h2>
          <p>
            {moment(result.date).format("ddd, MMM D YYYY")}
            ,
            {" "}
            <strong>{result.author[0].title}</strong>
          </p>
          {ReactHtmlParser(result.body)}
        </div>
        <div className="blog-column-right">
          <div className="related-post">
            {banner.page_components[2].widget && (
              <h2>{banner.page_components[2].widget.title_h2}</h2>
            )}
            {result.related_post && (
              <ArchiveRelative blogs={result.related_post} />
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
export async function getServerSideProps(context) {
  try {
    const banner = await Stack.getSpecificEntry("page", "/blog", "en-us");
    const blog = await Stack.getSpecificEntryWithRef(
      "blog_post",
      context.resolvedUrl,
      ["author", "related_post"],
      "en-us",
    );
    const header = await Stack.getEntryWithRef(
      "header",
      "navigation_menu.page_reference",
      "en-us",
    );
    const footer = await Stack.getEntry("footer", "en-us");
    return {
      props: {
        header: header[0][0],
        footer: footer[0][0],
        result: blog[0],
        banner: banner[0],
      },
    };
  } catch (error) {
    console.error(error);
    return { notFound: true };
  }
}
