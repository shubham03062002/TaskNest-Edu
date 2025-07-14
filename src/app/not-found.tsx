// NotFoundPage.js
// This component displays a custom 404 "Page Not Found" message.
// It is designed to be used in a Next.js application.

import { Link } from 'lucide-react';
import React from 'react';

// Main functional component for the 404 page.
const App = () => {
  return (
    // The main container for the 404 page.
    // It uses flexbox to center the content both horizontally and vertically.
    // min-h-screen ensures it takes at least the full height of the viewport.
    // bg-gray-100 sets a light gray background color.
    // text-gray-800 sets the default text color.
    // font-inter ensures the Inter font is used for better readability.
    <div className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-800 font-inter">
      {/* Content container for the 404 message. */}
      {/* Uses flexbox for vertical stacking of elements. */}
      {/* text-center aligns text to the center. */}
      {/* p-8 adds padding around the content. */}
      {/* bg-white sets a white background for the card. */}
      {/* rounded-lg applies rounded corners. */}
      {/* shadow-xl adds a prominent shadow for depth. */}
      {/* max-w-lg limits the maximum width of the content for better readability on large screens. */}
      <div className="flex flex-col items-center text-center p-8 bg-white rounded-lg shadow-xl max-w-lg mx-4">
        {/* Large 404 heading. */}
        {/* text-9xl makes the text very large. */}
        {/* font-extrabold makes the text extra bold. */}
        {/* text-indigo-600 sets a vibrant indigo color. */}
        {/* mb-4 adds margin-bottom for spacing. */}
        <h1 className="text-9xl font-extrabold text-indigo-600 mb-4">404</h1>

        {/* Main message for the user. */}
        {/* text-4xl makes the text large. */}
        {/* font-bold makes the text bold. */}
        {/* text-gray-900 sets a dark gray color. */}
        {/* mb-4 adds margin-bottom. */}
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Page Not Found</h2>

        {/* Descriptive text for the user. */}
        {/* text-lg sets the font size to large. */}
        {/* text-gray-600 sets a medium gray color. */}
        {/* mb-8 adds margin-bottom. */}
        <p className="text-lg text-gray-600 mb-8">
          Oops! It looks like the page you are looking for does not exist.
        </p>

        {/* Link back to the homepage. */}
        {/* In a Next.js application, you would typically use `next/link` here. */}
        {/* For this standalone component, a standard anchor tag is used. */}
        {/* Inline styles for demonstration purposes, though Tailwind classes are preferred. */}
        {/* bg-indigo-600 sets the button background color. */}
        {/* hover:bg-indigo-700 changes background on hover. */}
        {/* text-white sets text color to white. */}
        {/* font-semibold makes text semi-bold. */}
        {/* py-3 px-6 adds vertical and horizontal padding. */}
        {/* rounded-md applies rounded corners to the button. */}
        {/* transition-colors adds a smooth color transition on hover. */}
        {/* duration-300 sets the transition duration. */}
        {/* ease-in-out sets the transition timing function. */}
        {/* shadow-md adds a shadow to the button. */}
        <Link
          href="/" // Link to the homepage. In Next.js, use <Link href="/"><a>Go Home</a></Link>
          className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-md transition-colors duration-300 ease-in-out shadow-md"
        >
          Go to Homepage
        </Link>
      </div>
    </div>
  );
};

export default App; // Export the component as App for consistency with typical React app structure.
