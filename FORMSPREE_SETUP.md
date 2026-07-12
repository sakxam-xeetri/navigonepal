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

## Step 4: Active Endpoints in the Project
The forms in the codebase are now fully populated with your live Formspree endpoint IDs:

| Form Name | Target File(s) | Endpoint / Form ID | Status |
| :--- | :--- | :--- | :--- |
| **Volunteer Form** | [volunteer.html](file:///d:/navigonepal/volunteer.html) & [index.html](file:///d:/navigonepal/index.html) | `xpqvabpr` | Connected |
| **Contact Form** | [index.html](file:///d:/navigonepal/index.html) | `xkodwyjz` | Connected |
| **Internship Form** | [intern.html](file:///d:/navigonepal/intern.html) | `xrenzjpo` | Connected |
| **Join Form** | [join.html](file:///d:/navigonepal/join.html) | `mbdnrwgq` | Connected |
| **Project Proposal** | [propose-project.html](file:///d:/navigonepal/propose-project.html) | `xnjeawpw` | Connected |
| **Donation Form** | [index.html](file:///d:/navigonepal/index.html) | `xdaqnbev` | Connected |

## Step 5: Commit and Deploy
Save your changes and deploy them to GitHub Pages by executing the following terminal commands:

```bash
git add .
git commit -m "Connect forms to Formspree"
git push
```

GitHub Pages will automatically rebuild and deploy your updated static site.
