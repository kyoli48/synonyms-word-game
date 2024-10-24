import React from 'react';

export function Footer() {
  return (
    <footer className="text-center py-4 text-sm text-gray-600">
      <p>
        © 2024 Alphonsus Koong. All rights reserved. |{" "}
        <a 
          href="https://github.com/kyoli48/synonyms-word-game" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          View on GitHub
        </a>
      </p>
    </footer>
  );
}
