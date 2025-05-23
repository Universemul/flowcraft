# FlowCraft

**Visualize and model your data flows and system architecture using the power of the [C4 Model](https://c4model.com/) — structured, nested, and beautiful.**



---

## 🚀 Features

* 🧠 Built on the C4 Model (Context, Container, Component views)
* ⚙️ Visual editor with zoomable nested diagrams
* 🧩 Support for multi-level architecture (C4 Level 1 → 3)
* 🗂️ Grouping of components within flows to create timelines and evolution views
* 🧭 Interactive user journeys: step through flows node-by-node
* 🏷️ Tagging system to classify and filter components by domain, team, or technology
* ⚠️ Risk indicators to highlight components with vulnerabilities, instability, or critical impact
* 📚 C4-based component library: people, systems, containers, components
* 🔗 Link nodes to source code, documentation, or external URLs
* 💾 JSON-based storage for flow state and versioning
* 📁 Multiple projects and flow diagrams management

---

## 📚 C4 Component Library

### Level 1 — **Context Diagram**

| Type              | Description                          |
| ----------------- | ------------------------------------ |
| `External Person` | End-user or external actor           |
| `External System` | Third-party system (CRM, SaaS, etc.) |
| `Your System`     | The system being modeled             |

### Level 2 — **Container Diagram**

| Type              | Description                                   |
| ----------------- | --------------------------------------------- |
| `Web Application` | UI/frontend interface (e.g., React)           |
| `API / Backend`   | Backend logic/service (e.g., Django, Node.js) |
| `Database`        | Persistent storage (e.g., PostgreSQL, Redis)  |
| `Message Queue`   | Async communication (Kafka, RabbitMQ)         |
| `Worker`          | Background task processor (e.g., Celery)      |
| `Mobile App`      | iOS / Android client                          |

### Level 3 — **Component Diagram**

| Type                  | Description                    |
| --------------------- | ------------------------------ |
| `Controller`          | Handles user requests          |
| `Service / Logic`     | Core domain logic              |
| `Repository / DAO`    | Data access layer              |
| `Interface / Adapter` | External system bridge         |
| `Validator / Parser`  | Data transformation / cleaning |

Each component type includes default icons, suggested metadata (technology, notes), and can link to nested flows. You can also associate nodes with external URLs such as:

* 🔗 GitHub files or folders
* 📄 Documentation (Notion, Confluence)
* 🌐 API specs, dashboards, or internal tools

Additionally, **grouping nodes by phase or domain** enables timeline-like views to reflect system evolution, layered architecture, or user journeys.

### 🧭 User Journeys

FlowCraft supports interactive walkthroughs of a system or data flow — ideal for demos, onboarding, or documentation. You can:

* Define a **journey** as an ordered list of node IDs
* Navigate step-by-step using "Next" and "Previous" buttons
* Highlight the active node and its immediate connections
* Display contextual metadata, linked docs or code as you progress

This makes your diagrams not just static — but **narrated, explorable, and alive**.

---

## 📦 Tech Stack

* **Frontend**: React + React Flow
* **Backend**: Django + Django REST Framework
* **Database**: PostgreSQL (with JSON fields)

---

## 🧱 Database Schema Overview

```text
Project
- id
- name
- created_at

Flow
- id
- name
- project_id (FK)
- c4_level [context | container | component]
- layout_json

Node
- id
- name
- flow_id (FK)
- type [e.g., CONTROLLER, DB, API]
- config_json (props, appearance)
- nested_flow_id (nullable FK)
- external_link (optional URL to code or docs)
- group (optional string for phase, layer, etc.)
- tags [list of strings, e.g. ["auth", "public"]]
- risk_level [none | low | medium | high]

Connection
- id
- flow_id (FK)
- from_node_id (FK)
- to_node_id (FK)
- type [DATA | STREAM | CUSTOM]

Journey
- id
- flow_id (FK)
- name
- steps [ordered list of node_ids]
```

---


## 📬 Roadmap

TBD

---

## 💬 Feedback & Contributions

We love contributions! Whether it's an issue, pull request, or suggestion — feel free to participate. You can also give feedback via an issue :)

---

## 📜 License

MIT License — open to all, contributions welcome.

---

## ⭐ Support the Project

If you like FlowCraft, star the repo, share it, and show us what you build!
