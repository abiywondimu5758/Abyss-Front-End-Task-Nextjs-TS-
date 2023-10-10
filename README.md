
# Abyss-Front-End-Task

The application includes components like Header, ContentArea, ZoomableContent, and Card. Users can perform actions like zooming in/out, recentering the content, adding, editing, and deleting cards within the content area.
You can test it live [here](https://main--tubular-sprite-61fbc8.netlify.app/)

## Key Features

- **Zoomable Content Area**: Users can zoom in and out of the content area to view details or get an overview of the data.

- **Hierarchical Structure**: The content is organized hierarchically, with cards representing categories and services. Users can add, edit, and delete cards.

- **Recentering**: There is an option to recenter the content within the parent container, ensuring the focused area is at the center of the screen.

- **Interactive Cards**: Users can interact with the cards by adding child cards, editing text, and deleting cards.

## Components

- **Header**: Provides options for zooming in/out, recentering, and changing the view.

- **Content Area**: Contains the zoomable content and controls for navigation.

- **Zoomable Content**: The main content area where users can interact with cards.

- **Card**: Represents a single item in the hierarchy. Users can edit, add child cards, and delete cards.

## How to Use

1. **Zoom In/Out**: Use the zoom controls provided in the header to adjust the level of zoom.

2. **Recenter**: Click the recenter button in the header to bring the focused content to the center.

3. **Add Card**: Click on the plus icon to add a new card. You can choose to add a category or a service.

4. **Edit Card**: Click on a card to edit its text.

5. **Add Child Card**: Click on a card and select "Add Child" to add a child card.

6. **Delete Card**: Click on a card and select "Delete" to remove it.

## Project Structure

The project is organized into several components:

- `Header`: Contains zoom controls, recenter button, and options for changing the view.

- `Content Area`: Manages the overall layout and contains the zoomable content.

- `Zoomable Content`: The main area where cards are displayed and interacted with.

- `Card`: Represents individual items in the hierarchy. Handles interactions like editing and deletion.

## Getting Started

These instructions will help you set up and run the project on your local machine.

### Prerequisites

- Node.js and npm should be installed on your system.

### Installation

1. Clone the repository:
2. Navigate to the project directory
   ```bash
   cd your-repository
    ```
3. Install dependencies:
   ```bash
   npm install
   #or
   yarn install
   ```
4. Run Development server
   ```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
   ```

