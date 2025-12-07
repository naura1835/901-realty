import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "gsap";

gsap.registerPlugin(SplitText, ScrollTrigger);

const animateSplitText = (selector: string) => {
  return SplitText.create(selector, {
    type: "chars",
    onSplit: (self) => {
      gsap.from(self.chars, {
        y: 20,
        autoAlpha: 0,
        stagger: {
          each: 0.04,
        },
        scrollTrigger: {
          trigger: selector,
          start: "top center+=250",
          end: "bottom center",
          markers: true,
          toggleActions: "play pause reverse restart",
        },
      });
    },
  });
};

export { animateSplitText };
