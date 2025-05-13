import { invoke, createFactory } from "@withease/factories";
import { createStore } from "effector";
import { createForm } from "effector-forms";

import { REQUIRED_FIELD_ERROR } from "../lib/constants/errors";
import { BASE_FORM_RULES, checkValidationRule } from "../lib/form/rules";

type TExampleFormFields = {
  name: string;
};

type TExternalValidations = {
  fields: {
    name: {
      rule: string;
      message: string;
      required: boolean;
    };
  };
};

const $externalValidations = createStore({
  fields: {
    name: {
      required: false,
      rule: "/^[p{L}]{2,}$/",
      message: "Name is invalid",
    },
  },
});

export const EXAMPLE_FORM_RULES = {
  name: [
    {
      name: "required",
      source: $externalValidations,
      validator: (
        value: string,
        __: any,
        validations: TExternalValidations,
      ) => {
        return {
          errorText: REQUIRED_FIELD_ERROR,
          isValid: validations.fields.name.required ? !!value : true,
        };
      },
    },
    {
      name: "external-rule",
      source: $externalValidations,
      validator: (
        value: string,
        __: any,
        validations: TExternalValidations,
      ) => {
        return {
          errorText: validations.fields.name.message,
          isValid: checkValidationRule(value, validations.fields.name.rule),
        };
      },
    },
    BASE_FORM_RULES.isString,
  ],
};

export const EXAMPLE_FORM_DEFAULT_VALUES = {
  name: "",
};

export const createExampleLogic = createFactory(() => {
  const $$exampleForm = createForm<TExampleFormFields>({
    fields: {
      name: {
        rules: EXAMPLE_FORM_RULES.name,
        init: "",
      },
    },
  });

  return {
    $$exampleForm,
  };
});

export const $$exampleFormInstance = invoke(createExampleLogic);
