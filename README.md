# React Intern Assignment - Spreadsheet Prototype

## Overview

This project is a front-end React prototype of a spreadsheet interface designed to match the provided Figma design. It includes a Google Sheets/Excel-like spreadsheet experience with interactive elements and basic functionality.

## Features

- Pixel-perfect implementation of the Figma design
- Spreadsheet-like interface with editable cells
- CRUD operations (Create, Read, Update, Delete)
- Data import/export (CSV format)
- Search functionality
- Tab-based filtering
- Share modal dialog
- Responsive design

## Tech Stack

- React 18 (Vite)
- TypeScript (strict mode)
- Tailwind CSS for styling
- Custom table component (no external table library)
- Local component state management

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/react-spreadsheet-prototype.git
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open your browser to:
   ```
   http://localhost:5173
   ```

5. To build for production:
   ```bash
   npm run build
   ```

## Implementation Details

### Key Components

1. **SpreadsheetTable**: The main table component that handles rendering and editing of cells
2. **Toolbar**: Contains all the action buttons (import, export, share, etc.)
3. **StatusBadge**: Custom component for displaying status with appropriate colors
4. **PriorityBadge**: Custom component for displaying priority levels
5. **ShareModal**: Modal dialog for sharing the spreadsheet

### Trade-offs and Decisions

1. **Custom Table Implementation**: 
   - Chose to implement a custom table component instead of using react-table to have more control over the styling and behavior
   - This allowed for perfect pixel matching with the Figma design

2. **State Management**:
   - Used React's useState for all state management
   - Considered using useReducer for more complex state logic but kept it simple with useState
   - For a production app with more complexity, would consider Zustand or Redux

3. **Editing Functionality**:
   - Implemented inline editing with save/cancel buttons
   - Could have used double-click to edit but chose explicit edit buttons for clarity

4. **Performance**:
   - Currently renders all rows at once
   - For a very large dataset, would implement virtualization (react-window)
   - Didn't implement this as the assignment specified a static prototype

5. **Accessibility**:
   - Basic accessibility features implemented (labels, focus states)
   - Would need more work for full WCAG compliance in production

## Stretch Goals Implemented

1. **Keyboard Navigation**:
   - Basic arrow key navigation between cells when editing
   - Tab/Shift+Tab to move between editable fields

2. **Column Resize**:
   - Implemented basic column resizing by dragging column borders

## Future Improvements

1. Add more comprehensive form validation
2. Implement proper error handling
3. Add undo/redo functionality
4. Improve accessibility
5. Add more sophisticated filtering and sorting
6. Implement collaborative editing features
7. Add support for formulas and calculations
