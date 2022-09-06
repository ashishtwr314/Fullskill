export const reactInfo = ` React makes it painless to create interactive UIs and SPA's. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes. Declarative views make your code more predictable and easier to debug.
  Build encapsulated components that manage their own state, then compose them to make complex UIs.
  Since component logic is written in JavaScript instead of templates, you can easily pass rich data through your app and keep state out of the DOM.
  In React, a stateful component is a component that holds some state. Stateless components, by contrast, have no state. Note that both types of components can use props.
  In React, a component should never change its own props directly. A parent component should change them.
  The literal difference is that one has state, and the other doesn’t. That means the stateful components are keeping track of changing data, while stateless components print out what is given to them via props, or they always render the same thing.
  Notice the stateless component is written as a function. As cool as state is, you should always aim to make your components as simple and stateless as possible, so different components can be reused like Lego pieces, even if you don’t have immediate plans to reuse a component. The stateful ones should feel lucky to be so!
  The virtual DOM (VDOM) is a programming concept where an ideal, or “virtual”, representation of a UI is kept in memory and synced with the “real” DOM by a library such as ReactDOM. This process is called reconciliation.
  This approach enables the declarative API of React: You tell React what state you want the UI to be in, and it makes sure the DOM matches that state. This abstracts out the attribute manipulation, event handling, and manual DOM updating that you would otherwise have to use to build your app.
  No, they are different. The Shadow DOM is a browser technology designed primarily for scoping variables and CSS in web components. The virtual DOM is a concept implemented by libraries in JavaScript on top of browser APIs.
  Satateful components are the components with state
Satateless components are the components without state
  `;
