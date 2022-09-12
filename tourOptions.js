export const tourOptions = {
  defaultStepOptions: {
    scrollTo: true,
    cancelIcon: {
      enabled: true,
    },
  },
  useModalOverlay: true,
};
export const steps = [
  {
    id: "question",
    text: [
      `
        <p>
            View the question here
        <p>
        `,
    ],
    attachTo: { element: ".question", on: "bottom" },
    classes: "",
    buttons: [
      //   {
      //     type: "cancel",
      //     classes: "shepherd-button-secondary",
      //     text: "Exit",
      //   },
      {
        type: "next",
        text: "Next",
      },
    ],
  },

  {
    id: "ques-control",
    text: [
      `
        <p>
            Switch back and forth the questionnaire using the controls
        </p>
        `,
    ],
    attachTo: { element: ".ques-controls", on: "bottom" },
    classes: "shepherd shepherd-welcome",
    buttons: [
      {
        type: "cancel",
        classes: "shepherd-button-secondary",
        text: "Exit",
      },
      {
        type: "next",
        text: "Next",
      },
    ],
    beforeShowPromise: function () {
      console.log("BEFORE SHOW PROMISE");
    },
  },

  {
    id: "editor",
    text: [
      `
        <p>
            Here is your editor when you can write your code, as well as ask AI to help fill this editor
        </p>
        `,
    ],
    attachTo: { element: ".code-editor", on: "bottom" },
    classes: "shepherd shepherd-welcome",
    buttons: [
      {
        type: "cancel",
        classes: "shepherd-button-secondary",
        text: "Exit",
      },
      {
        type: "next",
        text: "Next",
      },
    ],
  },

  {
    id: "editor-control",
    text: [
      `
        <p>
            Here is your editor controls, you can compile, rewrite, and do a lot of crazy stuff from here
        </p>
        `,
    ],
    attachTo: { element: ".editor-controls", on: "bottom" },
    classes: "shepherd shepherd-welcome",
    buttons: [
      {
        type: "cancel",
        classes: "shepherd-button-secondary",
        text: "Exit",
      },
      {
        type: "next",
        text: "Next",
      },
    ],
  },

  {
    id: "compile",
    text: [
      `
        <p>
            THe compile button lets you compile your code written in the code editor
        </p>
        `,
    ],
    attachTo: { element: ".editor-controls__compile", on: "bottom" },
    classes: "shepherd shepherd-welcome",
    buttons: [
      {
        type: "cancel",
        classes: "shepherd-button-secondary",
        text: "Exit",
      },
      {
        type: "next",
        text: "Next",
      },
    ],
  },

  {
    id: "reqrite",
    text: [
      `
        <p>
            THe compile button lets you COMPILE your code written in the code editor
        </p>
        `,
    ],
    attachTo: { element: ".editor-controls__rewrite", on: "bottom" },
    classes: "shepherd shepherd-welcome",
    buttons: [
      {
        type: "cancel",
        classes: "shepherd-button-secondary",
        text: "Exit",
      },
      {
        type: "next",
        text: "Next",
      },
    ],
  },

  {
    id: "reqrite",
    text: [
      `
        <p>
            THe compile button lets you REWRITE your code written in the code editor
        </p>
        `,
    ],
    attachTo: { element: ".editor-controls__compile", on: "bottom" },
    classes: "shepherd shepherd-welcome",
    buttons: [
      {
        type: "cancel",
        classes: "shepherd-button-secondary",
        text: "Exit",
      },
      {
        type: "next",
        text: "Next",
      },
    ],
  },
];
