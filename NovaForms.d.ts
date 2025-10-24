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

  // MARK: InputCheckbox

  interface InputCheckboxField {
    name: string;
    label?: string;
    optional?: boolean;
    description?: string;
    error?: string;
  }

  interface InputCheckboxProps {
    field: InputCheckboxField;
    value: any;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
  }

  function InputCheckbox(props: InputCheckboxProps): JSX.Element;

  // MARK: InputColor

  interface InputColorField {
    name: string;
    title?: string;
    description?: string;
    optional?: boolean;
    error?: string;
  }

  interface InputColorProps {
    field: InputColorField;
    value: any;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
  }

  function InputColor(props: InputColorProps): JSX.Element;

  // MARK: InputDate

  interface InputDateField {
    name: string;
    title?: string;
    description?: string;
    optional?: boolean;
    required?: boolean;
    error?: string;
  }

  interface InputDateProps {
    field: InputDateField;
    value: any;
    theme: NovaFormsTheme;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
  }

  function InputDate(props: InputDateProps): JSX.Element;

  // MARK: InputDefault

  interface InputDefaultField {
    name: string;
    title?: string;

    /**
     * Default: `text`
     */
    type?: string;

    /**
     * Default: `Enter text`
     */
    placeholder?: string;

    description?: string;
    required?: boolean;
    error?: string;
    helper?: string;
    leadingIcon?: boolean;
    trailingIcon?: boolean;
  }

  interface InputDefaultProps {
    field: InputDefaultField;
    value: any;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    theme: NovaFormsTheme;
  }

  function InputDefault(props: InputDefaultProps): JSX.Element;

  // MARK: InputNumber

  interface InputNumberField {
    name: string;
    label?: string;

    /**
     * Default: `Enter a number`
     */
    placeholder?: string;

    description?: string;
    optional?: boolean;
    error?: string;

    // TODO: Are strings okay here? The technical input is `string | number`. -Josh
    min: number;
    max: number;
    step: number;
  }

  interface InputNumberProps {
    field: InputNumberField;
    value: any;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
  }

  function InputNumber(props: InputNumberProps): JSX.Element;

  // MARK: InputTextArea

  interface InputTextAreaField {
    name: string;
    title?: string;

    /**
     * Default: `4`
     */
    rows: number;

    /**
     * Default: `Enter text`
     */
    placeholder?: string;

    description?: string;
    optional?: boolean;
    error?: string;
  }

  interface InputTextAreaProps {
    field: InputTextAreaField;
    value: any;
    theme: NovaFormsTheme;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
  }

  function InputTextArea(props: InputTextAreaProps): JSX.Element;

  // MARK: InputToggle

  interface InputToggleField {
    name: string;
    title?: string;
    description?: string;
    error?: string;
  }

  interface InputToggleProps {
    field: InputToggleField;
    value: any;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
  }

  function InputToggle(props: InputToggleProps): JSX.Element;

  // MARK: MediaSelectorModal

  interface MediaSelectorModalProps {
    onSelect: (url: string) => void;
    
    value: any;

    /**
     * Default: `Select Media`
     */
    label?: string;
  }

  function MediaSelectorModal(props: MediaSelectorModalProps): JSX.Element;

  // #endregion
}
