import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import Profile from "../../app/javascript/components/Profile";

/**
 * @jest-environment jsdom
 */

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("renders user data", async () => {
  const fakeUser = {
    username: "user",
    email: "user@user.com",
  };
  global.fetch = jest.fn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(fakeUser),
    })
  );
  await act(async () => {
    render(<Profile search={fakeUser} />, container);
  });

  expect(container.querySelector("#username").textContent).toBe(
    fakeUser.username
  );
  expect(container.querySelector("#email").textContent).toBe(fakeUser.email);

  global.fetch.mockRestore();
  delete global.fetch;
});
