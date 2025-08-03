
# 🧾 NetSuite + React Multi-Step Form Integration

This project is a client-side React application embedded inside a NetSuite Suitelet. It provides a modern, responsive, multi-step form UI that pulls data dynamically from a backend Suitelet (or mock API) and guides the user through structured input steps like banking details, billing info, and document uploads.

## 🚀 Purpose

NetSuite’s native UI can be limiting for modern, user-friendly workflows. This project demonstrates how to:

- Serve a **React-based UI from a Suitelet**
- Dynamically **fetch data from NetSuite or mock APIs**
- Use a **multi-step form wizard** to simplify data collection
- Maintain clean state and UX using React Hooks
- (Optionally) reuse the same code for external or internal user-facing flows

---

## 🧠 Architecture & Thought Process

### Why React inside NetSuite?

NetSuite Suitelets allow for HTML+JS rendering, but the UI is often clunky and not easily extendable. Embedding React allows us to:
- Create modular, responsive UIs with better user experience
- Fetch + display Suitelet data dynamically
- Reuse components across forms/steps
- Use Tailwind CSS for quick styling without relying on NetSuite theming

### Form Structure

The form is split into 4 logical steps:
1. **Bank Account Information** – account routing and payment metadata
2. **Document Uploads** – placeholder redirect buttons for document review/upload
3. **Billing Address** – vendor company details and contact info
4. **Bank Address** – institution details for verification/matching

Each step is wrapped in a `FormWrapper` that handles titles, navigation (back/continue), and progress tracking.

---

## ⚙️ Key Features

- ✅ Built with **React + Babel** (for local, inline JSX transformation)
- ✅ Uses **Tailwind CSS** for styling
- ✅ Fetches data from a Suitelet backend or mock API (like json-server)
- ✅ Safely handles form state using `useState`
- ✅ Implements a **controlled input system** to avoid React warnings
- ✅ Modular components: `Field`, `FormWrapper`, step forms, and utility handlers

---

## 🔄 Data Flow

1. On page load, `App()` triggers a `fetch()` call to a Suitelet or API
2. The returned `userData` is parsed into pre-filled `formValues`
3. Each form step is rendered with `initialValues` from that object
4. User modifies or confirms the fields step by step
5. Final review screen shows collected data as formatted JSON
6. (Future enhancement: submit data via POST back to NetSuite or other APIs)

---

## 🧪 Local Development Setup

You can run this project directly from a static HTML file in your browser, or embedded in a Suitelet:

### Option 1: Local Static Testing
1. Save the HTML output into a `.html` file
2. Serve with a local dev server (like Live Server or VSCode)
3. Use `json-server` to simulate the backend

```bash
npm install -g json-server
json-server --watch db.json --port 3001
```

Then fetch from:
```js
fetch("http://localhost:3001/userData")
```

### Option 2: Deploy Inside NetSuite
- Paste the HTML string into a Suitelet script using `context.response.write()`
- Point the internal fetch URL to another Suitelet that returns `userData` as JSON

---

## 📁 File Structure (Core Components)

```
/root
│
├─ index.html (or NetSuite Suitelet string)
├─ db.json (for json-server)
├─ /components
│   ├─ Field
│   ├─ BankAccountForm
│   ├─ BillingAddressForm
│   ├─ AddDocumentsForm
│   ├─ BankAddressForm
│   └─ FormWrapper
```

---

## ✍️ Future Enhancements

- [ ] Field-level validation + inline error display
- [ ] Actual file uploads (not just redirect buttons)
- [ ] Submission to NetSuite or external endpoint
- [ ] Rebuild with React CLI + precompiled assets (instead of inline Babel)
- [ ] Role-based access (vendor vs admin views)

---

## 🤝 Author

Built by [Collins Ilo], powered by coffee and NetSuite frustration.  

