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
import { NovaForm } from "nova-forms";

const schema = {
  fields: [
    { name: "firstName", label: "First Name", type: "text" },
    { name: "email", label: "Email", type: "email" },
    { name: "subscribe", label: "Subscribe?", type: "checkbox" },
  ],
};

export default function App() {
  return (
    <NovaForm
      schema={schema}
      onSubmit={(data) => console.log("Form submitted:", data)}
    />
  );
}
```

---

## ✨ Features

- ⚡ **JSON-driven** — define forms using simple schema objects
- 🧩 **Composable** — each field is a reusable React component
- 🔄 **Modifiers & conditional logic** — dynamic show/hide, enable/disable, and validation
- 🧠 **Hooks-first API** — integrate easily with your app state
- 🧱 **Subforms** — nested or repeated field groups are first-class citizens
- 🎨 **Theming-ready** — customize UI with Tailwind, Chakra, or your own design system
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

Now use it in your schema:

```js
{
  name: "eventCheckIn",
  label: "Check In",
  type: "qrScanner",
}
```

---

## 🧠 API Overview

### `NovaForm`

Renders a form based on your JSON schema.

| Prop           | Type                  | Description                                     |
| -------------- | --------------------- | ----------------------------------------------- |
| `schema`       | `object`              | The schema that defines fields and their layout |
| `onSubmit`     | `function`            | Callback fired with form data on submit         |
| `theme`        | `object` _(optional)_ | Custom theme overrides                          |
| `initialState` | `object` _(optional)_ | Prefilled form values                           |

---

### `useForm()`

React hook to manage state manually in custom renderers.

```jsx
import { useForm } from "nova-forms";

const { formData, handleChange } = useForm({ fields, initialState });
```

---

### `registerField(type, component)`

Registers a custom input component available to all Nova Forms.

---

### `setTheme(overrides)`

Globally override the form theme.

```js
import { setTheme } from "nova-forms";

setTheme({
  input: { className: "bg-gray-100 border border-gray-300" },
});
```

---

## 🧱 Architecture Overview

Nova Forms is organized for **extensibility** and **maintainability**:

```
src/
├── core/              → form logic, registry, evaluation
├── hooks/             → React hooks (e.g. useForm)
├── formFields/        → built-in field components
├── components/        → NovaForm renderer, theming, helpers
├── theme/             → theme context and defaults
└── utils/             → shared utilities
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

> _“A form library that feels invisible — flexible, composable, and future-proof.”_

---

### 🧭 Next Steps (Roadmap Ideas)

- [ ] TypeScript definitions (`index.d.ts`)
- [ ] Built-in validation layer (Yup / Zod integration)
- [ ] Advanced theming system (context-aware)
- [ ] Field group templates (grid layouts)
- [ ] Better documentation with examples gallery

---

```

---

Would you like me to make this **auto-format and badge-resolve correctly for GitHub** (e.g. correct URLs for your repo badges and license link) so it’s copy-paste ready for your actual repo page?
```
