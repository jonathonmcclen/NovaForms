import { CSSProperties } from "react";

type CSSColor = CSSProperties["color"];
type CSSBorderColor = CSSProperties["borderColor"];
type CSSBackgroundColor = CSSProperties["backgroundColor"];

/**
 * NOTE: Might use `React.ChangeEventHandler` as alias so this is here for now. -Josh
 */
type onChange = () => void;

declare module "@jonathonscott/novaforms" {
  // #region - Types

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

  // #region - Enums

  type SocialMediaOptions =
    | "Facebook"
    | "Instagram"
    | "Twitter"
    | "LinkedIn"
    | "YouTube"
    | "TikTok"
    | "GitHub";

  // #endregion

  // #region - Structs

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
  // #region - Global

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

  // #region - React

  // MARK: SocialMediaLinks

  interface SocialMediaLinksProps {
    value?: { [id: string]: string };
    onChange?: onChange;
  }

  function SocialMediaLinks(props: SocialMediaLinksProps): JSX.Element;

  // MARK: CaptchaField

  interface CaptchaFieldObject {
    name: string;
    title: string;
    required: boolean;
  }

  interface CaptchaFieldTheme {
    error: CSSColor;
    label: string;
    requiredAsterisk: boolean;
  }

  interface CaptchaFieldProps {
    onChange?: onChange;
    field: CaptchaFieldObject;
    theme: CaptchaFieldTheme;
    value: any;
  }

  function CaptchaField(props: CaptchaFieldProps): JSX.Element;

  // MARK: DateTime

  interface DateTimeField {
    name: string;
    error?: CSSColor;
    title?: string;
    helper?: string;
    description?: string;
    required?: boolean;
    optional?: boolean;
  }

  interface DateTimeTheme {
    error: CSSColor;
    inputFocusBorder: CSSBorderColor;
    inputBorder: CSSBorderColor;
    label: string;
    description: string;
    requiredAsterisk: boolean;
    inputText: string;
    inputBackground: CSSBackgroundColor;
  }

  interface DateTimeProps {
    field: DateTimeField;
    theme: DateTimeTheme;
    value: string;
    onChange?: onChange;
  }

  // MARK: DynamicSubForm

  interface DynamicSubFormField {
    name: string;
    type: string;
    title: string;
  }

  function DynamicSubForm(
    fields: DynamicSubFormField[],
    onSave?: (values: any[]) => void,
    title?: string,
    value?: any[]
  ): JSX.Element;

  // #endregion
}
