# Research Section

This directory contains research topics and analysis that are featured in the portfolio's Research section.

## Structure

```
researches/
├── FluxVsSDXL.tsx          # FLUX.1 vs SDXL AI image generation comparison
├── [FutureResearch].tsx    # Future research topics go here
└── README.md               # This file
```

## Adding New Research Topics

To add a new research topic:

1. **Create the Research Component**
   - Create a new `.tsx` file in `/src/pages/researches/`
   - Export a React component with `forwardRef` for section navigation
   - Follow the same pattern as `FluxVsSDXL.tsx`

2. **Update the Research Index**
   - Add your new topic to the `researchTopics` array in `/src/pages/Research.tsx`
   - Include metadata: id, title, description, category, date, status, featured
   - Set status to 'Published' when ready to display

3. **Handle Navigation**
   - Add the topic ID to the conditional rendering in `Research.tsx`
   - Import and render your component when selected

## Example Research Topic Structure

```tsx
import { forwardRef } from 'react';
import { motion } from 'framer-motion';

interface YourResearchProps {}

const YourResearch = forwardRef<HTMLElement, YourResearchProps>((_props, ref) => {
  return (
    <section 
      ref={ref} 
      className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-20" 
      id="your-research-id"
    >
      <div className="container mx-auto px-6">
        {/* Your research content here */}
      </div>
    </section>
  );
});

YourResearch.displayName = 'YourResearch';
export default YourResearch;
```

## Design Guidelines

- Use consistent color schemes (slate/indigo/purple gradients)
- Include motion animations with Framer Motion
- Make content responsive with Tailwind CSS
- Use the `GlassCard` pattern for content sections
- Include interactive elements where appropriate
