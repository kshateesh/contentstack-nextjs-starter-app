import React from "react";

import Section from "./section";
import HeroBanner from "./hero-banner";
import BlogBanner from "./blog-banner";
import CardSection from "./card-section";
import TeamSection from "./team-section";
import BlogSection from "./blog-section";
import SectionBucket from "./section-bucket";
import SectionWithEmbedObject from "./section-with-embed-object";

export default function RenderComponents(props) {
  const { pageComponents, blogsPage } = props;
  return (
    <>
      {pageComponents?.map((component, key) => {
        if (component.hero_banner) {
          return blogsPage ? (
            <BlogBanner
              blog_banner={component.hero_banner}
              key={`component-${key}`}
            />
          ) : (
            <HeroBanner
              hero_banner={component.hero_banner}
              title={props.about ? "about" : "home"}
              key={`component-${key}`}
            />
          );
        }
        if (component.section) {
          return (
            <Section section={component.section} key={`component-${key}`} />
          );
        }
        if (component.section_with_buckets) {
          return (
            <SectionBucket
              section={component.section_with_buckets}
              key={`component-${key}`}
            />
          );
        }
        if (component.from_blog) {
          return (
            <BlogSection blogs={component.from_blog} key={`component-${key}`} />
          );
        }
        if (component["section_with_cards"]) {
          return (
            <CardSection
              cards={component.section_with_cards.cards}
              key={`component-${key}`}
            />
          );
        }
        if (component["section_with_embed_object"]) {
          return (
            <SectionWithEmbedObject
              embedObject={component.section_with_embed_object}
              key={`component-${key}`}
            />
          );
        }
        if (component["our_team"]) {
          return (
            <TeamSection
              ourTeam={component.our_team}
              key={`component-${key}`}
            />
          );
        }
        if (component["section_with_buckets"]) {
          return (
            <AboutSectionBucket
              sectionWithBuckets={component.section_with_buckets}
              key={`component-${key}`}
            />
          );
        }
      })}
    </>
  );
}
