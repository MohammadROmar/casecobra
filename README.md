# 📱 Casecobra

**Casecobra** is a full-featured web application for creating and customizing phone cases.  
It allows users to upload their own images, adjust their position, choose colors and materials, preview the final case with dynamic pricing, and complete payment securely via **Stripe**.

🔗 **Live Demo:** [casecobra-app.vercel.app](https://casecobra-app.vercel.app)

---

## ✨ Features

- 🎨 **Full Case Customization**
  - Upload your own image.
  - Adjust image position on the case.
  - Choose color and material/texture.

- 💰 **Dynamic Pricing**
  - Price updates automatically based on selected materials.

- 💳 **Secure Payments with Stripe**
  - Complete checkout process.
  - Payment verification using **Stripe Webhooks**.

- 👨‍💼 **Admin Dashboard**
  - View all completed orders.
  - Track weekly and monthly sales (not profit).
  - Admin account defined via environment variables.

---

## 🛠 Technologies Used

- Next.js 15 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4
- Prisma ORM
- Stripe API
- Kinde Authentication
- UploadThing
- Resend (Email service)
- shadcn/ui
- React Query

---

## 🧩 Environment Variables

Before running the project, create a `.env` file in the root directory and include the following variables:

```env
# Kinde Authentication
KINDE_CLIENT_ID=
KINDE_CLIENT_SECRET=
KINDE_ISSUER_URL=
KINDE_SITE_URL=
KINDE_POST_LOGOUT_REDIRECT_URL=
KINDE_POST_LOGIN_REDIRECT_URL=

# Admin
ADMIN_EMAIL=

# UploadThing
UPLOADTHING_TOKEN=

# Database (Prisma)
DATABASE_URL=

# Stripe
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=

# Public Server URL
NEXT_PUBLIC_SERVER_URL=

# Resend (for emails)
RESEND_API_KEY=
```

---

## 🚀 Installation & Local Setup

```bash
# 1️⃣ Clone the repository
git clone https://github.com/MohammadROmar/casecobra.git
cd casecobra

# 2️⃣ Install dependencies
npm install

# 3️⃣ Create a .env file
# and add your environment variable values as listed above

# 4️⃣ Setup the database
npx prisma generate
npx prisma db push

# 5️⃣ Start the development server
npm run dev
```

Open your browser at:
👉 http://localhost:3000

---

## 📊 Admin Access

```env
ADMIN_EMAIL=admin@example.com
```

Logging in with Kinde using this email grants access to the Admin Dashboard, where all orders and sales statistics can be viewed.

---
