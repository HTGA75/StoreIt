# StoreIt - Modern File Storage Application

StoreIt is a modern, feature-rich file storage application built with Next.js 15 and Appwrite backend services. It provides a secure and user-friendly platform for storing, managing, and sharing various types of files.

![StoreIt Dashboard](/public/readme/hero.png)

## Features

- **User Authentication**
  - Secure email-based authentication with OTP verification
  - Profile management with customizable avatars
  
- **File Management**
  - Support for multiple file types (documents, images, videos, audio)
  - Drag-and-drop file upload
  - File preview and thumbnails
  - File sharing capabilities
  - File renaming and deletion
  
- **Organization**
  - Categorized file views (Documents, Images, Media, Others)
  - Search functionality
  - Sort options for better file management
  - Storage usage tracking with visual charts

- **Responsive Design**
  - Mobile-friendly interface
  - Adaptive layout for all screen sizes
  - Smooth transitions and animations

## Tech Stack

- **Frontend**
  - Next.js 15
  - React 19
  - TypeScript
  - Tailwind CSS
  - Shadcn UI Components
  - Tremor Charts

- **Backend**
  - Appwrite Cloud
  - Node Appwrite SDK

## Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/StoreIt.git
   cd StoreIt
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory with the following variables:
   ```env
   NEXT_PUBLIC_APPWRITE_ENDPOINT=
   NEXT_PUBLIC_APPWRITE_PROJECT=
   NEXT_PUBLIC_APPWRITE_DATABASE=
   NEXT_PUBLIC_APPWRITE_USERS_COLLECTION=
   NEXT_PUBLIC_APPWRITE_FILES_COLLECTION=
   NEXT_PUBLIC_APPWRITE_BUCKET=
   NEXT_APPWRITE_KEY=
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:3000`

## Project Structure

- `/app` - Next.js application routes and layouts
- `/components` - Reusable React components
- `/lib` - Utility functions and Appwrite configurations
- `/public` - Static assets
- `/types` - TypeScript type definitions
- `/constants` - Application constants and configurations

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
