import { Form } from "@tsed/react-formio";
import { shallow } from "enzyme";
import React from "react";
import { Config } from "../config";
import { AuthView } from "./auth.view";

jest.mock("../config");

describe("AuthView", () => {
  const shallowComponent = (props = {}) => {
    return shallow(<AuthView {...props} />);
  };

  describe("render", () => {
    it("should render the auth view", () => {
      Config.projectTitle = "Project";
      const component = shallowComponent();

      expect(component.find(Form).length).toEqual(1);
      expect(component.find(".font-happiness").html()).toContain("Project");
    });
  });
});
