# Local Image Assets

This directory contains local image assets for the Audio Tour app. These images are used as fallbacks when external image URLs fail to load.

## Image Sources

- `boston.jpg` - Beach image from Pixabay
- `san_francisco.jpg` - San Francisco skyline from Pixabay
- `new_york.jpg` - New York skyline from Pexels
- `golden_gate.jpg` - Golden Gate Bridge from Pexels
- `statue_liberty.jpg` - Statue of Liberty from Pixabay
- `freedom_trail.jpg` - Pedestrian walkway from Pixabay (representing Freedom Trail)
- `boston_placeholder.svg` - Simple SVG placeholder for Boston

## Usage

These images are referenced in the application code with paths like `/images/boston.jpg`. The application will attempt to load external images first, but will fall back to these local images if the external sources fail.

## License

All images are either public domain or licensed for free use. Please refer to the original sources for specific license information.