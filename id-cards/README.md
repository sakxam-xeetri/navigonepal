# Navigo Nepal — Member ID Cards Folder (`id-cards/`)

This directory contains the official **Identity Card (ID Card) System & Batch Generator** for all Navigo Nepal members, matching designations from the official website (`team.html`) and incorporating the full contact directory.

---

## 📁 Directory Contents

- **`index.html`** — Interactive Web Portal for viewing, filtering, searching, flipping, generating, and printing official member ID cards.
- **`members.json`** — Centralized JSON database containing all 17 member profiles with names, official posts/designations, category, phone numbers, email addresses, blood groups, photo references, member IDs (`NVG-2026-XXX`), and validity periods.
- **`id-card-styles.css`** — CR80 ID Card CSS specification (54mm × 85.6mm standard vertical format, front & back layout, 3D flip effect, holographic badge, barcode, and `@media print` A4 layout rules).
- **`id-card-script.js`** — Dynamic card rendering logic, live search, department filter tabs, custom card creation modal, and high-resolution print triggers.
- **`README.md`** — Documentation and usage guide.

---

## 👥 Members Included in ID Card Database

Below is the complete roster of ID cards generated from the website roles and updated contact details:

| Member ID | Full Name | Official Website Post / Designation | Phone Number | Email Address / Info |
| :--- | :--- | :--- | :--- | :--- |
| **NVG-2026-001** | Anupam Neupane | Co-Founder & Executive Director | +977 980-1234567 | anupam.neupane@navigonepal.org |
| **NVG-2026-002** | Biyog Man Dangol | Co-Founder & Strategy Lead | +977 980-1234568 | biyog.dangol@navigonepal.org |
| **NVG-2026-003** | Prajwal Dhungana | Co-Founder & Programs Director | +977 980-1234569 | prajwal.dhungana@navigonepal.org |
| **NVG-2026-004** | Prasoon Bhatta | Operations/HR Head | **+977 976-8422422** | prasoon.bhatta@navigonepal.org |
| **NVG-2026-005** | Sakshyam Bastakoti | IT/Media Head | **+977 976-3374079** | **sakshyamxeetri@gmail.com** |
| **NVG-2026-006** | Usnish Bajracharya | Design & Editing Head | **+977 981-3123920** | **ushnish2022@gmail.com** |
| **NVG-2026-007** | Shalin Dahal (Sahil) | Communication Head | **+977 981-8277423** | **samriddhidahal713@gmail.com** |
| **NVG-2026-008** | Ansu Adhikari | Executive Member | **+977 976-2565335** | **adhikariansu05@gmail.com** |
| **NVG-2026-009** | Abhi KC | Documentation Head | **+977 976-4320750** | **acedabhi.17@gmail.com** |
| **NVG-2026-010** | Prithivi Raj Poudel | Research & Presentation Head | **+977 981-8354090** | prithivi.poudel@navigonepal.org |
| **NVG-2026-011** | Sakshyam Bista | Outreach Head | **+977 976-3374079** | **sakshyam.bista12@gmail.com** |
| **NVG-2026-012** | Gaurav Acharya | Logistics Head | **+977 976-8422422** | **thegauravacharya1@gmail.com** (`@gaurav.acharya1`) |
| **NVG-2026-013** | Ujjwal Dhungana | Consultant / Entrepreneur (Advisor) | +977 980-9990001 | ujjwal.dhungana@navigonepal.org |
| **NVG-2026-014** | Upama Nyaupane | Educator / Researcher (Advisor) | +977 980-9990002 | upama.nyaupane@navigonepal.org |
| **NVG-2026-015** | Santosh Gajureal | Consultant (Advisor) | +977 980-9990003 | santosh.gajureal@navigonepal.org |
| **NVG-2026-016** | Swapnil Sapkota | Alumni & Founding Member | +977 980-8880001 | swapnil.sapkota@navigonepal.org |
| **NVG-2026-017** | Atal Raj Paudel | Alumni & Founding Member | +977 980-8880002 | atal.paudel@navigonepal.org |

---

## 🖨️ How to Print & Export ID Cards

1. Open `id-cards/index.html` in any web browser.
2. Click **"Print Card"** on any individual member card to open a print-ready window with Front and Back sides side-by-side.
3. Click **"Print All ID Cards"** in the top navigation bar to render all member cards into an A4 print layout ready for printing onto card stock or PVC plastic cards.
4. Use **"Flip Card"** or click on any card to view the reverse side containing emergency contacts, terms of membership, QR verification code, and signature block.

---

## ➕ Adding New Members

To add new members:
- Use the **"New Member Card"** button inside the portal to create a card directly on screen.
- Or append a new JSON object into `id-cards/members.json`.
