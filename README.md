# Finances - Financial Control Application

A modern, responsive financial management application built with React, TypeScript, and other modern web technologies. This application allows users to track their finances, manage transactions, set budgets, and analyze spending habits through an intuitive dashboard interface.

## Features

- **Dashboard Overview**: A comprehensive dashboard displaying financial summaries and key metrics
- **Transaction Management**: Add, edit, and categorize income and expenses
- **Budget Planning**: Create and track budgets for different spending categories
- **Financial Goals**: Set and monitor progress towards savings goals
- **Financial Analysis**: Visualize spending patterns and trends over time
- **Settings Management**: Customize application preferences and display options
- **Responsive Design**: Optimized for both desktop and mobile devices
- **Dark/Light Theme**: Support for both light and dark color schemes

## Technology Stack

- **Frontend Framework**: React with TypeScript
- **Routing**: React Router
- **Styling**: Tailwind CSS with shadcn/ui components
- **State Management**: React Context API
- **Form Handling**: React Hook Form with Zod validation
- **Internationalization**: i18next
- **Icons**: Lucide React

## Project Structure

```
src/
├── components/           # UI components
│   ├── ui/               # Base UI components (shadcn/ui)
│   └── ...               # Application-specific components
├── contexts/             # React context providers
│   ├── AppSettingsContext.tsx  # Application settings
│   ├── TransactionContext.tsx  # Transaction management
│   └── hooks/            # Custom hooks for contexts
├── hooks/                # General custom hooks
├── i18n/                 # Internationalization setup
├── lib/                  # Utility libraries
├── pages/                # Page components
│   ├── Dashboard.tsx     # Main dashboard
│   ├── Transactions.tsx  # Transaction management
│   ├── Budgets.tsx       # Budget planning
│   ├── Goals.tsx         # Financial goals
│   ├── Analysis.tsx      # Financial analysis
│   └── Settings.tsx      # Application settings
├── styles/               # Global styles
├── App.tsx               # Main application component
└── main.tsx              # Application entry point
```

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/finances.git
   cd finances
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173` (or the port shown in your terminal)

## Usage

### Dashboard

The dashboard provides an overview of your financial situation, including:
- Current balance
- Income and expense summaries
- Recent transactions
- Budget status
- Financial goals progress

### Transactions

The transactions page allows users to:
- View all financial transactions
- Add new income or expenses
- Filter transactions by date, category, or amount
- Edit or delete existing transactions

### Budgets

The budgets page enables users to:
- Create budgets for different spending categories
- Track spending against budget limits
- Visualize budget utilization
- Receive warnings when approaching budget limits

### Goals

The goals page allows users to:
- Set financial saving goals
- Track progress towards goals
- Set target dates for achieving goals
- Visualize progress over time

### Analysis

The analysis page provides:
- Spending trends over time
- Category breakdown of expenses
- Income vs. expense comparisons
- Custom date range analysis

### Settings

The settings page allows customization of:
- Display preferences
- Currency format
- Date format
- Theme selection (light/dark)
- Language preferences

## Responsive Design

The application is fully responsive with:
- A sidebar navigation for desktop views
- A collapsible menu for mobile devices
- Optimized layouts for different screen sizes
- Touch-friendly interface elements

## Customization

### Themes

The application supports both light and dark themes, which can be toggled in the settings or automatically applied based on system preferences.

### Internationalization

The application supports multiple languages through i18next. Currently implemented languages:
- Portuguese (Brazil)
- English (coming soon)

## Development

### Adding New Features

When adding new features, follow these guidelines:
1. Create components in the appropriate directories
2. Use the existing context providers for state management
3. Follow the established styling patterns with Tailwind CSS
4. Add translations for all user-facing text

### Code Style

This project follows consistent code style using:
- ESLint for code quality
- Prettier for code formatting
- TypeScript for type safety

## License

This project is licensed under the MIT License - see the LICENSE file for details. 