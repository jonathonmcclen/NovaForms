# 🪶 Nova Forms

**Dynamic React forms powered by JSON schemas, modifiers, and subforms.**  
Create complex, adaptive form systems without boilerplate — designed for scale, simplicity, and composability.

[![npm version](https://img.shields.io/npm/v/nova-forms.svg)](https://www.npmjs.com/package/nova-forms)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Build](https://github.com/jonathonmcclendon/NovaForms/actions/workflows/build.yml/badge.svg)](https://github.com/jonathonmcclendon/NovaForms/actions)
[![Contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg)](https://github.com/jonathonmcclendon/NovaForms/issues)

---

## ⚙️ Installation

```bash
npm install nova-forms
# or
yarn add nova-forms
```

Nova Forms requires **React 18+** and **React DOM 18+** as peer dependencies.

---

## 🚀 Quick Start

The simplest way to get started:

```jsx
import { useState } from "react";
import { NovaForm } from "nova-forms";

const fields = [
  { name: "firstName", label: "First Name", type: "string", width: 50 },
  { name: "lastName", label: "Last Name", type: "string", width: 50 },
  { name: "email", label: "Email", type: "email", width: 100 },
  { name: "subscribe", label: "Subscribe?", type: "boolean", width: 100 },
];

export default function App() {
  const [formData, setFormData] = useState({});

  return (
    <NovaForm
      fields={fields}
      value={formData}
      onChange={setFormData}
    />
  );
}
```

---

## ✨ Features

- ⚡ **Controlled forms** — simple `value`/`onChange` pattern like React inputs
- 🧩 **Composable** — each field is a reusable React component
- 🔄 **Modifiers & conditional logic** — dynamic show/hide and field dependencies
- 📱 **Responsive layout** — automatic width handling with Tailwind classes
- 🧱 **Subforms** — nested or repeated field groups are first-class citizens
- 🎨 **Theming-ready** — customize UI with Tailwind or your own design system
- 🔌 **Extensible** — register your own field components via `registerField()`

---

## 🧩 Example: Registering Custom Fields

You can extend Nova Forms with your own field types:

```jsx
import { registerField } from "nova-forms";

function QRCodeScannerField({ field, value, onChange }) {
  return (
    <div>
      <p>Scan QR Code for {field.label}</p>
      {/* Your scanner logic */}
    </div>
  );
}

registerField("qrScanner", QRCodeScannerField);
```

Now use it in your fields array:

```jsx
const fields = [
  {
    name: "eventCheckIn",
    label: "Check In",
    type: "qrScanner",
    width: 100
  }
];
```

---

## 🧠 API Overview

### `NovaForm`

Renders a form based on your field array with integrated modifiers and conditions.

| Prop           | Type                  | Description                                     |
| -------------- | --------------------- | ----------------------------------------------- |
| `fields`       | `array`               | Array of field definitions                      |
| `value`        | `object`              | Form data object (controlled)                   |
| `onChange`     | `function`            | Callback fired with updated form data           |
| `theme`        | `object` _(optional)_ | Custom theme overrides                          |
| `isMobileView` | `boolean` _(optional)_ | Force mobile layout (full width)               |

### Field Schema

Each field object supports:

| Property | Type | Description |
|----------|------|-------------|
| `name` | `string` | Field name (required) |
| `type` | `string` | Field type (string, email, boolean, etc.) |
| `label` | `string` | Display label |
| `width` | `number` | Width percentage (25, 50, 75, 100) |
| `default` | `any` | Default value |
| `readOnly` | `boolean` | Make field read-only |
| `modifiers` | `array` | Array of modifier rules |
| `conditions` | `object` | Show/hide and disable conditions |

### Modifiers

Modifiers automatically update dependent fields:

```jsx
{
  name: "firstName",
  type: "string",
  modifiers: [
    {
      target: "fullName",
      type: "concat",
      when: "true",
      value: " " // adds space
    }
  ]
}
```

### Conditions

Control field visibility and state:

```jsx
{
  name: "subscribe",
  type: "boolean",
  conditions: {
    hiddenWhen: {
      field: "age",
      when: "less than",
      value: 18
    }
  }
}
```

---

## 🧱 Architecture Overview

Nova Forms is organized for **extensibility** and **maintainability**:

```
src/
├── core/              → field registry and evaluation
├── formFields/        → built-in field components
├── handlers/          → form handlers and modifiers
├── utils/             → shared utilities
├── NovaForm.jsx       → main form component
└── returnFields.jsx   → field renderer
```

---

## 🔄 Migration from Manual Field Mapping

If you're currently mapping fields manually:

**Before:**
```jsx
import { ReturnFieldsV2, createFormHandler, initializeFormData } from "nova-forms";

const [formData, setFormData] = useState(() => initializeFormData(fields));
const handleChange = createFormHandler({ fields, setState: setFormData });

return (
  <div className="-mx-2 flex flex-wrap">
    {fields.map((field) => (
      <div key={field.name} className={`${getWidthClass(field.width)} mb-4 px-2`}>
        <ReturnFieldsV2
          field={field}
          value={formData[field.name]}
          onChange={handleChange}
        />
      </div>
    ))}
  </div>
);
```

**After:**
```jsx
import { NovaForm } from "nova-forms";

const [formData, setFormData] = useState({});

return (
  <NovaForm
    fields={fields}
    value={formData}
    onChange={setFormData}
  />
);
```

---

## 🤝 Contributing

We welcome pull requests and feature suggestions!

1. Fork the repo
2. Create a feature branch

   ```bash
   git checkout -b feature/your-feature
   ```

3. Commit your changes

   ```bash
   git commit -m "Add new feature"
   ```

4. Push to your branch

   ```bash
   git push origin feature/your-feature
   ```

5. Open a pull request

> 🔒 Only approved code owners can merge to main.
> See `.github/CODEOWNERS` for details.

---

## 🪪 License

Licensed under the [MIT License](LICENSE).
Copyright © 2025 [Jonathon McClendon](https://github.com/jonathonmcclendon)

---

## 💡 Maintained by

**Jonathon McClendon**
Creator of Nova Forms — building high-performance tools for scalable React ecosystems.

---

### 🌟 Support the Project

If Nova Forms helps you ship faster or cleaner React code:

- ⭐ Star the repo
- 🐛 Open an issue for bugs or feature ideas
- 💬 Share it with other developers

---

> _"A form library that feels invisible — flexible, composable, and future-proof."_

---

### 🧭 Next Steps (Roadmap Ideas)

- [ ] Advanced validation layer (Yup / Zod integration)
- [ ] Enhanced theming system (context-aware)
- [ ] Field group templates (grid layouts)
- [ ] Better documentation with examples gallery
- [ ] TypeScript definitions (optional)

---
