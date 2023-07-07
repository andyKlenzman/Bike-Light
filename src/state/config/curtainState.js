// This file is the source of truth for the various states / names that the curtain component can be configured in.

export const curtainState = {
  isOpen: {
    hidden: 'closed',
    peeking: 'peeking',
    partiallyOpen: 'partiallyOpen',
    fullyOpen: 'fullyOpen',
  },
  contentType: {
    screenLock: 'screenLock',
    tutorial: 'tutorial',
  },
  tutorialState: {
    intro: 'intro',
  },
};
