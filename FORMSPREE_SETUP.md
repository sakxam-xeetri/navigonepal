# Formspree Integration Setup Guide

Follow these simple steps to configure the forms on your website to submit to your Formspree account.

## Step 1: Create a Formspree Account
Go to [https://formspree.io](https://formspree.io) and register for a free account.

## Step 2: Verify Your Email
Check your inbox and verify the email address used for your Formspree registration to activate your account.

## Step 3: Create Forms
Create a new project in your Formspree dashboard, and create **six (6) separate forms** with the following name suggestions to keep submissions organized:
* **Volunteer Form** (for general applications and the homepage modal popup)
* **Contact Form** (for the homepage contact section)
* **Internship Form** (for internship requests)
* **Join Form** (for general inquiries)
* **Project Proposal** (for submitting new campaign or curriculum ideas)
* **Donation Form** (for securing secure sponsorships)

## Step 4: Copy Form Endpoints
For each form you created, copy the unique Formspree endpoint URL from the integration dashboard.
Example endpoint: `https://formspree.io/f/xdkjweop`

## Step 5: Replace Placeholders in the Project Files
Search your workspace files for the following placeholder IDs and replace them with your actual Formspree form IDs:

| Placeholder ID | Target Forms / Files |
| :--- | :--- |
| `REPLACE_VOLUNTEER_ID` | `volunteer.html` (form action) & `index.html` (modal form action) |
| `REPLACE_CONTACT_ID` | `index.html` (contact form action) |
| `REPLACE_INTERNSHIP_ID` | `intern.html` (form action) |
| `REPLACE_JOIN_ID` | `join.html` (form action) |
| `REPLACE_PROJECT_ID` | `propose-project.html` (form action) |
| `REPLACE_DONATION_ID` | `index.html` (donation modal form action) |

*You can open the project in your editor and perform a global search-and-replace for these keywords.*

## Step 6: Commit and Deploy
Save your changes and deploy them to GitHub Pages by executing the following terminal commands:

```bash
git add .
git commit -m "Connect forms to Formspree"
git push
```

GitHub Pages will automatically rebuild and deploy your updated static site.
