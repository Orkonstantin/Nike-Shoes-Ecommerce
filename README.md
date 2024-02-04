# Nike Shoes E-commerce

This is a React and Next.js project for an E-commerce store. It provides a user interface for browsing products, adding them to a shopping cart, and checking out.

## Project Description

The E-commerce Store is designed to provide a seamless shopping experience. It offers a user-friendly interface for browsing products, adding them to a shopping cart, and checking out.  
This project is ideal for E-commerce store owners, administrators, and developers who want to provide a top-notch shopping experience for their customers.

## Features

- Product Browsing: View and search for products.
- Shopping Cart: Add products to a shopping cart and manage the cart.
- Checkout: Enter shipping information and place an order.

## Installation and Setup Instructions

To get started with the E-commerce Store, follow these steps:

1. Clone the repository to your local machine.
2. Install the required dependencies by running the following command:
    ```bash
    npm install
    ```
3. Copy the `.env` file and set up the necessary environment variables.
4. Start the development server by running the following command:
    ```bash
    npm run dev
    ```
5. Open http://localhost:3000 in your browser to access the store.

## Payment Processing

This project uses [Stripe](https://stripe.com/) for payment processing. Stripe provides the infrastructure for securely handling payments and transferring money between your application and your bank account. 

To use Stripe in this project, you need to set up a Stripe account, create a new application, and obtain your API keys. These keys should be added to your `.env` file as `STRIPE_PUBLIC_KEY` and `STRIPE_SECRET_KEY`.

The [`/api/checkout`](command:_github.copilot.openSymbolInFile?%5B%22pages%2Fapi%2Fwebhook.js%22%2C%22%2Fapi%2Fcheckout%22%5D "pages/api/webhook.js") and [`/api/webhook`](command:_github.copilot.openSymbolInFile?%5B%22pages%2Fapi%2Fwebhook.js%22%2C%22%2Fapi%2Fwebhook%22%5D "pages/api/webhook.js") endpoints in the [`pages/api`](command:_github.copilot.openRelativePath?%5B%22pages%2Fapi%22%5D "pages/api") directory handle the checkout process and Stripe webhook events, respectively.

## Components

The project includes several reusable components:

- [Button](components/Button.js): A reusable button component.
- [ButtonLink](components/ButtonLink.js): A button that acts as a link.
- [CancelMessage](components/CancelMessage.js): A message displayed when an action is cancelled.
- [CartContext](components/CartContext.js): The context for managing the shopping cart.
- [Center](components/Center.js): A component for centering its children.
- [Dropdown](components/Dropdown.js): A dropdown component.
- [Featured](components/Featured.js): A component for displaying featured products.
- [Footer](components/Footer.js): The footer component.
- [Header](components/Header.js): The header component.
- [Input](components/Input.js): A reusable input component.
- [NewProducts](components/NewProducts.js): A component for displaying new products.
- [ProductBox](components/ProductBox.js): A component for displaying a product.
- [ProductImages](components/ProductImages.js): A component for displaying product images.
- [ProductsGrid](components/ProductsGrid.js): A component for displaying a grid of products.
- [SuccessMessage](components/SuccessMessage.js): A message displayed when an action is successful.
- [Table](components/Table.js): A reusable table component.
- [Title](components/Title.js): A reusable title component.
- [WhiteBox](components/WhiteBox.js): A white box that can be used as a container for other components.

## Libraries

The project uses the following libraries:

- [React](https://reactjs.org/): For building the user interface.
- [Next.js](https://nextjs.org/): For server-side rendering, routing, and tooling.
- [Tailwind CSS](https://tailwindcss.com/): For styling the application.

## Acknowledgments

This project uses product images and the logo of Nike. I am grateful for their high-quality assets. Please note that this project is for educational and non-commercial purposes. All rights and credits for the images and logo belong to Nike, Inc.