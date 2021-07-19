import React from "react";
import "./CallToActionSection.scss";

const CallToActionSection = ({
  actionButton,
  headingText,
  paragraphText,
  className,
}) => {
  const renderHeading = () => {
    //e.g. Interested in fundraising?
    if (headingText)
      return (
        <>
          <h2 className="cta-section__heading">{headingText}</h2>
          <hr className="hr" />
        </>
      );
    return null;
  };

  const renderParagraph = () => {
    return !paragraphText ? null : (
      <>
        <p className="cta-section__p">{paragraphText}</p>
      </>
    );
  };

  const renderActionButton = () => actionButton || null;

  return (
    <section className={`cta-section ${className}`}>
      <div className="cta-section__content">
        {renderHeading()}
        {renderParagraph()}
        {renderActionButton()}
      </div>
    </section>
  );
};

export default CallToActionSection;
