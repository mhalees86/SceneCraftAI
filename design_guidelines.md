# Design Guidelines: Video Prompt Generator Web App

## Design Approach
**Selected Framework:** Design System Approach inspired by Linear and Material Design
**Rationale:** This is a utility-focused productivity tool requiring clarity, efficiency, and structured information hierarchy. Linear's clean patterns combined with Material Design's robust component system provides the ideal foundation for parameter-heavy workflows.

## Layout System

### Spacing Scale
Use Tailwind spacing units: **2, 3, 4, 6, 8, 12, 16** for consistent rhythm
- Tight spacing: 2-3 (inline elements, input groups)
- Standard spacing: 4-6 (component padding, form fields)
- Section spacing: 8-12 (cards, panels, between major sections)
- Large spacing: 16 (page margins, major divisions)

### Grid Structure
- **Sidebar Navigation:** Fixed width 280px (w-70), full height
- **Main Content Area:** Flexible width, max-width-7xl container with px-8 py-6
- **Dual-Column Layout:** 60/40 split for parameters (left) and preview (right) on desktop
- **Mobile:** Single column stack, collapsible sidebar

## Typography

### Font Families
- **Primary:** Inter (headings, UI elements, buttons)
- **Secondary:** IBM Plex Mono (generated prompts, code-like outputs)

### Type Scale
- **H1 (Page Title):** 2xl, font-semibold, tracking-tight
- **H2 (Section Headers):** xl, font-semibold  
- **H3 (Card Headers, Scene Tabs):** lg, font-medium
- **Body:** base, font-normal, leading-relaxed
- **Labels:** sm, font-medium, uppercase tracking-wide
- **Captions/Metadata:** xs, font-normal

## Core Components

### Navigation Sidebar
- Logo/app name at top (h-16 header area)
- Mode toggle: Large segmented control (Manual/AI) with p-3 spacing
- Project selector dropdown (w-full, mb-8)
- Primary actions: "New Project", "Export All" as full-width buttons
- Footer: Settings icon, help link (mt-auto, absolute bottom)

### Scene Management
**Scene Tabs:** Horizontal scrollable tab bar
- Individual scene tab: px-4 py-3, rounded-t-lg
- Active scene: elevated appearance with bottom border indicator
- Scene controls: inline edit name, duplicate, delete icons
- "Add Scene" button: always visible at tab end with plus icon
- Implement drag-to-reorder handles on each tab

### Parameter Grid (Manual Mode)
**Layout:** 2-column grid on desktop (grid-cols-2 gap-6), single column mobile

**Parameter Blocks:**
- Each parameter: mb-6 spacing
- Label: text-sm font-medium mb-2
- Input field: full width, h-10 for selects/inputs, rounded-lg border
- Dropdowns: Custom select with chevron icon, 12-15 curated options each
- Multi-select chips: Display selected tags as removable chips below field

**Parameter Categories:**
1. Basic: Tone, Time of Day, Platform
2. Visual: Camera Angle, Framing, Lighting
3. Environment: Weather, Landscape, Genre
4. Mood & Style: Artistic Style, Mood/Atmosphere

### AI Mode Interface
**Description Input:**
- Large textarea: min-h-48, rounded-lg, p-4
- Placeholder: "Describe your scene in detail..."
- Character counter: bottom-right, text-xs

**Parameter Selection:**
- Compact chip selector for each category
- Display 4-6 most relevant options per category
- "Customize" link to expand full parameter panel
- Generate button: prominent, full-width, h-12

### Output Display Area
**Fixed Right Panel (desktop)** or **Bottom Section (mobile):**
- Header: "Generated Prompt" with copy button
- Prompt display: monospace font, p-6, rounded-lg, bg-neutral-subtle
- Edit toggle: Switch between view/edit modes
- Scene metadata: word count, token estimate (text-xs, opacity-60)
- Actions: Copy, Regenerate (AI mode), Clear buttons as icon-text combos

### Scene Copy Feature
**Copy Settings Modal:**
- Trigger: Icon button in scene tab overflow menu
- Modal: Centered, max-w-md, p-6
- Source/Target selectors: Side-by-side dropdowns
- Parameter checklist: Toggle which settings to copy (all selected by default)
- Confirm/Cancel actions

### Project Management
**Project Selector:**
- Dropdown in sidebar, mb-8
- Current project name with pencil edit icon
- Recent projects list (max 10)
- "New Project" creates untitled project with timestamp

**Export Panel:**
- Slide-out from right, w-96
- Export options: Current scene, All scenes, Custom selection
- Format toggle: Plain text, JSON, Markdown
- Preview scrollable area
- Export button: Copy to clipboard with success feedback

## Component Enrichment

### Empty States
- Scene tabs: "Add your first scene" with illustration
- No parameters: "Select mode to begin" with mode cards
- AI waiting: Pulsing dot animation with "Generating..."

### Input Enhancements
- Parameter dropdowns: Include icons next to option text (camera for angles, sun/moon for time)
- Search/filter: Add to dropdowns with 10+ options
- Recent selections: Show last 3 used values as quick picks

### Validation & Feedback
- Required fields: Red asterisk, inline error messages
- Success states: Green checkmark animation on generate
- Loading states: Skeleton screens for AI generation
- Toast notifications: Top-right, slide-in for copy/save actions

## Interaction Patterns

### Scene Navigation
- Keyboard shortcuts: Cmd/Ctrl + 1-9 for scene switching
- Swipe gestures on mobile for scene transitions
- Scene overview: Grid view showing all scenes at once (4 per row)

### Parameter Workflow
- Quick copy: Cmd/Ctrl + D duplicates current scene
- Bulk edit: Shift-select multiple scenes, change shared parameters
- Presets: Save/load parameter combinations (dropdown in each category)

### AI Integration
- Streaming response: Show prompt generation in real-time
- Refinement mode: "Enhance" button to re-generate with tweaks
- Comparison view: Side-by-side manual vs AI output

## Responsive Behavior

### Desktop (1280px+)
- Full sidebar + dual-column content
- Scene tabs horizontal with scroll
- Parameter grid: 2 columns

### Tablet (768px-1279px)
- Collapsible sidebar (hamburger)
- Single column parameters
- Output panel: toggleable bottom sheet

### Mobile (<768px)
- Bottom navigation bar
- Accordion parameters (expand categories)
- Full-screen output view
- Scene carousel with dots indicator

## Accessibility
- Focus indicators: 2px offset ring on all interactive elements
- Aria labels: All icon buttons, dropdowns, toggles
- Keyboard navigation: Full tab flow, escape closes modals
- Screen reader: Announce scene changes, generation status
- High contrast mode: Ensure 4.5:1 minimum ratios (designer will implement)

## Images
**No hero image needed** - this is a productivity tool, not a marketing page. Focus on clean, functional interface design.

**Icon Usage:**
- **Library:** Heroicons (outline for default, solid for active states)
- **Scene tabs:** Small icons for scene type (video camera, image, etc.)
- **Parameters:** Category icons (sun, camera, palette, etc.)
- **Actions:** Standard icons (copy, trash, edit, plus, chevron)

This design prioritizes **clarity and efficiency** over visual flair, creating a professional tool that scales with user expertise while remaining approachable for first-time users.