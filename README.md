# CausalFunnel Shopify App Implementation Guide

## Overview

This guide provides a step-by-step implementation plan for building the **CausalFunnel Shopify App**, which injects a survey form into the cart page and provides an analytics dashboard.

## Screenshots
![image](https://github.com/user-attachments/assets/f1fad84a-25b2-419a-abb5-66100a3b484d)
![image](https://github.com/user-attachments/assets/7d69e95b-dd54-46c3-8de1-ac6aecc2b265)
![image](https://github.com/user-attachments/assets/141f3269-6bc4-4dee-9172-7d67d50def4e)

## Table of Contents

- [Setup and Onboarding](#setup-and-onboarding)
  - [Shopify Partners Account](#shopify-partners-account)
  - [Test Store Creation](#test-store-creation)
- [App Initialization](#app-initialization)
  - [Development Environment Setup](#development-environment-setup)
- [Implementing the Survey Form](#implementing-the-survey-form)
  - [Dynamic Survey Form on Cart](#dynamic-survey-form-on-cart)
  - [Form Design](#form-design)
  - [Client-Side Handling](#client-side-handling)
- [Backend Handling and Data Storage](#backend-handling-and-data-storage)
  - [API Endpoint](#api-endpoint)
  - [Data Storage](#data-storage)
- [Admin Dashboard for Analysis](#admin-dashboard-for-analysis)
  - [Dashboard Layout](#dashboard-layout)
  - [Data Visualization](#data-visualization)
- [Testing & Demo Video Creation](#testing--demo-video-creation)
  - [Testing in the Development Store](#testing-in-the-development-store)
  - [Recording the Demo Video](#recording-the-demo-video)
- [Documentation and Deliverables](#documentation-and-deliverables)
- [Project Structure](#project-structure)
- [Conclusion](#conclusion)

---

## Setup and Onboarding

### Shopify Partners Account

1. Sign up at [Shopify Partners](https://partners.shopify.com/).
2. Once approved, create a **development app** through the Partners Dashboard.
3. Configure the app settings:
   - Set the **App URL** to `https://localhost:3000`
   - Configure the **Redirect URI** to `https://localhost:3000/api/auth/callback`
   - Note your **API Key** and **API Secret Key**

### Test Store Creation

1. From your Shopify Partners dashboard, create a **development store**.
2. This store will be used exclusively for testing your app.

## App Initialization

### Development Environment Setup

1. Clone the repository or create a new Next.js project:

   ```sh
   npx create-next-app@latest causalfunnel-shopify-app
   cd causalfunnel-shopify-app
   ```

2. Install required dependencies:

   ```sh
   npm install @shopify/polaris mongodb
   ```

3. Set up environment variables in a `.env.local` file:

   ```plaintext
   SHOPIFY_API_KEY=your_api_key
   SHOPIFY_API_SECRET=your_api_secret
   MONGODB_URI=your_mongodb_connection_string
   MONGODB_DB=causalfunnel
   ```

## Implementing the Survey Form

### Dynamic Survey Form on Cart

1. Create the survey form component: `components/survey/survey-form.tsx`
2. Develop the script tag injection code: `lib/shopify-script-tag.ts`
3. Create an API endpoint to serve the script: `app/api/shopify/script-tag/route.ts`

### Form Design

1. Design a **flexible survey form** with different question types.
2. Ensure **responsiveness** for both desktop and mobile.
3. Implement **validation** for required fields.

### Client-Side Handling

1. Use JavaScript to **capture user responses**.
2. Validate inputs before submission.
3. Send responses to your **API endpoint**.

## Backend Handling and Data Storage

### API Endpoint

1. Create an API endpoint for survey submissions: `app/api/survey/submit/route.ts`
2. Implement **authentication and validation**.
3. Store responses in **MongoDB**.

### Data Storage

1. Set up MongoDB connection: `lib/mongodb.ts`
2. Design schema for **survey responses**.
3. Implement **error handling and logging**.

## Admin Dashboard for Analysis

### Dashboard Layout

1. Build the **admin dashboard** using Shopify Polaris components.
2. Create sections for **summary statistics, filtering, and data visualization**.
3. Implement the dashboard page: `app/dashboard/page.tsx`

### Data Visualization

1. Create **chart components** for visualizing survey data.
2. Implement API endpoints for analytics data: `app/api/survey/analytics/route.ts`
3. Connect the **dashboard to the backend API**.

## Testing & Demo Video Creation

### Testing in the Development Store

1. Install your app on the **test store**.
2. Test the **survey form** on the cart page.
3. Verify **data collection** and dashboard functionality.

### Recording the Demo Video

1. Record a complete **walkthrough** of the app setup and functionality.
2. Demonstrate the **survey on the cart page**.
3. Show the **dashboard analytics** features.

## Documentation and Deliverables

1. Create a **comprehensive README** with setup instructions.
2. Document the **code with comments**.
3. Provide the **source code repository and demo video**.

## Project Structure

```plaintext
causalfunnel-shopify-app/
├── app/
│   ├── api/
│   │   ├── shopify/
│   │   │   └── script-tag/
│   │   │       └── route.ts
│   │   └── survey/
│   │       ├── analytics/
│   │       │   └── route.ts
│   │       ├── responses/
│   │       │   └── route.ts
│   │       └── submit/
│   │           └── route.ts
│   ├── auth/
│   │   └── page.tsx
│   ├── dashboard/
│   │   └── page.tsx
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── dashboard/
│   │   ├── survey-editor.tsx
│   │   ├── survey-response-chart.tsx
│   │   └── survey-response-map.tsx
│   └── survey/
│       └── survey-form.tsx
├── lib/
│   ├── mongodb.ts
│   └── shopify-script-tag.ts
├── public/
├── styles/
│   └── globals.css
├── next.config.js
├── package.json
├── tailwind.config.js
└── tsconfig.json
```

## Conclusion

This implementation guide provides a comprehensive approach to building the **CausalFunnel Shopify App**. The app:

- Injects a **dynamic survey form** into the cart page
- Collects and stores **survey responses**
- Provides an **analytics dashboard** for merchants

### Key Technologies Used

- **Next.js** (App Router)
- **Shopify Polaris** (Admin UI components)
- **MongoDB** (Data storage)
- **Script tag injection** (Survey form deployment)
- **Analytics dashboard** (Data visualization)

By following this guide, you'll be able to create a **fully functional Shopify app** that meets all project requirements. 🚀
