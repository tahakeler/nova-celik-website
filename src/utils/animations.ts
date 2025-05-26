export const scrollFade = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    y: 40,
    transition: {
      duration: 0.4,
      ease: 'easeIn',
    },
  },
};
