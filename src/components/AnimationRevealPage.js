import { useRef } from "react";
import tw from "twin.macro";
import { useInView as useInViewFromFramer } from 'framer-motion'

/* framer-motion and useInView here are used to animate the sections in when we reach them in the viewport
 */
import { motion } from "framer-motion";

function useInView({ once = true, margin = "-30px 0px 0px 0px" } = {}) {
  const ref = useRef(null);
  const isInView = useInViewFromFramer(ref, {
    once: once,
  });

  return [ref, isInView];
}

const StyledDiv = tw.div`font-display min-h-screen text-secondary overflow-hidden`;
function AnimationReveal({ disabled, children }) {
  if (disabled) {
    return <>{children}</>;
  }

  if (!Array.isArray(children)) children = [children];

  const directions = ["left", "right"];
  const childrenWithAnimation = children.map((child, i) => {
    return (
      <AnimatedSlideInComponent
        key={i}
        direction={directions[i % directions.length]}
      >
        {child}
      </AnimatedSlideInComponent>
    );
  });
  return <>{childrenWithAnimation}</>;
}

function AnimatedSlideInComponent({
  direction = "left",
  offset = 30,
  children,
}) {
  const [ref, inView] = useInView({ margin: `-${offset}px 0px 0px 0px` });

  const x = { target: "0%" };

  if (direction === "left") x.initial = "-150%";
  else x.initial = "150%";

  return (
    <div ref={ref}>
      <motion.section
        initial={{ x: x.initial }}
        animate={{
          x: inView && x.target,
          transitionEnd: {
            x: inView && 0,
          },
        }}
        transition={{ type: "spring", damping: 19 }}
      >
        {children}
      </motion.section>
    </div>
  );
}

export default (props) => (
  <StyledDiv className="App">
    <AnimationReveal {...props} />
  </StyledDiv>
);
