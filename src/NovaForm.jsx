import React, { useEffect } from "react";
import { ReturnFieldsV2 } from "./returnFields";
import { initializeFormData } from "./utils/initializeFormData";
import { applyModifierType } from "./utils/applyModifierType";
import { evaluateCondition } from "./handlers/createFormHandler";

function getWidthClass(width, isMobileView) {
  if (isMobileView) return "w-full";
  switch (width) {
    case 25:
      return "w-full sm:w-1/4";
    case 50:
      return "w-full sm:w-1/2";
    case 75:
      return "w-full sm:w-3/4";
    case 100:
    default:
      return "w-full";
  }
}

function applyModifiersForField({ fields, data, changedName, changedValue }) {
  const nextData = { ...data };
  const fieldDef = fields.find((f) => f.name === changedName);
  if (!fieldDef || !Array.isArray(fieldDef.modifiers)) return nextData;

  fieldDef.modifiers.forEach((modifier) => {
    const {
      target,
      type,
      kind = "number",
      when,
      value: ruleValue,
      strictString = false,
    } = modifier;

    if (!target) return;

    if (evaluateCondition(changedValue, when, ruleValue)) {
      const targetVal = strictString
        ? String(nextData[target] || "")
        : Number(nextData[target] || 0);
      const modVal = strictString ? String(ruleValue) : Number(ruleValue);

      nextData[target] = applyModifierType({
        type,
        kind,
        targetValue: targetVal,
        modifierValue: modVal,
        strictString,
      });
    }
  });

  return nextData;
}

function applyAllModifiersOnce(fields, data) {
  let next = { ...data };
  fields.forEach((f) => {
    const currentValue = next[f.name];
    next = applyModifiersForField({ fields, data: next, changedName: f.name, changedValue: currentValue });
  });
  return next;
}

function isHidden(field, data) {
  const cond = field?.conditions?.hiddenWhen;
  if (!cond) return false;
  const trigger = data?.[cond.field];
  return evaluateCondition(trigger, cond.when, cond.value);
}

function isDisabled(field, data) {
  const cond = field?.conditions?.disabledWhen;
  if (!cond) return false;
  const trigger = data?.[cond.field];
  return evaluateCondition(trigger, cond.when, cond.value);
}

export function NovaForm({
  fields = [],
  value,
  onChange,
  theme,
  isMobileView = false,
}) {
  // On first mount (or when fields change), if value is empty/undefined, initialize and emit to parent
  useEffect(() => {
    if (!onChange) return;
    const isEmpty = !value || (typeof value === "object" && Object.keys(value).length === 0);
    if (isEmpty) {
      const initialized = initializeFormData(fields);
      const withDerived = applyAllModifiersOnce(fields, initialized);
      onChange(withDerived);
    }
  }, [fields]);

  function handleChange(eOrValue, fieldName) {
    if (!onChange) return;

    let name, newValue, type, checked, files;
    if (eOrValue?.target) {
      const e = eOrValue;
      name = e.target.name;
      newValue = e.target.value;
      type = e.target.type;
      checked = e.target.checked;
      files = e.target.files;
    } else {
      name = fieldName;
      newValue = eOrValue;
    }

    if (type === "checkbox") newValue = checked;
    if (type === "file") newValue = files?.[0] ?? newValue;

    const baseData = value || {};
    let nextData = { ...baseData, [name]: newValue };

    // Apply modifiers for the changed field
    nextData = applyModifiersForField({
      fields,
      data: nextData,
      changedName: name,
      changedValue: newValue,
    });

    onChange(nextData);
  }

  const data = value || {};

  return (
    <div className="w-full">
      <div className="-mx-2 flex flex-wrap">
        {fields
          .filter((field) => !isHidden(field, data))
          .map((field, index) => (
            <div
              key={field.name || index}
              className={`${getWidthClass(field.width || 100, isMobileView)} mb-4 px-2`}
            >
              <ReturnFieldsV2
                onChange={handleChange}
                value={data[field.name] ?? field.default ?? ""}
                field={{
                  ...field,
                  title: field.label || field.title || field.name,
                  disabled: isDisabled(field, data),
                }}
                theme={theme}
              />
            </div>
          ))}
      </div>
    </div>
  );
}


