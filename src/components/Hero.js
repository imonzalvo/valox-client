import React from "react";
import tw from "twin.macro";

const Container = tw.div`relative`;
const TwoColumn = tw.div`flex flex-col lg:flex-row md:items-center max-w-screen-xl mx-auto py-20 md:py-24`;
const LeftColumn = tw.div`relative lg:w-6/12 lg:pr-12 flex-shrink-0 text-center lg:text-left`;
const RightColumn = tw.div`relative mt-12 lg:mt-0 flex flex-col justify-center`;

const Heading = tw.h1`font-black text-3xl md:text-5xl leading-snug max-w-3xl`;
const Paragraph = tw.p`my-5 lg:my-8 text-sm lg:text-base font-medium text-gray-600 max-w-lg mx-auto lg:mx-0`;

const IllustrationContainer = tw.div`flex justify-center md:justify-end items-center relative max-w-3xl lg:max-w-none`;

export default ({
  heading,
  description,
  imageSrc = DesignIllustration,
  imageCss = null,
}) => {
  return (
    <>
      <Container>
        <TwoColumn>
          <LeftColumn>
            <Heading>{heading}</Heading>
            <Paragraph>{description}</Paragraph>
          </LeftColumn>
          <RightColumn>
            <IllustrationContainer>
              <img css={imageCss} src={imageSrc} alt="Hero" />
            </IllustrationContainer>
          </RightColumn>
        </TwoColumn>
      </Container>
    </>
  );
};
