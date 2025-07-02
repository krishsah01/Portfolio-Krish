#!/bin/bash

# ComfyUI Workflow Update Script
# This script helps update the ComfyUI workflows with new JSON files

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$(dirname "$SCRIPT_DIR")")"
WORKFLOWS_DIR="$PROJECT_ROOT/src/assets/workflows"
COMPONENT_FILE="$PROJECT_ROOT/src/pages/researches/FluxVsSDXL.tsx"

echo "🔧 ComfyUI Workflow Update Tool"
echo "================================"

# Function to validate JSON
validate_json() {
    local file="$1"
    if ! jq empty "$file" 2>/dev/null; then
        echo "❌ Error: $file is not valid JSON"
        exit 1
    fi
    echo "✅ $file is valid JSON"
}

# Function to backup current component
backup_component() {
    local backup_file="${COMPONENT_FILE}.backup.$(date +%Y%m%d_%H%M%S)"
    cp "$COMPONENT_FILE" "$backup_file"
    echo "📋 Backup created: $backup_file"
}

# Function to update workflow in component
update_workflow() {
    local workflow_type="$1"
    local json_file="$2"
    
    echo "🔄 Updating $workflow_type workflow..."
    
    # This is a placeholder for the actual update logic
    # In practice, you would need to carefully replace the JSON content
    # while preserving the TypeScript structure
    
    echo "⚠️  Manual update required:"
    echo "   1. Open $COMPONENT_FILE"
    echo "   2. Find the ${workflow_type}WorkflowTemplate object"
    echo "   3. Replace its content with the JSON from $json_file"
    echo "   4. Test the application"
}

# Main menu
case "${1:-}" in
    "flux")
        if [ -z "${2:-}" ]; then
            echo "Usage: $0 flux <json_file>"
            exit 1
        fi
        validate_json "$2"
        backup_component
        update_workflow "flux" "$2"
        ;;
    "sdxl")
        if [ -z "${2:-}" ]; then
            echo "Usage: $0 sdxl <json_file>"
            exit 1
        fi
        validate_json "$2"
        backup_component
        update_workflow "sdxl" "$2"
        ;;
    "validate")
        echo "🔍 Validating existing template files..."
        if [ -f "$WORKFLOWS_DIR/flux_workflow_template.json" ]; then
            validate_json "$WORKFLOWS_DIR/flux_workflow_template.json"
        fi
        if [ -f "$WORKFLOWS_DIR/sdxl_workflow_template.json" ]; then
            validate_json "$WORKFLOWS_DIR/sdxl_workflow_template.json"
        fi
        echo "✅ All template files are valid"
        ;;
    "help"|"--help"|"-h"|"")
        echo "Usage: $0 <command> [args]"
        echo ""
        echo "Commands:"
        echo "  flux <json_file>    Update FLUX workflow with provided JSON file"
        echo "  sdxl <json_file>    Update SDXL workflow with provided JSON file"
        echo "  validate            Validate existing template files"
        echo "  help                Show this help message"
        echo ""
        echo "Examples:"
        echo "  $0 flux my_flux_workflow.json"
        echo "  $0 sdxl my_sdxl_workflow.json"
        echo "  $0 validate"
        ;;
    *)
        echo "❌ Unknown command: $1"
        echo "Use '$0 help' for usage information"
        exit 1
        ;;
esac
