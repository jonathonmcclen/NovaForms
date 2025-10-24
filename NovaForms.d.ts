import { CSSProperties } from "react";

type CSSColor = CSSProperties["color"];
type CSSBorderColor = CSSProperties["borderColor"];
type CSSBackgroundColor = CSSProperties["backgroundColor"];

/**
 * NOTE: Might use `React.ChangeEventHandler` as alias so this is here for now. -Josh
 */
type OnChangeCallback = () => void;

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

  interface NovaFormsTheme {
    error: CSSColor;
    inputFocusBorder: CSSBorderColor;
    inputBorder: CSSBorderColor;
    label: CSSColor;
    description: CSSColor;
    requiredAsterisk: CSSColor;
    inputText: CSSColor;
    inputBackground: CSSBackgroundColor;
  }

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
    onChange?: OnChangeCallback;
  }

  function SocialMediaLinks(props: SocialMediaLinksProps): JSX.Element;

  // MARK: CaptchaField

  interface CaptchaFieldObject {
    name: string;
    title: string;
    required: boolean;
  }

  interface CaptchaFieldProps {
    onChange?: OnChangeCallback;
    field: CaptchaFieldObject;
    theme: NovaFormsTheme;
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

  interface DateTimeProps {
    field: DateTimeField;
    theme: NovaFormsTheme;
    value: string;
    onChange?: OnChangeCallback;
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

  // MARK: Email

  interface EmailProps {
    field: EmailField;
    value: string;
    theme: NovaFormsTheme;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    required?: boolean;
    helper?: string;
    description?: string;
    placeholder?: string;
  }

  function Email(props: EmailProps): JSX.Element;

  // MARK: FormHeader

  type FormHeaderSize = "sm" | "md" | "lg";

  interface FormHeaderField {
    title: string;

    /**
     * Default: `md`
     */
    size?: FormHeaderSize;

    /**
     * Default: `false`
     */
    dividerAbove?: boolean;

    /**
     * Default: `false`
     */
    dividerBelow?: boolean;
  }

  interface FormHeaderProps {
    field: FormHeaderField;
  }

  function FormHeader(props: FormHeaderProps): JSX.Element;

  // #endregion
}
