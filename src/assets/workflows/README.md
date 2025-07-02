# ComfyUI Workflows Integration

This document explains how the ComfyUI workflows are integrated into the FLUX vs SDXL research section and how to update them with actual workflow files.

## Current Implementation

### File Structure
```
src/
├── assets/workflows/
│   ├── flux_workflow_template.json     # Template FLUX workflow
│   └── sdxl_workflow_template.json     # Template SDXL workflow
└── pages/researches/
    └── FluxVsSDXL.tsx                  # Main research page with workflows
```

### Component Location
The `ComfyUIWorkflows` component is located in `/src/pages/researches/FluxVsSDXL.tsx` and displays:
- Two workflow cards (FLUX.1 and SDXL)
- Download buttons for each workflow
- Feature lists and descriptions
- Usage instructions

## How to Update with Actual Workflows

### Step 1: Replace Template Content
When you have the actual ComfyUI workflow JSON files:

1. Open `/src/pages/researches/FluxVsSDXL.tsx`
2. Locate the `ComfyUIWorkflows` component
3. Replace the `fluxWorkflowTemplate` and `sdxlWorkflowTemplate` objects with your actual workflow JSON content

### Step 2: Update Workflow Metadata
Modify the workflow objects in the `workflows` array to reflect the actual features and descriptions:

```typescript
{
  title: "FLUX.1 ComfyUI Workflow",
  description: "Your actual workflow description",
  model: "Actual model name",
  features: [
    "Actual feature 1",
    "Actual feature 2",
    // ... more features
  ],
  downloadName: "flux_workflow.json",
  jsonContent: yourActualFluxWorkflow
}
```

### Step 3: Test Downloads
After updating:
1. Start the development server: `npm run dev`
2. Navigate to Research > FLUX vs SDXL
3. Scroll to the "ComfyUI Workflows" section
4. Test the download buttons to ensure they generate proper JSON files

## Current Features

### Working Functionality
- ✅ Download buttons generate JSON files
- ✅ Template workflows with basic FLUX and SDXL setups
- ✅ Responsive design with hover effects
- ✅ Usage instructions for ComfyUI
- ✅ Integration with existing research page sections

### Workflow Templates
- **FLUX Template**: Basic FLUX.1-dev workflow with GGUF support
- **SDXL Template**: Base + Refiner pipeline workflow

## Future Enhancements

When adding actual workflows, consider:
1. **Advanced Features**: LoRA integration, ControlNet support
2. **Multiple Variants**: Different quality/speed settings
3. **Documentation**: Inline comments in JSON
4. **Preview Images**: Screenshots of the workflow nodes
5. **Version Control**: Workflow versioning and changelog

## File Replacement Instructions

### Quick Method
Replace the inline JSON objects in the component with your actual workflow content.

### Alternative Method (External Files)
If you prefer to keep workflows as separate files:

1. Place your workflow JSON files in `/src/assets/workflows/`
2. Import them at the top of the component:
   ```typescript
   import fluxWorkflow from '../../assets/workflows/flux_workflow.json';
   import sdxlWorkflow from '../../assets/workflows/sdxl_workflow.json';
   ```
3. Update the `jsonContent` properties to use the imported files

## Validation

Before deploying:
1. Ensure JSON is valid (use a JSON validator)
2. Test downloads in different browsers
3. Verify workflows work in ComfyUI
4. Check responsive design on mobile devices
