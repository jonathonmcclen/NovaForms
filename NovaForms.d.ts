declare module "@jonathonscott/novaforms" {
  // #region Types

  type FormFieldCondition =
    | "true"
    | "false"
    | "empty"
    | "not empty"
    | "null"
    | "not null"
    | "less than"
    | "greater than"
    | "equal"
    | "not equal"
    | "between"
    | "matches";

  // #endregion

  // #region Structs

  interface FormField {
    name: string;
    title: string;
    type: string;
    width: number;
  }

  interface FormRule {
    name: string;
    effects: any[];
  }

  interface FormRuleEffect {
    /**
     * Default: `value`
     */
    prop?: string;

    /**
     * TODO: Resolve type.
     */
    targetField: any;

    /**
     * Default: `number`
     */
    kind: string;

    /**
     * ? Not sure if value is always passed as string but is transformed.
     */
    value: string | number;

    /**
     * Default: `false`
     */
    strictString: boolean;

    /**
     * TODO: Resolve type.
     */
    sourceFields: any[];
  }

  // #endregion
  // #region Global

  /**
   * Generic onChange handler for dynamic forms Applies modifiers automatically.
   *
   * @param setState React setState function
   * @param fields array of field definitions (JSON schema)
   */
  function createFormHandler(
    setState: function,
    fields: FormField[],
    rules
  ): (eOrValue: any, fieldName: string) => void;

  /**
   * Checks if the modifier should apply.
   *
   * @param triggerValue
   * @param when The condition type.
   * @param value value to compare (or array for "between", regex for "matches")
   */
  function evaluateCondition(
    triggerValue: any,
    when: FormFieldCondition,
    value: Array | RegExp | string | number
  ): boolean;

  // #endregion
}
